import Lines from "../../assets/dashboard_img/Polygon.svg";
import eye_lines from "../../assets/dashboard_img/eye_covered.svg";
import eye from "../../assets/dashboard_img/Eye_open_white.svg";
import virtualCard from "../../assets/dashboard_img/virtualcardxx 1.svg";
import ArrowUp from "../../assets/dashboard_img/Arrow_up.svg";
import ArrowDown from "../../assets/dashboard_img/Arrow_down.svg";
import { useEffect, useState } from "react";
import Betting from "./Logged_in_components/someUtilityComponent/Betting";
import CableTv from "./Logged_in_components/someUtilityComponent/CableTv";
import Electricity from "./Logged_in_components/someUtilityComponent/Electricity";
import Data from "./Logged_in_components/someUtilityComponent/Data";
import Airtime from "./Logged_in_components/someUtilityComponent/Airtime";
import Crypto from "./Logged_in_components/someUtilityComponent/Crypto";
import GiftCard from "./Logged_in_components/someUtilityComponent/GiftCard";
import Support from "./Logged_in_components/someUtilityComponent/Support";
import ErrorBoundary from "../../components/error/ErrorBoundry";
import RouteChangeHandler from "../../components/RouteChangeHandler";
import { useLocation } from "react-router-dom";
import cancel from "../../assets/dashboard_img/profile/cancel.svg";
import { useUserStore } from "../../store/useUserStore";
import copyImg from "../../assets/dashboard_img/withdrawal-copy-.svg";
import bankImg from "../../assets/dashboard_img/withdrawal_bank-icon.svg";

const Dashboard = () => {
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const { user, fetchUser } = useUserStore();
  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const openModal = () => {
    const completeKyc = localStorage.getItem("kycComplete");

    if (completeKyc === "true") {
      setShowWithdrawalModal(true);
      setShowKycModal(false);
    } else {
      setShowWithdrawalModal(false);
      setShowKycModal(true);
    }
  };

  useEffect(() => {
    fetchUser();
    const timeout = setTimeout(() => {
      const kycComplete = localStorage.getItem("kycComplete");
      if (kycComplete !== "true" && location.pathname === "/dashboard") {
        setShowKycModal(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white p-6 rounded-2xl  w-[600px] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="px-4 py-2 mr-[5px] cursor-pointer "
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex flex-col items-center ">
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <div className="mt-5 mb-2 ">
                    <span className="  rounded-full flex justify-center flex-col items-center p-[2px]">
                      <img
                        src={bankImg}
                        className="w-[3.5rem]"
                        alt="Alarm Icon"
                      />
                      <h4 className="text-[#27014F] font-semibold mt-[1rem] text-[24px] ">
                        Account Top-up
                      </h4>
                      <p className="text-[#0A2E65]/60 tracking-[1px]  leading-[1.5rem]  mb-6">
                        Transfer money to your virtual account wallet
                        <br /> using the account number below.
                      </p>
                    </span>
                  </div>
                  {/* <div className="flex w-full justify-center gap-4">
                  <button
                    onClick={() => {
                      // setProceedToSetPin(true);
                      // closeModal();
                    }}
                    className="bg-[#8003A9] text-white px-4 w-full text-[18px] py-2 mb-[2rem]  ease-in-out duration-300 cursor-pointer rounded-[5px]  hover:bg-[#8003A9]/90 transition"
                  >
                    Setup PIN
                  </button>
                </div> */}
                </div>

                <div className="w-[80%]">
                  <div className="text-[#022B69] w-full flex justify-between   ">
                    <p>Account Name</p>
                    <p> TWJHUB/ADEMOLA DONALD</p>
                  </div>
                  <div className="text-[#022B69] mt-[10px] w-full flex justify-between   ">
                    <p>Account Number</p>
                    <div className="flex items-center justify-center text-[#8003A9]">
                      <p> 992178539810</p>
                      <img src={copyImg} alt="" />
                    </div>
                  </div>
                  <div className="text-[#022B69] mt-[10px] mb-[2rem] w-full flex justify-between   ">
                    <p>Bank Name</p>
                    <p> Palmpay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKycModal && (
        <RouteChangeHandler
          isVisible={showKycModal}
          onClose={() => {
            setShowKycModal(false);
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
        <div className="flex-1 overflow-y-auto pb-[1.5rem] px-[1rem]">
          <div className="h-[2rem] bg-[white] w-[78%] fixed z-20 "></div>
          <div className=" ml-[2%] py-[2.3%] bg-[#fff]  ">
            <div className="flex gap-[1.5rem] mt-[1rem]">
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
                        {isHidden
                          ? "*******"
                          : user?.accountBalance?.toLocaleString()}
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
                    <button
                      // onClick={openModal}
                      className="bg-[#FF3366] relative cursor-pointer text-left text-[#fff] text-[12px] py-[1rem] pr-[2.5rem] w-fit  pl-[5px] rounded-r-[40px] m"
                    >
                      <p> WITHDRAW </p>
                      <img
                        className="absolute right-[1rem] bottom-[10px]"
                        src={ArrowUp}
                        alt=""
                      />
                    </button>
                    <button
                      onClick={openModal}
                      className="bg-[#32A071] relative text-left cursor-pointer text-[#fff] text-[12px] p-[1rem] pl-[5px] rounded-r-[40px]"
                    >
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
                <Crypto />
                <GiftCard />
                <Airtime />
                <Data />
                <ErrorBoundary>
                  <Electricity />
                </ErrorBoundary>

                <CableTv />
                <Betting />
                <Support />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
