import inward from "../../../../../assets/dashboard_img/BigCredit.svg";

const BuyGiftCard = () => {
  return (
    <button className=" h-[156px] w-[291px] border    border-[#F2F4FC]  transition duration-300 rounded-[10px]  cursor-pointer   hover:border relative   bg-[#F2F4FC] hover:border-[#326CF6]  flex flex-col items-start ">
      <div className="p-5">
        <img src={inward} alt="" />

        <h5 className="text-[#27014F] pt-3.5 text-left font-bold text-[15px]">
          Buy Gift Cards
        </h5>
        <p className="text-[13.5px] leading-[1.1rem] pt-1 text-left text-[#0A2E65]">
          Buy local and international gift cards easily and instantly on TWJHub.
        </p>
      </div>
    </button>
  );
};

export default BuyGiftCard;
