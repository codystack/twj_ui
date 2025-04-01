import { useEffect, useState } from "react";
import airtimebg from "../../../../assets/dashboard_img/airtimebg.svg";
import Airtimeimg from "../../../../assets/dashboard_img/dashboard_icons/ic_round-phone-iphone.svg";
import Cancel from "../../../../assets/dashboard_img/profile/cancel.svg";
import MTN from "../../../../assets/dashboard_img/profile/MTN-icon 1.svg";
import ninemobile from "../../../../assets/dashboard_img/profile/9mobile-icon 1.svg";
import gloo from "../../../../assets/dashboard_img/profile/glo-icon 1.svg";
import airtel from "../../../../assets/dashboard_img/profile/airtel-icon 1.svg";
import Button from "../../../../components/Button";
import PinModal from "./PinModal";

const Airtime = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [loading, setLoading] = useState(false);

  const [showPinModal, setShowPinModal] = useState(false);
  // const [successMessage, setSuccessMessage] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    network: "",
    amount: "",
    recipient: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    recipient: "",
  });
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const images = [
    { id: "mtn", src: MTN, alt: "MTN" },
    { id: "glo", src: gloo, alt: "Glo" },
    { id: "airtel", src: airtel, alt: "Airtel" },
    { id: "9mobile", src: ninemobile, alt: "9Mobile" },
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

  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = "";

    switch (name) {
      case "amount":
        if (!value) {
          error = "Please enter a valid amount";
        } else if (isNaN(Number(value))) {
          error = "Amount must be a number";
        }
        break;

      case "recipient":
        if (!value) {
          error = "Phone number is required";
        } else if (
          typeof value === "string" &&
          (value.length < 11 || value.length > 11)
        ) {
          error = "Invalid phone number. Must be exactly 11 digits.";
        }
        break;

      default:
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error, // Update only the specific field
    }));

    return error;
  };

  // const handlePhoneNumberChange = (value: string | undefined) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     recipient: value || "",
  //   }));

  //   validateField("recipient", value);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  const handleAmountClick = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    // Clear form logic can be added here

    setErrors({ amount: "", recipient: "" });
    setActiveImage(null);

    setIsModalOpen(false);
       
  };


    // Automatically call validatePin when 4 digits are entered
    useEffect(() => {
      if (isModalOpen === true) {
        setFormData({
          network: "",
          amount: "",
          recipient: "",
        });
      }
    }, [isModalOpen]); // Runs when isModalOpen changes
    

  const setImage = (imageId: string) => {
    setActiveImage(imageId);
    setFormData((prevData) => ({
      ...prevData,
      network: imageId,
    }));
  };

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   console.log("Form Data:", formData);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload

    // setLoading(true);
    // const { accessToken } = useAuthorizationStore.getState();

    // Construct payload
    // const payload = {
    //   formData,
    // };

    console.log("Airtime component",formData);


    closeModal();
    setTimeout(() => {
      setShowPinModal(true);
    }, 200); // Small delay to ensure smooth transition


    
    // try {
    //   const response = await api.post(
    //     `${BASE_URL}/BillsPayment/purchaseAirtime`,
    //     formData
    //   );

    //   if (!response.data.success) {
    //     throw new Error(response.data.message || "An error occurred");
    //   }

    //   console.log(response);
    //   // setSuccessMessage(response.data.message || "");
    // } catch (error: any) {
    //   setErrorMessage(error.response?.data?.message || "");
    // } finally {
    //   setLoading(false);
    // }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.network ||
    !formData.recipient;

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer  transition-transform duration-300 hover:scale-105 relative h-[146px] w-[252px] border border-[#D0DAE6] rounded-[10px] flex flex-col items-start pl-[1rem] py-[1rem]"
      >
        <div className="bg-[#F8E0FF] flex justify-center items-center p-[1rem] w-fit rounded-full self-start">
          <img src={Airtimeimg} alt="" />
        </div>
        <p className="text-[#27014F] tracking-[0.6px] text-[20px]  mt-[1rem]">
          Airtime
        </p>
        <img src={airtimebg} className="absolute right-0" alt="" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
          {/* Dialog Box */}
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
                  {/* Input Fields */}
                  <form onSubmit={handleSubmit}>
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
                          onClick={() => setImage(image.id)}
                        >
                          <img src={image.src} alt={image.alt} />
                        </div>
                      ))}
                    </div>

                    <p className="text-[#0A2E65]/60 pb-[3px] pl-[5px] text-[15px] text-left mt-[10px] ">
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
                        className={`p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
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
                    <p className="text-[#0A2E65]/60 mt-[10px] pb-[3px] pl-[5px] text-[15px] text-left ">
                      Choose an amount
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {[100, 200, 500, 1000, 3000, 5000].map((amount) => (
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
                  {/* Buttons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPinModal && (
        <PinModal onClose={() => setShowPinModal(false)} formData={formData} />
      )}
    </>
  );
};

export default Airtime;
