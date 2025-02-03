// api/send-guide.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  try {
    await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: email,
      subject: 'Tu Guía: El Arte de la Automatización con IA en el Appointment Setting',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">¡Hola ${name}!</h1>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Gracias por solicitar nuestra guía sobre automatización con IA.
          </p>
          
          <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            En esta guía descubrirás:
          </p>
          
          <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            <li>Cómo la IA está transformando el sector</li>
            <li>Las herramientas clave para la automatización</li>
            <li>Un roadmap paso a paso para implementar la automatización</li>
          </ul>
          
          <div style="background-color: #FFBD59; color: black; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <p style="margin: 0; font-weight: bold;">¿Quieres profundizar más en cómo aplicar esto a tu negocio?</p>
          </div>
          
          <p style="text-align: center;">
            <a href="https://cal.com/alpa-digital-studio" 
               style="display: inline-block; background-color: #FFBD59; color: black; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">
              Agenda una consulta gratuita
            </a>
          </p>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
            Si tienes alguna pregunta, puedes responder directamente a este email.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'guia-automatizacion-appointment-setting.pdf',
          path: './public/assets/guia-automatizacion-appointment-setting.pdf'
        }
      ]
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
}