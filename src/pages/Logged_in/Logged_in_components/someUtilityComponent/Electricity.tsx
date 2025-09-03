import { useState } from "react";
import Bulb from "../../../../assets/dashboard_img/dashboard_icons/ion_bulb-sharp.svg";
import Bulbbg from "../../../../assets/dashboard_img/Bulbbg.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select, { SingleValue } from "react-select";
import Button from "../../../../components/Button";
import check from "../../../../assets/dashboard_img/profile/Check_round_fill (1).svg";
import { AxiosError } from "axios";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import alarmIcon from "../../../../assets/dashboard_img/profile/Alarm_duotone.svg";
import api from "../../../../services/api";
import SuccessModal from "../../SuccessModal";
import SetPinModal from "./SetPinModal";
import PinModal from "./PinModal";
import { useUserStore } from "../../../../store/useUserStore";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "postpaid", label: "postpaid" },
  { value: "prepaid", label: "prepaid" },
];

type optionType = {
  value: string;
  title: string;
};
const BASE_URL = import.meta.env.VITE_BASE_URL;

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "9px",
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
      ? "#F8E0FF" // Hover background color
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
  }),
};

const Electricity = () => {
  const navigate = useNavigate();

  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    powerProvider: "",
    meterNumber: "",
    amount: "",
    provider: "",
  });

  const [errors, setErrors] = useState({
    powerProvider: "",
    meterNumber: "",
    amount: "",
    provider: "",
  });
  const [accName, setAccName] = useState("");
  const [error, setError] = useState("");
  const [providers, setProviders] = useState<any>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [proceedToSetPin, setProceedToSetPin] = useState(false); // State to track if the user should proceed to set a PIN
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const isSuccessModalTwo = true;

  const handleSelectChangee = (selectedOption: any) => {
    if (selectedOption) {
      setFormData((prev) => ({
        ...prev,
        provider: selectedOption.value,
      }));
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

      case "powerProvider":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            powerProvider: "Please select a provider",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            powerProvider: "",
          }));
        }
        break;

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Clear form logic can be added here
    setSelectedAmount(null);
    setIsModalOpen(false);
    setFormData({
      powerProvider: "",
      meterNumber: "",
      amount: "",
      provider: "",
    });
    setErrors({
      powerProvider: "",
      meterNumber: "",
      amount: "",
      provider: "",
    });
    setAccName("");
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
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
    // Validate the field on change
    validateField(name, value);
  };

  const handleAmountClick = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
    setSelectedAmount(amount);
  };

  const handleSelectChange = (selectedOption: SingleValue<optionType>) => {
    if (selectedOption) {
      // console.log("Selected ID (value):", selectedOption.value);
      //   console.log("Selected Title:", selectedOption.title);
      if (selectedOption) {
        setFormData((prev) => ({
          ...prev,
          powerProvider: selectedOption.value,
        }));
      }

      validateField("powerProvider", selectedOption.value);
    }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !accName;

  // API logic to fetch dat
  interface powerProvider {
    providerName: string;
    shortName: string;
  }

  const fetchProviders = async () => {
    setIsLoading(true);
    setProviders([]);
    try {
      const response = await fetch(
        `${BASE_URL}/BillsPayment/getElectricityProviders`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const options: powerProvider[] = data.data;
      setProviders(
        options.map((provider) => ({
          value: provider.shortName,
          title: `${
            provider.providerName
          } - (${provider.shortName.toUpperCase()})`,
        }))
      );
      // console.log(providers)
      setIsLoading(false);
      return true;
    } catch (e) {
      // console.log(e);
      setIsLoading(false);
      return e;
    }
  };

  const handleBlur = async () => {
    setIsLoading(true);

    const { meterNumber, powerProvider, provider } = formData;
    const providerr = provider;
    const amount = "1000";
    const meterType = powerProvider;
    const meterNumb = meterNumber;

    const requestBody = {
      meterNumber: meterNumb,
      meterType: providerr,
      amount: amount,
      service: meterType,
    };

    // console.log(requestBody);

    try {
      const response = await fetch(
        `${BASE_URL}/BillsPayment/electricityValidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Validati failed");
      }
      console.log(data.data.message.details.customer_name);
      const name = data.data.message.details.customer_name;
      setAccName(name);
      setIsLoading(false);
      return;
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      setError(errorMessage);
      // console.log(errorMessage);
      setIsLoading(false);
      return;
    }
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const { meterNumber, powerProvider, provider, amount } = formData;

          const purchaseResponse = await api.post(
            `${BASE_URL}/BillsPayment/electricityPay`,
            {
              meterNumber: meterNumber,
              meterType: provider,
              amount: Number(amount),
              service: powerProvider,
              customerName: accName,
            }
          );

          if (purchaseResponse?.data?.statusCode !== "OK") {
            throw new Error(
              purchaseResponse?.data?.message || "An error occurred"
            );
          }

          setFormData({
            powerProvider: "",
            meterNumber: "",
            amount: "",
            provider: "",
          });
          setIsSuccessModal(true);
          resolve();
        } catch (e) {
          reject(e);
        }
      })();
    });

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

  const isPasscodeSet = () => localStorage.getItem("passcodeSet") === "true";

  return (
    <>
      <button
        onClick={() => {
          openModal();
          fetchProviders();
        }}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white sm:w-[600px] w-[100vw] sm:h-auto   z-[50]   py-6 px-4 sm:rounded-[15px] h-[min(100dvh,100vh)] max-h-screen  overflow-y-auto  flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="sm:text-[17px] text-[20px] tracking-[1px]  text-[#27014F] ">
                  Electricity Purchase
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img className="sm:w-4 w-5" src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="sm:w-[70%] w-full">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit}>
                    <p className="text-[#0A2E65]/60 pb-[3px] mb-[5px]  pl-[5px] text-[16px] text-left mt-[2rem] ">
                      Service Provider
                    </p>
                    <div>
                      <Select<optionType>
                        options={providers}
                        getOptionLabel={(e) => e.title}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={providers.find(
                          (p: optionType) => p.value === formData.powerProvider
                        )}
                        onChange={handleSelectChange}
                        placeholder=" Choose a Provider"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] mb-[5px] pl-[5px] text-[15px] text-left  sm:mt-[10px] mt-[17px] ">
                      Type
                    </p>
                    <div>
                      <Select
                        options={options}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.provider
                        )}
                        onChange={handleSelectChangee}
                        placeholder="Provider type"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] mb-[5px] pl-[5px] text-[15px] text-left  sm:mt-[10px] mt-[17px] ">
                      Meter Number
                    </p>
                    <div className="w-full ">
                      <input
                        type="text"
                        placeholder="4567786452956"
                        name="meterNumber"
                        value={formData.meterNumber}
                        onChange={handleInputChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        onBlur={handleBlur}
                        className={`p-4 px-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.meterNumber
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {/* {errors.email && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.email}
                  </p>
                )} */}
                    </div>

                    <div className="flex mb-2 gap-1.5">
                      {isLoading && (
                        <p className="text-[#27014F] font-medium">
                          Verifying...
                        </p>
                      )}

                      {!isLoading && error && (
                        <p className="text-red-500 font-medium">{error}</p>
                      )}

                      {!isLoading && accName && !error && (
                        <>
                          <img src={check} alt="Verified" />
                          <p className="text-[#27014F] font-medium">
                            {accName}
                          </p>
                        </>
                      )}
                    </div>

                    <p className="sm:hidden block text-[#0A2E65]/60 sm:mt-[10px] mt-[17px] pb-[3px] mb-[5px] pl-[5px] text-[16px] text-left ">
                      Choose an Amount
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {[1000, 2000, 5000, 10000, 25000, 50000].map((amount) => (
                        <div
                          key={amount}
                          className={`py-[10px] cursor-pointer rounded-[5px] flex justify-center items-center transition-all duration-300 hover:scale-105
       ${
         selectedAmount === amount
           ? "bg-[#F2F4FC] border border-[#326CF6] text-[#27014F] "
           : "text-[#A4A4A4] border border-[#A4A4A4]"
       }`}
                          onClick={() => handleAmountClick(amount)}
                        >
                          <span>₦{amount}</span>
                        </div>
                      ))}
                    </div>

                    <div className=" sm:mt-[10px] mt-[17px] flex justify-between items-center">
                      <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px]  text-left   ">
                        Amount
                      </p>
                      <div className="flex items-center px-[5px] text-[16px]  ">
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
                        type="amount"
                        placeholder="₦0.00"
                        name="amount"
                        value={
                          formData.amount
                            ? Number(formData.amount).toLocaleString()
                            : ""
                        }
                        onChange={handleInputChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-4 px-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
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

                    <div className="w-full sm:mt-[1.5rem] mt-[2.5rem] mb-[2rem]">
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        // isLoading={isSubmitting}
                      >
                        Buy Electricity
                      </Button>
                    </div>
                  </form>
                  {/* Buttons */}
                </div>
              </div>
            </div>
          </div>
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
      {showPinModal && !isPasscodeSet() && proceedToSetPin && (
        <SetPinModal onClose={() => setShowPinModal(false)} />
      )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Up Nepa!"
          message="Your electricity token is on its way"
          onClose={() => {
            fetchUser();
            setIsSuccessModal(false);
          }}
          button={
            <button
              onClick={() =>
                navigate("/transactions", {
                  state: { activeTab: "BillsPayment" },
                })
              }
              className="bg-[#8003A9] text-[16px] px-[2rem] cursor-pointer w-[100%] text-white py-2 rounded"
            >
              View Transaction Detail
            </button>
          }
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default Electricity;
