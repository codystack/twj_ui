import { useState } from "react";
import Dataimg from "../../../../assets/dashboard_img/dashboard_icons/ooui_network.svg";
import dataBg from "../../../../assets/dashboard_img/databg.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select from "react-select";
import Button from "../../../../components/Button";
import MTN from "../../../../assets/dashboard_img/profile/MTN-icon 1.svg";
import ninemobile from "../../../../assets/dashboard_img/profile/9mobile-icon 1.svg";
import gloo from "../../../../assets/dashboard_img/profile/glo-icon 1.svg";
import airtel from "../../../../assets/dashboard_img/profile/airtel-icon 1.svg";
import { useModalStore } from "../../../../store/modalStore";
import api from "../../../../services/api";
import PinModal from "./PinModal";
import SetPinModal from "./SetPinModal";
import SuccessModal from "../../SuccessModal";
import cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import alarmIcon from "../../../../assets/dashboard_img/profile/Alarm_duotone.svg";
import { useUserStore } from "../../../../store/useUserStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Option {
  value: string;
  label: string;
  amount: string;
  name: string;
}

const options: Option[] = [
  { value: "mtn_1gb", label: "MTN 1GB", amount: "₦500", name: "MTN" },
  { value: "mtn_5gb", label: "MTN 5GB", amount: "₦2,000", name: "MTN" },
  { value: "mtn_10gb", label: "MTN 10GB", amount: "₦3,500", name: "MTN" },
  {
    value: "airtel_1.5gb",
    label: "Airtel 1.5GB",
    amount: "₦1,000",
    name: "MTN",
  },
  { value: "airtel_6gb", label: "Airtel 6GB", amount: "₦2,500", name: "MTN" },
  { value: "airtel_10gb", label: "Airtel 10GB", amount: "₦3,000", name: "MTN" },
  { value: "glo_2gb", label: "Glo 2GB", amount: "₦1,200", name: "MTN" },
  { value: "glo_7gb", label: "Glo 7GB", amount: "₦2,500", name: "MTN" },
  { value: "glo_10gb", label: "Glo 10GB", amount: "₦3,000", name: "MTN" },
  { value: "9mobile_1gb", label: "9Mobile 1GB", amount: "₦1,000", name: "MTN" },
  { value: "9mobile_5gb", label: "9Mobile 5GB", amount: "₦3,000", name: "MTN" },
  {
    value: "9mobile_10gb",
    label: "9Mobile 10GB",
    amount: "₦5,000",
    name: "MTN",
  },
];

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
      ? "#F8E0FF" // Hover background color
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
  }),
};
// Function to display plan + price in dropdown
const getOptionLabel = (e: Option) => `${e.name} -  ₦${e.amount}`;

