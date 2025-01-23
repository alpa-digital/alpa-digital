import { Link } from "react-scroll";
import Logo from "../../assets/images/alpa-logo-white.png";
import FooterLink from "../../components/FooterLink/FooterLink";

const Footer = () => {
  return (
    <div data-scroll-section>
      <footer className="pb-[4rem] lg:w-[90%] max-w-[1200px] m-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between mt-[4rem]">
          {/* Left */}
          <div className="md:w-[40%]">
            <h2 className="uppercase text-[1.5rem] lg:text-[3rem] font-semibold lg:w-[70%] leading-[3rem] text-[#e5e5e5]">
              Contacto
            </h2>
            <Link to="home" className="cursor-pointer">
              <img src={Logo} alt="Logo" className="h-[25px] my-4" />
            </Link>
            <p className="text-[#929294] font-medium mb-8 lg:text-base text-[90%]"></p>
            <FooterLink text="Todos los derechos reservados. ALPA. ©" />
          </div>

          {/* Right */}
          <div className="md:w-[40%] flex flex-col justify-between">
            <FooterLink text="Email" handle="info@alpa.digital" />
            <FooterLink text="Instagram" handle="@alpadigitalstudio" />
            <FooterLink text="LinkedIn" handle="@alpadigitalstudio" />
          </div>
        </div>
      </footer>
      <div className="arch w-[100%] h-4 bg-slate-200 rounded-t-xl" />
    </div>
  );
};

export default Footer;
