import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";

const PhoneEditModal = ({
  isOpen,
  onClose,
  phoneNumber,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
  onSave: (newPhoneNumber: string) => void;
}) => {
  const [newPhoneNumber, setNewPhoneNumber] = useState<string | undefined>(
    phoneNumber
  );

  const [error, setError] = useState("");

  const handleSave = () => {
    if (!newPhoneNumber) {
      setError("Phone number is required.");
      return;
    }

    onSave(newPhoneNumber);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
      <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
        <div className="bg-white text-[#27014F] p-6 rounded-[15px] w-[600px]">
          <div className=" flex items-center justify-between border-b  border-[#E2E8F0] pb-[1rem]  ">
            <h2 className="text-[20px] font-semibold">
              Update your phone number
            </h2>

            <button
              className=" p-[10px] cursor-pointer mt-[10px] rounded-md"
              onClick={onClose}
            >
              <img src={Cancel} alt="" />
            </button>
          </div>

          <p className="text-left ml-[6rem] pt-[1.5rem] text-[#0A2E65]/60">
            Enter your phone number
          </p>

          <div className="flex flex-col   items-center justify-center ">
            <div className="w-[70%] ">
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                value={newPhoneNumber}
                onChange={setNewPhoneNumber}
                style={
                  {
                    "--PhoneInputCountrySelect-marginRight": "0rem", // Change this value as needed
                  } as React.CSSProperties
                }
                className="w-full p-2 rounded-md focus:outline-none focus:border-purple-800"
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex mb-[2rem] w-full justify-end gap-4 mt-4">
                <button
                  className="bg-[#9605C5]/90 cursor-pointer w-full text-white px-4 py-2 rounded-md"
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
