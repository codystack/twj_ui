import cancel from "../../../../../assets/dashboard_img/profile/cancel.svg";
import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
import back from "../../../../../assets/dashboard_img/Expand_left_light.svg";
// import { giftCardsData } from "../gitcardComponent/AvailableGiftCards";

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const BuyUniqueGiftCard = ({ onBack, onClose }: Omit<ModalProps, "onNext">) => {
  const {
    selectedGiftCardId,
    // totalAmount,
    allCards,
    count,
    formData,
    setCount,
    // setTotalAmount,
    // updateFormData,
    clearFormData,
  } = useGiftCardStore();

  const selectedCard = allCards.find(
    (card) => card.productId.toString() === selectedGiftCardId
  );

  if (!selectedCard)
    return <p className="text-red-500">Gift card not found.</p>;

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center pt-6 border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
        <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
          Gift Cards
        </h3>
        <button
          className="cursor-pointer"
          onClick={() => {
            setCount(1);
            clearFormData();
            onClose();
          }}
        >
          <img src={cancel} alt="" />
        </button>
      </div>

      <button
        className="flex pl-[1rem] cursor-pointer items-center mb-[1.5rem] justify-center bg-white "
        onClick={onBack}
      >
        <img src={back} alt="" />
        <p> Back</p>
      </button>

      <div className="grid grid-cols-5 mt-[2rem] px-[1rem] gap-4 ">
        <div className="col-span-2 ">
          <img
            src={selectedCard.logoUrls[0]}
            alt={selectedCard.productName}
            className="w-full rounded-[10px] max-w-full object-contain"
          />
        </div>

        <div className="col-span-3 ">
          <h2 className="text-[30px] text-left mt-[-10px] font-bold text-black">
            {selectedCard.productName}
          </h2>

          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">
              Recepient Email:
            </p>
            <p className="text-[#27014F]">{formData.email}</p>
          </div>

          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">
              Recepient Phone:
            </p>
            <p className="text-[#27014F]">{formData.phoneNumber}</p>
          </div>

          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">Sender:</p>
            <p className="text-[#27014F]">{formData.name}</p>
          </div>

          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">
              Unit Price:
            </p>
            <p className="text-[#27014F]">N 0.0</p>
          </div>
          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">Quatity:</p>
            <p className="text-[#27014F]">{count}</p>
          </div>
          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">Subtotal:</p>
            <p className="text-[#27014F]">1</p>
          </div>
          <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
            <p className="text-[#7688B4] text-left tracking-[1px]">Fee:</p>
            <p className="text-[#27014F]">1</p>
          </div>
        </div>
      </div>

      {/* <div>{totalAmount > 0 ? totalAmount : formData.amount}</div> */}

      <div className="border-b border-b-[#E2E8F0] mx-[1rem] pt-[2rem]"></div>

      <div className="flex items-center justify-between w-full px-[2rem] mb-[2rem]">
        <div className="flex items-center text-[24px]">
          <p className="text-[#7688B4] text-left tracking-[1px]">Total:</p>
          <p className="text-[#27014F]">₦ 323,000</p>
        </div>
        <button
          onClick={onClose}
          className="bg-[#8003A9] cursor-pointer text-white px-18 py-3.5 rounded-[5px]"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BuyUniqueGiftCard;
