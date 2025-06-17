import { useEffect, useState } from "react";
import airtimebg from "../../../../assets/dashboard_img/airtimebg.svg";
import Airtimeimg from "../../../../assets/dashboard_img/dashboard_icons/ic_round-phone-iphone.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import MTN from "../../../../assets/dashboard_img/profile/MTN-icon 1.svg";
import ninemobile from "../../../../assets/dashboard_img/profile/9mobile-icon 1.svg";
import gloo from "../../../../assets/dashboard_img/profile/glo-icon 1.svg";
import airtel from "../../../../assets/dashboard_img/profile/airtel-icon 1.svg";
import Button from "../../../../components/Button";
import PinModal from "./PinModal";
import SetPinModal from "./SetPinModal";
import SuccessModal from "../../SuccessModal.tsx";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import alarmIcon from "../../../../assets/dashboard_img/profile/Alarm_duotone.svg";
import api from "../../../../services/api";
import RouteChangeHandler from "../../../../components/RouteChangeHandler.tsx";
import { useUserStore } from "../../../../store/useUserStore.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Airtime = () => {
  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    network: "",
    amount: "",
    recipient: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    recipient: "",
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [proceedToSetPin, setProceedToSetPin] = useState(false); // State to track if the user should proceed to set a PIN
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [showKycPrompt, setShowKycPrompt] = useState(false);
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);

  const images = [
    { id: "mtn", src: MTN, alt: "MTN" },
    { id: "glo", src: gloo, alt: "Glo" },
    { id: "airtel", src: airtel, alt: "Airtel" },
    { id: "9mobile", src: ninemobile, alt: "9Mobile" },
  ];

  const isPasscodeSet = () => localStorage.getItem("passcodeSet") === "true";

  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = "";
    switch (name) {
      case "amount":
        if (!value) {
          error = "Please enter a valid amount";
        } else if (isNaN(Number(value))) {
          error = "Amount must be a number";
        } else if (Number(value) < 100) {
          error = "Amount must be greater than ₦100";
        }
        break;

      case "recipient":
        if (!value) {
          error = "Phone number is required";
        } else if (
          typeof value === "string" &&
          (value.length < 11 || value.length > 11)
        ) {
          error = "Invalid phone number. Must be exactly 11 digits.";
        }
        break;

      default:
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error, // Update only the specific field
    }));

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  const handleAmountClick = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
    setSelectedAmount(amount);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const openModal = () => {
    const completeKyc = localStorage.getItem("kycComplete");

    if (completeKyc === "true") {
      setIsModalOpen(true);
      setShowKycPrompt(false);
    } else {
      setIsModalOpen(false);
      setShowKycPrompt(true);
    }
  };

  const closeModal = () => {
    setErrors({ amount: "", recipient: "" });
    setActiveImage(null);
    setIsModalOpen(false);
    setSelectedAmount(null);
  };

  useEffect(() => {
    if (isModalOpen === true) {
      setFormData({
        network: "",
        amount: "",
        recipient: "",
      });
    }
  }, [isModalOpen]);

  const setImage = (imageId: string) => {
    setActiveImage(imageId);
    setFormData((prevData) => ({
      ...prevData,
      network: imageId,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();

    setTimeout(() => {
      setShowPinModal(true);
      setShouldCheckPasscode(true);
      setProceedToSetPin(false);
    }, 200);
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          // Proceed with Airtime Purchase
          const { network, amount, recipient } = formData;

          const purchaseResponse = await api.post(
            `${BASE_URL}/BillsPayment/purchaseAirtime`,
            {
              network: network,
              amount: Number(amount),
              recipient: recipient,
            }
          );

          if (!purchaseResponse.data.isSuccessful) {
            throw new Error(
              purchaseResponse.data.message || "An error occurred"
            );
          }
          setIsSuccessModal(true);
          resolve();
        } catch (e) {
          reject(e);
        }
      })();
    });

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.network ||
    !formData.recipient;

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={Airtimeimg} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
          Airtime
        </p>
        <img src={airtimebg} className="absolute right-0" alt="" />
      </button>

      {showKycPrompt && (
        <RouteChangeHandler
          isVisible={showKycPrompt}
          onClose={() => {
            setShowKycPrompt(false);
          }}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white overflow-y-auto sm:w-[600px] w-[100vw] sm:h-auto h-[min(100dvh,100vh)] max-h-screen   z-[50]   py-6 px-4 sm:rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center   border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="sm:text-[17px] text-[20px] tracking-[1px]  text-[#27014F] ">
                  Airtime Purchase
                </h3>
                <button className="cursor-pointer " onClick={closeModal}>
                  <img className="sm:w-4 w-5" src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center mt-[1.5rem] items-center">
                <div className="sm:w-[65%] w-full">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit}>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left sm:mt-[10px] mt-[16px] ">
                      Choose Network
                    </p>
                    <div className="flex items-center justify-around p-2 rounded-[5px] border border-[#D0DAE6]">
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className={` rounded-full cursor-pointer ${
                            activeImage === image.id
                              ? "border-3 border-[#9605C5]"
                              : "border-transparent"
                          }`}
                          onClick={() => setImage(image.id)}
                        >
                          <img src={image.src} alt={image.alt} />
                        </div>
                      ))}
                    </div>

                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[16px] text-left sm:mt-[10px] mt-[20px] ">
                      Phone Number
                    </p>

                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="08153235634"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        onBlur={() =>
                          validateField("recipient", formData.recipient)
                        }
                        className={`p-4 px-3  border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                          errors?.recipient
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        }`}
                      />
                      {errors?.recipient && (
                        <p className="text-red-500 text-[13px] text-left">
                          {errors.recipient}
                        </p>
                      )}
                    </div>
                    <p className="text-[#0A2E65]/60 sm:mt-[10px] mt-[20px] pb-[3px] pl-[5px] text-[16px] text-left ">
                      Choose an amount
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {[100, 200, 500, 1000, 3000, 5000].map((amount) => (
                        <div
                          key={amount}
                          className={`py-[10px] cursor-pointer rounded-[5px] flex justify-center items-center transition-all duration-300 hover:scale-105
        ${
          selectedAmount === amount
            ? "bg-[#F2F4FC] border border-[#326CF6] text-[#27014F] "
            : "text-[#A4A4A4] border border-[#A4A4A4]"
        }`}
                          onClick={() => handleAmountClick(amount)}
                        >
                          <span>₦{amount}</span>
                        </div>
                      ))}
                    </div>

                    <div className="sm:mt-[10px] mt-[20px] flex justify-between items-center">
                      <p className="text-[#0A2E65]/60 pl-[5px] text-[16px] pb-[3px] text-left">
                        Amount
                      </p>
                      <div className="flex items-center px-[5px] text-[16px]">
                        <span className="text-[#0A2E65] mr-[2px]">
                          Balance:
                        </span>
                        <span className="text-[#0A2E65]/60">₦</span>
                        <span className="text-[#0A2E65]/60">
                          {user?.accountBalance.toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>

                    <div className="w-full mb-4">
                      <input
                        type="text"
                        placeholder="₦0.00"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        onBlur={() => validateField("amount", formData.amount)}
                        className={`p-4 px-3  border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                          errors.amount
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        }`}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-[13px] text-left">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div className="w-full sm:mt-[1.5rem] mt-[2.5rem]  mb-[2rem]">
                      <Button type="submit" isDisabled={isFormInvalid}>
                        Buy Airtime
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPinModal && isPasscodeSet() && (
        <PinModal
          onClose={() => {
            setShowPinModal(false);
            closeModal();
          }}
          onVerify={onVerify}
        />
      )}

      {/* Inline Info Modal (before SetPinModal) */}
      {showPinModal &&
        shouldCheckPasscode &&
        !isPasscodeSet() &&
        !proceedToSetPin && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl  w-[500px] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 mr-[5px] cursor-pointer "
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex flex-col items-center mt-4">
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <div className="my-5">
                    <span className="bg-[#FF3366]/15 rounded-full w-[5rem] h-[5rem] flex justify-center items-center p-[2px]">
                      <img
                        src={alarmIcon}
                        className="w-[3.5rem]"
                        alt="Alarm Icon"
                      />
                    </span>
                  </div>
                  <p className="text-[#0A2E65]/60 tracking-[1px] leading-[1.5rem] text-[20px] mb-6">
                    Setup transation PIN to complete transaction.
                  </p>
                  <div className="flex w-full justify-center gap-4">
                    <button
                      onClick={() => {
                        setProceedToSetPin(true);
                        closeModal();
                      }}
                      className="bg-[#8003A9] text-white px-4 w-full text-[18px] py-2 mb-[2rem]  ease-in-out duration-300 cursor-pointer rounded-[5px]  hover:bg-[#8003A9]/90 transition"
                    >
                      Setup PIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* After Proceed: Show SetPinModal */}
      {showPinModal && !isPasscodeSet() && proceedToSetPin && (
        <SetPinModal onClose={() => setShowPinModal(false)} />
      )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Recharged"
          message="Your airtime is on its way"
          onClose={() => {
            setIsSuccessModal(false);
            fetchUser();
          }}
        />
      )}
    </>
  );
};

export default Airtime;
