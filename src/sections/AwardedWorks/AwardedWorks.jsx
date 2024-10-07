import AwardedWork from "../../components/Work/AwardedWork";
import CogniciseTag from "../../assets/images/cognicise-bg.png";
import Crown from "../../assets/images/Awarded Works Crown.png";
import Tag from "../../components/Tag/Tag";
import OrangyWaveTag from "../../assets/images/Orangy Wave Tag.png";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AnimationContext } from "../../context/animation";

const AwardedWorks = () => {
  const { riseUpVariant } = useContext(AnimationContext);
  return (
    <div
      id="services"
      data-scroll-section
      className="text-[#e5e5e5] pb-[2rem] lg:w-[90%] max-w-[1200px] m-auto px-6 md:px-10 xxl:pt-[3rem]"
    >
      <motion.div
        variants={riseUpVariant}
        initial="hidden"
        whileInView="visible"
        className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-10 mt-[4rem]"
      >
        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          className="uppercase text-[1.5rem] lg:text-[3rem] font-semibold lg:w-[30%] leading-[3rem]"
        >
          Proyectos Premiados
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
          className="text-[#929294] lg:w-[30%] font-medium lg:text-base text-[40%] text-left my-6 md:my-0"
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
          { name: "11/2022", delay: 0.4 },
          { name: "Mejor proyecto de Ingeniería del Software", delay: 0.4 },
          
        ]}
        caption="Cognicise.app"
        title="Cognicise.app"
        className="bg-work-banner-1 mb-[3rem] sm:mb-0"
      />
      
    </div>
  );
};

export default AwardedWorks;
