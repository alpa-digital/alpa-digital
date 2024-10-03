import React, { useContext } from "react";
import Stats from "./Stats";
import Tag1 from "../../assets/images/lqo-lateral.png";
import Tag2 from "../../assets/images/Deliver Trump Circle.png";
import { motion } from "framer-motion";
import { AnimationContext } from "../../context/animation";

const Deliver = () => {
  const { riseUpVariant, riseUpItem, tagVariant } =
    useContext(AnimationContext);
  return (
    <div
      id="about"
      data-scroll-section
      className="h-full text-white pt-[5rem] pb-[2rem] lg:w-[90%] max-w-[1200px] m-auto px-6 md:px-10 md:pt-[15rem] xxl:pt-[20rem]"
    >
      <Stats />
      <div>
        <motion.div
          variants={riseUpVariant}
          initial="hidden"
          whileInView="visible"
          className="flex justify-between items-center mb-8 mt-[4rem]"
        >
          <motion.p
            variants={riseUpItem}
            className="uppercase text-[1.5rem] font-semibold lg:text-[3rem] w-full lg:w-[30%] leading-[3rem]"
          >
            LO QUE OFRECEMOS
          </motion.p>
          <motion.img
            variants={riseUpItem}
            className="h-[80px] hidden lg:block"
            src={Tag1}
            alt="Tag 1"
          />
    
        </motion.div>
        <motion.div
          variants={riseUpVariant}
          initial="hidden"
          whileInView="visible"
          className="flex flex-wrap md:flex-nowrap gap-8"
        >
          <motion.p
            variants={riseUpItem}
            className="text-[#929294] font-regular lg:text-base text-[80%]"
          >
            Estrategia digital personalizada basada en un análisis profundo. 
            Tu negocio merece más que una solución predefinida.
          </motion.p>
          <motion.p
            variants={riseUpItem}
            className="text-[#929294] font-regular lg:text-base text-[80%]"
          >
            Transparencia total: seguimiento en tiempo real del progreso y resultados de tu proyecto.
          </motion.p>
          <motion.p
            variants={riseUpItem}
            className="text-[#929294] font-regular lg:text-base text-[80%]"
          >
            Servicios integrados para maximizar tu ROI, alineados con tus objetivos de crecimiento.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Deliver;
