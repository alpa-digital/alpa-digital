import React from "react";
import Logo from "../../assets/images/alpa-logo2.png";
import { Link } from "react-scroll";

const Navbar = () => {
	return (
		<div className='bg-[#f1f1f1] relative z-10'>
			<div className='flex flex-row justify-between items-center py-4 px-4 lg:px-8 pb-4 lg:pb-8 border-b border-[#dddddd] max-w-[1200px] m-auto'>
				<Link to='home' className='cursor-pointer'>
					<img src={Logo} alt='Logo' className='h-[35px] mt-2' />
				</Link>
				<a
					href="https://cal.com/alpa-digital-studio"
					target="_blank"
					className='cursor-pointer bg-[#FFBD59] text-white rounded-lg font-medium text-[60%] lg:text-[0.80rem] pl-[16px] pr-[16px] pt-[8px] pb-[8px] hidden md:flex'>
					Hablemos
				</a>
			</div>
		</div>
	);
};

export default Navbar;
