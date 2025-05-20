import cancel from "../../../../../assets/dashboard_img/profile/cancel.svg";
import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
import back from "../../../../../assets/dashboard_img/Expand_left_light.svg";
import { useState } from "react";
import api from "../../../../../services/api";
import { AxiosError } from "axios";
// import { use, useEffect } from "react";
// import { giftCardsData } from "../gitcardComponent/AvailableGiftCards";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const BuyUniqueGiftCard = ({ onBack, onClose }: Omit<ModalProps, "onNext">) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [isSuccessModal, setIsSuccessModal] = useState(false);
  const {
    selectedGiftCardId,
    // totalAmount,
    allCards,
    productIso,
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

  const key = Number(formData.amount).toFixed(1);
  const equivalentNairaValue =
    selectedCard.fixedRecipientToSenderDenominationsMap[key];

  const subToatal = equivalentNairaValue * count;
  const totalAmount = subToatal + allCards[0].senderFee;

  // useEffect(() => {
  //   console.log("Selected card:", formData.amount);
  //   console.log("Equivalent value:", equivalentValue);
  // }, []);

  const submitOrder = async () => {
    const { setShowSuccessModal } = useGiftCardStore.getState();
    console.log("Submitting orderid...", selectedGiftCardId);

    // const payload = {
    const payload = {
      preOrder: true,
      productId: selectedGiftCardId,
      quantity: count,
      recipientEmail: formData.email,
      phoneDetails: {
        countryCode: productIso,
        phoneNumber: formData.phoneNumber,
      },
      totalCharge: totalAmount,
      fee: allCards[0].senderFee,
      senderName: formData.name,
      nairaUnitPrice: equivalentNairaValue,
      unitPrice: Number(formData.amount),
      productAdditionalRequirements: {
        additionalProp1: "",
        additionalProp2: "",
        additionalProp3: "",
      },
    };

    // console.log("Payload:", payload);
    // return;

    try {
      setLoading(true);
      const res = await api.post(
        `${BASE_URL}/GiftCards/placeGiftCardOrder`,
        payload
      );
      console.log("Order submitted successfully:", res.data);
      onClose();
      clearFormData();
      // setIsSuccessModal(true)
      setShowSuccessModal(true);
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              <p className="text-[#27014F]">₦{equivalentNairaValue}</p>
            </div>
            <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
              <p className="text-[#7688B4] text-left tracking-[1px]">
                Quatity:
              </p>
              <p className="text-[#27014F]">{count}</p>
            </div>
            <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
              <p className="text-[#7688B4] text-left tracking-[1px]">
                Subtotal:
              </p>
              <p className="text-[#27014F]">
                ₦{Number(subToatal).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center tracking-[0.8px] text-[14px] gap-2 mt-4">
              <p className="text-[#7688B4] text-left tracking-[1px]">Fee:</p>
              <p className="text-[#27014F]">
                ₦{Number(allCards[0].senderFee).toLocaleString()}{" "}
              </p>
            </div>
          </div>
        </div>

        {/* <div>{totalAmount > 0 ? totalAmount : formData.amount}</div> */}
        {error && (
          <div className="text-red-500 text-[14px] text-left ml-[19.4rem] mt-[-0.9rem]">{error}</div>
        )}
        <div className="border-b border-b-[#E2E8F0] mx-[1rem] pt-[2rem]"></div>

        <div className="flex items-center justify-between w-full px-[2rem] mb-[2rem]">
          <div className="flex items-center text-[24px] gap-2">
            <p className="text-[#7688B4] text-left tracking-[1px]">Total:</p>
            <p className="text-[#27014F]">
              ₦{Number(totalAmount).toLocaleString()}
            </p>
          </div>
          <button
            disabled={loading}
            onClick={submitOrder}
            className={`px-18 py-3.5 rounded-[5px] text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#8003A9] cursor-pointer"
            }`}
          >
            {loading ? "Submitting..." : "Pay Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyUniqueGiftCard;
