import Lines from "../../assets/dashboard_img/Polygon.svg";
import crypto from "../../assets/dashboard_img/dashboard_icons/akar-icons_bitcoin-fill.svg";
import Giftcard from "../../assets/dashboard_img/dashboard_icons/fluent_gift-card-20-filled.svg";
import Airtime from "../../assets/dashboard_img/dashboard_icons/ic_round-phone-iphone.svg";
import Data from "../../assets/dashboard_img/dashboard_icons/ooui_network.svg";
import Bulb from "../../assets/dashboard_img/dashboard_icons/ion_bulb-sharp.svg";
import TV from "../../assets/dashboard_img/dashboard_icons/wpf_retro-tv.svg";
import Casino from "../../assets/dashboard_img/dashboard_icons/maki_casino.svg";
import Support from "../../assets/dashboard_img/dashboard_icons/bx_support.svg";
import eye_lines from "../../assets/dashboard_img/cross.svg";
import eye from "../../assets/dashboard_img/View_hide_light (1).svg";
import { useState } from "react";
const Dashboard = () => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-[2rem]">
        <div className=" ">
          <div className="flex ">
            <div className="w-[505px] relative h-[253px] bg-[#8003A9] rounded-[10px] flex items-center justify-center">
              <img
                src={Lines}
                className="absolute h-[110%] w-full top-0 left-0"
                alt=""
              />
              <div className="flex flex-col items-center text-[#fff]">
                <p className="text-[20px] leading-[rem]">Wallet Balance</p>
                <div className=" relative flex items-center gap-2">
                  <span className=" absolute left-[-0.8rem] bottom-[1rem] text-[16px]">
                    {isHidden ? "" : " ₦"}
                  </span>
                  <p className="text-[32px]">
                    {isHidden ? "*******" : "1,550,000"}
                  </p>
                  <span className="text-[16px] absolute bottom-[5px] left-[9rem] ">
                    {isHidden ? "" : ".00"}
                  </span>
                  <button
                    onClick={toggleVisibility}
                    className="relative ml-[1.7rem] cursor-pointer "
                  >
                    <img src={eye} className="w-full h-full" alt="" />

                    {isHidden && (
                      <img
                        src={eye_lines}
                        className="absolute top-[1.5px]  left-[2px]"
                        alt=""
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className=" flex flex-col mt-[3rem] w-[8rem] gap-[1rem] rounded-[10px]">
              <button className="bg-[#FF3366] cursor-pointer text-left text-[#fff] text-[12px] p-[1rem] rounded-r-[40px] m">
                WITHDRAW
              </button>
              <button className="bg-[#32A071] text-left cursor-pointer text-[#fff] text-[12px] p-[1rem] rounded-r-[40px]">
                TOP UP WALLET
              </button>
            </div>
          </div>

          <div className=" flex w-[505px] mt-[3rem] justify-start">
            <div className="flex items-center gap-[2rem]">
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={crypto} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Crypto
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Giftcard} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Gift Cards
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Airtime} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Airtime
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Data} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Data
                </p>
              </button>
            </div>
          </div>
          <div className=" flex w-[505px] mt-[3rem] justify-start">
            <div className="flex items-center gap-[2rem]">
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Bulb} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Electricity
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={TV} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Cable TV
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Casino} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Betting
                </p>
              </button>
              <button className="cursor-pointer">
                <div className="bg-[#F8E0FF] p-[1rem] rounded-[10px]">
                  <img src={Support} alt="" />
                </div>
                <p className="text-[#0B203B] tracking-[0.6px] text-[13px] font-[600] mt-[5px]">
                  Support
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
