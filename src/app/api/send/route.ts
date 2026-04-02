import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, origin, destination, transportMode, weight, date, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Confidence Line Cotizaciones <onboarding@resend.dev>',
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

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Cotización enviada con Resend:", data);
    return NextResponse.json({ message: 'Cotización enviada con éxito', data }, { status: 200 });
  } catch (error) {
    console.error('Error interno al procesar la cotización:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
