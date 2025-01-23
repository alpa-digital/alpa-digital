import React from "react";
import { BiPlusMedical } from "react-icons/bi";

const Stats = () => {
	return (
		<>
			<div className='flex flex-wrap justify-center lg:flex-nowrap gap-8 md:justify-between items-center pb-[2rem] border-b border-gray-600 text-[#dadada]'>
				<div>
					<div className='flex items-start'>
						<p className='font-montserrat text-[3rem] lg:text-[5rem] font-bold'>
							20
						</p>
						<BiPlusMedical className='mt-[12px] text-[1.2rem] lg:text-[3rem] text-[#FFBD59]' />
					</div>
					<p className='lg:mt-[-20px] mt-[-10px] text-[70%] lg:text-[1rem] font-medium text-[#929294]'>
						Proyectos Exitosos
					</p>
				</div>
				<div>
					<div className='flex items-start'>
						<p className='font-montserrat text-[3rem] lg:text-[5rem] font-bold'>
							4
						</p>
						<BiPlusMedical className='mt-[12px] text-[1.2rem] lg:text-[3rem] text-[#FFBD59]' />
					</div>
					<p className='lg:mt-[-20px] mt-[-10px] text-[70%] lg:text-[1rem] font-medium text-[#929294]'>
						Años de Experiencia
					</p>
				</div>
				<div>
					<div className='flex items-start'>
						<p className='font-montserrat text-[3rem] lg:text-[5rem] font-bold'>
							10
						</p>
						<BiPlusMedical className='mt-[12px] text-[1.2rem] lg:text-[3rem] text-[#FFBD59]' />
					</div>
					<p className='lg:mt-[-20px] mt-[-10px] text-[70%] lg:text-[1rem] font-medium text-[#929294]'>
						Clientes Satisfechos
					</p>
				</div>
				<div className='hidden lg:block'>
					<p className='text-[1rem] text-[#929294]'>
						Conecta con nosotros y obtén una estrategia de transformación digital personalizada. 
						Hacemos que la innovación tecnológica sea accesible para tu PYME.
					</p>
				</div>
			</div>
			<div className='flex flex-wrap justify-center gap-4 md:gap-0 lg:flex-nowrap items-center md:justify-between py-[1rem] border-b border-gray-600'>
				<p className='text-[1.2rem] lg:text-[2rem] uppercase'>Software Factory</p>
				<div className='bg-[#353535] hidden md:block h-[10px] w-[10px] lg:h-[20px] lg:w-[20px] rounded-[50%]'></div>
				<p className='text-[1.2rem] lg:text-[2rem] uppercase'>
					Diseño
				</p>
				<div className='bg-[#353535] hidden md:block h-[10px] w-[10px] lg:h-[20px] lg:w-[20px] rounded-[50%]'></div>
				<p className='text-[1.2rem] lg:text-[2rem] uppercase'>Marketing</p>
			</div>
		</>
	);
};

export default Stats;
