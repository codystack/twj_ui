import { useState, useEffect } from "react";
import Backspace from "../../../../assets/dashboard_img/profile/icon-park-solid_delete-two.svg";
import lock from "../../../../assets/dashboard_img/profile/Lock.svg";
// import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import api from "../../../../services/api";
import { useModalStore } from "../../../../store/modalStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SetPinModal = ({ onClose }: { onClose: () => void }) => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"enter" | "confirm">("enter"); // Track step

  // Handle number input and backspace
  const handleKeyPress = (value: string) => {
    if (step === "enter") {
      if (value === "del") {
        setPin((prev) => prev.slice(0, -1)); // Remove last digit
      } else if (pin.length < 4) {
        setPin((prev) => prev + value);
      }
    } else {
      // Confirm PIN step
      if (value === "del") {
        setConfirmPin((prev) => prev.slice(0, -1));
      } else if (confirmPin.length < 4) {
        setConfirmPin((prev) => prev + value);
      }
    }
  };

  // Move to confirmation step when first PIN is entered
  useEffect(() => {
    if (pin.length === 4) {
      setTimeout(() => setStep("confirm"), 300); // Delay for UX
    }
  }, [pin]);

  // Automatically check if PINs match
  useEffect(() => {
    if (confirmPin.length === 4) {
      if (confirmPin !== pin) {
        setError("PINs do not match. Try again.");

        // Reset after a delay
        setTimeout(() => {
          setConfirmPin("");
          setPin(""); // Reset PIN to empty
          setStep("enter"); // Reset to entering PIN step
        }, 1500);
      } else {
        validatePin();
      }
    }
  }, [confirmPin]);

  const validatePin = async () => {
    setLoading(true);
    try {
      const email = localStorage.getItem("email");

      const pinResponse = await api.post(
        `${BASE_URL}/Authentication/createPin`,
        {
          passCode: pin,
          email: email,
        }
      );

      // console.log(pinResponse);

      if (!pinResponse.data.isSuccessful) {
        setError("Invalid PIN. Please try again.");
        setTimeout(() => {
          setConfirmPin("");
          setPin("");
          setStep("enter");
        }, 1500);
        setLoading(false);
        return;
      }

      //Get Zustand functions
      const { setPasscodeSet, setSetPinModal, setSuccessModalStore } =
        useModalStore.getState();

      //Set passcode in Zustand and localStorage
      setPasscodeSet(true);
      setSuccessModalStore(true);
      setPin("");
      setConfirmPin("");
      setStep("enter");

      // Close SetPinModal only, keep showPinModal open if needed
      setSetPinModal(false);
      handleClose();
      setLoading(false);
      return;
    } catch (error: any) {
      setError(
        error.response?.data?.errors?.email ||
          "An error occurred. Please try again."
      );

      setTimeout(() => {
        setConfirmPin("");
        setPin("");
        setStep("enter");
      }, 1500);
    }

    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeyPress("del");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pin, confirmPin, step]);

  const handleClose = () => {
    setError("");
    setPin("");
    setConfirmPin("");
    setStep("enter");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
        <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
          <div className="bg-white sm:w-[600px] w-[100vw] sm:h-auto h-[100vh] overflow-y-auto sm:rounded-[10px]">
            <div className="flex flex-row-reverse">
              {/* <button
                className="px-4 py-2 mr-[5px] cursor-pointer mt-[1rem]"
                onClick={handleClose}
              >
                <img className="sm:w-4 w-5" src={cancel} alt="" />
              </button> */}
            </div>
            <div className="flex items-center justify-center">
              <div className="px-6 pt-4 rounded-lg w-[300px] flex flex-col mb-[2rem] items-center">
                <img src={lock} alt="" />
                <h2 className="text-[20px] font-semibold text-[#27014F] mt-4">
                  {step === "enter" ? "Set a new PIN code" : "Confirm your PIN"}
                </h2>
                <p className="text-[16px] text-[#3E4666] text-center mb-3 ">
                  {step === "enter"
                    ? "Enter a secure four-digit transaction PIN"
                    : "Re-enter your PIN to confirm"}
                </p>

                {/* PIN Input Fields */}
                <div className="flex justify-center gap-3 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-[10px] h-[10px]  rounded-md flex items-center justify-center text-lg font-bold
                     ${
                       step === "enter"
                         ? pin[i]
                           ? "bg-[#27014F]"
                           : "bg-gray-300"
                         : confirmPin[i]
                         ? "bg-[#27014F]"
                         : "bg-gray-300"
                     }`}
                    />
                  ))}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3">
                  {[..."123456789"].map((num) => (
                    <button
                      key={num}
                      className="w-16 h-16 bg-gray-200 text-lg cursor-pointer text-[#27014F] font-bold rounded-full hover:bg-gray-300"
                      onClick={() => handleKeyPress(num)}
                    >
                      {num}
                    </button>
                  ))}

                  {/* Empty Placeholder for Alignment */}
                  <div className="w-16 h-16"></div>

                  {/* "0" centered below 8 */}
                  <button
                    className="w-16 h-16 bg-gray-200 text-lg cursor-pointer text-[#27014F] font-bold rounded-full hover:bg-gray-300"
                    onClick={() => handleKeyPress("0")}
                  >
                    0
                  </button>

                  {/* Backspace button under 9 */}
                  <button
                    className="w-16 h-16 bg-white rounded-full cursor-pointer flex items-center justify-center"
                    onClick={() => handleKeyPress("del")}
                  >
                    <img src={Backspace} alt="Backspace" />
                  </button>
                </div>

                {error && (
                  <p className="text-red-500 text-[14px] text-center mt-2">
                    {error}
                  </p>
                )}

                {loading && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
                    <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetPinModal;
