import {  useState } from "react";
import BankIcon from "../../../assets/dashboard_img/profile/Bank_icon.svg";
import AddRing from "../../../assets/dashboard_img/profile/Add_ring_light.svg";
import BgImage from "../../../assets/dashboard_img/profile/atmcard.jpg";
import Select from "react-select";
import bankIcon from "../../../assets/dashboard_img/profile/Bankicon.svg";
import Check from "../../../assets/dashboard_img/profile/Check_round_fill (1).svg";
import DeleteAccount from "../../../assets/dashboard_img/profile/Trash_duotone_line.svg";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import { useQuery } from "@tanstack/react-query";
import SuccessModal from "../SuccessModal";
import api from "../../../services/api";
import { useBankStore } from "../../../store/useBankStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
}

type Bank = {
  code: string;
  name: string;
};

interface BankDetailsProps {
  bankList: BankAccount[];
}

const fetchBank = async (): Promise<Bank[]> => {
  const response = await fetch(`${BASE_URL}/Accounts/getBanksList`); // Replace with your API URL
  if (!response.ok) throw new Error("Failed to fetch banks");
  const data = await response.json();
  // console.log("Fetched banks:", data.data);
  return data.data;
};

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
    textAlign: "left",
    backgroundColor: state.isSelected
      ? "#8003A9"
      : state.isFocused
      ? "#F8E0FF" 
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F",
  }),
};

