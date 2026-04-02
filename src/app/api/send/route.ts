import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicialización básica para usar Resend (necesitarás una clave real en tu .env.local)
// Para propósitos de simulación, la dejamos configurada.
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key1234');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, origin, destination, transportMode, weight, date, message } = body;

    // Aquí iría el código real para enviar el correo:
    /*
    const { data, error } = await resend.emails.send({
      from: 'Confidence Line Cotizaciones <onboarding@resend.dev>',
      to: ['ventas@confidence-line.com'], // El correo de la empresa
      subject: `Nueva Cotización de ${name}`,
      html: `
        <h2>Nueva solicitud de cotización</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <hr />
        <h3>Detalles de la Carga</h3>
        <p><strong>Origen:</strong> ${origin}</p>
        <p><strong>Destino:</strong> ${destination}</p>
        <p><strong>Transporte:</strong> ${transportMode}</p>
        <hr />
        <h3>Adicionales</h3>
        <p><strong>Peso/Volumen:</strong> ${weight}</p>
        <p><strong>Fecha estimada:</strong> ${date}</p>
        <p><strong>Mensaje:</strong> ${message || 'N/A'}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    */

    // Simulación de envío exitoso con retardo para ver el spinner
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Simulación de cotización recibida:", body);

    return NextResponse.json({ message: 'Cotización enviada con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al procesar la cotización:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
