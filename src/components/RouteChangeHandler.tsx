import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import kyc from "../assets/dashboard_img/kyc.svg";
import cancel from "../assets/dashboard_img/profile/cancel.svg";
import Button from "./Button";
import Select from "react-select";
import { AxiosError } from "axios";
import api from "../services/api";
import { SingleValue } from "react-select";
import check from "../assets/dashboard_img/profile/Check_round_fill (1).svg";
import SuccessModal from "../pages/Logged_in/SuccessModal";

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
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
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

const stateOptions = [
  { label: "Abia State", value: "abia" },
  { label: "Adamawa State", value: "adamawa" },
  { label: "Akwa Ibom State", value: "akwa-ibom" },
  { label: "Anambra State", value: "anambra" },
  { label: "Bauchi State", value: "bauchi" },
  { label: "Bayelsa State", value: "bayelsa" },
  { label: "Benue State", value: "benue" },
  { label: "Borno State", value: "borno" },
  { label: "Cross River State", value: "cross-river" },
  { label: "Delta State", value: "delta" },
  { label: "Ebonyi State", value: "ebonyi" },
  { label: "Edo State", value: "edo" },
  { label: "Ekiti State", value: "ekiti" },
  { label: "Enugu State", value: "enugu" },
  { label: "Federal Capital Territory", value: "fct" },
  { label: "Gombe State", value: "gombe" },
  { label: "Imo State", value: "imo" },
  { label: "Jigawa State", value: "jigawa" },
  { label: "Kaduna State", value: "kaduna" },
  { label: "Kano State", value: "kano" },
  { label: "Katsina State", value: "katsina" },
  { label: "Kebbi State", value: "kebbi" },
  { label: "Kogi State", value: "kogi" },
  { label: "Kwara State", value: "kwara" },
  { label: "Lagos State", value: "lagos" },
  { label: "Nasarawa State", value: "nasarawa" },
  { label: "Niger State", value: "niger" },
  { label: "Ogun State", value: "ogun" },
  { label: "Ondo State", value: "ondo" },
  { label: "Osun State", value: "osun" },
  { label: "Oyo State", value: "oyo" },
  { label: "Plateau State", value: "plateau" },
  { label: "Rivers State", value: "rivers" },
  { label: "Sokoto State", value: "sokoto" },
  { label: "Taraba State", value: "taraba" },
  { label: "Yobe State", value: "yobe" },
  { label: "Zamfara State", value: "zamfara" },
];

const options = [
  { value: "bvn", label: "BVN (recommended)" },
  { value: "nin", label: "NIN" },
];

type KycModalProps = {
  isVisible?: boolean;
  onClose?: () => void;
};

// const BASE_URL = import.meta.env.VITE_BASE_URL;

