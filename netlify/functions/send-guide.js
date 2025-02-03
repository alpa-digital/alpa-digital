// netlify/functions/send-guide.js
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resend = new Resend('re_dd87QCSs_Lh317fjxSdeWBdNTT5w2sXuF');

export async function handler(event) {
  console.log('Function started');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    console.log('Parsing request body');
    const { email, name } = JSON.parse(event.body);
    console.log('Received request for:', { email, name });

    // Leer el PDF
    console.log('Reading PDF file');
    const pdfPath = path.join(__dirname, '../../public/assets/guia-automatizacion-appointment-setting.pdf');
    console.log('PDF path:', pdfPath);
    
    const pdfContent = fs.readFileSync(pdfPath);
    console.log('PDF read successfully');
    
    const pdfBase64 = pdfContent.toString('base64');
    console.log('PDF converted to base64');

    console.log('Sending email');
    const emailData = await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: [email],
      subject: 'Tu Guía: El Arte de la Automatización con IA en el Appointment Setting',
      attachments: [
        {
          filename: 'guia-automatizacion-appointment-setting.pdf',
          content: pdfBase64
        }
      ],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { background: #FFBD59; color: black; padding: 12px 24px; text-decoration: none; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>¡Hola ${name}!</h1>
            <p>Gracias por solicitar nuestra guía sobre automatización con IA.</p>
            <p>Adjunto encontrarás la guía completa.</p>
            <p>¿Quieres profundizar más?</p>
            <a href="https://cal.com/alpa-digital-studio/30min" class="button">
              Agenda una consultoría gratuita
            </a>
          </div>
        </body>
        </html>
      `
    });

    console.log('Email sent successfully:', emailData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        data: emailData
      })
    };

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: error.message,
        errorStack: error.stack
      })
    };
  }
}