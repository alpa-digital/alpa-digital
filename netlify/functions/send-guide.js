// netlify/functions/send-guide.js
import { Resend } from 'resend';

// Inicializar Resend con la API key
const resend = new Resend('re_dySbK3Hb_JbeVHyomxLy8RNgG8GLb9NyD');

export async function handler(event) {
  // Configura los headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Manejar preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  try {
    // Parse el body de la request
    const { email, name } = JSON.parse(event.body);

    console.log('Attempting to send email to:', email);

    // Enviar el email
    const emailData = await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: [email],
      subject: 'Tu Guía: El Arte de la Automatización con IA',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #FFBD59;">¡Bienvenido a Alpa Digital!</h1>
          <p>Hola ${name},</p>
          <p>Gracias por solicitar nuestra guía sobre automatización con IA.</p>
          <p>Aquí encontrarás toda la información necesaria para empezar a automatizar tus procesos.</p>
          <br/>
          <p>Saludos,</p>
          <p>El equipo de Alpa Digital</p>
        </div>
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