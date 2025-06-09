// import { useState } from "react";
import giftcardsbg from "../../../../assets/dashboard_img/giftcardbg.svg";
import Giftcard from "../../../../assets/dashboard_img/dashboard_icons/fluent_gift-card-20-filled.svg";
import { useState } from "react";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import BuyGiftCard from "./gitcardComponent/BuyGiftCard";
import SellGiftCard from "./gitcardComponent/SellGiftCard";
import AvailableGiftCards from "./gitcardComponent/AvailableGiftCards";
import UniqueGiftCard from "./gitcardComponent/UniqueGiftCard";
import BuyUniqueGiftCard from "./gitcardComponent/BuyUniqueGiftCard";

const GiftCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStack, setModalStack] = useState<string[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openNestedModal = (view: string) => {
    setModalStack((prev) => [...prev, view]);
    setIsModalOpen(false); // Close the outer modal
  };

  const goBack = () => setModalStack((prev) => prev.slice(0, -1));
  const closeNestedModal = () => setModalStack([]);

  const currentView = modalStack[modalStack.length - 1];

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] sm:min-w-[252px] min-w-[152px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={Giftcard} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
          Gift Cards
        </p>
        <img src={giftcardsbg} className="absolute right-0" alt="" />
      </button>
      {/* Main Modal */}

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white md:w-[750px] w-[100vw] md:h-auto h-[100vh]   z-[50]   p-6 md:rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Gift Cards
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img className="w-5 sm:w-4" src={cancel} alt="" />
                </button>
              </div>

              <div className=" block sm:flex  justify-center mt-[1.5rem] py-[2.5rem] gap-[20px] items-center">
                <div className="sm:mb-0 mb-8  ">
                  <BuyGiftCard
                    // onClose={closeNestedModal}
                    // onBack={goBack}
                    onOpenNestedModal={openNestedModal}
                  />
                </div>
                <SellGiftCard />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nested Modals */}
      {modalStack.length > 0 && (
        <Modal onClose={closeNestedModal}>
          {currentView === "giftcard" && (
            <AvailableGiftCards
              onNext={() => openNestedModal("UniqueGiftCard")}
              onClose={closeNestedModal}
              onBack={goBack}
            />
          )}
          {currentView === "UniqueGiftCard" && (
            <UniqueGiftCard
              onNext={() => openNestedModal("BuyUniqueGiftCard")}
              onClose={closeNestedModal}
              onBack={goBack}
            />
          )}
          {currentView === "BuyUniqueGiftCard" && (
            <BuyUniqueGiftCard onClose={closeNestedModal} onBack={goBack} />
          )}
        </Modal>
      )}
    </>
  );
};

export default GiftCard;

// Rendered compnents

type ModalWrapperProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ children }: ModalWrapperProps) => (
  <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
    <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
      <div className="bg-white overflow-y-aut  overflow-y-auto   md:w-[750px] w-[100vw] md:h-auto h-[100vh]      z-[50]   py-6 pt-0 md:rounded-[15px] shadow-lg flex flex-col">
        {children}
      </div>
    </div>
  </div>
);
