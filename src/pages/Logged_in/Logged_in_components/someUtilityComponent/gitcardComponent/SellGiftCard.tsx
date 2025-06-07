
import outward from "../../../../../assets/dashboard_img/BigDebit.svg";

const SellGiftCard = () => {
    return (
        <button className=" sm:h-[156px] h-[200px] min-w-[291px] border    border-[#F2F4FC]  transition duration-300 rounded-[10px]  cursor-pointer   hover:border relative   bg-[#F2F4FC] hover:border-[#326CF6]  flex flex-col items-start ">
        <div className="p-5">
          <img className="w-[3.5rem] sm:w-[2rem]" src={outward} alt="" />

          <h5 className="text-[#27014F] sm:mt-0 mt-5 pt-3.5 text-left font-bold sm:text-[15px] text-[17px]">
            Sell Gift Cards
          </h5>
          <p className="sm:text-[13.5px] text-[15px] leading-[1.1rem] pt-1 text-left text-[#0A2E65]">
            Sell local and international gift cards easily and
            instantly on TWJHub.
          </p>
        </div>
      </button>
    )
}

export default SellGiftCard;