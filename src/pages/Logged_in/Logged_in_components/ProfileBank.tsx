import { useEffect, useState } from "react";
import BankIcon from "../../../assets/dashboard_img/profile/Bank_icon.svg";
import AddRing from "../../../assets/dashboard_img/profile/Add_ring_light.svg";
import BgImage from "../../../assets/dashboard_img/profile/atmcard.jpg";
import Select from "react-select";
import bankIcon from "../../../assets/dashboard_img/profile/Bankicon.svg";
import Check from "../../../assets/dashboard_img/profile/Check_round_fill (1).svg";

import DeleteAccount from "../../../assets/dashboard_img/profile/Trash_duotone_line.svg";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
const options = [
  { label: "Access Bank Plc", value: "Access Bank Plc" },
  { label: "Citibank Nigeria Ltd", value: "Citibank Nigeria Ltd" },
  { label: "Ecobank Nigeria Plc", value: "Ecobank Nigeria Plc" },
  { label: "Fidelity Bank Plc", value: "Fidelity Bank Plc" },
  { label: "First Bank Nigeria Ltd", value: "First Bank Nigeria Ltd" },
  {
    label: "First City Monument Bank Plc",
    value: "First City Monument Bank Plc",
  },
  { label: "Globus Bank Ltd", value: "Globus Bank Ltd" },
  { label: "Guaranty Trust Bank Plc", value: "Guaranty Trust Bank Plc" },
  { label: "Keystone Bank Ltd", value: "Keystone Bank Ltd" },
  { label: "Nova Commercial Bank Ltd", value: "Nova Commercial Bank Ltd" },
  { label: "Optimus Bank", value: "Optimus Bank" },
  { label: "Parallex Bank Ltd", value: "Parallex Bank Ltd" },
  { label: "Polaris Bank Plc", value: "Polaris Bank Plc" },
  { label: "Premium Trust Bank", value: "Premium Trust Bank" },
  { label: "Providus Bank Ltd", value: "Providus Bank Ltd" },
  { label: "Signature Bank Ltd", value: "Signature Bank Ltd" },
  { label: "Stanbic IBTC Bank Plc", value: "Stanbic IBTC Bank Plc" },
  {
    label: "Standard Chartered Bank Nigeria Ltd",
    value: "Standard Chartered Bank Nigeria Ltd",
  },
  { label: "Sterling Bank Plc", value: "Sterling Bank Plc" },
  { label: "SunTrust Bank Nigeria Ltd", value: "SunTrust Bank Nigeria Ltd" },
  { label: "Titan Trust Bank Ltd", value: "Titan Trust Bank Ltd" },
  { label: "Union Bank of Nigeria Plc", value: "Union Bank of Nigeria Plc" },
  { label: "United Bank For Africa Plc", value: "United Bank For Africa Plc" },
  { label: "Unity Bank Plc", value: "Unity Bank Plc" },
  { label: "Wema Bank Plc", value: "Wema Bank Plc" },
  { label: "Zenith Bank Plc", value: "Zenith Bank Plc" },
];

const accounts = [
  {
    id: 1,
    name: "John Doe",
    accountNumber: "2364238745",
    bank: "Sterling Bank",
  },
  {
    id: 2,
    name: "Jane Smith",
    accountNumber: "9823746123",
    bank: "GTBank",
  },
  {
    id: 3,
    name: "David Johnson",
    accountNumber: "5678234910",
    bank: "Access Bank",
  },
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
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#8003A9" : "#fff",
  }),
};

