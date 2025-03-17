import { useRef, useState } from "react";
import CrytoTransaction from "./Logged_in_components/CryptoTransaction";
import GiftCardTransaction from "./Logged_in_components/GiftcardTransaction";
import UtilityTransaction from "./Logged_in_components/UtilityBillsTransaction";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState<
    "crypto" | "gift_cards" | "utility_bills"
  >("crypto");

  const containerRef = useRef<HTMLDivElement | null>(null);


  const handleScrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  return (
    <div  ref={containerRef} className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff]  flex flex-col">
      <div className="flex-1 overflow-y-auto pb-4 px-4">
        <div className=" flex flex-col  ml-[2%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] fixed w-[76%]  z-20 bg-[#fff]  ">

          <div className="bg-[#F5F7FA]/99  backdrop-blur-lg  w-[calc(100%-63%)] bg-blur-md flex items-center rounded-[50px] justify-between p-[7px]">
            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                activeTab === "crypto"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent text-[#7688B4]"
              }`}
              onClick={() => setActiveTab("crypto")
                
              }
            >
              Crypto
            </button>

            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                activeTab === "gift_cards"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent  text-[#7688B4]"
              }`}
              onClick={() => setActiveTab("gift_cards")}
            >
              Gift Cards
            </button>

            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px]  ${
                activeTab === "utility_bills"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent  text-[#7688B4]"
              }`}
              
              onClick={() => {
                setActiveTab("utility_bills");
                handleScrollToTop();
              }}
    >
              Utility Bills
            </button>
          </div>
          </div>

          {/* Dynamic Content profile*/}
          <div className=" h-[100%]  mt-[10%] ">
            {activeTab === "crypto" && (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
                <CrytoTransaction />
              </div>
            )}

            {/* Dynamic Content Security*/}
            {activeTab === "gift_cards" && (
             <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
             <GiftCardTransaction />
           </div>
            )}
            {/* Dynamic Content Bank*/}
            {activeTab === "utility_bills" && (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
              <UtilityTransaction />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
