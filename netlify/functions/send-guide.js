// netlify/functions/send-guide.js
const { Resend } = require('resend');

exports.handler = async (event) => {
 // Habilitar CORS
 const headers = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'Content-Type',
   'Access-Control-Allow-Methods': 'POST, OPTIONS'
 };

 // Manejar preflight requests
 if (event.httpMethod === 'OPTIONS') {
   return {
     statusCode: 200,
     headers
   };
 }

 if (event.httpMethod !== 'POST') {
   return {
     statusCode: 405,
     headers,
     body: JSON.stringify({ error: 'Method not allowed' })
   };
 }

 try {
   const { email, name } = JSON.parse(event.body);
   console.log('Received request for:', email, name);
   
   const resend = new Resend(process.env.RESEND_API_KEY);

   const data = await resend.emails.send({
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
           <li>Casos reales y resultados comprobados</li>
         </ul>
         <div style="background-color: #FFBD59; color: black; padding: 20px; border-radius: 10px; margin: 30px 0;">
           <p style="margin: 0; font-weight: bold;">¿Quieres profundizar más en cómo aplicar esto a tu negocio?</p>
         </div>
         <p style="text-align: center;">
           <a href="https://calendly.com/alpa-digital-studio" 
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

   console.log('Email sent successfully:', data);
   return {
     statusCode: 200,
     headers,
     body: JSON.stringify(data)
   };
 } catch (error) {
   console.error('Error sending email:', error);
   return {
     statusCode: 500,
     headers,
     body: JSON.stringify({ error: error.message || 'Error interno del servidor' })
   };
 }
};