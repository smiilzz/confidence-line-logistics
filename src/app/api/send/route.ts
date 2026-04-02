import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, origin, destination, transportMode, weight, date, message } = body;

    const dataToInsert = {
      nombre: name,
      email,
      telefono: phone,
      origen: origin,
      destino: destination,
      transporte: transportMode,
      peso: weight,
      fecha_envio: date,
      mensaje: message || '',
    };

    console.log("Insertando en Supabase...", dataToInsert);

    // 1. Guardar registro en Supabase (.select fuerza el retorno de datos)
    const { data: dbData, error: dbError } = await supabase
      .from('quotes')
      .insert([dataToInsert])
      .select();

    // Si la base de datos falla explícitamente, abortamos con 500.
    if (dbError) {
      console.error('Error explícito de Supabase:', dbError);
      return NextResponse.json(
        { error: 'No se pudo guardar la cotización en la base de datos' }, 
        { status: 500 }
      );
    }

    // Si la DB no tiró error pero no guardó nada (fallo silencioso en RLS)
    if (!dbData || dbData.length === 0) {
      console.error('ALERTA: Supabase no insertó la fila. Posible bloqueo silencioso por Row Level Security (RLS).');
      return NextResponse.json(
        { error: 'Bloqueo de seguridad al guardar la cotización. Desactiva o ajusta RLS en la tabla quotes.' }, 
        { status: 500 }
      );
    }
    
    console.log('✅ Registro insertado exitosamente en Supabase');

    // 2. Si la DB fue exitosa, enviar correo vía Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'LogiTrust Global Cotizaciones <onboarding@resend.dev>',
      to: ['benjacatalan929@gmail.com'],
      subject: `Nueva Cotización de ${name}`,
      html: `
        <h2>Nueva solicitud de cotización desde la web</h2>
        <p><strong>Nombre / Empresa:</strong> ${name}</p>
        <p><strong>Email de contacto:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <hr />
        <h3>Detalles de la Ruta</h3>
        <p><strong>Origen:</strong> ${origin}</p>
        <p><strong>Destino:</strong> ${destination}</p>
        <p><strong>Modo de Transporte:</strong> ${transportMode}</p>
        <hr />
        <h3>Información de Carga</h3>
        <p><strong>Peso / Volumen Estimado:</strong> ${weight}</p>
        <p><strong>Fecha Estimada de Envío:</strong> ${date}</p>
        <p><strong>Mensaje Adicional:</strong> ${message || 'Sin comentarios adicionales.'}</p>
      `,
    });

    if (emailError) {
      console.error('Resend API Error:', emailError);
      return NextResponse.json({ error: emailError.message }, { status: 400 });
    }

    console.log("✅ Email de confirmación enviado con Resend:", emailData);
    return NextResponse.json({ message: 'Respaldo DB y Email enviados exitosamente' }, { status: 200 });

  } catch (error) {
    console.error('Error inesperado al procesar la cotización:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
