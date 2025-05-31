import { useEffect, useState } from "react";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select from "react-select";
import Button from "../../../../components/Button";
import check from "../../../../assets/dashboard_img/profile/Check_round_fill (1).svg";
import Tvbg from "../../../../assets/dashboard_img/tvbg.svg";
import TV from "../../../../assets/dashboard_img/dashboard_icons/wpf_retro-tv.svg";
import { AxiosError } from "axios";
import SuccessModal from "../../SuccessModal";
import SetPinModal from "./SetPinModal";
import PinModal from "./PinModal";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import alarmIcon from "../../../../assets/dashboard_img/profile/Alarm_duotone.svg";
import api from "../../../../services/api";
import { useUserStore } from "../../../../store/useUserStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const serviceOptions = [
  { value: "dstv", label: "DStv (MultiChoice)" },
  { value: "gotv", label: "GOtv (MultiChoice)" },
  { value: "startimes", label: "StarTimes" },
];

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
type FormData = {
  betProvider: string;
  smartCardNumber: string;
  provider: string;
  amount: string;
};

const CableTv = () => {
  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    betProvider: "",
    smartCardNumber: "",
    provider: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    betProvider: "",
    smartCardNumber: "",
    provider: "",
    amount: "",
  });
  const [accName, setAccName] = useState("");
  const [error, setError] = useState("");
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [bouquetOptions, setBouquetOptions] = useState<any[]>([]);
  const [amount, setAmount] = useState<string | number>("");
  const [seletedId, setSelectedId] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  const [proceedToSetPin, setProceedToSetPin] = useState(false); // State to track if the user should proceed to set a PIN
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
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

      case "smartCardNumber":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            smartCardNumber: "Please a valid smart card number",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            smartCardNumber: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Only update state if the value has changed
    setFormData((prev) => {
      if (prev[name as keyof FormData] !== value) {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAccName("");
    setError("");
    setFormData({
      betProvider: "",
      smartCardNumber: "",
      provider: "",
      amount: "",
    });
    setAmount("");
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) || !accName;

  // API logic
  const handleChangee = async (selectedOption: any) => {
    setIsLoading(true);

    const selectedValue = selectedOption.value;
    setSelected(selectedValue);

    try {
      // Send selectedValue as parameter in a GET request
      const response = await fetch(
        `${BASE_URL}/BillsPayment/getBouquets?service=${selectedValue}`
      );
      const data = await response.json();
      const bouquets = data.data;
      setServiceDetails(bouquets);
      setIsLoading(false);
      // console.log("Service details:", bouquets);
      console.log("Service from  ServiceDetails:", serviceDetails);
    } catch (error) {
      console.error("Error fetching service data:", error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(serviceDetails)) {
      const mappedOptions = serviceDetails.map((item: any) => ({
        value: item.id,
        label: `${item.name} - ₦${item.amount.toLocaleString()}`,
        amount: item.amount,
      }));
      // console.log("Mapped options:", mappedOptions);
      setBouquetOptions(mappedOptions);
    }
  }, [serviceDetails]);

  const handleBlur = async (service: any) => {
    setIsLoading(true);
    const selectedValue = service;
    console.log("Selected value:", selectedValue);
    const { smartCardNumber } = formData;
    const month = 0;
    const requestBody = {
      service: selected,
      account: smartCardNumber,
      month: month,
      plan_id: seletedId,
    };
    console.log("Request body:", requestBody);

    try {
      const response = await fetch(
        `${BASE_URL}/BillsPayment/validateSmartcard`,
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
        // throw the error manually
        throw new Error(data.message || "Validati failed");
      }
      // console.log("API response:", data.data.details.customer_name);
      const name = data.data.details.customer_name;
      setAccName(name);
      // setError(data.message)
      setIsLoading(false);
      return;
    } catch (e) {
      // const errorMessage = error?.message || "Something went wrong";
      // console.error("Error:", errorMessage);
      // setIsLoading(false);
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      //   console.log("log",error.message)
      setError(errorMessage);
      // console.log(errorMessage);
      setIsLoading(false);
      return;
    }
  };

  // Handle change when selecting an option in react-select
  const handleBouquetChange = (selectedOption: any) => {
    if (selectedOption) {
      setAmount(selectedOption.amount);
      setSelectedId(selectedOption.value);
    }
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const month = 1;
          const { smartCardNumber } = formData;

          const purchaseResponse = await api.post(
            `${BASE_URL}/BillsPayment/cableTvPayment`,
            {
              planId: seletedId,
              customerName: accName,
              service: selected,
              account: smartCardNumber,
              amount: Number(amount),
              month: month,
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
        onClick={openModal}
        className="cursor-pointer transition-transform duration-300 hover:scale-105 relative h-[146px]  sm:min-w-[252px] min-w-[152px]  border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={TV} alt="Casino Icon" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
          Cable TV
        </p>
        <img src={Tvbg} className="absolute right-0" alt="Casino Background" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Cable TV Subscription
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
                      Service Provider
                    </p>
                    <div>
                      <Select
                        options={serviceOptions}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={serviceOptions.find(
                          (option) => option.value === formData.betProvider
                        )}
                        onChange={handleChangee}
                        placeholder=" Choose a Provider"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                      Package/Bouquet
                    </p>
                    <div>
                      <Select
                        // options={options}
                        // getOptionLabel={(e) => e.label}
                        // getOptionValue={(e) => e.value}

                        options={bouquetOptions}
                        onChange={handleBouquetChange}
                        // isLoading={isLoading}
                        styles={customStyles}
                        // value={options.find(
                        //   (option) => option.value === formData.betProvider
                        // )}
                        // onChange={handleSelectChange}
                        placeholder="Provider"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                      Smart Card Number
                    </p>
                    <div className="w-full ">
                      <input
                        type="text"
                        placeholder="4567786452956"
                        name="smartCardNumber"
                        value={formData.smartCardNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.provider
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {errors.smartCardNumber && (
                        <p className="text-red-500 text-[13px] mt-1">
                          {errors.smartCardNumber}
                        </p>
                      )}
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
                        type="amount"
                        placeholder="₦0.00"
                        name="amount"
                        readOnly
                        value={amount}
                        onChange={handleInputChange}
                        onBlur={() => validateField("email", formData.amount)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.amount
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

                    <div className="w-full mt-[1.5rem] mb-[2rem]">
                      <Button type="submit" isDisabled={isFormInvalid}>
                        Pay for Subscription
                      </Button>
                    </div>
                  </form>
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
          title="Subscribed"
          message="Your subscription is on its way"
          onClose={() => {
            fetchUser();
            setIsSuccessModal(false);
          }}
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

export default CableTv;
