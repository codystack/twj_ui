import React from "react";
import ReactDOM from "react-dom";
// import Cancel from "../assets/dashboard_img/Cancel.svg";
import Cancel from "../assets/dashboard_img/profile/Cancel.svg";
import alarmIcon from "../assets/dashboard_img/profile/Alarm_duotone.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-[9999]">
      <div className="   rounded-[10px]  bg-[#fff]/20 p-[0.7rem]  bg-opacity-50">
        <div className="rounded-[10px] bg-white p-[0.7rem] shadow-lg w-[600px]">
          {/* Close Button */}
          <div className="flex mt-2 mr-2 flex-row-reverse">
            <button onClick={onClose} className="p-2 cursor-pointer">
              <img src={Cancel} alt="Close" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex flex-col items-center mt-[2rem] justify-center h-full">
            <div className="flex w-[70%] flex-col items-center text-center">
              <div className="my-5">
                <span className="bg-[#FF3366]/15 rounded-full w-[5rem] h-[5rem] flex justify-center items-center p-[2px]">
                  <img
                    src={alarmIcon}
                    className="w-[3.5rem]"
                    alt="Alarm Icon"
                  />
                </span>
              </div>
              <h3 className="text-lg text-[#27014F]">
                Are you sure you want to logout?
              </h3>

              {/* Logout Button */}
              <button
                onClick={onConfirm}
                className="mt-4 px-4 py-3 transition mb-[3rem] duration-500 ease-in-out bg-red-600 cursor-pointer text-white rounded-lg w-full hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body //  This ensures the modal is rendered outside the normal component tree
  );
};

export default LogoutModal;
