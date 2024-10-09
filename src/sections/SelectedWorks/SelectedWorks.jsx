import SelectedWork from "../../components/Work/SelectedWork";
import WorksBanner from "../../assets/images/ren-cre-bg.png";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AnimationContext } from "../../context/animation";

const SelectedWorks = () => {
  const { fade } = useContext(AnimationContext);
  return (
    <section
      id="project"
      data-scroll-section
      className="flex flex-col-reverse lg:flex-row text-[#e5e5e5] pb-[2rem] lg:w-[90%] max-w-[1200px] mt-16 m-auto px-6 md:px-10 xxl:pt-[3rem]"
    >
      <div className="left lg:w-[70%] items-center lg:mr-12 mt-10 lg:mt-0">
        <motion.img
          initial={{
            opacity: 0,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              delay: 0.5,
            },
          }}
          viewport={{ once: true }}
          src={WorksBanner}
          alt=""
          className="hidden lg:flex"
        />
        <div className="flex flex-col lg:flex-row justify-between items-center lg:mt-10">
          <motion.div
            className="lg:w-[48%] w-full mb-10 lg:mb-0"
            viewport={{ once: true }}
            initial={{
              opacity: 1,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.7,
              },
            }}
          >
            <SelectedWork
              title={
                <h3 className="text-[1.1rem] text-white lg:text-[1.1rem] font-regular  w-[100%]">
                  <span>Diseñamos la estructura y estilo según los objetivos acordados. Incorporamos tu feedback y realizamos ajustes para lograr el mejor resultado posible.</span>
                </h3>
              }
              year="Paso 2 - Definición"
              className="bg-[#FFBD59]"
            />
          </motion.div>
          <motion.div
            initial={{
              opacity: 1,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="lg:w-[48%] w-full"
          >
            <SelectedWork
              title={
                <h3 className="text-[1.1rem] text-white lg:text-[1.1rem] font-regular  w-[100%]">
                  <span>Iniciamos el desarrollo. Al finalizar, tendrás un producto completamente desarrollado y estará listo para atraer nuevos clientes.</span>
                </h3>
              }
              year="Paso 3 - Desarrollo"
              className="bg-[#FFBD59]"
            />
          </motion.div>
        </div>
      </div>

      <div className="right lg:w-[30%] flex flex-col lg:items-center">
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={fade}>
          <h2 className="uppercase text-[1.5rem] lg:text-[3rem] font-semibold w-full leading-[3rem] mb-4">
            Renovación y Creación
          </h2>
          <p className="text-[#929294] font-medium text-[90%] lg:text-base">
            Transformamos tu negocio adaptándonos a tu vision, los valores y el branding de tu marca.
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 1,
            y: 100,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              delay: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="h-full"
        >
          <SelectedWork
            title={
              <h4 className="text-[1.1rem] text-white lg:text-[1.1rem] font-regular w-full">
                Agenda una reunión de 30 minutos para que podamos conocer tu empresa, ver si podemos ayudarte y definir un posible proyecto.

              </h4>
            }
            year="Paso 01 - Kick Off"
            className=" bg-[#FFBD59] lg:w-[300px] mt-8"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default SelectedWorks;
