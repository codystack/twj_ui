import { useState, useRef } from "react";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";
import api from "../../../services/api";
import { AxiosError } from "axios";
import SuccessModal from "../SuccessModal";

const OtpModal = ({
  changePinModal,
  closeChangePinModal,
}: {
  changePinModal: boolean;
  closeChangePinModal: () => void;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Enter Old PIN, Step 2: Enter New PIN
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [oldPin, setOldPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  // Handle input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[3]?.focus();
    }
  };

  // // Handle Close Modal Click
  // const handleCloseModal = () => {
  //   setOtp(Array(4).fill("")); // Clear OTP when closing the modal
  //   closeChangePinModal(); // Close the modal
  // };

  const handleCloseModal = () => {
    setOtp(Array(4).fill(""));
    setOldPin("");
    setStep(1); // Reset to Step 1
    closeChangePinModal();
    setError("");
  };

  const handleNextStep = async () => {
    setIsLoading(true);
    const enteredPin = otp.join("");
    
    if (step === 1) {
      setOldPin(enteredPin); // Save the old PIN
      setOtp(Array(4).fill("")); // Clear input for new PIN
      setStep(2); // Go to next step
      setIsLoading(false);
      return;
    } else {

      const newPin = enteredPin;

      try {
        const response = await api.put("/Authentication/changePin", {
          oldPin: oldPin,
          newPin: newPin,
        });

        // console.log("PIN Changed Successfully!", response.data);
        closeChangePinModal();
        handleCloseModal();
        setIsSuccessModal(true);
        setError("");
        setIsLoading(false);
        return response.data;
      } catch (e) {
        const error = e as AxiosError<{ message: string }> | Error;
        const errorMessage =
          ("response" in error && error.response?.data?.message) ||
          error.message ||
          "An error occurred. Please try again.";
        setIsLoading(false);
        setError(errorMessage);
        return;
      }
    }
  };

  return (
    <>
      {changePinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20 bg-opacity-50">
          <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white text-[#27014F] w-[600px] p-6 rounded-[20px] ">
              <div className="flex justify-between border-b-[#E2E8F0]  border-b pb-[1rem] items-center">
                <h2 className="text-xl  text-center">
                  {step === 1 ? "Change PIN" : "Set New PIN"}
                </h2>
                <button
                  className="cursor-pointer mr-[10px] p-[10px]"
                  onClick={() => {
                    closeChangePinModal();
                    handleCloseModal();
                  }}
                >
                  <img src={Cancel} alt="Close" />
                </button>
              </div>

              <p className="ml-[6rem] text-[#8A95BF] pt-[3rem]">
                {step === 1
                  ? "Enter your old TWJ PIN"
                  : "Enter your new TWJ PIN"}
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center mt-[1rem] gap-10">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onPaste={handleOtpPaste}
                    autoFocus={index === 0}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="focus:border-purple-800 w-15 h-15 font-semibold text-2xl text-center focus:border-2 outline-none border border-gray-400 rounded-md"
                  />
                ))}
              </div>

              {/* Forgot PIN - Only in Step 1 */}
              {step === 1 && (
                <div className="flex items-center justify-center mt-[2rem]">
                  <p>Forgot Pin?</p>
                  <button className="text-[#8003A9] ml-[3px] cursor-pointer">
                    Reset Your Pin
                  </button>
                </div>
              )}

              {error && (
                <div className="text-red-500 text-left ml-[6rem] mt-1">
                  {error}
                </div>
              )}
              {/* Buttons */}
              <div className="flex justify-center mt-[2rem] items-center">
                <button
                  className={`bg-[#9605C5] w-[70%] mb-[2rem] text-white p-3 rounded-[6px] ${
                    otp.some((digit) => digit === "")
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={otp.some((digit) => digit === "")}
                  onClick={handleNextStep}
                >
                  {step === 1 ? (
                    "Next"
                  ) : isLoading ? (
                    // Show spinner only when loading in step 2
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    "Change PIN"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuccessModal && (
        <SuccessModal
          title="PIN changed"
          message="You have successfully changed your TWJ PIN"
          onClose={() => {
            setIsSuccessModal(false);
            // fetchUser();
          }}
        />
      )}
    </>
  );
};

export default OtpModal;
