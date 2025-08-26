import cancel from "../assets/dashboard_img/profile/cancel.svg";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useRef, useState } from "react";

type Props = {
  isVisible: boolean;
  loading?: boolean;
  errorMessage?: string;
  step: "start" | "code";
  onClose: () => void;
  onContinue?: () => void;
  onResend: () => void;
  onVerify: () => void;
  code?: string;
  onCodeChange: (value: string) => void;
};

export default function TwoFactorAuthModal({
  isVisible,
  step,
  loading,
  errorMessage,
  onClose,
  onResend,
  // onContinue,
  onVerify,
  //   code,
  onCodeChange,
}: Props) {
  if (!isVisible) return null;
  const [token, setToken] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Allow only digits
      const newOtp = [...token];
      newOtp[index] = value;
      setToken(newOtp);

      // Move to the next field automatically
      if (value && index < token.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle paste event
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setToken(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && token[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    onCodeChange(token.join(""));
  }, [token, onCodeChange]);

  const phoneNumber = useUserStore((state) => state.user?.phoneNumber);

  let masked = "";

  if (phoneNumber) {
    const digitsOnly = phoneNumber.replace(/\s+/g, "");

    if (digitsOnly.length >= 14) {
      // Format like +1234 8105063244
      const trimmed = digitsOnly.slice(4);
      masked = `${trimmed.slice(0, 3)}****${trimmed.slice(-3)}`;
    } else if (digitsOnly.length === 11) {
      // Format like 08105063244
      const trimmed = digitsOnly.slice(1);
      masked = `${trimmed.slice(0, 3)}****${trimmed.slice(-3)}`;
    }
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="rounded-[20px] bg-[#fff]/20 md:p-[0.8rem] w-full max-w-[600px]">
        <div className="bg-white rounded-[15px] w-full h-auto p-6 shadow-xl text-center">
          <div className="flex justify-between border-b border-b-[#E2E8F0] pb-2 items-center">
            <h2 className="text-xl  text-[#27014F] mb-2">Enter 2FA Code</h2>
            <div className="flex justify-end">
              <button className="cursor-pointer" onClick={onClose}>
                <img src={cancel} alt="" />
              </button>
            </div>
          </div>
          {/* This part is for the initial 2FA setup but no longer in use */}
          {/* {step === "start" && (
            <div className="px-[2rem]">
              <img src={TwoFALock} alt="" className="mx-auto mb-8 mt-6" />
              <h4 className="text-[#27014F]  text-center font-semibold text-[20px]">
                Protect Your Account with 2FA
              </h4>

              <p className="text-[#0A2E65]/60 py-[1rem] w-full text-center ">
                Your account's security matters, and passwords alone aren't
                enough anymore. Turning on two-factor authentication (2FA) adds
                a second layer of protection, making it much harder for anyone
                to gain unauthorized access.
              </p>

              <button
                disabled={loading}
                onClick={onContinue}
                className="bg-[#8003A9] cursor-pointer text-white w-full py-3 px-6 rounded-md"
              >
                {loading ? (
                  <div className="flex w-full  justify-center items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Activate 2FA"
                )}
              </button>

              <div className="flex justify-center items-center">
                <button
                  className="text-[15px] my-[1rem] text-[#FF3366] cursor-pointer "
                  onClick={onClose}
                >
                  Do this later
                </button>
              </div>
            </div>
          )} */}

          {step === "code" && (
            <>
              <p className="text-gray-500 mt-9 mb-12 ">
                Enter the code sent to +234 {masked}
              </p>

              {/* OTP Input Fields */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onVerify();
                }}
              >
                <div className="flex justify-center gap-[1rem] mx-[1rem] mt-[2rem]">
                  {token.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      id={`otp-${index}`}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onPaste={handleOtpPaste}
                      autoFocus={index === 0}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="focus:border-purple-800 md:w-[55px] w-[45px] h-[45px] md:h-[55px] font-semibold text-[32px] text-center focus:border-2 outline-none p-2.5 border border-[#A4A4A4] rounded-md"
                    />
                  ))}
                </div>
                <button
                  // onClick={onVerify}
                  type="submit"
                  disabled={token.some((digit) => digit === "" || loading)}
                  className={`bg-[#8003A9] text-white w-[80%] mt-[2rem] py-3 px-6 rounded-md ${
                    token.some((digit) => digit === "" || loading)
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <div className="flex w-full  justify-center items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Activate 2FA"
                  )}
                </button>
              </form>

              <div className="flex text-[14px] my-[1.5rem] justify-center items-center">
                <p className="text-[#0A2E65]/60 ">Didn't get any code?</p>
                <button
                  onClick={onResend}
                  className=" ml-1 cursor-pointer text-[#8003A9]"
                >
                  Resend Code
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
