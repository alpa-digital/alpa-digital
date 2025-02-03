// netlify/functions/send-guide.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const { email, name } = JSON.parse(event.body);

    const data = await resend.emails.send({
      from: 'Alpa Digital <info@alpa.digital>',
      to: email,
      subject: 'Tu Guía: El Arte de la Automatización con IA',
      html: `
        <h1>¡Hola ${name}!</h1>
        <p>Gracias por solicitar nuestra guía.</p>
      `
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};