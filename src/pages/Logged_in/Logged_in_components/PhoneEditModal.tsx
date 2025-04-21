import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";
// import api from "../../../services/api";
// import { useUserStore } from "../../../store/useUserStore";

const PhoneEditModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (newPhoneNumber: string) => void;
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");
  // const { fetchUser } = useUserStore();

  const isValidNigerianPhone = (value: string) => {
    // Remove all spaces and ensure we work with clean data
    const cleaned = value.trim();
    // Match formats like: +2347012345678, 2347012345678, 08012345678, 07012345678
    const regex = /^(?:\+234|234|0)[789][01]\d{8}$/;

    return regex.test(cleaned);
  };

  const validatePhoneNumber = (value: string | undefined) => {
    if (!value || !isValidNigerianPhone(value)) {
      setError("Please enter a valid phone number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    const isValid = validatePhoneNumber(newPhoneNumber);
    if (!isValid || !newPhoneNumber) {
      setError("Please enter a valid phone number");
      return;
    }

    onSave(newPhoneNumber);
    onClose();
  };

  const handleBlur = () => {
    validatePhoneNumber(newPhoneNumber);
  };

  const isFormInvalid = !newPhoneNumber || newPhoneNumber.length <= 13;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
      <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
        <div className="bg-white text-[#27014F] p-6 rounded-[15px] w-[600px]">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-[1rem]">
            <h2 className="text-[20px]">Update your phone number</h2>
            <button
              className="p-[10px] cursor-pointer mt-[10px] rounded-md"
              onClick={onClose}
            >
              <img src={Cancel} alt="" />
            </button>
          </div>

          <p className="text-left ml-[6rem] pt-[1.5rem] text-[#0A2E65]/60">
            Enter your phone number
          </p>

          <div className="flex flex-col items-center justify-center">
            <div className="w-[70%]">
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                value={newPhoneNumber}
                onChange={setNewPhoneNumber}
                onBlur={handleBlur}
                style={
                  {
                    "--PhoneInputCountrySelect-marginRight": "0rem",
                  } as React.CSSProperties
                }
                className="w-full p-2 rounded-md focus:outline-none focus:border-purple-800"
              />
              {error && (
                <p className="text-red-500 text-[13px] ml-2 mt-[-10px]">
                  {error}
                </p>
              )}

              <div className="flex mb-[2rem] w-full justify-end gap-4 mt-4">
                <button
                  disabled={isFormInvalid}
                  className={`w-full px-4 py-2 rounded-md text-white transition ${
                    isFormInvalid
                      ? "bg-[#9605C5]/60 cursor-not-allowed"
                      : "bg-[#9605C5] cursor-pointer"
                  }`}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEditModal;
