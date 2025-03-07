
import { useState, useRef } from "react";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";

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

  // Handle Next Button Click
  const handleNextStep = () => {
    if (step === 1) {
      setOtp(Array(4).fill("")); // Reset input fields
      setStep(2); // Move to new PIN step
    } else {
      // Handle PIN Change Logic Here
      console.log("PIN Changed Successfully!");
      closeChangePinModal();
    }
  };

  return (
    <>
      {changePinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20 bg-opacity-50">
          <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white text-[#27014F] w-[600px] p-6 rounded-[20px] ">
              <div className="flex justify-between border-b-[#A4A4A4]/20 border-b pb-[1rem] items-center">
                <h2 className="text-xl font-semibold text-center">
                  {step === 1 ? "Change PIN" : "Set New PIN"}
                </h2>
                <button
                  className="cursor-pointer mr-[10px] p-[10px]"
                  onClick={closeChangePinModal}
                >
                  <img src={Cancel} alt="Close" />
                </button>
              </div>

              <p className="ml-[6rem] text-[#8A95BF] pt-[1rem]">
                {step === 1
                  ? "Enter your old TWJ PIN"
                  : "Enter your new TWJ PIN"}
              </p>

              {/* OTP Inputs */}
              <div className="flex justify-center mt-[2rem] gap-10">
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
                <div className="flex items-center justify-center mt-[10px]">
                  <p>Forgot Pin?</p>
                  <button className="text-[#8003A9] ml-[3px] cursor-pointer">
                    Reset Your Pin
                  </button>
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
                  {step === 1 ? "Next" : "Change PIN"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OtpModal;
