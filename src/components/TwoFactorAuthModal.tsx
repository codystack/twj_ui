import cancel from "../assets/dashboard_img/profile/cancel.svg";
import TwoFALock from "../assets/crpto_icons/2fa_protect.svg";

type KycModalProps = {
  isVisible?: boolean;
  onClose?: () => void;
};
const TwoFactorAuthModal = ({ isVisible, onClose }: KycModalProps) => {
  if (!isVisible) return null;

  return (
    <>
      \
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
        <div className="rounded-[20px] bg-[#fff]/20 p-[0.8rem] w-full max-w-[500px]">
          <div className="bg-white rounded-[15px] w-full h-auto p-6 shadow-xl text-center">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  //   closeModal();
                  onClose?.();
                }}
                className="text-gray-500 cursor-pointer p-[5px] hover:text-gray-700 text-sm"
              >
                <img src={cancel} alt="" />
              </button>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex mt-[1.5rem] items-center w-full justify-center flex-col">
                <div className="flex items-center justify-center">
                  <img src={TwoFALock} alt="" />
                </div>

                <p className="text-[#0A2E65]/60 leading-[1.5rem] w-[90%] text-[20px] mt-2 mb-6">
                  You must complete KYC <br /> to have access to this feature
                </p>

                <div className="flex md:w-[90%] w-full mb-[1rem] justify-center gap-4">
                  <button
                    // onClick={proceedToKyc}
                    className="bg-[#8003A9] text-white w-full py-3 px-6 rounded-md cursor-pointer transition"
                  >
                    Complete KYC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoFactorAuthModal;
