import Lines from "../../assets/dashboard_img/Polygon.svg";
import crypto from "../../assets/dashboard_img/dashboard_icons/akar-icons_bitcoin-fill.svg";
import Giftcard from "../../assets/dashboard_img/dashboard_icons/fluent_gift-card-20-filled.svg";
import Airtime from "../../assets/dashboard_img/dashboard_icons/ic_round-phone-iphone.svg";
import Data from "../../assets/dashboard_img/dashboard_icons/ooui_network.svg";
import Bulb from "../../assets/dashboard_img/dashboard_icons/ion_bulb-sharp.svg";
import TV from "../../assets/dashboard_img/dashboard_icons/wpf_retro-tv.svg";
import Casino from "../../assets/dashboard_img/dashboard_icons/maki_casino.svg";
import Support from "../../assets/dashboard_img/dashboard_icons/bx_support.svg";
import eye_lines from "../../assets/dashboard_img/eye_covered.svg";
import eye from "../../assets/dashboard_img/Eye_open_white.svg";
import virtualCard from "../../assets/dashboard_img/virtualcardxx 1.svg";
import ArrowUp from "../../assets/dashboard_img/Arrow_up.svg";
import ArrowDown from "../../assets/dashboard_img/Arrow_down.svg";
import CryptoBG from "../../assets/dashboard_img/crptobg.svg";
import giftcardsbg from "../../assets/dashboard_img/giftcardbg.svg";
import airtimebg from "../../assets/dashboard_img/airtimebg.svg";
import dataBg from "../../assets/dashboard_img/databg.svg";
import Bulbbg from "../../assets/dashboard_img/Bulbbg.svg";
import Tvbg from "../../assets/dashboard_img/tvbg.svg";
import Casinobg from "../../assets/dashboard_img/casinobg.svg";
import Supportbg from "../../assets/dashboard_img/supportbg.svg";
import { useState } from "react";
// import { data } from "react-router"; comment
const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto py-[1.5rem] px-[1rem]">
        <div className=" ">
          <div className="flex gap-[1.5rem]">
            <div className="flex ">



              <div className="w-[505px] relative h-[253px] bg-[#27014F] rounded-[10px] flex items-center justify-center">
                <img
                  src={Lines}
                  className="absolute h-[110%] w-full top-0 left-0"
                  alt=""
                />
                <div className="flex flex-col items-center text-[#fff]">
                  <p className="text-[20px] leading-[rem]">Wallet Balance</p>
                  <div className=" relative flex items-center gap-2">
                    <span className=" mb-[8px] mr-[-5px] text-[16px]">
                      {isHidden ? "" : " ₦"}
                    </span>
                    <p className="text-[32px] font-semibold">
                      {isHidden ? "*******" : "1,550,000"}
                    </p>
                    <span className="text-[16px] mt-[12px] ml-[-7px] ">
                      {isHidden ? "" : ".00"}
                    </span>
                    <button
                      onClick={toggleVisibility}
                      className=" ml-[2px] cursor-pointer "
                    >
                      {isHidden ? (
                        <img
                          src={eye_lines}
                          className=" top-[1.5px]  left-[2px]"
                          alt=""
                        />
                      ) : (
                        <img src={eye} className="w-full h-full" alt="" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className=" flex flex-col  w-[8rem] gap-[1rem] rounded-[10px]">
                  <button className="bg-[#FF3366] relative cursor-pointer text-left text-[#fff] text-[12px] py-[1rem] pr-[2.5rem] w-fit  pl-[5px] rounded-r-[40px] m">
                    <p> WITHDRAW </p>
                    <img
                      className="absolute right-[1rem] bottom-[10px]"
                      src={ArrowUp}
                      alt=""
                    />
                  </button>
                  <button className="bg-[#32A071] relative text-left cursor-pointer text-[#fff] text-[12px] p-[1rem] pl-[5px] rounded-r-[40px]">
                    <p> TOP UP WALLET</p>
                    <img
                      className="absolute right-[7px] bottom-[12px]"
                      src={ArrowDown}
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative w-[423px] h-[253] bg-[#FBEEFF] rounded-[10px] ">
              <div className=" pt-[1.5rem] pl-[1.5rem]">
                <div className="flex  items-center">
                  <h5 className="font-bold text-[24px] mr-[5px]">
                    Virtual Card
                  </h5>
                  <div className="bg-[#FF3366]/20 px-[5px] py-[1px] h-fit rounded-[2px] text-[8px] text-[#FF3366]">
                    COMING SOON
                  </div>
                </div>

                <p className="text-left text-[#27014F] leading-[13px] tracking-normal text-[11px]">
                  Avoid card transaction failures. Use the <br /> TWJ Virtual
                  USD Card for smooth, relaible <br /> payments on your
                  favourite platforms.
                </p>
              </div>
              <img
                src={virtualCard}
                className=" absolute bottom-0 rounded-bl-[10px]  rounded-br-[10px]"
                alt=""
              />
            </div>
          </div>

          <div className=" flex w-full mt-[3rem]  justify-start">
            <div className="grid grid-cols-4 grid-rows-2 gap-[1rem] ">
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={crypto} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Crypto
                </p>
                <img src={CryptoBG} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Giftcard} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
                  Gift Cards
                </p>
                <img src={giftcardsbg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Airtime} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Airtime
                </p>
                <img src={airtimebg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Data} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Data
                </p>
                <img src={dataBg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Bulb} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Electricity
                </p>
                <img src={Bulbbg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={TV} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Cable TV
                </p>
                <img src={Tvbg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Casino} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                  Betting
                </p>
                <img src={Casinobg} className="absolute right-0" alt="" />
              </button>
              <button className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]">
                <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                  <img src={Support} alt="" />
                </div>
                <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
                  Support
                </p>
                <img src={Supportbg} className="absolute right-0" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