const Data = () => {
  const { user, fetchUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    network: "",
    amount: "",
    plans: "",
  });

  const [errors, setErrors] = useState({
    recipient: "",
    amount: "",
    plans: "",
  });

  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [proceedToSetPin, setProceedToSetPin] = useState(false); // State to track if the user should proceed to set a PIN
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);

  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPlan = useModalStore((state) => state.fetchPlan);
  const { plan, isFetchingPlan } = useModalStore();

  const images = [
    { id: "mtn", src: MTN, alt: "MTN" },
    { id: "glo", src: gloo, alt: "Glo" },
    { id: "airtel", src: airtel, alt: "Airtel" },
    { id: "9mobile", src: ninemobile, alt: "9Mobile" },
  ];

  // Validation function
  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = "";

    switch (name) {
      case "amount":
        if (!value) {
          error = "Please enter a valid amount";
        } else if (isNaN(Number(value))) {
          error = "Amount must be a number";
        } else if (Number(value) <= 100) {
          error = "Amount must be greater than 100";
        }
        break;

      case "recipient":
        if (!value) {
          error = "Phone number is required";
        } else if (typeof value === "string") {
          if (!/^\d+$/.test(value)) {
            error = "Phone number must contain only numbers";
          } else if (value.length !== 11) {
            error = "Please enter a valid phone number (11 digits)";
          }
        } else {
          error = "Invalid input";
        }
        break;

      default:
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[₦,]/g, "");

    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));

    validateField(name, numericValue);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveImage(null);
    setFormData({ recipient: "", amount: "", plans: "", network: "" });
    setErrors({ recipient: "", amount: "", plans: "" });
    setIsModalOpen(false);
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.recipient ||
    !formData.network ||
    !formData.plans;

  const handleSelectChange = (selectedOption: any) => {
    if (!selectedOption) {
      return;
    }

    console.log("Selected Option:", selectedOption);

    setFormData((prev) => ({
      ...prev,
      plans: selectedOption.plan_code,
      amount: selectedOption.amount?.toString() || "",
    }));
  };

  const handleImageSelect = async (id: string) => {
    setIsLoading(true);
    await fetchPlan(id);
    setIsLoading(false);
  };

  const setImage = (imageId: string) => {
    setActiveImage(imageId);
    setFormData((prevData) => ({
      ...prevData,
      network: imageId,
    }));
  };

  const isPasscodeSet = () => localStorage.getItem("passcodeSet") === "true";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);

    setTimeout(() => {
      setShowPinModal(true);
      setShouldCheckPasscode(true);
      setProceedToSetPin(false);
    }, 200);
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          // Proceed with Airtime Purchase
          const { network, amount, recipient, plans } = formData;

          const purchaseResponse = await api.post(
            `${BASE_URL}/BillsPayment/purchaseData`,
            {
              network: network,
              amount: Number(amount),
              recipient: recipient,
              plan: plans,
            }
          );

          // if (!purchaseResponse.data.isSuccessful) {
          //   throw new Error(
          //     purchaseResponse.data.message || "An error occurred"
          //   );
          // }
          if (purchaseResponse.data.statusCode !== "OK") {
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

  return (
    <>
      <button
        onClick={openModal}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}

          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white sm:w-[600px] w-[100vw] sm:h-auto  overflow-y-auto   z-[50] h-[min(100dvh,100vh)] max-h-screen   py-6 px-4 sm:rounded-[15px]  flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="sm:text-[17px] text-[20px] tracking-[1px]  text-[#27014F] ">
                  Data Subscription
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img className="sm:w-4 w-5" src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="sm:w-[70%] w-full">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit}>
                    <p className="text-[#0A2E65]/60 pb-[3px] mb-[5px] pl-[5px] sm:mt-[1.5rem] mt-[2.5rem] text-[16px] text-left  ">
                      Choose Network
                    </p>
                    <div className="flex items-center justify-around p-2 rounded-[5px] border border-[#D0DAE6]">
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className={` rounded-full cursor-pointer ${
                            activeImage === image.id
                              ? "border-3 border-[#9605C5]"
                              : "border-transparent"
                          }`}
                          onClick={() => {
                            handleImageSelect(image.id);
                            setImage(image.id);
                          }}
                        >
                          <img src={image.src} alt={image.alt} />
                        </div>
                      ))}
                    </div>

                    <p className="text-[#0A2E65]/60 mt-[16px] sm:mt-[10px] pb-[3px] mb-[5px] pl-[5px] text-[16px] text-left  ">
                      Data Plan
                    </p>
                    <div>
                      <Select
                        options={plan}
                        isLoading={isFetchingPlan}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={(e) => e.value}
                        styles={customStyles}
                        value={options.find(
                          (options: any) => options.value === formData.plans
                        )}
                        // value={plan.find((plan: any) => plan.value === formData.plans) ?? null}

                        onChange={handleSelectChange}
                        placeholder="Select Plan"
                      />
                    </div>

                    <p className="text-[#0A2E65]/60 mt-[16px] sm:mt-[10px] pb-[3px] mb-[5px] pl-[5px] text-[16px] text-left  ">
                      Phone Number
                    </p>

                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="08153235634"
                        name="recipient"
                        value={formData.recipient}
                        onChange={handleChange}
                        onBlur={() =>
                          validateField("recipient", formData.recipient)
                        }
                        className={`p-4 px-3 border text-[16px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                          errors.recipient
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        }`}
                      />
                      {errors.recipient && (
                        <p className="text-red-500 text-[13px] text-left">
                          {errors.recipient}
                        </p>
                      )}
                    </div>

                    <div className=" mt-[16px] sm:mt-[10px] pb-[3px] mb-[5px] flex justify-between items-center">
                      <p className="text-[#0A2E65]/60 pl-[5px] text-[16px] pb-[3px] text-left   ">
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
                        type="text"
                        placeholder="₦0.00"
                        name="amount"
                        readOnly
                        value={formData.amount}
                        onChange={handleChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-4 px-3 border text-[16px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.amount
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-[14px] text-left">
                          {errors.amount}
                        </p>
                      )}
                    </div>

                    <div className="w-full sm:mt-[1.5rem] mt-[2.5rem] mb-[2rem]">
                      <Button type="submit" isDisabled={isFormInvalid}>
                        Buy Data
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
      {showPinModal &&
        // shouldCheckPasscode &&
        !isPasscodeSet() &&
        proceedToSetPin && (
          <SetPinModal onClose={() => setShowPinModal(false)} />
        )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Recharged"
          message="Your data is on its way"
          onClose={() => {
            fetchUser();
            closeModal();
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

export default Data;
