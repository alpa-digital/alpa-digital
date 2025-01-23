import React from "react";
import Stats from "./Stats";
import Tag1 from "../../assets/images/lqo-lateral.png";

const Deliver = () => {
  return (
    <div
      id="ofrecemos"
      data-scroll-section
      className="h-full text-white pt-[5rem] pb-[2rem] lg:w-[80%] max-w-[1200px] m-auto px-6 md:px-10 md:pt-[4rem] xxl:pt-[4rem]"
    >
      <Stats />
      <div>
        <div className="flex justify-between items-center mb-8 mt-[4rem]">
          <p className="uppercase text-[1.5rem] font-semibold lg:text-[3rem] w-full lg:w-[30%] leading-[3rem]">
            LO QUE OFRECEMOS
          </p>
          <img
            className="h-[80px] hidden lg:block"
            src={Tag1}
            alt="Tag 1"
          />
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          <p className="text-[#929294] font-regular lg:text-base text-[90%]">
            Estrategia digital personalizada basada en un análisis profundo. 
            Tu negocio merece más que una solución predefinida.
          </p>
          <p className="text-[#929294] font-regular lg:text-base text-[90%]">
            Transparencia total: seguimiento en tiempo real del progreso y resultados de tu proyecto.
          </p>
          <p className="text-[#929294] font-regular lg:text-base text-[90%]">
            Servicios integrados para maximizar tu ROI, alineados con tus objetivos de crecimiento.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Deliver;
