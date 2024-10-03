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
                <h3 className="text-[1.5rem] lg:text-[1.5rem] font-semibold uppercase w-[100%] break-all leading-[3rem]">
                  <span className="block">Transformación</span>
                  <span>digital para PYMEs</span>
                </h3>
              }
              year="02"
              className="bg-white"
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
                <h3 className="text-[1.5rem] lg:text-[1.5rem] font-semibold uppercase w-[100%] break-all leading-[3rem]">
                  <span className="block">Diseño, Marketing y</span>
                  <span>Software a medida</span>
                </h3>
              }
              year="03"
              className="bg-white"
            />
          </motion.div>
        </div>
      </div>

      <div className="right lg:w-[30%] flex flex-col lg:items-center">
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={fade}>
          <h2 className="uppercase text-[1.5rem] lg:text-[3rem] font-semibold w-full leading-[3rem] mb-4">
            Renovación y Creación
          </h2>
          <p className="text-[#929294] font-medium text-[80%] lg:text-base">
            Transformamos tu negocio adaptandonos a tu visión, los valores y el branding de tu marca.
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
              <h3 className="text-[1.5rem] lg:text-[1.5rem] font-semibold uppercase w-full">
                Creación de Startups y proyectos desde 0
              </h3>
            }
            year="01"
            className=" bg-[#fff] lg:w-[300px] mt-8 mb-12"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default SelectedWorks;
