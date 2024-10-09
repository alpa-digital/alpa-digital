import AwardedWork from "../../components/Work/AwardedWork";
import CogniciseTag from "../../assets/images/cognicise-bg.png";
import Crown from "../../assets/images/Awarded Works Crown.png";
import Tag from "../../components/Tag/Tag";
import OrangyWaveTag from "../../assets/images/reqs-bg.png";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AnimationContext } from "../../context/animation";

const AwardedWorks = () => {
  const { riseUpVariant } = useContext(AnimationContext);
  return (
    <div
      id="services"
      data-scroll-section
      className="text-[#e5e5e5] pb-[2rem] lg:w-[90%] max-w-[1200px] m-auto px-6 xxl:pt-[3rem]"
    >
      <motion.div
        variants={riseUpVariant}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col lg:flex-row justify-between lg:items-center gap-10 lg:gap-10 mt-[4rem]"
      >
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          className="uppercase text-[1.5rem] lg:text-[3rem] font-semibold lg:w-[100%] "
        >
          Proyectos Recientes
        </motion.h2>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.3 },
          }}
          className="text-[#929294] lg:w-[30%] font-medium lg:text-base text-[40%] text-left my-6 md:my-0 mt-8"
        >
    
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, delay: 0.6 },
          }}
        >
        </motion.div>
        
      </motion.div>

      {/* Awarded Work 1 */}

      <AwardedWork
        labels={[
          { name: "Software", delay: 0 },
          { name: "SaaS", delay: 0.2 },
          { name: "Django Rest", delay: 0.2 },
          { name: "React", delay: 0.2 },
          { name: "07/2024", delay: 0.4 },
          
        ]}
        caption="Reqs.ai"
        title="reqs.ai"
        subtitle="Reqs.ai es un Software As A Services que permite a sus usuarios generar documentos de toma de requerimientos en pocos minutos gracias al uso de Inteligencia Artificial Generativa."
        className="bg-work-banner-3 mb-[3rem] sm:mb-0 bg-cover"
      />

      <AwardedWork
        labels={[
          { name: "Software", delay: 0 },
          { name: "Mobile", delay: 0.2 },
          { name: "Flutter", delay: 0.2 },
          { name: "Firebase", delay: 0.2 },
          { name: "04/2024", delay: 0.4 },
          
        ]}
        caption="Khé App"
        title="Khé"
        subtitle="Khé es una aplicación que permite a sus usuarios descubrir un mundo de emociones compartidas y crear un nuevo concepto de diario social."
        className="bg-work-banner-2 mb-[3rem] sm:mb-0"
      />

      <AwardedWork
        labels={[
          { name: "Software", delay: 0 },
          { name: "SaaS", delay: 0.2 },
          { name: "Django Rest", delay: 0.2 },
          { name: "Rect.js", delay: 0.2 },
          { name: "11/2022", delay: 0.4 },
          { name: "Premiado", delay: 0.4 },
          
        ]}
        caption="Cognicise.app"
        title="Cognicise.app"
        subtitle="Cognicise es una aplicación móvil de ejercitación, monitorización, recordatorios y ayuda diseñada para personas con signos de deterioro cognitivo leve."
        className="bg-work-banner-1 mb-[3rem] sm:mb-0"
      />
      
    </div>
  );
};

export default AwardedWorks;