const ProfileBank: React.FC<BankDetailsProps> = ({ bankList }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    selectedBank: "",
    bankCode: "",
  });
 const [errors, setErrors] = useState({
    accountNumber: "",
    selectedBank: "",
  });
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [accountNameError, setAccountNameError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const { fetchBanks } = useBankStore();

  // Fetch banks on demand
  const {
    data: banks, 
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: fetchBank,
    enabled: false,
  });

  const options =
    banks?.map((bank) => ({
      value: bank.code,
      label: bank.name,
    })) || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = async (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (!selectedOption) return;

    const selectedBankCode = selectedOption.value;
    const uniqueBankName = selectedOption.label;

    setFormData((prev) => ({
      ...prev,
      bankCode: selectedBankCode,
      selectedBank: uniqueBankName,
    }));

    if (formData.accountNumber) {
      await verifyAccount(selectedBankCode, formData.accountNumber);
    }
  };

  // Function to verify account details
  const verifyAccount = async (bankCode: string, accNumber: string) => {
    if (!bankCode || !accNumber) return;

    setLoading(true);
    setAccountNameError(null);
    setAccountName(null);

    try {
      const response = await fetch(
        `${BASE_URL}/Accounts/bankAccountValidation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountNumber: accNumber,
            bankCode: bankCode,
          }),
        }
      );
      // console.log(accountName, bankCode);
      const result = await response.json();
      // console.log("Backend Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Verification failed");
      }

      const name = result.data.message.details.account_name;
      // console.log(name);
      setAccountName(name);
      // setAccountNameError(null);
    } catch (error: any) {
      // console.error("Error verifying account:", error.message); // Now correctly logs error
      setAccountName(null);
      setAccountNameError(error.message); // Store backend error message in state
    } finally {
      setLoading(false);
    }
  };

  // Handling submit of details to the Bankend 

  const handleSubmit = async () => {
    setLoading(true);
  
    const payload = {
      bankName: formData.selectedBank,
      accountName: accountName,
      accountNumber: formData.accountNumber,
      bankCode: formData.bankCode,
    };
  
    try {
      const response = await api.post(`${BASE_URL}/BankAccounts/addBank`, payload);
  
      setSuccessMessage(response.data.message || "Bank account added successfully");
      handleClose();
      setIsSuccessModal(true);
  
      if (!response.data.success) {
        throw new Error(response.data.message || "An error occurred");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message);
      setLoading(false);
      fetchBanks();
    }
  };
  




  // here is the delete function
  const deleteBankAccount = async (bankId: string) => {
    setLoadingDelete(true);
  
    try {
      const response = await api.delete(`/BankAccounts/deleteBank`, {
        params: { bankId }, // Pass bankId as a query parameter
      });
  
      if (response.data?.success === false) {
        throw new Error(response.data.message || "Failed to delete account");
      }
  
      // Success message
      setSuccessMessage("Bank account deleted successfully");
      fetchBanks(); // Refresh the bank list
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  const handleAddBank = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setIsModalOpen(false);
    setAccountName(null);
    setAccountNameError(null);
    setFormData({ accountNumber: "", selectedBank: "", bankCode: "" });
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
    Object.values(errors).some((error) => error) || !accountName;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-4 justify-center">
        {/* Add Bank Button Styled Like a Card */}
        <button
          onClick={() => {
            handleAddBank();
            refetch();
          }}
          className="h-[182px] w-[320px] border flex flex-col  items-center justify-center cursor-pointer border-[#D0DAE6] hover:border-[#8003A9] transition duration-300 rounded-[10px]"
        >
          <img src={AddRing} alt="" />
          <p className="text-[#8003A9]">Add bank account</p>
        </button>
        {/* Account Cards */}
        {bankList.map((banks, index) => (
          <div
            key={banks.id}
            className="relative w-[320px] h-[182px] cursor-pointer"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`relative w-full h-full rounded-[10px] overflow-hidden bg-cover bg-center transition-transform duration-500 ${
                flippedIndex === index ? "rotate-y-180" : ""
              }`}
              style={{
                backgroundImage: `url(${BgImage})`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side */}
              <div
                className={`absolute inset-0 flex flex-col justify-between p-3 bg-[#8003A9]/80 text-white ${
                  flippedIndex !== index ? "block" : "hidden"
                }`}
              >
                <div className="absolute top-3 right-3 text-xl">
                  <img src={BankIcon} alt="Bank Icon" />
                </div>
                <div className="absolute bottom-3 left-3 leading-[1.1rem]">
                  <p className="text-[16px] ">{banks.accountName}</p>
                  <p className="text-[14px]">{banks.accountNumber}</p>
                  <p className="text-[12px]">{banks.bankName}</p>
                </div>
              </div>

              {/* Back Side */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-[#D32F2F]/90 text-white transform rotate-y-180 ${
                  flippedIndex === index ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => deleteBankAccount(banks.id)}
                  className="relative group bg-white p-[0.5rem] flex items-center justify-center rounded-full cursor-pointer"
                >
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
            <form className="bg-white p-6 rounded-[20px] text-[#27014F] shadow-lg w-[600px]">
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
                      className={`p-2.5 pl-3 pr-3 border text-[#27014F] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
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
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    isLoading={isLoading}
                    styles={customStyles}
                    value={options.find(
                      (option) => option.value === formData.selectedBank
                    )}
                    onChange={handleSelectChange}
                    placeholder="Select Bank"
                  />
                </div>
              </div>
              <div className="ml-[7.2rem] text-[14px] mt-[5px] flex  items-center gap-[2px]">
                {accountName && <img src={Check} alt="Verified" />}
                <p className={accountNameError ? "text-red-500" : ""}>
                  {loading
                    ? "Verifying..."
                    : accountNameError
                    ? accountNameError
                    : accountName}
                </p>
              </div>
              <p className="text-red-500 ml-[7.2rem] text-[14px]">
                {errorMessage}
              </p>

              {/* Buttons */}
              <div className="flex justify-center mb-[2rem]">
                <button
                  onClick={() => {
                    handleSubmit();
                    // handleClose();
                    // handleSuccessModal();
                  }}
                  className={`bg-[#9605C5] mt-[2rem] w-[60%] font-semibold text-white p-3 rounded-[10px]  ${
                    isFormInvalid
                      ? "opacity-60 cursor-not-allowed"
                      : "  cursor-pointer"
                  }`}
                  type="button"
                  disabled={isFormInvalid}
                >
                  {loading ? (
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
                    "  Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loadingDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Render Modal When Open */}
      {isSuccessModal && (
        <SuccessModal
          title="You, Yes You, Rock!"
          message={successMessage} 
          onClose={() => {
            setIsSuccessModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProfileBank;