const ProfileBank = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    selectedBank: "",
  });
  const [errors, setErrors] = useState({
    accountNumber: "",
    selectedBank: "",
  });
  const [name, setName] = useState("");

  // const [isFlipped, setIsFlipped] = useState(false);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
  };

  const handleAddBank = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFormData({ accountNumber: "", selectedBank: "" });
  };

  // const handleSubmit = () => {
  //   // console.log("Bank Details:", { formD, selectedBank });
  //   handleClose(); // Close modal after submission
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Dynamically update based on input `name`
    }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData((prev) => ({
      ...prev,
      selectedBank: selectedOption.value, // Update selected bank
    }));
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

      case "selectedBank":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            selectedBank: "Please select a bank",
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

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.accountNumber ||
    !formData.selectedBank;

  useEffect(() => {
    // Get email and name from localStorage
    // const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("name");

    // setEmail(storedEmail ?? ""); // Use empty string if null
    setName(storedName ?? "");
  }, []);

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4 justify-center">
        {/* Add Bank Button Styled Like a Card */}
        <button
          onClick={handleAddBank}
          className="h-[182px] w-[320px] border flex flex-col items-center justify-center cursor-pointer border-[#D0DAE6] hover:border-[#8003A9] transition duration-300 rounded-[10px]"
        >
          <img src={AddRing} alt="" />
          <p className="text-[#8003A9]">Add bank account</p>
        </button>

        {/* Account Cards */}
        {accounts.map(({ id, name, accountNumber, bank }) => (
          <div
            key={id}
            className="relative w-[320px] h-[182px] cursor-pointer"
            onClick={() => handleFlip(id)}
          >
            <div
              className={`relative w-full h-full rounded-[10px] overflow-hidden bg-cover bg-center transition-transform duration-500 ${
                flippedId === id ? "rotate-y-180" : ""
              }`}
              style={{
                backgroundImage: `url(${BgImage})`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-3 bg-[#8003A9]/80 text-white ${
                  flippedId !== id ? "block" : "hidden"
                }`}
              >
                <div className="absolute top-3 right-3 text-xl">
                  <img src={BankIcon} alt="Bank Icon" />
                </div>
                <div className="absolute bottom-3 left-3 leading-[1.1rem]">
                  <p className="text-[16px] font-semibold">{name}</p>
                  <p className="text-[14px]">{accountNumber}</p>
                  <p className="text-[12px]">{bank}</p>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-[#D32F2F]/90 text-white transform rotate-y-180 ${
                  flippedId === id ? "block" : "hidden"
                }`}
              >
                <button className="relative group bg-white p-[0.5rem] flex items-center justify-center rounded-full cursor-pointer">
                  <img
                    src={DeleteAccount}
                    alt="Delete Icon"
                    className="w-8  h-8"
                  />
                  {/* Tooltip */}
                  <span className="absolute w-full whitespace-nowrap text-[15px] bottom-full mb-0 left-1/2 -translate-x-1/2 text-white text-xs py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Delete account details
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20 bg-opacity-50">
          <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white p-6 rounded-[20px] text-[#27014F] shadow-lg w-[600px]">
              <div className="flex justify-end">
                <button
                  onClick={handleClose}
                  className="flex p-[10px] mr-[10px] cursor-pointer items-center"
                >
                  <img src={Delete} alt="" />
                </button>
              </div>
              <div className="flex items-center justify-center flex-col my-[1rem]">
                <img src={bankIcon} className="my-[1rem]" alt="" />
                <h2 className="text-lg font-semibold">Add Bank Account</h2>
                <p className="text-[#0A2E65]/60 text-[12px]">
                  Withdrawals are paid into your bank account
                </p>
              </div>
              <div className="flex flex-col mt-[10px] items-center justify-center">
                <div className=" w-[60%] ">
                  {/* Account Number Input */}
                  {/* <input
                  name="accountNumber"
                  type="text"
                //  className="w-full  border border-[#a4a4a4]/60 p-2 rounded mb-3"
                /> */}

                  <div className="w-full mb-4">
                    <input
                      type="text"
                      name="accountNumber"
                      placeholder="Enter account number"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      onBlur={() =>
                        validateField("email", formData.accountNumber)
                      }
                      className={`p-2.5 pl-3 pr-3 border border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                        errors.accountNumber
                          ? "border border-red-600"
                          : "focus:border-purple-800"
                      } `}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-[13px] mt-1">
                        {errors.accountNumber}
                      </p>
                    )}
                  </div>

                  {/* Select Bank Dropdown */}
                  <Select
                    options={options}
                    styles={customStyles}
                    value={options.find(
                      (option) => option.value === formData.selectedBank
                    )} // Ensure correct value is selected
                    onChange={handleSelectChange}
                    placeholder="Select Bank"
                  />
                </div>
              </div>
              <div className="ml-[7.2rem] text-[14px] mt-[5px] flex items-center gap-[2px]">
                <img src={Check} alt="" />
                <p>{name}</p>
              </div>
              {/* Buttons */}
              <div className="flex justify-center mb-[2rem]">
                <button
                  className={`bg-[#9605C5] mt-[2rem] w-[60%] font-semibold text-white p-3 rounded-[10px]  ${
                    isFormInvalid
                      ? "opacity-60 cursor-not-allowed"
                      : "  cursor-pointer"
                  }`}
                  disabled={isFormInvalid}
                >
                  {/* {isLoadingLogin ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "Log In"
                )} */}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBank;
