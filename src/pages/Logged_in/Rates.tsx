const Rates = () => {
  return (


<div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
<div className="flex-1 overflow-y-auto p-4">
  Component for Dashboard
  {/* Simulating long content */}
  <div className="">
  <iframe
          src="https://rates.twjhub.com"
          className="w-full h-full border-none"
          title="External Rates"
        />
  </div>
</div>
</div>
  );
};

export default Rates;
