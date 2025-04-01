import { useState, useEffect } from "react";
import Backspace from "../../../../assets/dashboard_img/profile/icon-park-solid_delete-two.svg";
import lock from "../../../../assets/dashboard_img/profile/Lock.svg";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";

import api from "../../../../services/api";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PinModal = ({
  onClose,
  formData,
}: {
  onClose: () => void;
  formData: any;
}) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  // Handle number input and backspace
  const handleKeyPress = (value: string) => {
    if (value === "del") {
      setPin((prev) => prev.slice(0, -1)); // Remove last digit
    } else if (pin.length < 4) {
      setPin((prev) => prev + value);
    }
  };

  // Validate PIN and Submit
  const validatePin = async () => {
    if (pin.length !== 4) {
      setError("Enter a valid 4-digit PIN");
      return;
    }

    try {
      const pinResponse = await fetch("/api/validate-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      console.log("formData", formData);

      const pinData = await pinResponse.json();
      if (!pinData.success) {
        setError("Invalid PIN. Please try again.");
        return;
      }

      //   const purchaseResponse = await fetch("/api/airtime-purchase", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ ...formData, pin }),
      //   });

      const response = await api.post(
        `${BASE_URL}/BillsPayment/purchaseAirtime`,
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }

      console.log(response);

      //   const purchaseData = await purchaseResponse.json();
      if (response.data.success) {
        alert("Airtime purchase successful!");
        onClose();
      } else {
        setError(response.data.message || "Failed to complete purchase.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Automatically call validatePin when 4 digits are entered
  useEffect(() => {
    if (pin.length === 4) {
      validatePin();
    }
  }, [pin]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleKeyPress("del");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pin]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
      <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
        <div className="bg-white w-[600px] rounded-[10px]">
          <div className="flex flex-row-reverse">
            <button
              className="px-4 py-2 mr-[5px] cursor-pointer mt-[1rem]"
              onClick={onClose}
            >
              <img src={cancel} alt="" />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-6 pt-4 rounded-lg w-[300px] flex flex-col mb-[2rem] items-center">
              <img src={lock} alt="" />
              <h2 className="text-[20px] font-semibold text-[#27014F] mt-4">
                Enter PIN
              </h2>
              <p className="text-[16px] text-[#3E4666] text-center mb-3 ">
                Enter your secure four-digit PIN
              </p>

              {/* PIN Input Fields */}
              <div className="flex justify-center gap-3 mb-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[10px] h-[10px] rounded-md flex items-center justify-center text-lg font-bold
                     ${pin[i] ? "bg-[#27014F]" : "bg-gray-300"}`}
                  >
                    {/* {pin[i] ? "●" : ""} */}
                  </div>
                ))}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {[..."123456789"].map((num) => (
                  <button
                    key={num}
                    className="w-16 h-16 bg-gray-200 text-lg text-[#27014F] font-bold rounded-full hover:bg-gray-300"
                    onClick={() => handleKeyPress(num)}
                  >
                    {num}
                  </button>
                ))}

                {/* Empty Placeholder for Alignment */}
                <div className="w-16 h-16"></div>

                {/* "0" centered below 8 */}
                <button
                  className="w-16 h-16 bg-gray-200 text-lg text-[#27014F] font-bold rounded-full hover:bg-gray-300"
                  onClick={() => handleKeyPress("0")}
                >
                  0
                </button>

                {/* Backspace button under 9 */}
                <button
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
