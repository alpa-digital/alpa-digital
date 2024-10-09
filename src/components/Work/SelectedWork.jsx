const SelectedWork = ({ title, subtitle, year, className, rotate }) => {
  return (
    <div className={`text-[#1d1d1d] p-8 rounded-[2rem] w-[100%] ${className} `}>
      {/* <div className={`${rotate && "-rotate-90 flex flex-col justify-center items-center w-full h-full"}`}> */}
      <div
        className={`${
          rotate && "rotate-0 lg:-rotate-90 lg:grid lg:grid-rows-2 justify-end w-full h-fit"
        }`}
      >
        
        <div className={`flex justify-start w-full`}>
          <span className="text-[1.3rem] text-white lg:text-[1.3rem] font-semibold text-left mb-2">
            {year}
          </span>
        </div>
        {title}
      </div>
    </div>
  );
};

export default SelectedWork;
