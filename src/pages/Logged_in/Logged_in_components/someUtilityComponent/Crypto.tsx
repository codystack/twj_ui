import { NavLink } from "react-router";
import CryptoBG from "../../../../assets/dashboard_img/crptobg.svg";
import crypto from "../../../../assets/dashboard_img/dashboard_icons/akar-icons_bitcoin-fill.svg";

const Crypto = () => {
  return (
    <>
      <NavLink
        to="/crypto"
        type="button"
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] sm:min-w-[252px] min-w-[152px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={crypto} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
          Crypto
        </p>
        <img src={CryptoBG} className="absolute  right-0" alt="" />
      </NavLink>
    </>
  );
};

export default Crypto;
