import Lines from "../../assets/dashboard_img/Polygon.svg";
import eye_lines from "../../assets/dashboard_img/eye_covered.svg";
import eye from "../../assets/dashboard_img/Eye_open_white.svg";
import virtualCard from "../../assets/dashboard_img/virtualcardxx 1.svg";
import ArrowUp from "../../assets/dashboard_img/Arrow_up.svg";
import ArrowDown from "../../assets/dashboard_img/Arrow_down.svg";
import { useEffect, useState } from "react";
import Add_icon from "../../assets/dashboard_img/Add_icon.svg";
import Betting from "./Logged_in_components/someUtilityComponent/Betting";
import CableTv from "./Logged_in_components/someUtilityComponent/CableTv";
import Electricity from "./Logged_in_components/someUtilityComponent/Electricity";
import Data from "./Logged_in_components/someUtilityComponent/Data";
import Airtime from "./Logged_in_components/someUtilityComponent/Airtime";
import Crypto from "./Logged_in_components/someUtilityComponent/Crypto";
import GiftCard from "./Logged_in_components/someUtilityComponent/GiftCard";
import Support from "./Logged_in_components/someUtilityComponent/Support";
import ErrorBoundary from "../../components/error/ErrorBoundry";
import KycHandler from "../../components/KycHandler";
import cancel from "../../assets/dashboard_img/profile/cancel.svg";
import { useUserStore } from "../../store/useUserStore";
import copyImg from "../../assets/dashboard_img/withdrawal-copy-.svg";
import bankImg from "../../assets/dashboard_img/withdrawal_bank-icon.svg";
import Select from "react-select";
import Button from "../../components/Button";
import { useBankStore } from "../../store/useBankStore";
import { useNavigate } from "react-router-dom";
import SuccessModal from "./SuccessModal";
import { useGiftCardStore } from "../../store/useGiftCardStore";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CryptoBG from "../../assets/dashboard_img/crptobg.svg";
import crypto from "../../assets/dashboard_img/dashboard_icons/akar-icons_bitcoin-fill.svg";
import giftcardsbg from "../../assets/dashboard_img/giftcardbg.svg";
import Giftcard from "../../assets/dashboard_img/dashboard_icons/fluent_gift-card-20-filled.svg";
import Dataimg from "../../assets/dashboard_img/dashboard_icons/ooui_network.svg";
import dataBg from "../../assets/dashboard_img/databg.svg";
import Bulb from "../../assets/dashboard_img/dashboard_icons/ion_bulb-sharp.svg";
import Bulbbg from "../../assets/dashboard_img/Bulbbg.svg";
import Tvbg from "../../assets/dashboard_img/tvbg.svg";
import TV from "../../assets/dashboard_img/dashboard_icons/wpf_retro-tv.svg";
import Casino from "../../assets/dashboard_img/dashboard_icons/maki_casino.svg";
import Casinobg from "../../assets/dashboard_img/casinobg.svg";
import airtimebg from "../../assets/dashboard_img/airtimebg.svg";
import Airtimeimg from "../../assets/dashboard_img/dashboard_icons/ic_round-phone-iphone.svg";
import api from "../../services/api";
import PinModal from "./Logged_in_components/someUtilityComponent/PinModal";
import { useAuthStore } from "../../store/authStore";
import { loadFreshworksChat } from "../../utils/freshWorks";
// import { loadFreshworksChat } from "../../utils/freshWorks";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    "&:hover": {
      border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    },
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: state.isSelected
      ? "#8003A9"
      : state.isFocused
      ? "#F8E0FF"
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F",
  }),
};

interface BankOptionType {
  label: string;
  value: string;
  id: string;
  accountName: string;
  bankName: string;
  accountNumber: string;
  bankCode: string;
  accountType: string | null;
  isDefault: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { showSuccessModal, setShowSuccessModal } = useGiftCardStore();