const RouteChangeHandler = ({ isVisible, onClose }: KycModalProps) => {
  if (!isVisible) return null;

  const location = useLocation();
  //   const navigate = useNavigate();
  const [selectedVerificationMeans, setSelectedVerificationMeans] =
    useState("");

  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountLastName, setAccountLastName] = useState<string | null>(null);
  const [accountNameError, setAccountNameError] = useState<string | null>(null);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [formData, setFormData] = useState({
    verificationMeans: "",
    bvn: "",
    nin: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({
    verificationMeans: "",
    bvn: "",
    nin: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
  });
  // Show the modal after 5 seconds if KYC is not complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      const kycComplete = localStorage.getItem("kycComplete");
      if (kycComplete !== "true" && location.pathname === "/dashboard") {
        setShowModal(true);
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // Auto-close modal after 9 minutes of inactivity
  useEffect(() => {
    if (showModal) {
      const autoClose = setTimeout(() => {
        setShowModal(false);
      }, 540000); // 9 minutes

      return () => clearTimeout(autoClose);
    }
  }, [showModal]);

  // Close the modal
  const closeModal = () => {
    setFormData({
      verificationMeans: "",
      bvn: "",
      nin: "",
      address: "",
      state: "",
      city: "",
      postalCode: "",
    });
    setShowModal(false);
  };

  // API logic for onBlur and handlwSubmit
  const handleBlur = async () => {
    setIsLoading(true);

    const { verificationMeans, nin, bvn } = formData;
    const payload = {
      kycType: verificationMeans,
      kycValue: verificationMeans === "bvn" ? bvn : nin,
    };

    try {
      const response = await api.post("/Onboarding/verifyIdentity", payload);
      const data = response;

      const firstName = data?.data.data.firstName;
      const lastName = data?.data.data.lastName;
      setAccountName(firstName);
      setAccountLastName(lastName);
      console.log(firstName, lastName);
      setAccountNameError(null);
      setIsLoading(false);
      return;
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      setAccountName(null);
      setAccountNameError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit below
  const handleSubmitt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { address, state, city, postalCode } = formData;

    const payload = {
      street: address,
      city: city,
      state: state,
      postalCode: postalCode,
    };

    // console.log(payload);

    try {
      const response = await api.post("/Onboarding/completeKyc", payload);

      console.log(response);
      setShowKycModal(false);
      setIsSuccessModal(true);
      localStorage.setItem("kycComplete", "true");
      setFormData({
        verificationMeans: "",
        bvn: "",
        nin: "",
        address: "",
        state: "",
        city: "",
        postalCode: "",
      });
      setAccountLastName("");
      setAccountName("");
      setLoading(false);
      return;
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      console.log(errorMessage);
    } finally {
      setLoading(false);
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
            amount: "Amount must be greater than or equal to 1000",
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

  const handleSelectChange = (selectedOption: any) => {
    setSelectedVerificationMeans(selectedOption.value);
    setFormData({
      ...formData,
      verificationMeans: selectedOption.value,
    });
  };

  // const  = (
  const handleStateSelectChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      setFormData((prev) => ({
        ...prev,
        state: newValue.value,
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    validateField(name, value);
  };

  // Navigate to the KYC completion page
  const proceedToKyc = () => {
    setSelectedVerificationMeans("");
    setShowModal(false);
    setShowKycModal(true);
    // navigate("/complete-kyc");
  };

  const closeShowKyc = () => {
    setShowKycModal(false);
    setAccountLastName("");
    setAccountName("");
    setFormData({
      verificationMeans: "",
      bvn: "",
      nin: "",
      address: "",
      state: "",
      city: "",
      postalCode: "",
    });
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.city ||
    !formData.state ||
    !formData.address ||
    !formData.postalCode ||
    !accountName ||
    !accountLastName;

  return (
    <>
      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title=""
          message="Your verifications details have been submitted successfully."
          onClose={() => {
            setIsSuccessModal(false);
          }}
        />
      )}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-[999999]">
          <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white rounded-[15px] w-[500px]  p-6 shadow-xl text-center">
              <div className="flex mr-[5px] mt-[5px] flex-row-reverse ">
                <button
                  onClick={() => {
                    closeModal();
                    onClose?.();
                  }}
                  className="text-gray-500 cursor-pointer p-[5px] hover:text-gray-700 text-sm"
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex justify-center items-center">
                <div className=" flex mt-[1.5rem] items-center w-[80%] justify-center flex-col ">
                  <div className="flex items-center justify-center">
                    <img src={kyc} alt="" />
                  </div>
                  <p className="text-[#0A2E65]/60 leading-[1.5rem] w-[90%] text-[20px] mt-2 mb-6">
                    You must complete KYC <br /> to have access to this feature
                  </p>

                  <div className="flex  w-full mb-[1rem] justify-center gap-4">
                    <button
                      onClick={proceedToKyc}
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
      )}

      {showKycModal && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  backdrop-blur-sm  z-[50]">
          {/* Dialog Box */}
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] h-auto overflow-auto shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Account Verification(KYC)
                </h3>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    closeShowKyc();
                    onClose?.();
                  }}
                >
                  <img src={cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center w-full items-center">
                <div className="w-[70%]">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmitt}>
                    <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left mt-[1.5rem] ">
                      Means of Verification
                    </p>
                    <div>
                      <Select
                        options={options}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        styles={customStyles}
                        value={options.find(
                          (p) => p.value === formData.verificationMeans
                        )}
                        onChange={handleSelectChange}
                        placeholder="Select type"
                      />
                    </div>
                    {selectedVerificationMeans === "bvn" && (
                      <>
                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                          BVN
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="20864529561"
                            name="bvn"
                            value={formData.bvn}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.bvn
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />
                        </div>
                      </>
                    )}

                    {selectedVerificationMeans === "nin" && (
                      <>
                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                          NIN
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="12345678901"
                            name="nin"
                            value={formData.nin}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.nin
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />
                        </div>
                      </>
                    )}

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
                            {accountName} {accountLastName}
                          </p>
                        </>
                      )}
                    </div>

                    <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                      Address
                    </p>
                    <div className="w-full">
                      <input
                        type="text"
                        placeholder="Street Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.address
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        }`}
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left mt-[10px]">
                      State
                    </p>
                    <div>
                      <Select
                        options={stateOptions}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        menuPortalTarget={document.body}
                        styles={customStyles}
                        value={options.find((p) => p.value === formData.state)}
                        onChange={handleStateSelectChange}
                        placeholder="Select State"
                      />
                    </div>

                    <div className="flex gap-[1rem] w-full ">
                      {/* City Field (65%) */}
                      <div className="flex flex-col w-[65%]">
                        <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px]">
                          City
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Enter City"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.city
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                            // options={options}
                            // getOptionLabel={(e) => e.label}
                            // getOptionValue={(e) => e.value}
                            // styles={customStyles}
                            // value={options.find(
                            //   (option) => option.value === formData.city
                            // )}
                            // placeholder="city"
                          />
                        </div>
                      </div>

                      {/* Postal Code Field (35%) */}
                      <div className="flex flex-col w-[35%]">
                        <div className="mt-[10px] flex justify-between items-center">
                          <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left">
                            Postal Code
                          </p>
                        </div>
                        <div className="w-full mb-4">
                          <input
                            type="text"
                            placeholder="203110"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                              errors.postalCode
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-left text-[13px] mt-1">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-[0.5rem] mb-[1.5rem]">
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        // isLoading={isSubmitting}
                      >
                        Complete KYC
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
    </>
  );
};

export default RouteChangeHandler;
