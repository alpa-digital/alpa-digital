import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const FooterLink = ({ text, handle, to }) => {
  if (to) {
    return (
      <Link to={to} className="flex text-[#929294] justify-between items-center border-b border-gray-600 py-3 font-semibold">
        <span className="uppercase">{text}</span>
        <div className="flex items-center">
          <p className="mr-2 font-normal lg:text-base text-[90%]">{handle}</p>
          <FiArrowUpRight size={20} />
        </div>
      </Link>
    );
  }

  return (
    <div className="flex text-[#929294] justify-between items-center border-b border-gray-600 py-3 font-semibold">
      <span className="uppercase">{text}</span>
      <div className="flex items-center">
        <p className="mr-2 font-normal lg:text-base text-[90%]">{handle}</p>
        <FiArrowUpRight size={20} />
      </div>
    </div>
  );
};

export default FooterLink;