  const [isHidden, setIsHidden] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const { user, loading, fetchUser } = useUserStore();
  const { bankList, fetchBanks } = useBankStore();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [successWithdrawal, setSuccessWithdrawal] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    narration: "",
    bank: null as BankOptionType | null,
    bankName: "",
    accountName: "",
    accountNumber: "",
    bankCode: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    amount: "",
    bank: "",
    narration: "",
  });

  const textToCopy = user?.accountNumber?.toString() ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(textToCopy));
      console.log(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      return err;
    }
  };

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  // const isKycComplete = useUserStore((state) => state?.user?.kycSet);
  const completeKyc = localStorage.getItem("kycComplete");
  const isKycComplete = useAuthStore((state) => state.kycSet);

  const openModal = () => {
    if (isKycComplete && completeKyc === "true") {
      setShowTopupModal(true);
      setShowKycModal(false);
    } else {
      setShowTopupModal(false);
      setShowKycModal(true);
    }
  };

  const cryptoKycOpenModal = () => {
    if (isKycComplete && completeKyc === "true") {
      setShowKycModal(false);
    } else {
      setShowKycModal(true);
    }
  };

  const openWithdrawalModal = () => {
    // const completeKyc = localStorage.getItem("kycComplete");
    fetchBanks();
    setShowWithdrawalModal(true);
  };

  // useEffect(() => {
  //   console.log("bank list", bankList);
  // }, [bankList]);

  const options: BankOptionType[] = bankList.map((bank) => ({
    label: `${bank.accountNumber} - ${bank.bankName}`,
    value: bank.accountNumber,
    id: bank.id,
    accountName: bank.accountName,
    bankName: bank.bankName,
    accountNumber: bank.accountNumber,
    bankCode: bank.bankCode,
    accountType: "",
    isDefault: false,
  }));

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "amount":
        const amountValue = Number(value);
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount is required",
          }));
        } else if (isNaN(amountValue)) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be a number",
          }));
        } else if (amountValue < 1000) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be greater than or equal to ₦1000",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            amount: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "amount") {
      const rawValue = value.replace(/,/g, "");
      if (/^\d*\.?\d*$/.test(rawValue)) {
        value = rawValue;
      } else {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // fetchBanks();
    if (user?.kycSet || user === null) return;

    if (user.kycSet === false) {
      setShowKycModal(true);
    } else {
      setShowKycModal(false);
    }
  }, [loading, user]);

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.bank;

  // dashboard balance
  const formattedBalance = !isHidden
    ? user?.accountBalance?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : null;

  const [whole, fraction] = formattedBalance?.split(".") || [];

  // withdrawal function

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          setIsLoading(true);
          const res = await api.post("/Accounts/processWalletPayout", {
            amount: Number(formData.amount),
            bankCode: formData.bankCode,
            accountName: formData.accountName,
            accountNumber: formData.accountNumber,
            narration: formData.narration,
          });

          if (res.data.statusCode !== "OK") {
            throw new Error(res.data.message || "An error occurred");
          }

          setSuccessWithdrawal(true);

          resolve();
          return res;
        } catch (e) {
          reject(e);
        } finally {
          setIsLoading(false);
        }
      })();
    });

  useEffect(() => {
    loadFreshworksChat();
  }, []);

  return (
    <>
      {openPinModal && (
        <PinModal
          onVerify={onVerify}
          onClose={() => {
            setOpenPinModal(false);
            setFormData({
              amount: "",
              bank: null,
              narration: "",
              bankName: "",
              accountName: "",
              accountNumber: "",
              bankCode: "",
            });
          }}
        />
      )}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-30">
          <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white  py-6 px-4 sm:rounded-2xl sm:w-[600px] sm:h-auto h-[min(100dvh,100vh)] max-h-screen  w-[100vw] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setErrors({ amount: "", bank: "", narration: "" });
                    setFormData({
                      amount: "",
                      bank: null,
                      narration: "",
                      bankName: "",
                      accountName: "",
                      accountNumber: "",
                      bankCode: "",
                    });
                    setErrorMessage(null);
                    setShowWithdrawalModal(false);
                  }}
                  className="px-4 py-2 sm:mr-[5px] mr-[-10px] cursor-pointer "
                >
                  <img className="w-5 sm:w-4" src={cancel} alt="" />
                </button>
              </div>

              <div className="flex flex-col sm:h-[60%]  justify-center ">
                {options.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-[#0A2E65] mb-4">
                      You don't have any bank account set up yet.
                    </p>
                    <button
                      onClick={() => {
                        setShowWithdrawalModal(false);
                        navigate("/profile", { state: { activeTab: "bank" } });
                      }}
                      className="px-4 py-2 flex justify-center items-center bg-[#f2f4fc] text-[#0A2E65] rounded-[5px] cursor-pointer transition"
                    >
                      <img className="w-[1.2rem]" src={Add_icon} alt="" />
                      <span className="ml-1 text-[16px] text-black">
                        Add a bank account
                      </span>
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col h-full items-center ">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                      <div className="sm:w-[70%] mx-auto w-full flex flex-col justify-center">
                        <h5 className="text-[#0A2E65]/60 sm:text-[15px] text-[17px] ">
                          Available Balance
                        </h5>
                        <div className="flex items-center justify-center">
                          <div className="relative flex items-center gap-2">
                            <span className="mb-[8px] mr-[-5px] text-[16px]">
                              ₦
                            </span>
                            <p className="text-[32px] text-center font-semibold">
                              {whole}
                            </p>
                            <span className="text-[16px] mt-[12px] ml-[-7px]">
                              .{fraction || "00"}
                            </span>
                          </div>
                        </div>

                        <p className="text-[#0A2E65]/60 mt-[1rem] pl-[5px] text-[15px] pb-[3px] text-left">
                          Amount
                        </p>
                        <div className="w-full mb-4">
                          <input
                            type="amount"
                            placeholder="₦0.00"
                            name="amount"
                            value={
                              formData.amount
                                ? Number(formData.amount).toLocaleString()
                                : ""
                            }
                            onChange={handleInputChange}
                            onBlur={() =>
                              validateField("amount", formData.amount)
                            }
                            className={`p-4 px-3  border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.amount
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            } `}
                          />
                          {errors.amount && (
                            <p className="text-red-500 text-left text-[13px] mt-1">
                              {errors.amount}
                            </p>
                          )}
                        </div>

                        <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left">
                          Bank Account
                        </p>
                        <div className="w-full">
                          <Select
                            options={options}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            onChange={(selected) => {
                              if (selected) {
                                setFormData((prev) => ({
                                  ...prev,
                                  bank: selected,
                                  bankName: selected.bankName,
                                  accountName: selected.accountName,
                                  accountNumber: selected.accountNumber,
                                  bankCode: selected.bankCode,
                                }));
                              }
                            }}
                            styles={customStyles}
                            value={formData.bank}
                            placeholder="Select Bank Account"
                          />
                        </div>

                        <div className="flex justify-between  mt-[0.5rem]   items-center">
                          <p className="pt-2 pb-1 text-[14px] text-[#0A2E65]/60">
                            Narration
                          </p>
                        </div>
                        <div className="w-full border border-gray-300 rounded-md focus-within:border-2 focus-within:border-gray-300">
                          <input
                            type="text"
                            name="narration"
                            placeholder="Enter narration"
                            className="w-full px-3 py-4 outline-none bg-white text-[16px] rounded-md"
                            value={formData.narration}
                            onChange={handleInputChange}
                          />
                        </div>

                        {errorMessage && (
                          <div className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
                            {errorMessage}
                          </div>
                        )}

                        <div className="w-full mt-[1.5rem] mb-[2rem]">
                          <Button
                            type="button"
                            onClick={() => {
                              setOpenPinModal(true);
                              setShowWithdrawalModal(false);
                            }}
                            isDisabled={isFormInvalid || isLoading}
                            // className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            // style={{ width: "180px" }} // fixed width to prevent resizing
                          >
                            {isLoading ? (
                              <span
                                className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                role="status"
                                aria-label="Loading"
                              />
                            ) : (
                              "Make Withdrawal"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white py-6 px-4 sm:rounded-2xl  sm:w-[600px] sm:h-auto   h-[min(100dvh,100vh)] max-h-screen   w-[100vw] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    fetchUser();
                    setShowTopupModal(false);
                  }}
                  className="px-4 py-2 md:mr-[5px] mr-[-10px] cursor-pointer "
                >
                  <img className="w-5 sm:w-4" src={cancel} alt="" />
                </button>
              </div>
              <div>
                <div className="flex flex-col items-center  h-[60%] justify-center ">
                  <div className="sm:w-[70%] flex flex-col justify-center items-center">
                    <div className="sm:mt-5 sm:mb-2 mb-5">
                      <span className="  rounded-full flex justify-center flex-col items-center p-[2px]">
                        <img src={bankImg} className="w-[]" alt="Alarm Icon" />
                        <h4 className="text-[#27014F] font-semibold mt-[1rem] text-[24px] ">
                          Account Top-up
                        </h4>
                        <p className="text-[#0A2E65]/60 tracking-[1px] text-[16px]  leading-[1.5rem]  mb-6">
                          Transfer money to your virtual account wallet
                          <br className="sm:block hidden" /> using the account
                          number below.
                        </p>
                      </span>
                    </div>
                  </div>

                  <div className="sm:w-[77%] w-full">
                    <div className="text-[#022B69] w-full flex justify-between   ">
                      <p>Account Name</p>
                      <p> {user?.accountName ?? ""}</p>
                    </div>
                    <div className="text-[#022B69] sm:mt-[16px] mt-[20px] w-full flex justify-between   ">
                      <p>Account Number</p>
                      <div className="flex relative items-center justify-center text-[#8003A9]">
                        <p>{textToCopy}</p>
                        <button
                          onClick={handleCopy}
                          className="ml-[2px] relative cursor-pointer"
                        >
                          <img src={copyImg} alt="" />
                        </button>
                        {copied && (
                          <div className="bg-[#32A071]/20 absolute px-[5px] py-[1px] rounded-[2px] bottom-[12.5rem] text-[14px] left-[54rem] text-[#32A071]">
                            Copied!
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[#022B69] sm:mt-[16px] mt-[20px] mb-[2rem] w-full flex justify-between   ">
                      <p>Bank Name</p>
                      <p> {user?.bankName ?? ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKycModal && (
        <KycHandler
          isVisible={showKycModal}
          onClose={() => {
            setShowKycModal(false);
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
        <div className="flex-1 overflow-y-auto pb-[1.5rem] md:px-4 p-3">
          <div className="md:h-[2rem] md:block hidden  h-[1.5rem] bg-[white] mt-[-12px] md:rounded-tl-[20px] md:ml-0 ml-[-5px] [@media(min-width:1350px)]:w-[78%] w-full fixed z-20 "></div>
          <div className=" md:ml-[2%] py-[2.3%] bg-[#fff]  ">
            <div className="flex  gap-4 w-full   mt-[1rem] ">
              <div className="flex relative [@media(min-width:900px)]:w-auto w-full">
                <div className="[@media(min-width:900px)]:w-[505px] w-full relative h-[253px] bg-[#27014F] rounded-[10px] flex items-center justify-center">
                  <img
                    src={Lines}
                    className="absolute h-[110%] w-full top-0 left-0"
                    alt=""
                  />

                  <div className="flex flex-col items-center text-[#fff]">
                    <p className="sm:text-[20px] text-[18px] leading-[rem]">
                      Wallet Balance
                    </p>

                    {user?.accountBalance === undefined ? (
                      <SkeletonTheme
                        baseColor="#3e1a65"
                        highlightColor="#5a2d8a"
                      >
                        <Skeleton
                          height={30}
                          width={150}
                          className="lg:mb-0 mb-3"
                        />
                      </SkeletonTheme>
                    ) : (
                      <div className=" relative mb-4 flex items-center gap-2">
                        <span className=" mb-[8px] mr-[-5px] text-[16px]">
                          {isHidden ? "" : " ₦"}
                        </span>

                        {!isHidden ? (
                          <>
                            <p className="sm:text-[32px] text-[30px] font-semibold inline">
                              {whole}
                            </p>

                            <span className="text-[16px] mt-[12px] ml-[-7px]">
                              .{fraction || "00"}
                            </span>
                          </>
                        ) : (
                          <p className="sm:text-[32px] text-[30px] font-semibold">
                            *******
                          </p>
                        )}
                        <button
                          onClick={toggleVisibility}
                          className=" ml-[2px] cursor-pointer "
                        >
                          {isHidden ? (
                            <img
                              src={eye_lines}
                              className=" top-[1.5px]  left-[2px]"
                              alt=""
                            />
                          ) : (
                            <img src={eye} className="w-full h-full" alt="" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* topup and withdrawal on smaller screens */}
                    <div>
                      <div className=" lg:hidden mb-[-1rem] flex w-full  z-30    gap-[1rem] rounded-[10px]">
                        <button
                          onClick={openWithdrawalModal}
                          className=" relative cursor-pointer border border-white text-left text-[#fff] sm:text-[14px] text-[13px] py-[0.5rem] w-fit  px-[1rem] rounded-[40px] m"
                        >
                          <p> WITHDRAW </p>
                        </button>
                        <button
                          onClick={openModal}
                          className="bg-[#fff] relative text-left cursor-pointer text-[#27014F] sm:text-[14px] text-[13px] py-[0.5rem] w-fit  px-[1rem] rounded-[40px]"
                        >
                          <p className="whitespace-nowrap"> TOP UP WALLET</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:flex hidden justify-center items-center">
                  <div className=" flex flex-col  w-[8rem] gap-[1rem] rounded-[10px]">
                    <button
                      onClick={openWithdrawalModal}
                      className="bg-[#FF3366] relative cursor-pointer text-left text-[#fff] text-[12px] py-[1rem] pr-[2.5rem] w-fit  pl-[5px] rounded-r-[40px] m"
                    >
                      <p> WITHDRAW </p>
                      <img
                        className="absolute right-[1rem] bottom-[10px]"
                        src={ArrowUp}
                        alt=""
                      />
                    </button>
                    <button
                      onClick={openModal}
                      className="bg-[#32A071] relative text-left cursor-pointer text-[#fff] text-[12px] p-[1rem] pl-[5px] rounded-r-[40px]"
                    >
                      <p> TOP UP WALLET</p>
                      <img
                        className="absolute right-[7px] bottom-[12px]"
                        src={ArrowDown}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="[@media(min-width:900px)]:block hidden relative w-full max-w-[423px] h-[253] bg-[#FBEEFF] rounded-[10px] ">
                <div className=" pt-[1.5rem] pl-[1.5rem]">
                  <div className="flex  items-center">
                    <h5 className="font-bold text-[24px] mr-[5px]">
                      Virtual Card
                    </h5>
                    <div className="bg-[#FF3366]/20 px-[5px] py-[1px] h-fit rounded-[2px] text-[8px] text-[#FF3366]">
                      COMING SOON
                    </div>
                  </div>

                  <p className="text-left text-[#27014F] leading-[13px] tracking-normal text-[11px]">
                    Avoid card transaction failures. Use the <br /> TWJ Virtual
                    USD Card for smooth, relaible <br /> payments on your
                    favourite platforms.
                  </p>
                </div>
                <img
                  src={virtualCard}
                  className=" absolute bottom-0 rounded-bl-[10px]  rounded-br-[10px]"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full mt-[3rem]  ">
              <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full h-full auto-rows-fr">
                <>
                  {!isKycComplete ? (
                    <>
                      <button
                        onClick={cryptoKycOpenModal}
                        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] sm:min-w-[252px] min-w-[152px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                      >
                        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                          <img src={crypto} alt="" />
                        </div>
                        <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                          Crypto
                        </p>
                        <img
                          src={CryptoBG}
                          className="absolute  right-0"
                          alt=""
                        />
                      </button>
                    </>
                  ) : (
                    <Crypto />
                  )}
                </>

                <>
                  {!isKycComplete ? (
                    <>
                      <button
                        onClick={cryptoKycOpenModal}
                        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] sm:min-w-[252px] min-w-[152px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                      >
                        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                          <img src={Giftcard} alt="" />
                        </div>
                        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
                          Gift Cards
                        </p>
                        <img
                          src={giftcardsbg}
                          className="absolute right-0"
                          alt=""
                        />
                      </button>
                    </>
                  ) : (
                    <ErrorBoundary>
                      <GiftCard />
                    </ErrorBoundary>
                  )}
                </>

                {/* <Airtime /> */}

                <>
                  {!isKycComplete ? (
                    <button
                      onClick={cryptoKycOpenModal}
                      className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                    >
                      <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                        <img src={Dataimg} alt="" />
                      </div>
                      <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                        Data
                      </p>
                      <img src={dataBg} className="absolute right-0" alt="" />
                    </button>
                  ) : (
                    <Data />
                  )}
                </>
                <>
                  {!isKycComplete ? (
                    <button
                      onClick={openModal}
                      className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                    >
                      <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                        <img src={Airtimeimg} alt="" />
                      </div>
                      <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                        Airtime
                      </p>
                      <img
                        src={airtimebg}
                        className="absolute right-0"
                        alt=""
                      />
                    </button>
                  ) : (
                    <Airtime />
                  )}
                </>
                <>
                  {!isKycComplete ? (
                    <>
                      <button
                        onClick={cryptoKycOpenModal}
                        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                      >
                        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                          <img src={Bulb} alt="" />
                        </div>
                        <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
                          Electricity
                        </p>
                        <img src={Bulbbg} className="absolute right-0" alt="" />
                      </button>
                    </>
                  ) : (
                    <Electricity />
                  )}
                </>

                <>
                  {!isKycComplete ? (
                    <>
                      <button
                        onClick={cryptoKycOpenModal}
                        className="cursor-pointer transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                      >
                        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                          <img src={TV} alt="Casino Icon" />
                        </div>
                        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
                          Cable TV
                        </p>
                        <img
                          src={Tvbg}
                          className="absolute right-0"
                          alt="Casino Background"
                        />
                      </button>
                    </>
                  ) : (
                    <CableTv />
                  )}
                </>
                <>
                  {!isKycComplete ? (
                    <>
                      <button
                        onClick={cryptoKycOpenModal}
                        className="cursor-pointer transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
                      >
                        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
                          <img src={Casino} alt="Casino Icon" />
                        </div>
                        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
                          Betting
                        </p>
                        <img
                          src={Casinobg}
                          className="absolute right-0"
                          alt="Casino Background"
                        />
                      </button>
                    </>
                  ) : (
                    <Betting />
                  )}
                </>

                <Support />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          title="Gift Card Purchase Succesful"
          message="Your STEAM gift card is on its way!"
          onClose={() => {
            fetchUser();
            setShowSuccessModal(false);
          }}
          button={
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#8003A9] w-[75%] text-white px-8 py-3 rounded-[5px] mb-2"
            >
              View Gift Card Detail
            </button>
          }
        />
      )}
      {successWithdrawal && (
        <SuccessModal
          title="Successfull Withdrawal"
          message={`Your withdrawal of ${formData.amount} is successfull!`}
          onClose={() => {
            fetchUser();
            setSuccessWithdrawal(false);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
