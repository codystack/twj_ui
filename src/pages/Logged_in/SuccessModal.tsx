import React from "react";
import Check from "../../assets/dashboard_img/dashboard_icons/greenCheck.svg";
import Cancel from "../../assets/dashboard_img/profile/cancel.svg";

interface SuccessModalProps {
  title: string;
  message: string;
  onClose: () => void;
  button?: React.ReactNode; // Optional button
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  title,
  message,
  onClose,
  button,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/40 bg-opacity-50">
      <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
        <div className="bg-white rounded-lg shadow-lg px-6 pb-[2rem] sm:w-[500px] w-[100vw] sm:h-auto h-[100vh] text-center">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="cursor-pointer pt-[20px] p-[1px]"
            >
              <img src={Cancel} className="sm:w-4 w-5" alt="" />
            </button>
          </div>

     <div className="flex flex-col items-center justify-center h-[80%]">
           {/* Constant Image */}
          <img src={Check} alt="Success" className="mx-auto  mt-[1rem] mb-4" />

          {/* Dynamic Text */}
          <h5 className="sm:text-[24px] text-[30px] mt-[1rem] font-semibold text-[#27014F]">
            {title}
          </h5>
          <div className="w-full flex justify-center ">
            <p className="text-[#0A2E65]/60 sm:w-[70%] text-[20px] text-center leading-5.5 mt-2 mb-[1.5rem]">
              {message}
            </p>
          </div>
          {button && <div className="mt-4">{button}</div>}
     </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
