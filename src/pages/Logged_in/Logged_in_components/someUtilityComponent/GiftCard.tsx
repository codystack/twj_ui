// import { useState } from "react";
import giftcardsbg from "../../../../assets/dashboard_img/giftcardbg.svg";
import Giftcard from "../../../../assets/dashboard_img/dashboard_icons/fluent_gift-card-20-filled.svg";
import { useState } from "react";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import BuyGiftCard from "./gitcardComponent/BuyGiftCard";
import SellGiftCard from "./gitcardComponent/SellGiftCard";

const GiftCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={Giftcard} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
          Gift Cards
        </p>
        <img src={giftcardsbg} className="absolute right-0" alt="" />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white w-[750px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Gift Cards
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img src={cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center mt-[1.5rem] py-[2.5rem] gap-[20px] items-center">
               <BuyGiftCard/>
               <SellGiftCard/>
    
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GiftCard;
