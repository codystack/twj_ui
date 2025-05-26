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
import RouteChangeHandler from "../../components/RouteChangeHandler";
import { useLocation } from "react-router-dom";
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

// const options = [
//   { value: "postpaid", label: "postpaid" },
//   { value: "prepaid", label: "prepaid" },
// ];

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "4px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    "&:hover": {
      border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    },
  }),
  // option: (provided: any, state: any) => ({
  //   ...provided,
  //   cursor: "pointer",
  //   textAlign: "left",
  //   backgroundColor: state.isSelected ? "#8003A9" : "#fff",
  // }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: state.isSelected
      ? "#8003A9"
      : state.isFocused
      ? "#F8E0FF" // Hover background color
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
  }),
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccessModal, setShowSuccessModal } = useGiftCardStore();

  const [isHidden, setIsHidden] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const { user, fetchUser } = useUserStore();
  const { bankList, fetchBanks } = useBankStore();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bank: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    bank: "",
  });

  // const textToCopy = user?.accountNumber ?? "";
  const textToCopy = user?.accountNumber?.toString() ?? "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(textToCopy));
      console.log(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2s
    } catch (err) {
      return err;
      // console.error("Failed to copy text: ", err);
    }
  };

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const openModal = () => {
    const completeKyc = localStorage.getItem("kycComplete");

    if (completeKyc === "true") {
      setShowTopupModal(true);
      setShowKycModal(false);
    } else {
      setShowTopupModal(false);
      setShowKycModal(true);
    }
  };

  const openWithdrawalModal = () => {
    // const completeKyc = localStorage.getItem("kycComplete");
    fetchBanks();
    setShowWithdrawalModal(true);
    // console.log(bankList);
    // if (completeKyc === "true") {
    //   setShowTopupModal(true);
    //   setShowKycModal(false);
    // } else {
    //   setShowTopupModal(false);
    //   setShowKycModal(true);
    // }
  };

  const options = bankList.map((bank) => ({
    label: `${bank.accountNumber} - ${bank.bankName}`,
    value: bank.accountNumber,
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate the field on change
    validateField(name, value);
  };

  useEffect(() => {
    fetchBanks();
    fetchUser();
    // console.log(textToCopy);
    const timeout = setTimeout(() => {
      const kycComplete = localStorage.getItem("kycComplete");
      if (kycComplete !== "true" && location.pathname === "/dashboard") {
        setShowKycModal(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.bank;

  return (
    <>
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white p-6 rounded-2xl w-[600px] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setErrors({ amount: "", bank: "" });
                    setFormData({ amount: "", bank: "" });
                    setShowWithdrawalModal(false);
                  }}
                  className="px-4 py-2 mr-[5px] cursor-pointer "
                >
                  <img src={cancel} alt="" />
                </button>
              </div>

              {options.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-6">
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
                <form className="flex flex-col items-center ">
                  <div className="w-[70%] flex flex-col justify-center">
                    <h5 className="text-[#0A2E65]/60">Available Balance</h5>
                    <div className="flex items-center justify-center">
                      <div className="relative flex items-center gap-2">
                        <span className="mb-[8px] mr-[-5px] text-[16px]">
                          ₦
                        </span>
                        <p className="text-[32px] text-center font-semibold">
                          {user?.accountBalance?.toLocaleString() ?? ""}
                        </p>
                        <span className="text-[16px] mt-[12px] ml-[-7px]">
                          .00
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
                        value={formData.amount}
                        onChange={handleInputChange}
                        onBlur={() => validateField("amount", formData.amount)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
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
                              bank: selected.value,
                            }));
                          }
                        }}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.bank
                        )}
                        placeholder="Select Bank Account"
                      />
                    </div>

                    <div className="w-full mt-[1.5rem] mb-[2rem]">
                      <Button type="submit" isDisabled={isFormInvalid}>
                        Make Withdrawal
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white p-6 rounded-2xl  w-[600px] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    fetchUser();
                    setShowTopupModal(false);
                  }}
                  className="px-4 py-2 mr-[5px] cursor-pointer "
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex flex-col items-center ">
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <div className="mt-5 mb-2 ">
                    <span className="  rounded-full flex justify-center flex-col items-center p-[2px]">
                      <img src={bankImg} className="w-[]" alt="Alarm Icon" />
                      <h4 className="text-[#27014F] font-semibold mt-[1rem] text-[24px] ">
                        Account Top-up
                      </h4>
                      <p className="text-[#0A2E65]/60 tracking-[1px]  leading-[1.5rem]  mb-6">
                        Transfer money to your virtual account wallet
                        <br /> using the account number below.
                      </p>
                    </span>
                  </div>
                </div>

                <div className="w-[77%]">
                  <div className="text-[#022B69] w-full flex justify-between   ">
                    <p>Account Name</p>
                    <p> {user?.accountName ?? ""}</p>
                  </div>
                  <div className="text-[#022B69] mt-[16px] w-full flex justify-between   ">
                    <p>Account Number</p>
                    <div className="flex reltive items-center justify-center text-[#8003A9]">
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

                  <div className="text-[#022B69] mt-[16px] mb-[2rem] w-full flex justify-between   ">
                    <p>Bank Name</p>
                    <p> {user?.bankName ?? ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKycModal && (
        <RouteChangeHandler
          isVisible={showKycModal}
          onClose={() => {
            setShowKycModal(false);
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
        <div className="flex-1 overflow-y-auto pb-[1.5rem] px-4">
          <div className="h-[2rem] bg-[white]  [@media(min-width:1350px)]:w-[78%] w-full fixed z-20 "></div>
          <div className=" ml-[2%] py-[2.3%] bg-[#fff]  ">
            <div className="flex gap-[1.5rem] mt-[1rem]">
              <div className="flex ">
                <div className="w-[505px] relative h-[253px] bg-[#27014F] rounded-[10px] flex items-center justify-center">
                  <img
                    src={Lines}
                    className="absolute h-[110%] w-full top-0 left-0"
                    alt=""
                  />
                  <div className="flex flex-col items-center text-[#fff]">
                    <p className="text-[20px] leading-[rem]">Wallet Balance</p>
                    <div className=" relative flex items-center gap-2">
                      <span className=" mb-[8px] mr-[-5px] text-[16px]">
                        {isHidden ? "" : " ₦"}
                      </span>
                      <p className="text-[32px] font-semibold">
                        {isHidden
                          ? "*******"
                          : user?.accountBalance?.toLocaleString()}
                      </p>
                      <span className="text-[16px] mt-[12px] ml-[-7px] ">
                        {isHidden ? "" : ".00"}
                      </span>
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
                  </div>
                </div>

                <div className="flex justify-center items-center">
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
              <div className="relative w-[423px] h-[253] bg-[#FBEEFF] rounded-[10px] ">
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
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 w-full h-full  auto-rows-fr">
                <Crypto />
                <ErrorBoundary>
                  <GiftCard />
                </ErrorBoundary>
                <Airtime />
                <Data />
                <Electricity />
                <CableTv />
                <Betting />
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
    </>
  );
};

export default Dashboard;
