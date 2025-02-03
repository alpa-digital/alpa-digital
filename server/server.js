// server/server.js
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/send-guide', async (req, res) => {
 try {
   const { email, name } = req.body;
   
   // Leer el archivo PDF
   const pdfPath = path.join(__dirname, '../public/assets/guia-automatizacion-appointment-setting.pdf');
   const pdfContent = fs.readFileSync(pdfPath);
   const pdfBase64 = pdfContent.toString('base64');

   const data = await resend.emails.send({
     from: 'Alpa Digital <info@alpa.digital>',
     to: email,
     subject: 'Tu Guía: El Arte de la Automatización con IA en el Appointment Setting',
     attachments: [
       {
         filename: 'guia-automatizacion-appointment-setting.pdf',
         content: pdfBase64
       }
     ],
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
     `
   });
   
   res.json(data);
 } catch (error) {
   console.error('Error:', error);
   res.status(500).json({ error: error.message });
 }
});

app.listen(port, () => console.log(`Server running on port ${port}`));