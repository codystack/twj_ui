// import { useState } from "react";
import Supportbg from "../../../../assets/dashboard_img/supportbg.svg";
import Supportimg from "../../../../assets/dashboard_img/dashboard_icons/bx_support.svg";
// import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
// import MTN from "../../../../assets/dashboard_img/profile/MTN-icon 1.svg";
// import ninemobile from "../../../../assets/dashboard_img/profile/9mobile-icon 1.svg";
// import gloo from "../../../../assets/dashboard_img/profile/glo-icon 1.svg";
// import airtel from "../../../../assets/dashboard_img/profile/airtel-icon 1.svg";

// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import Button from "../../../../components/Button";
// const options = [
//   { value: "bet365", label: "Bet365" },
//   { value: "fanduel", label: "FanDuel" },
//   { value: "draftkings", label: "DraftKings" },
//   { value: "betway", label: "Betway" },
//   { value: "williamhill", label: "William Hill" },
//   { value: "betfair", label: "Betfair" },
//   { value: "unibet", label: "Unibet" },
//   { value: "888sport", label: "888Sport" },
//   { value: "paddypower", label: "Paddy Power" },
//   { value: "caesars", label: "Caesars Sportsbook" },
// ];

// const customStyles = {
//   control: (provided: any, state: any) => ({
//     ...provided,
//     borderRadius: "8px",
//     padding: "4px",
//     boxShadow: "none",
//     outline: "none",
//     textAlign: "left",
//     border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
//     "&:hover": {
//       border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
//     },
//   }),
//   // option: (provided: any, state: any) => ({
//   //   ...provided,
//   //   cursor: "pointer",
//   //   textAlign: "left",
//   //   backgroundColor: state.isSelected ? "#8003A9" : "#fff",
//   // }),
//   option: (provided: any, state: any) => ({
//     ...provided,
//     cursor: "pointer",
//     textAlign: "left",
//     backgroundColor: state.isSelected
//       ? "#8003A9"
//       : state.isFocused
//       ? "#F8E0FF" // Hover background color
//       : "#fff",
//     color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
//   }),
// };

const Support = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     amount: "",
//     phoneNumber: "",
//   });

//   const [errors, setErrors] = useState({
//     amount: "",
//     phoneNumber: "",
//   });

//   const [activeImage, setActiveImage] = useState<string>("MTN");

//   const images = [
//     { id: "MTN", src: MTN, alt: "MTN" },
//     { id: "gloo", src: gloo, alt: "Glo" },
//     { id: "airtel", src: airtel, alt: "Airtel" },
//     { id: "ninemobile", src: ninemobile, alt: "9Mobile" },
//   ];

  
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



  // Validation function
//   const validateField = (name: string, value: string | boolean | undefined) => {
//     let error = "";

//     switch (name) {
//       case "amount":
//         if (!value) error = "please enter a valid amount";
//         else if (isNaN(Number(value))) error = "Amount must be a number";
//         break;

//       case "phoneNumber":
//         if (!value) error = "Phone number is required";
//         else if (typeof value === "string" && !isValidPhoneNumber(value)) {
//           error = "Invalid phone number";
//         }
//         break;

//       default:
//         break;
//     }

//     setErrors((prevState) => ({
//       ...prevState,
//       [name]: error,
//     }));

//     return error;
//   };

//   const handlePhoneNumberChange = (value: string | undefined) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       phoneNumber: value || "",
//     }));

//     validateField("phoneNumber", value);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;

//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: newValue,
//     }));

//     validateField(name, newValue);
//   };

//   const handleAmountClick = (amount: number) => {
//     setFormData((prev) => ({ ...prev, amount: amount.toString() }));
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     // Clear form logic can be added here
//     setIsModalOpen(false);
//   };


//   const isFormInvalid =
//     Object.values(errors).some((error) => error) ||
//     !formData.amount ||
//     !formData.phoneNumber;

  return (
    <>
      <button
        // onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={Supportimg} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px] mt-[1rem]">
          Support
        </p>
        <img src={Supportbg} className="absolute right-0" alt="" />
      </button>


      {/* {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
     
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Airtime Purchase
                </h3>
                <button className="cursor-pointer" onClick={closeModal}>
                  <img src={Cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center mt-[1.5rem] items-center">
                <div className="w-[65%]">
                  <form action="">
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px] ">
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
                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[5px]">
                      Choose an amount
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {[100, 200, 500, 1000, 2500, 5000].map((amount) => (
                        <div
                          key={amount}
                          className="text-[#8A95BF] border border-[#8A95BF] py-[10px] cursor-pointer rounded-[5px] flex justify-center items-center transition-all duration-300  hover:scale-105"
                          onClick={() => handleAmountClick(amount)}
                        >
                          <span>₦{amount}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-[10px] flex justify-between items-center">
                      <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left">
                        Amount
                      </p>
                      <div className="flex items-center px-[5px] text-[15px]">
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
                        onBlur={() => validateField("amount", formData.amount)}
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                          errors.amount
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        }`}
                      />
                      {errors.amount && (
                        <p className="text-red-500 text-[13px] text-left">
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
                        Buy Airtime
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Support;
