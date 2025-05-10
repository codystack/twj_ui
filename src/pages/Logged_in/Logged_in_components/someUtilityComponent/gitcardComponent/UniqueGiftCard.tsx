import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
// import { giftCardsData } from "../gitcardComponent/AvailableGiftCards";
import cancel from "../../../../../assets/dashboard_img/profile/cancel.svg";
import back from "../../../../../assets/dashboard_img/Expand_left_light.svg";
import { useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select from "react-select";
import plus from "../../../../../assets/dashboard_img/plus.svg";
import minus from "../../../../../assets/dashboard_img/minus.svg";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "1px",
    boxShadow: "none",
    outline: "none",
    fontSize: "12px",
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

const priceOptions = [
  { label: "$10", value: 10 },
  { label: "$25", value: 25 },
  { label: "$50", value: 50 },
  { label: "$100", value: 100 },
];

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const UniqueGiftCard = ({ onNext, onBack, onClose }: ModalProps) => {
  const {
    allCards,
    selectedGiftCardId,
    formData,
    setTotalAmount,
    clearFormData,
    updateFormData,
  } = useGiftCardStore();
  const count = useGiftCardStore((state) => state.count);
  const setCount = useGiftCardStore((state) => state.setCount);


  const [errors, setErrors] = useState({
    phoneNumber: "",
    amount: "",
    email: "",
    name: "",
  });
  // const [count, setCount] = useState(0);
  const amount = parseFloat(formData.amount || "0");

  //  when count or amount changes
  useEffect(() => {
    formData.amount = String("");
  }, []);

  useEffect(() => {
    const total = count * amount;
    setTotalAmount(total);
  }, [count, amount]);



  const handleIncrement = () => setCount(count + 1);

  const handleDecrement = () => {
    if (count > 0) setCount(count - 1);
  };

  useEffect(() => {
    setCount(1); 
  }, []);


  const validateField = (name: string, value: string | undefined) => {
    let error = "";

    switch (name) {
      case "phoneNumber":
        if (!value || value.trim() === "") {
          error = "Email is required";
        } else if (!isValidPhoneNumber(value)) {
          error = "Please enter a valid phone number";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address";
        }
        break;

      case "name":
        if (!value || value.trim() === "") {
          error = "Name is required";
        }
        break;

      case "amount":
        if (!value) {
          error = "Please select an amount";
        } else if (isNaN(Number(value))) {
          error = "Amount must be a number";
        } else if (Number(value) <= 0) {
          error = "Amount must be greater than 0";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAllFields = () => {
    const newErrors = {
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      email: validateField("email", formData.email),
      name: validateField("name", formData.name),
      amount: validateField("amount", formData.amount),
    };

    // Check if any error exists
    return Object.values(newErrors).every((err) => !err);
  };

  const handleNext = () => {
    if (validateAllFields()) {
      onNext();
    }
  };

  const selectedCard = allCards.find(
    (card) => card.productId.toString() === selectedGiftCardId
  );

  if (!selectedCard)
    return <p className="text-red-500">Gift card not found.</p>;

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center pt-6 border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
        <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
          Gift Cards
        </h3>
        <button
          className="cursor-pointer"
          onClick={() => {
            clearFormData();
            onClose();
          }}
        >
          <img src={cancel} alt="" />
        </button>
      </div>

      <button
        className="flex pl-[1rem] cursor-pointer items-center mb-[1.5rem] justify-center bg-white "
        onClick={() => {
          clearFormData();
          onBack();
        }}
      >
        <img src={back} alt="" />
        <p> Back</p>
      </button>
      <div className="grid grid-cols-5 px-[1rem] gap-4 ">
        <div className="col-span-2 ">
          <img
            src={selectedCard.logoUrls[0]}
            alt={selectedCard.productName}
            className="w-full rounded-[10px] max-w-full object-contain"
          />

          <div className="w-full flex mt-[1rem] ml-[7px] ">
            <button className=" text-[12px] cursor-pointer text-left  text-[#8003A9] ">
              See Redeem Instructions
            </button>
          </div>
        </div>
        <div className="col-span-3 ">
          <h2 className="text-[30px] text-left mt-[-10px] font-bold text-black">
            {selectedCard.productName}
          </h2>

          <div className="flex items-center justify-items-start w-full ">
            <div className="flex items-center  justify-center w-full gap-3">
              <div className="text-[12px] w-[50%]">
                <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] text-[12px] text-left mt-[10px] ">
                  Recipient Phone Number
                </p>
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="NG"
                  value={formData.phoneNumber}
                  onChange={(value) =>
                    updateFormData({ phoneNumber: value || "" })
                  }
                  style={
                    {
                      "--PhoneInputCountrySelect-marginRight": "0em",
                      borderRadius: "0.375rem",
                      border: errors.phoneNumber
                        ? "1px solid red"
                        : "1px solid #ccc", // Red border if there's an error, else default
                    } as React.CSSProperties
                  }
                />
               
              </div>

              <div className="w-full">
                <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] text-[12px] text-left mt-[10px] ">
                  Recipient Email
                </p>
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="abc@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    onBlur={() => validateField("email", formData.email)} // optional blur validation
                    className={`p-2.5 pl-3 pr-3 text-[12px] w-full outline-none rounded-md
                      border ${
                        errors.email
                          ? "border-red-600"
                          : "border-[#A4A4A4] focus:border-purple-800"
                      }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%]">
            <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] text-[12px] text-left mt-[10px] ">
              Sender's Name
            </p>
            <div className="w-full">
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                onBlur={() => validateField("name", formData.name)} // optional blur validation
                className={`p-2.5 pl-3 pr-3 border text-[12px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                  errors.name
                    ? "border border-red-600"
                    : "focus:border-purple-800"
                }`}
              />
            </div>
          </div>
          <div className="flex items-center  w-full ">
            <div className="w-[50%] ">
              <p className="text-[#0A2E65]/60 mt-[10px] pb-[3px] pl-[3px] text-[12px] text-left  ">
                Select Amount
              </p>
              <Select
                options={priceOptions}
                onChange={(option) => {
                  const value =
                    option?.value !== undefined ? String(option.value) : "";
                  updateFormData({ amount: value });
                }}
                onBlur={() => validateField("amount", formData.amount)} // optional blur validation
                styles={{
                  ...customStyles,
                  control: (provided: any, state: any) => ({
                    ...provided,
                    borderRadius: "8px",
                    padding: "1px",
                    boxShadow: "none",
                    outline: "none",
                    fontSize: "12px",
                    textAlign: "left",
                    border: errors.amount
                      ? "1px solid red"
                      : state.isFocused
                      ? "2px solid #8003A9"
                      : "1px solid #a4a4a4",
                    "&:hover": {
                      border: errors.amount
                        ? "1px solid red"
                        : state.isFocused
                        ? "2px solid #8003A9"
                        : "1px solid #a4a4a4",
                    },
                  }),
                }}
              />
            </div>
            <div className="flex flex-col  ml-[1rem] mt-[2rem] text-[10px]">
              <p className="text-left">Estimated price</p>

              <p className=" text-left text-gray-600">
                Price: {selectedCard.fixedRecipientDenominations}
              </p>
            </div>
          </div>

          <div className="flex items-center mt-[1rem] gap-3">
            <button
              onClick={handleDecrement}
              className={`h-[2.5rem] flex justify-center items-center w-[2.5rem] rounded bg-[#F1C8FF] ${
                count === 0
                  ? "cursor-not-allowed opacity-70"
                  : "bg-[#F1C8FF] cursor-pointer"
              }`}
              disabled={count === 0}
            >
              <img src={minus} alt="" />
            </button>

            <span className="w-6 text-center">{count}</span>

            <button
              onClick={handleIncrement}
              className="h-[2.5rem] cursor-pointer flex justify-center items-center w-[2.5rem] rounded bg-[#8003A9] "
            >
              <img src={plus} alt="" />
            </button>
          </div>

          <div className="mt-5 gap-2 w-full mb-[2rem] flex justify-start">
            <button
              onClick={handleNext}
              className="bg-[#8003A9] cursor-pointer w-[70%] text-white px-4 py-2 rounded-[5px]"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueGiftCard;
