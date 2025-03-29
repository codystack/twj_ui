import { useState } from "react";
import Dataimg from "../../../../assets/dashboard_img/dashboard_icons/ooui_network.svg";
import dataBg from "../../../../assets/dashboard_img/databg.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select from "react-select";
import Button from "../../../../components/Button";
// import check from "../../../../assets/dashboard_img/profile/Check_round_fill (1).svg";
import MTN from "../../../../assets/dashboard_img/profile/MTN-icon 1.svg";
import ninemobile from "../../../../assets/dashboard_img/profile/9mobile-icon 1.svg";
import gloo from "../../../../assets/dashboard_img/profile/glo-icon 1.svg";
import airtel from "../../../../assets/dashboard_img/profile/airtel-icon 1.svg";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

interface Option {
  value: string;
  label: string;
  amount: string;
}
const options: Option[] = [
  { value: "mtn_1gb", label: "MTN 1GB", amount: "₦500" },
  { value: "mtn_5gb", label: "MTN 5GB", amount: "₦2,000" },
  { value: "mtn_10gb", label: "MTN 10GB", amount: "₦3,500" },
  { value: "airtel_1.5gb", label: "Airtel 1.5GB", amount: "₦1,000" },
  { value: "airtel_6gb", label: "Airtel 6GB", amount: "₦2,500" },
  { value: "airtel_10gb", label: "Airtel 10GB", amount: "₦3,000" },
  { value: "glo_2gb", label: "Glo 2GB", amount: "₦1,200" },
  { value: "glo_7gb", label: "Glo 7GB", amount: "₦2,500" },
  { value: "glo_10gb", label: "Glo 10GB", amount: "₦3,000" },
  { value: "9mobile_1gb", label: "9Mobile 1GB", amount: "₦1,000" },
  { value: "9mobile_5gb", label: "9Mobile 5GB", amount: "₦3,000" },
  { value: "9mobile_10gb", label: "9Mobile 10GB", amount: "₦5,000" },
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
// Function to display plan + price in dropdown
const getOptionLabel = (e: Option) => `${e.label} - ${e.amount}`;

const Data = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    // customerId: "",
    amount: "",
    plans: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    customerId: "",
    amount: "",
    plans: "",
  });

  const [activeImage, setActiveImage] = useState<string>("MTN");

  const images = [
    { id: "MTN", src: MTN, alt: "MTN" },
    { id: "gloo", src: gloo, alt: "Glo" },
    { id: "airtel", src: airtel, alt: "Airtel" },
    { id: "ninemobile", src: ninemobile, alt: "9Mobile" },
  ];
//   const handleSelectChange = async (
//     selectedOption: { value: string; label: string } | null
//   ) => {
//     if (!selectedOption) return;

//     const selectedBankCode = selectedOption.value;
//     const uniqueBankName = selectedOption.label;

//     setFormData((prev) => ({
//       ...prev,
//       bankCode: selectedBankCode,
//       selectedBank: uniqueBankName,
//     }));

//     // if (formData.betProvider) {
//     //   await verifyAccount(selectedBankCode, formData.betProvider);
//     // }
//   };

  //   switch (fieldName) {
  //     case "accountNumber":
  //       const accountNumberRegex = /^[0-9]+$/; // Only allows numbers
  //       if (!value.trim()) {
  //         setErrors((prev) => ({
  //           ...prev,
  //           accountNumber: "This field is required",
  //         }));
  //       } else if (!accountNumberRegex.test(value)) {
  //         setErrors((prev) => ({
  //           ...prev,
  //           accountNumber: "Please enter a valid account number",
  //         }));
  //       } else {
  //         setErrors((prev) => ({
  //           ...prev,
  //           accountNumber: "",
  //         }));
  //       }
  //       break;

  //     case "selectedBank":
  //       if (!value.trim()) {
  //         setErrors((prev) => ({
  //           ...prev,
  //           selectedBank: "Please select a bank",
  //         }));
  //       } else {
  //         setErrors((prev) => ({
  //           ...prev,
  //           selectedBank: "",
  //         }));
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  // Validation function
  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = "";

    switch (name) {
      case "amount":
        if (!value) error = "please enter a valid amount";
        else if (isNaN(Number(value))) error = "Amount must be a number";
        break;

      case "phoneNumber":
        if (!value) error = "Phone number is required";
        else if (typeof value === "string" && !isValidPhoneNumber(value)) {
          error = "Invalid phone number";
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

    // Remove the naira sign and commas when updating state
    const numericValue = value.replace(/[₦,]/g, "");
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));

    validateField(name, numericValue);
  };


  const handlePhoneNumberChange = (value: string | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNumber: value || "",
    }));

    validateField("phoneNumber", value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Clear form logic can be added here
    setIsModalOpen(false);
  };
  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.phoneNumber ||
    !formData.plans;

  // Handle selection change
  const handleSelectChange = (selectedOption: any) => {
    setFormData((prev) => ({
      ...prev,
      plans: selectedOption.value,
      amount: selectedOption.amount.toString(),
    }));
  };
  

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
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
            <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Data Subscription
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="w-[70%]">
                  {/* Input Fields */}
                  <form action="">
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] mt-[1.5rem] text-[15px] text-left  ">
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
                          onClick={() => setActiveImage(image.id)}
                        >
                          <img src={image.src} alt={image.alt} />
                        </div>
                      ))}
                    </div>

                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left  ">
                    Data Plan
                    </p>
                    <div>
                      {/* <Select
                        options={options}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.plans
                        )}
                        onChange={handleSelectChange}
                        placeholder="Provider"
                      /> */}

                      <Select
                        options={options}
                        getOptionLabel={getOptionLabel}
                        getOptionValue={(e) => e.value}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.plans
                        )}
                        onChange={handleSelectChange}
                        placeholder="Select Plan"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px] ">
                      Phone Number
                    </p>
                    <div className="w-full ">
                      <PhoneInput
                        placeholder=""
                        defaultCountry="NG"
                        value={formData.phoneNumber}
                        onChange={handlePhoneNumberChange}
                        style={
                          {
                            "--PhoneInputCountrySelect-marginRight": "0em",
                            borderRadius: "0.375rem",
                            ...(errors.phoneNumber && {
                              border: "1px solid red", // Override with red border if there's an error
                            }),
                          } as React.CSSProperties
                        }
                      />
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
                        <span className="text-[#0A2E65]/60">234,500</span>
                      </div>
                    </div>
                    <div className="w-full mb-4">
                      <input
                        type="text"
                        placeholder="₦0.00"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.customerId
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
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        // isLoading={isSubmitting}
                      >
                        Buy Data
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

export default Data;
