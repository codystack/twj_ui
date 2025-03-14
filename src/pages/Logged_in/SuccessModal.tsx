import React from "react";
import Check from "../../assets/dashboard_img/dashboard_icons/greenCheck.svg";
import DeleteAccount from "../../assets/dashboard_img/profile/cancel.svg";
interface SuccessModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-black/40 bg-opacity-50">
      <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
        <div className="bg-white rounded-lg shadow-lg px-6 py-[2rem] w-[600px] text-center">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={onClose} className="cursor-pointer p-[10px]">
              <img src={DeleteAccount} className="w-[1rem]" alt="" />
            </button>
          </div>

          {/* Constant Image */}
          <img src={Check} alt="Success" className="mx-auto  mt-[2rem] mb-4" />

          {/* Dynamic Text */}
          <h5 className="text-[24px] mt-[1rem] font-semibold text-[#27014F]">
            {title}
          </h5>
          <p className="text-[#0A2E65]/60 mt- mb-[2rem]">{message}</p>

          {/* Close Button */}
          {/* <button
          onClick={onClose}
          className="mt-4 bg-[#9605C5] text-white px-4 py-2 rounded-md hover:bg-purple-800"
        >
          OK
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
