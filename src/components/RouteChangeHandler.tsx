import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import kyc from "../assets/dashboard_img/kyc.svg";
import check from "../assets/dashboard_img/profile/Check_round_fill (1).svg";
import cancel from "../assets/dashboard_img/profile/cancel.svg";
import Select from "react-select";
import { AxiosError } from "axios";
import api from "../services/api";
import SuccessModal from "../pages/Logged_in/SuccessModal";
import { useUserStore } from "../store/useUserStore";
import "../App.css";

const customStyleSelect = (hasError: boolean) => ({
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "4px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    border: hasError
      ? "1px solid #f87171"
      : state.isFocused
      ? "2px solid #8003A9"
      : "1px solid #a4a4a4",
    "&:hover": {
      border: hasError
        ? "1px solid #f87171"
        : state.isFocused
        ? "2px solid #8003A9"
        : "1px solid #a4a4a4",
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
      ? "#F8E0FF"
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F",
  }),
});

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

const countryOptions = [
  { value: "Nigeria", label: "Nigeria" },
  { value: "Ghana", label: "Ghana" },
  { value: "Kenya", label: "Kenya" },
  { value: "South-Africa", label: "South Africa" },
  { value: "Egypt", label: "Egypt" },
  { value: "United-States", label: "United States" },
  { value: "Canada", label: "Canada" },
  { value: "United-Kingdom", label: "United Kingdom" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Italy", label: "Italy" },
  { value: "Australia", label: "Australia" },
  { value: "India", label: "India" },
  { value: "China", label: "China" },
  { value: "Japan", label: "Japan" },
  { value: "Brazil", label: "Brazil" },
  { value: "Mexico", label: "Mexico" },
  { value: "Argentina", label: "Argentina" },
  { value: "Spain", label: "Spain" },
  { value: "Netherlands", label: "Netherlands" },
];
const genderOptions = [
  { value: "male", label: "male" },
  { value: "female", label: "female" },
  { value: "other", label: "other" },
];

const options = [
  { value: "Bvn", label: "BVN (recommended)" },
  { value: "Nin", label: "NIN" },
];

type KycModalProps = {
  isVisible?: boolean;
  onClose?: () => void;
};

// const BASE_URL = import.meta.env.VITE_BASE_URL;

const RouteChangeHandler = ({ isVisible, onClose }: KycModalProps) => {
  if (!isVisible) return null;

  const location = useLocation();
  const [selectedVerificationMeans, setSelectedVerificationMeans] =
    useState("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [accountName, setAccountName] = useState("");
  const [accountLastName, setAccountLastName] = useState("");
  const [accountNameError, setAccountNameError] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    verificationMeans: "",
    bvn: "",
    nin: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
    lastName: "",
    firstName: "",
    gender: "",
    dob: "",
  });

  const [errors, setErrors] = useState({
    verificationMeans: "",
    bvn: "",
    nin: "",
    address: "",
    state: "",
    city: "",
    postalCode: "",
    country: "",
    firstName: "",
    lastName: "",
    // middleName: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (showKycModal) {
      setStep(1);
    }
  }, [showKycModal]);

  const { fetchUser } = useUserStore();

  const isKycComplete = useUserStore((state) => state.user?.kycSet);

  // Show the modal after 5 seconds if KYC is not complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isKycComplete && location.pathname === "/dashboard") {
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
      }, 540000);

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
      country: "",
      firstName: "",
      lastName: "",
      // middleName: "",
      gender: "",
      dob: "",
    });
    setStep(1);
    setShowModal(false);
  };

  // API logic for onBlur and handlwSubmit
  const handleBlur = async () => {
    setIsLoading(true);

    const { verificationMeans, nin, bvn, firstName, lastName, country, dob } =
      formData;

    const kycValue = verificationMeans === "Bvn" ? bvn : nin;

    const payload = {
      kycType: verificationMeans,
      kycValue: verificationMeans === "Bvn" ? bvn : nin,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dob,
      country: country,
    };

    if (!kycValue) {
      setAccountNameError("Field is required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/Onboarding/verifyIdentity", payload);
      // const data = response;
      console.log(response);

      const firstName = response?.data?.data?.firstName || "";
      const lastName = response?.data?.data?.lastName || "";
      const statusCode = response?.data?.statusCode || "";

      setAccountName(firstName);
      setAccountLastName(lastName);
      setStatusCode(statusCode);
      console.log(firstName, lastName);
      setAccountNameError("");
      setIsLoading(false);
      return;
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      setAccountName("");
      // console.log(error);
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

    try {
      const response = await api.post("/Onboarding/completeKyc", payload);

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
        country: "",
        firstName: "",
        lastName: "",
        // middleName: "",
        gender: "",
        dob: "",
      });
      setLoading(false);
      return response;
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
      case "dob":
        const dobRegex =
          /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, dob: "Date of birth is required" }));
        } else if (!dobRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            dob: "Enter a valid date in dd/mm/yyyy format",
          }));
        } else {
          setErrors((prev) => ({ ...prev, dob: "" }));
        }
        break;

      case "firstName":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            firstName: "First name is required",
          }));
        } else {
          setErrors((prev) => ({ ...prev, firstName: "" }));
        }
        break;

      case "middleName":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            middleName: "Middle name is required",
          }));
        } else {
          setErrors((prev) => ({ ...prev, middleName: "" }));
        }
        break;

      case "lastName":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            lastName: "Last name is required",
          }));
        } else {
          setErrors((prev) => ({ ...prev, lastName: "" }));
        }
        break;

      case "address":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            address: "Address is required",
          }));
        } else {
          setErrors((prev) => ({ ...prev, address: "" }));
        }
        break;
      case "city":
        if (!value.trim()) {
          setErrors((prev) => ({ ...prev, city: "City is required" }));
        } else {
          setErrors((prev) => ({ ...prev, city: "" }));
        }
        break;

      case "postalCode":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            postalCode: "Postal Code is required",
          }));
        } else if (isNaN(Number(value))) {
          setErrors((prev) => ({
            ...prev,
            postalCode: "Postal Code must be a number",
          }));
        } else {
          setErrors((prev) => ({ ...prev, postalCode: "" }));
        }
        break;

      case "Bvn":
      case "Nin":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: `${fieldName.toUpperCase()} is required`,
          }));
        } else if (!/^\d+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: `${fieldName.toUpperCase()} must be a number`,
          }));
        } else if (value.length !== 11) {
          setErrors((prev) => ({
            ...prev,
            [fieldName]: `${fieldName.toUpperCase()} must be 11 digits`,
          }));
        } else {
          setErrors((prev) => ({ ...prev, [fieldName]: "" }));
        }
        break;

      case "gender":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            gender: "Gender is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            gender: "",
          }));
        }
        break;

      case "verificationMeans":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            verificationMeans: "Verification means is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            verificationMeans: "",
          }));
        }
        break;
      case "state":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            state: "State is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            state: "",
          }));
        }
        break;
      case "country":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            country: "Country is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            country: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleSelectChange = (field: string, selectedOption: any) => {
    const value = selectedOption?.value || "";

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    validateField(field, value);
  };

  const handleVerificationMeansSelectChange = (selectedOption: any) => {
    setSelectedVerificationMeans(selectedOption.value);
    setFormData({
      ...formData,
      verificationMeans: selectedOption.value,
    });
  };

  // const handleStateSelectChange = (
  //   newValue: SingleValue<{ value: string; label: string }>
  // ) => {
  //   if (newValue) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       state: newValue.value,
  //     }));
  //   }
  // };

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
  };

  const closeShowKyc = () => {
    setShowKycModal(false);

    setFormData({
      verificationMeans: "",
      bvn: "",
      nin: "",
      address: "",
      state: "",
      city: "",
      postalCode: "",
      country: "",
      firstName: "",
      lastName: "",
      // middleName: "",
      gender: "",
      dob: "",
    });
  };

  const { bvn, nin, verificationMeans, state, country, dob, gender } = formData;

  const { bvn: _bvn, nin: _nin, ...restFields } = formData;

  const isFormInvalid =
    Object.entries(errors).some(([key, value]) => {
      if (key === "Bvn" || key === "Nin") return false;
      return !!value;
    }) ||
    Object.values(restFields).some((val) => val === "") ||
    !((bvn && !errors.bvn) || (nin && !errors.nin));

  const isAnyRequiredFieldEmpty = [
    verificationMeans,
    state,
    country,
    dob,
    gender,
  ].some((field) => field.trim() === "");

  const hasAnyFieldError = Object.values(errors).some((err) => Boolean(err));

  const isBvnOrNinValid =
    (bvn.trim() !== "" && !errors.bvn) || (nin.trim() !== "" && !errors.nin);

  //Final check
  const isFormInvalidForNextButton =
    isAnyRequiredFieldEmpty || !isBvnOrNinValid || hasAnyFieldError;

  const isSuccess = statusCode === "OK" && accountName;
  const isError = !isLoading && !isSuccess && accountNameError;

  return (
    <>
      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title=""
          message="Your verification details have been submitted successfully."
          onClose={() => {
            fetchUser();
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
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="rounded-[20px] bg-[#fff]/20 p-[0.8rem] w-full max-w-[500px]">
            <div className="bg-white rounded-[15px] w-full h-auto p-6 shadow-xl text-center">
              <div className="flex justify-end">
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
                <div className="flex mt-[1.5rem] items-center w-full justify-center flex-col">
                  <div className="flex items-center justify-center">
                    <img src={kyc} alt="" />
                  </div>

                  <p className="text-[#0A2E65]/60 leading-[1.5rem] w-[90%] text-[20px] mt-2 mb-6">
                    You must complete KYC <br /> to have access to this feature
                  </p>

                  <div className="flex md:w-[90%] w-full mb-[1rem] justify-center gap-4">
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
            {/* <div className="bg-white sm:w-[600px] w-[100vw] sm:h-[70%] h-[min(100dvh,100vh)]  z-[50]   p-6 sm:rounded-[15px] shadow-lg hide-scrollba overflow-y-auto flex flex-col"> */}
            <div
              className="bg-white w-[100vw] sm:w-[600px] 
     h-auto sm:h-[70%] max-h-[100dvh]
     z-[50] p-6 sm:rounded-[15px] shadow-lg 
     overflow-y-auto hide-scrollbar flex flex-col"
            >
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

              {/* SStep tracker */}
              <div className="w-full mt-[2rem] flex items-center justify-center mb-6">
                <div className="flex items-center w-full sm:w-[80%]">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      step >= 1
                        ? "bg-[#8003A9]"
                        : "border-2 border-[#8003A9] bg-transparent"
                    }`}
                  />

                  <div
                    className={`flex-1 h-0.5 transition-all duration-300 ${
                      step >= 2 ? "bg-[#8003A9]" : "bg-[#CCD2E3]/50"
                    }`}
                  />

                  <div
                    className={`h-4 w-4 rounded-full ${
                      step >= 2
                        ? "bg-[#8003A9]"
                        : "border-2 border-[#8003A9] bg-transparent"
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-center w-full items-center">
                <div className="sm:w-[70%] w-full">
                  {/* Input Fields */}
                  <form onSubmit={handleSubmitt}>
                    {step === 1 && (
                      <>
                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left mt-[10px]">
                          Country
                        </p>
                        <div>
                          <Select
                            options={countryOptions}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            menuPortalTarget={document.body}
                            styles={customStyleSelect(
                              !!errors.verificationMeans
                            )}
                            onBlur={() =>
                              validateField("country", formData.country)
                            }
                            value={countryOptions.find(
                              (p) => p.value === formData.country
                            )}
                            onChange={(option) =>
                              handleSelectChange("country", option)
                            }
                            placeholder="Select Country"
                          />
                          {errors.country && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.country}
                            </p>
                          )}
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
                            styles={customStyleSelect(!!errors.state)}
                            onBlur={() =>
                              validateField("state", formData.state)
                            }
                            value={stateOptions.find(
                              (p) => p.value === formData.state
                            )}
                            onChange={(option) =>
                              handleSelectChange("state", option)
                            }
                            placeholder="Select State"
                          />
                          {errors.state && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.state}
                            </p>
                          )}
                        </div>

                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left mt-[1rem] ">
                          Means of Verification
                        </p>
                        <div>
                          <Select
                            options={options}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            styles={customStyleSelect(
                              !!errors.verificationMeans
                            )}
                            onBlur={() =>
                              validateField(
                                "verificationMeans",
                                formData.verificationMeans
                              )
                            }
                            value={options.find(
                              (p) => p.value === formData.verificationMeans
                            )}
                            onChange={handleVerificationMeansSelectChange}
                            placeholder="Select type"
                          />
                          {errors.verificationMeans && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.verificationMeans}
                            </p>
                          )}
                        </div>
                        {selectedVerificationMeans === "Bvn" && (
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
                                // onBlur={handleBlur}

                                onBlur={(e) =>
                                  validateField(e.target.name, e.target.value)
                                }
                                className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                                  errors.bvn
                                    ? "border border-red-600"
                                    : "focus:border-purple-800"
                                }`}
                              />
                              {errors.bvn && (
                                <p className="text-red-500 text-left text-[13px] ">
                                  {errors.bvn}
                                </p>
                              )}
                            </div>
                          </>
                        )}

                        {selectedVerificationMeans === "Nin" && (
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
                                // onBlur={handleBlur}
                                onBlur={(e) =>
                                  validateField(e.target.name, e.target.value)
                                }
                                className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                                  errors.nin
                                    ? "border border-red-600"
                                    : "focus:border-purple-800"
                                }`}
                              />
                              {errors.nin && (
                                <p className="text-red-500 text-left text-[13px] ">
                                  {errors.nin}
                                </p>
                              )}
                            </div>
                          </>
                        )}

                        <div className="flex gap-[1rem] w-full ">
                          {/* City Field (65%) */}
                          <div className="flex flex-col w-[65%]">
                            <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px]">
                              Gender
                            </p>
                            <div className="w-full">
                              <Select
                                options={genderOptions}
                                getOptionLabel={(e) => e.label}
                                getOptionValue={(e) => e.value}
                                value={genderOptions.find(
                                  (p) => p.value === formData.gender
                                )}
                                styles={customStyleSelect(!!errors.gender)}
                                onChange={(option) =>
                                  handleSelectChange("gender", option)
                                }
                                onBlur={() =>
                                  validateField("gender", formData.gender)
                                }
                                placeholder="Select Gender"
                              />
                            </div>
                            {errors.gender && (
                              <p className="text-red-500 text-left text-[13px] ">
                                {errors.gender}
                              </p>
                            )}
                          </div>

                          {/* Postal Code Field (35%) */}
                          <div className="flex flex-col w-[35%]">
                            <div className="mt-[10px] flex justify-between items-center">
                              <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left">
                                Date of Birth
                              </p>
                            </div>
                            <div className="w-full mb-4">
                              <input
                                type="text"
                                placeholder="20/12/2001"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                onBlur={(e) =>
                                  validateField(e.target.name, e.target.value)
                                }
                                className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                                  errors.dob
                                    ? "border border-red-600"
                                    : "focus:border-purple-800"
                                }`}
                              />
                              {errors.dob && (
                                <p className="text-red-500 text-left text-[13px] mt-1">
                                  {errors.dob}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Display account name and last name */}
                    {step === 2 && (
                      <>
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
                            onBlur={(e) =>
                              validateField(e.target.name, e.target.value)
                            }
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.address
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                          First Name
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="John"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            onBlur={(e) =>
                              validateField(e.target.name, e.target.value)
                            }
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.firstName
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />

                          {errors.firstName && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        <p className="text-[#0A2E65]/60 pb-[1px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                          Last Name
                        </p>
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Doe"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            onBlur={async (e) => {
                              validateField(e.target.name, e.target.value);
                              await handleBlur();
                            }}
                            className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.lastName
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            }`}
                          />

                          {errors.lastName && (
                            <p className="text-red-500 text-left text-[13px] ">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                        {isLoading ? (
                          <p className="text-sm text-gray-500 flex items-center ">
                            Verifying
                            <span className="loading-dots text-lg font-semibold"></span>
                          </p>
                        ) : isSuccess ? (
                          <div className="flex ml-1 text-[14px] items-center gap-1">
                            <img src={check} alt="" />
                            <div className="flex justify-center items-center gap-1.5">
                              <p>{accountName}</p>
                              <p>{accountLastName}</p>
                            </div>
                          </div>
                        ) : isError ? (
                          <p className="text-sm text-red-500">
                            {accountNameError ||
                              "An error occurred. Please try again."}
                          </p>
                        ) : null}

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
                                onBlur={(e) =>
                                  validateField(e.target.name, e.target.value)
                                }
                                className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                                  errors.city
                                    ? "border border-red-600"
                                    : "focus:border-purple-800"
                                }`}
                              />
                              {errors.city && (
                                <p className="text-red-500 text-left text-[13px] ">
                                  {errors.city}
                                </p>
                              )}
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
                                onBlur={(e) =>
                                  validateField(e.target.name, e.target.value)
                                }
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
                      </>
                    )}

                    {/* Button Group */}
                    <div className="flex w-full flex-col md:flex-row gap-3 mb-[2rem] mt-6">
                      {step === 2 && (
                        <>
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full md:w-1/2 cursor-pointer border border-[#8003A9] text-[#8003A9] py-3 text-[17px] px-4 rounded-md"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isFormInvalid}
                            className={`w-full md:w-1/2 py-3 text-[17px] px-4 rounded-md transition-colors duration-300 ${
                              isFormInvalid
                                ? "cursor-not-allowed bg-[#8003A9]/50 text-white"
                                : "cursor-pointer bg-[#8003A9] text-white"
                            }`}
                          >
                            Complete KYC
                          </button>
                        </>
                      )}

                      {step === 1 && (
                        <button
                          type="button"
                          disabled={isFormInvalidForNextButton}
                          onClick={() => setStep(2)}
                          className={`w-full bg-[#8003A9] cursor-pointer text-white py-3 text-[17px] px-4 rounded-md ${
                            isFormInvalidForNextButton
                              ? "cursor-not-allowed bg-[#8003A9]/50 text-white"
                              : "cursor-pointer bg-[#8003A9] text-white"
                          }`}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </form>
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
