import React, { useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomeBanner from "../../assets/images/bg-header2.png";
import TrumpTag from "../../assets/images/Trump Tag.png";
import Button from "../../components/Button/Button";
import { FaTiktok, FaApple, FaAmazon } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { AnimationContext } from "../../context/animation";
import { motion } from "framer-motion";

const Home = () => {
  const { riseUpVariant, riseUpItem, fade } = useContext(AnimationContext);

  return (
    <div id="home" data-scroll-section>
      <Navbar />
      <div className="bg-[#f1f1f1] rounded-bl-[2rem] lg:rounded-bl-[4rem] rounded-br-[2rem] lg:rounded-br-[4rem] relative">
        <div className="h-[85vh] sl:h-[60vh] max-w-[1200px] m-auto relative">
          <div className="py-[2rem] flex flex-col items-center lg:flex-row lg:gap-8 lg:px-[2rem] px-[1rem]">
            <motion.div
              variants={riseUpVariant}
              initial="hidden"
              whileInView="visible"
              className="lg:w-[60%] text-center lg:text-left mb-8 lg:mb-0"
            >
              <div className="md:flex items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={fade}
                  className="uppercase text-[3rem] md:text-[3.5rem] lg:text-[3.5rem] tracking-[-2px] lg:tracking-[-3px] leading-[4rem] lg:leading-[5rem] font-bold "
                >
                  RENOVACIÓN DIGITAL PARA PYMES EN LA ERA DE LA IA Y EL DATA.
                </motion.h1>
            
              </div>
            </motion.div>
            <div className="lg:w-[40%] text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={fade}
                className="lg:mb-4 mb-4 text-sm lg:text-base md:w-[80%] lg:w-full m-auto font-regular text-gray-700 mt-2"
              >
                Nuestros servicios de agencia digital transforman PYMES mediante IA, Data Analytics y 
                las últimas tendencias tecnológicas. 

              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={fade}
                className="lg:mb-4 mb-4 text-sm lg:text-base md:w-[80%] lg:w-full m-auto font-regular text-gray-700"
              >
                Mejoramos el reconocimiento de marca, optimizamos procesos y aumentamos el tráfico web de tu negocio.
              </motion.p>
              <div className="flex flex-col items-center md:flex-row md:justify-center lg:justify-start">
                <motion.span initial={{ opacity: 0, y: 20 }} whileInView={fade}>
                  <Button className="flex items-center w-fit mb-12 md:mb-0 font-medium">
                    <span className="mr-4">agenda tu Consulta gratis</span>{" "}
                    <FiArrowUpRight />
                  </Button>
                </motion.span>
    
              </div>
            </div>
          </div>
          <div className="absolute bottom-[-14rem] hidden md:block">
            <motion.img
              initial={{ opacity: 0, y: 100 }}
              whileInView={fade}
              viewport={{ once: true }}
              src={HomeBanner}
              className="w-[80%] m-auto"
              alt="Home Banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
