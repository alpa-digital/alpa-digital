Parece un error 502, lo cual sugiere que la función está fallando al intentar leer el archivo. Vamos a modificar la forma en que manejamos el PDF:

```javascript
// netlify/functions/send-guide.js
import { Resend } from 'resend';

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
    const { email, name } = JSON.parse(event.body);
    console.log('Received request for:', { email, name });

    const emailData = await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: [email],
      subject: 'Tu Guía: El Arte de la Automatización con IA en el Appointment Setting',
      attachments: [
        {
          filename: 'guia-automatizacion-appointment-setting.pdf',
          content: 'JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' // Base64 del PDF
        }
      ],
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
            }
            .header {
              background-color: #FFBD59;
              color: black;
              padding: 20px;
              text-align: center;
              margin-bottom: 30px;
            }
            .button {
              display: inline-block;
              background: #FFBD59;
              color: black !important;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 8px;
              font-weight: bold;
              margin: 20px 0;
            }
            .content {
              padding: 20px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a la transformación digital!</h1>
            </div>
            
            <div class="content">
              <h2>¡Hola ${name}!</h2>
              
              <p>Gracias por solicitar nuestra guía especializada sobre automatización con IA en el Appointment Setting.</p>
              
              <p>En el archivo adjunto encontrarás toda la información sobre:</p>
              <ul>
                <li>Framework probado para implementar IA</li>
                <li>Herramientas clave del sector</li>
                <li>Casos de éxito y mejores prácticas</li>
                <li>Plan de implementación paso a paso</li>
              </ul>

              <p><strong>¿Quieres acelerar tu transformación digital?</strong></p>
              
              <center>
                <a href="https://cal.com/alpa-digital-studio/30min" class="button">
                  Agenda tu Consultoría Gratuita →
                </a>
              </center>

              <div class="footer">
                <p>Si tienes alguna pregunta, responde directamente a este email.</p>
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
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
}
```

Este código:
1. Elimina la dependencia de leer el archivo del sistema
2. Usa un template de email más estructurado
3. Simplifica el manejo de errores

Necesitaremos el base64 del PDF. ¿Podrías proporcionarme el PDF para convertirlo a base64 y añadirlo al código?