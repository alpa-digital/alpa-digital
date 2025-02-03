// src/pages/GuiaSetters/index.jsx
import React, { useState } from 'react';
import { Resend } from 'resend';
import { FiCheck, FiArrowRight, FiZap, FiMail, FiUser, FiDollarSign, FiTarget } from "react-icons/fi";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../sections/Footer/Footer";
import ImagenGuia from "../../assets/images/guia-setters.png";


const GuiaSetters = () => {
 const [formData, setFormData] = useState({
   name: '',
   email: ''
 });
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);

 const features = [
   {
     icon: <FiDollarSign className="w-6 h-6" />,
     title: "ROI Inmediato",
     description: "Reduce costos operativos hasta un 70% desde el primer mes"
   },
   {
     icon: <FiTarget className="w-6 h-6" />,
     title: "Escalabilidad Real",
     description: "Multiplica tu capacidad de prospección x10 sin aumentar costos"
   },
   {
     icon: <FiUser className="w-6 h-6" />,
     title: "Personalización Masiva",
     description: "Mensajes hiperpersonalizados a escala usando IA"
   }
 ];

 const chapters = [
   "Fundamentos de la IA en Appointment Setting",
   "Herramientas y Stack Tecnológico Recomendado",
   "Setup Paso a Paso del Sistema Automatizado",
   "Mejores Prácticas y Casos de Éxito",
   "Templates y Scripts Probados"
 ];

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    console.log('Sending request with data:', formData);
    
    const response = await fetch('/.netlify/functions/send-guide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    console.log('Response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Error sending email');
    }

    if (data.success) {
      setSuccess(true);
    }

  } catch (error) {
    console.error('Error:', error);
    // Aquí podrías añadir un estado para mostrar el error al usuario
  } finally {
    setLoading(false);
  }
};

 return (
   <div className="min-h-screen bg-[#090909]">
     <Navbar />
     
     <main className="pt-12 pb-16">
       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         {/* Hero Section */}
         <div className="text-center mb-16">
           <span className="inline-flex items-center px-4 py-2 bg-[#FFBD59] bg-opacity-10 text-[#FFBD59] rounded-full text-sm font-medium mb-8">
             <FiZap className="mr-2" />
             GUÍA GRATUITA 2024
           </span>

           <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
             El Arte de la Automatización<br />
             con IA en el Appointment Setting
           </h1>

           <p className="text-xl text-[#929294] mb-8 max-w-3xl mx-auto">
             La guía definitiva para escalar tu negocio de appointment setting usando IA
           </p>

           {/* Imagen Destacada */}
           <div className="relative mb-16">
             <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
             <img
               src={ImagenGuia}
               alt="Guía de Automatización con IA"
               className="mx-auto rounded-2xl shadow-2xl"
             />
           </div>

           

           {/* Contenido de la Guía */}
           <div className="bg-[#1d1d1d] border border-[#353535] rounded-2xl p-8 mb-16 text-left">
             <h2 className="text-2xl font-bold text-white mb-6">Lo que aprenderás:</h2>
             <div className="grid md:grid-cols-2 gap-4">
               {chapters.map((chapter, index) => (
                 <div key={index} className="flex items-center space-x-3">
                   <FiCheck className="text-[#FFBD59] flex-shrink-0" />
                   <span className="text-[#929294]">{chapter}</span>
                 </div>
               ))}
             </div>
           </div>

           {/* Formulario */}
           <div className="relative bg-gradient-to-b from-[#1d1d1d] to-[#151515] p-8 rounded-[2.5rem] max-w-md mx-auto border border-[#353535] shadow-lg overflow-hidden">
             {/* Elementos decorativos */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFBD59] opacity-10 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFBD59] opacity-10 rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
             
             {!success ? (
               <form onSubmit={handleSubmit} className="relative space-y-6">
                 {/* Banner superior */}
                 <div className="mb-6 text-center">
                   <div className="flex items-center justify-center gap-2 text-[#FFBD59] mb-2">
                     <FiZap className="w-4 h-4" />
                     <span className="text-sm font-medium tracking-wider">GUÍA EXCLUSIVA</span>
                   </div>
                   <h3 className="text-white text-xl font-bold">¡Descarga Gratuita!</h3>
                 </div>
                 
                 {/* Inputs con efecto hover */}
                 <div className="space-y-4">
                   <div className="relative group">
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFBD59] to-[#ffcb7d] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
                     <div className="relative">
                       <FiUser className="absolute left-4 top-4 text-[#929294] group-hover:text-[#FFBD59] transition-colors" />
                       <input
                         type="text"
                         value={formData.name}
                         onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                         placeholder="Tu nombre"
                         className="w-full pl-12 pr-4 py-4 bg-[#090909] border border-[#353535] rounded-lg focus:outline-none focus:border-[#FFBD59] text-white transition-colors"
                         required
                       />
                     </div>
                   </div>

                   <div className="relative group">
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFBD59] to-[#ffcb7d] rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
                     <div className="relative">
                       <FiMail className="absolute left-4 top-4 text-[#929294] group-hover:text-[#FFBD59] transition-colors" />
                       <input
                         type="email"
                         value={formData.email}
                         onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                         placeholder="Tu email profesional"
                         className="w-full pl-12 pr-4 py-4 bg-[#090909] border border-[#353535] rounded-lg focus:outline-none focus:border-[#FFBD59] text-white transition-colors"
                         required
                       />
                     </div>
                   </div>
                 </div>
                 
                 {/* Botón con efectos */}
                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full bg-gradient-to-r from-[#FFBD59] to-[#ffcb7d] hover:from-[#ffcb7d] hover:to-[#FFBD59] text-black font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   {loading ? (
                     <span className="flex items-center gap-2">
                       <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                       Enviando...
                     </span>
                   ) : (
                     <>
                       <span>Obtener Guía Ahora</span>
                       <FiArrowRight className="w-5 h-5" />
                     </>
                   )}
                 </button>

                 

                 {/* Garantías */}
                 <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-2 text-sm text-[#929294]">
                     <FiCheck className="text-[#FFBD59] w-4 h-4" />
                     <span>Acceso instantáneo a la guía</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-[#929294]">
                     <FiCheck className="text-[#FFBD59] w-4 h-4" />
                     <span>Sin obligaciones ni pagos</span>
                   </div>
                 </div>
                 
                 <p className="text-sm text-[#929294] text-center border-t border-[#353535] pt-4">
                   🔒 Tu información está segura con nosotros.<br />
                   Sin spam, solo contenido valioso.
                 </p>
               </form>
             ) : (
               <div className="text-center py-12">
                 <div className="w-16 h-16 bg-[#FFBD59] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                   <FiCheck className="w-8 h-8 text-[#FFBD59]" />
                 </div>
                 <h3 className="text-2xl font-bold mb-4 text-white">¡Enviado con éxito!</h3>
                 <p className="text-[#929294] leading-relaxed">
                   Tu guía está en camino 🚀<br />
                   Revisa tu email en los próximos minutos.
                 </p>
               </div>
             )}
           </div>

           {/* Características Principales */}
           <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-[#1d1d1d] border border-[#353535] rounded-xl p-6 text-left transform hover:scale-105 transition-transform duration-300"
                      >
                        <div className="text-[#FFBD59] mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                        <p className="text-[#929294] text-sm">{feature.description}</p>
                      </div>
                    ))}
            </div>

           {/* Testimonios */}
           <div className="mt-20">
             <h2 className="text-2xl font-semibold text-white mb-8">
               Testimonios de Otros Appointment Setters
             </h2>
             
             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <div className="bg-[#1d1d1d] border border-[#353535] p-6 rounded-xl">
                 <p className="text-[#929294] mb-4">
                   "La automatización con IA nos permitió triplicar nuestra productividad 
                   mientras reducíamos costes operativos en un 70%"
                 </p>
                 <p className="text-white font-semibold">
                   María G. - Appointment Setter Senior
                 </p>
               </div>
               
               <div className="bg-[#1d1d1d] border border-[#353535] p-6 rounded-xl">
               <p className="text-[#929294] mb-4">
                   "En solo 2 meses, pasamos de 20 a 100 citas mensuales manteniendo 
                   la misma calidad en las conversaciones"
                 </p>
                 <p className="text-white font-semibold">
                   Carlos R. - Director de Ventas
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </main>

     <Footer />
   </div>
 );
};

export default GuiaSetters;