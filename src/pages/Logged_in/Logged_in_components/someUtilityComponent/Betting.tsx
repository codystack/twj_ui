import { useState } from "react";
import Casino from "../../../../assets/dashboard_img/dashboard_icons/maki_casino.svg";
import Casinobg from "../../../../assets/dashboard_img/casinobg.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select, { SingleValue } from "react-select";
import Button from "../../../../components/Button";
import check from "../../../../assets/dashboard_img/profile/Check_round_fill (1).svg";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import alarmIcon from "../../../../assets/dashboard_img/profile/Alarm_duotone.svg";
import api from "../../../../services/api";
import SuccessModal from "../../SuccessModal";
import SetPinModal from "./SetPinModal";
import PinModal from "./PinModal";
import { useUserStore } from "../../../../store/useUserStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;
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

const Betting = () => {
  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    betProvider: "",
    customerId: "",
    amount: "",
  });
  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountNameError, setAccountNameError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<OptionType[]>([]);
  const [errors, setErrors] = useState({
    betProvider: "",
    customerId: "",
    amount: "",
  });

  const [proceedToSetPin, setProceedToSetPin] = useState(false); // State to track if the user should proceed to set a PIN
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  // Define a reusable type for options
  type OptionType = {
    value: string;
    title: string;
  };

  const handleSelectChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      //   console.log("Selected ID (value):", selectedOption.value);
      //   console.log("Selected Title:", selectedOption.title);

      setFormData((prevFormData) => ({
        ...prevFormData,
        betProvider: selectedOption.value,
      }));

      validateField("betProvider", selectedOption.value);
    }
  };

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "accountNumber":
        const accountNumberRegex = /^[0-9]+$/; // Only allows numbers
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            accountNumber: "This field is required",
          }));
        } else if (!accountNumberRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            accountNumber: "Please enter a valid account number",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            accountNumber: "",
          }));
        }
        break;

      case "betProvider":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            selectedBank: "Please select a provider",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            selectedBank: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      betProvider: "",
      customerId: "",
      amount: "",
    });
    setAccountName(null);
    setAccountNameError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // API logics here
  interface BettingProvider {
    id: string;
    title: string;
    active: boolean;
  }

  const fetchBettingProviders = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${BASE_URL}/BillsPayment/getBettingProviders`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const options: BettingProvider[] = data.data;
      // console.log("Betting providers data:", options);

      setOptions(
        options.map((provider) => ({
          value: provider.id,
          title: provider.title,
        }))
      );
      return true;
    } catch (error) {
      // console.log("Failed to fetch betting providers:", error);
      return false;
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleBettingClick = async () => {
    const success = await fetchBettingProviders();
    if (success) {
      openModal();
    }
  };

  // Function to handle blur event and make an API call with params
  const handleBlur = async () => {
    setIsLoading(true);
    const { customerId, betProvider } = formData;
    try {
      const response = await fetch(
        `${BASE_URL}/BillsPayment/validateBettingAccount?betId=${betProvider}&customerId=${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Validati failed");
      }
      const name = data.data.message.details.name;
      setAccountName(name);
      setIsLoading(false);
      setAccountNameError(null);
    } catch (error: any) {
      setAccountName(null);
      setAccountNameError(error.message);

      // console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          // Proceed with Airtime Purchase
          const { amount, customerId, betProvider } = formData;

          const purchaseResponse = await api.post(
            `${BASE_URL}/BillsPayment/fundBettingWallet`,
            {
              betId: betProvider,
              customerId: customerId,
              customerName: accountName,
              amount: Number(amount),
            }
          );

          if (!purchaseResponse.data.isSuccessful) {
            throw new Error(
              purchaseResponse.data.message || "An error occurred"
            );
          }
          setIsSuccessModal(true);
          resolve();
        } catch (e) {
          reject(e);
        }
      })();
    });

  const isPasscodeSet = () => localStorage.getItem("passcodeSet") === "true";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);

    setTimeout(() => {
      setShowPinModal(true);
      setShouldCheckPasscode(true);
      setProceedToSetPin(false);
      setIsLoading(false);
    }, 200);
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !accountName;

  return (
    <>
      <button
        onClick={handleBettingClick}
        className="cursor-pointer transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
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

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Fund Betting Wallet
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="w-[70%]">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit}>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[2rem] ">
                      Bet Provider
                    </p>
                    <div>
                      <Select<OptionType>
                        options={options}
                        getOptionLabel={(e) => e.title}
                        getOptionValue={(e) => e.value}
                        styles={customStyles}
                        value={
                          options.find(
                            (option) => option.value === formData.betProvider
                          ) ?? null
                        }
                        onChange={handleSelectChange}
                        placeholder="Provider"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px] ">
                      Customer ID
                    </p>
                    <div className="w-full ">
                      <input
                        type="text"
                        placeholder="4567786"
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.customerId
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {errors.customerId && (
                        <p className="text-red-500 text-[13px] mt-1">
                          {errors.customerId}
                        </p>
                      )}
                    </div>
                    <div className="flex mb-2 gap-1.5">
                      {isLoading && (
                        <p className="text-[#27014F] font-medium">
                          Verifying...
                        </p>
                      )}

                      {!isLoading && accountNameError && (
                        <p className="text-red-500 font-medium">
                          {accountNameError}
                        </p>
                      )}

                      {!isLoading && accountName && !accountNameError && (
                        <>
                          <img src={check} alt="Verified" />
                          <p className="text-[#27014F] font-medium">
                            {accountName}
                          </p>
                        </>
                      )}
                    </div>

                    <div className=" mt-[10px] flex justify-between items-center">
                      <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left   ">
                        Amount
                      </p>
                      <div className="flex items-center px-[5px] text-[15px]  ">
                        <span className="text-[#0A2E65] mr-[2px]">
                          Balance:
                        </span>
                        <span className="text-[#0A2E65]/60">₦</span>
                        <span className="text-[#0A2E65]/60">
                          {user?.accountBalance.toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                    <div className="w-full mb-4">
                      <input
                        type="text"
                        placeholder="₦0.00"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.amount
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-[13px] mt-1">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div className="w-full mt-[1.5rem] mb-[2rem]">
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        // isLoading={isSubmitting}
                      >
                        Fund Wallet
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
        </div>
      )}

      {showPinModal && isPasscodeSet() && (
        <PinModal
          onClose={() => {
            setShowPinModal(false);
            closeModal();
          }}
          onVerify={onVerify}
        />
      )}

      {/* Inline Info Modal (before SetPinModal) */}
      {showPinModal &&
        shouldCheckPasscode &&
        !isPasscodeSet() &&
        !proceedToSetPin && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl  w-[500px] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-2 mr-[5px] cursor-pointer "
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex flex-col items-center mt-4">
                <div className="w-[70%] flex flex-col justify-center items-center">
                  <div className="my-5">
                    <span className="bg-[#FF3366]/15 rounded-full w-[5rem] h-[5rem] flex justify-center items-center p-[2px]">
                      <img
                        src={alarmIcon}
                        className="w-[3.5rem]"
                        alt="Alarm Icon"
                      />
                    </span>
                  </div>
                  <p className="text-[#0A2E65]/60 tracking-[1px] leading-[1.5rem] text-[20px] mb-6">
                    Setup transation PIN to complete transaction.
                  </p>
                  <div className="flex w-full justify-center gap-4">
                    <button
                      onClick={() => {
                        setProceedToSetPin(true);
                        closeModal();
                      }}
                      className="bg-[#8003A9] text-white px-4 w-full text-[18px] py-2 mb-[2rem]  ease-in-out duration-300 cursor-pointer rounded-[5px]  hover:bg-[#8003A9]/90 transition"
                    >
                      Setup PIN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* After Proceed: Show SetPinModal */}
      {showPinModal &&
        // shouldCheckPasscode &&
        !isPasscodeSet() &&
        proceedToSetPin && (
          <SetPinModal onClose={() => setShowPinModal(false)} />
        )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Acount Funded"
          message="The money is on it's way"
          onClose={() => {
            fetchUser();
            closeModal();
            setIsSuccessModal(false);
          }}
        />
      )}
    </>
  );
};

export default Betting;
