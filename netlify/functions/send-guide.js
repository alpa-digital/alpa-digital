// netlify/functions/send-guide.js
import { Resend } from 'resend';
import { readFileSync } from 'fs';
import { join } from 'path';

const resend = new Resend('re_dd87QCSs_Lh317fjxSdeWBdNTT5w2sXuF');

export async function handler(event) {
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
    const { email, name } = JSON.parse(event.body);
    console.log('Attempting to send email to:', email);

    // Leer el PDF
    const pdfPath = join(process.cwd(), 'public', 'assets', 'guia-automatizacion-appointment-setting.pdf');
    const pdfContent = readFileSync(pdfPath);
    const pdfBase64 = pdfContent.toString('base64');

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
            .container {
              font-family: 'Arial', sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
              color: #333333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
            }
            .logo {
              margin-bottom: 20px;
            }
            h1 {
              color: #1a1a1a;
              font-size: 28px;
              margin-bottom: 30px;
            }
            .content {
              line-height: 1.6;
              font-size: 16px;
            }
            .highlight-box {
              background-color: #FFBD59;
              color: #1a1a1a;
              padding: 25px;
              border-radius: 12px;
              margin: 30px 0;
            }
            .cta-button {
              display: inline-block;
              background-color: #FFBD59;
              color: #1a1a1a;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: bold;
              margin: 30px 0;
            }
            .features {
              margin: 30px 0;
              padding-left: 20px;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #eaeaea;
              font-size: 14px;
              color: #666666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a la transformación digital, ${name}!</h1>
            </div>
            
            <div class="content">
              <p>Gracias por solicitar nuestra guía especializada sobre automatización con IA en el Appointment Setting.</p>
              
              <p>Hemos adjuntado a este email nuestra guía completa donde descubrirás:</p>
              
              <ul class="features">
                <li>Framework probado para implementar IA en tu proceso de ventas</li>
                <li>Las herramientas clave que necesitas conocer</li>
                <li>Plan de implementación paso a paso</li>
              </ul>

              <div class="highlight-box">
                <strong>¿Quieres acelerar tu implementación?</strong>
                <p>Agenda una consultoría gratuita de 30 minutos donde analizaremos tu caso específico y te daremos recomendaciones personalizadas.</p>
              </div>

              <center>
                <a href="https://cal.com/alpa-digital-studio/30min?user=alpa-digital-studio&date=2025-02-04&month=2025-02" 
                   class="cta-button">
                   Reservar Consultoría Gratuita →
                </a>
              </center>

              <div class="footer">
                <p>Si tienes alguna pregunta, puedes responder directamente a este email.</p>
                <p>
                  Saludos,<br>
                  El equipo de Alpa Digital
                </p>
              </div>
            </div>
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
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}