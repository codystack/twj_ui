const Rates = () => {
  return (
    <div className="w-[80%] overflow-hidden  ml-[250px] h-[100] mr-[2rem] mt-[5rem]  rounded-tl-[30px]   bg-[#fff] text-center">
      <div className="text-[30px] h-[1212px] font-bold">
        <iframe
          src="https://rates.twjhub.com"
          className="w-full h-full border-none"
          title="External Rates"
        />
      </div>
    </div>
  );
};

export default Rates;
