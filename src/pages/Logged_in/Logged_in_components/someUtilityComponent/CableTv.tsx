import { useState } from "react";
// import Casino from "../../../../assets/dashboard_img/dashboard_icons/maki_casino.svg";
// import Casinobg from "../../../../assets/dashboard_img/casinobg.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import Select from "react-select";
import Button from "../../../../components/Button";
import check from "../../../../assets/dashboard_img/profile/Check_round_fill (1).svg";

import Tvbg from "../../../../assets/dashboard_img/tvbg.svg";
import TV from "../../../../assets/dashboard_img/dashboard_icons/wpf_retro-tv.svg";

const options = [
  { value: "bet365", label: "Bet365" },
  { value: "fanduel", label: "FanDuel" },
  { value: "draftkings", label: "DraftKings" },
  { value: "betway", label: "Betway" },
  { value: "williamhill", label: "William Hill" },
  { value: "betfair", label: "Betfair" },
  { value: "unibet", label: "Unibet" },
  { value: "888sport", label: "888Sport" },
  { value: "paddypower", label: "Paddy Power" },
  { value: "caesars", label: "Caesars Sportsbook" },
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

const CableTv = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    betProvider: "",
    smartCardNumber: "",
    provider: "",
    amount: "",
  });

  const [errors, setErrors] = useState({
    betProvider: "",
    smartCardNumber: "",
    provider: "",
    amount: "",
  });

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

    if (formData.betProvider) {
      await validateField(selectedBankCode, formData.betProvider);
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
    !formData.betProvider ||
    !formData.smartCardNumber;

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
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
                  <form action="">
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[2rem] ">
                      Service Provider
                    </p>
                    <div>
                      <Select
                        options={options}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.betProvider
                        )}
                        onChange={handleSelectChange}
                        placeholder=" Choose a Provider"
                      />
                    </div>
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left  mt-[10px] ">
                      Package/Bouquet
                    </p>
                    <div>
                      <Select
                        options={options}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        // isLoading={isLoading}
                        styles={customStyles}
                        value={options.find(
                          (option) => option.value === formData.betProvider
                        )}
                        onChange={handleSelectChange}
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
                        value={formData.provider}
                        // onChange={handleInputChange}
                        // onBlur={() => validateField("email", formData.customerId)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors.provider
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
                      <img src={check} alt="" />
                      <p className="text-left">John Doe</p>
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
                        type="amount"
                        placeholder="₦0.00"
                        name="amount"
                        value={formData.amount}
                        // onChange={handleInputChange}
                        // onBlur={() => validateField("email", formData.customerId)}
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
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        // isLoading={isSubmitting}
                      >
                        Pay for Subcription
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

export default CableTv;
