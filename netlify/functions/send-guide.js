// netlify/functions/send-guide.js

// Importar Resend
import { Resend } from 'resend';

// Crear instancia de Resend con la API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Función principal
export const handler = async (event) => {
  // Headers CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Pre-flight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const { email, name } = JSON.parse(event.body);
    
    await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: email,
      subject: 'Tu Guía: El Arte de la Automatización con IA',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>¡Hola ${name}!</h1>
          <p>Aquí tienes tu guía sobre automatización con IA.</p>
          <a href="https://calendly.com/alpa-digital-studio">Agenda una consulta gratuita</a>
        </div>
      `
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};