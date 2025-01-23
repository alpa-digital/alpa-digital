import React from "react";
import { FiArrowRight, FiZap } from "react-icons/fi";

const CTA = () => {
 return (
   <section className="text-white py-24">
     <div className="max-w-[1200px] mx-auto px-6">
       <div className="bg-[#1a1a1a] rounded-3xl p-12 border border-white/10 text-center">
         <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFBD59]/10 rounded-full mb-6">
           <FiZap className="text-[#FFBD59]" />
           <span className="text-[#FFBD59] font-semibold">TRANSFORMA TU NEGOCIO</span>
         </span>

         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
           ¿Listo para automatizar<br />tu empresa con IA?
         </h2>

         <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
           Agenda una demostración gratuita y descubre cómo la IA puede transformar tu operación
         </p>

         <div className="inline-flex items-center gap-2 bg-[#FFBD59] text-black font-semibold py-4 px-8 rounded-xl hover:bg-[#ffcb7d]">
           <a 
             href="https://cal.com/alpa-digital-studio" 
             target="_blank"
             rel="noopener noreferrer" 
             className="flex items-center gap-2"
           >
             <span>Agenda tu Demo Gratuita</span>
             <FiArrowRight className="w-5 h-5" />
           </a>
         </div>
       </div>
     </div>
   </section>
 );
};

export default CTA;