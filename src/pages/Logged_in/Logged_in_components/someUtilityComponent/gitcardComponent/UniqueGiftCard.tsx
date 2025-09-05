import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
import cancel from "../../../../../assets/dashboard_img/profile/cancel.svg";
import back from "../../../../../assets/dashboard_img/Expand_left_light.svg";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import plus from "../../../../../assets/dashboard_img/plus.svg";
import minus from "../../../../../assets/dashboard_img/minus.svg";

type CurrencyCode =
  | "USD"
  | "EUR"
  | "GBP"
  | "JPY"
  | "NGN"
  | "INR"
  | "KRW"
  | "CHF"
  | "CAD"
  | "AUD"
  | "NZD"
  | "BRL"
  | "RUB"
  | "TRY"
  | "SAR"
  | "AED"
  | "ZAR"
  | "HKD"
  | "SGD"
  | "MXN"
  | "SEK"
  | "NOK"
  | "DKK"
  | "PLN"
  | "THB"
  | "IDR"
  | "MYR"
  | "PHP"
  | "VND"
  | "EGP"
  | "KES"
  | "GHS"
  | "ARS"
  | "CLP"
  | "COP"
  | "PKR"
  | "BDT";

const currencyMap: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  NGN: "₦",
  INR: "₹",
  KRW: "₩",
  CHF: "CHF",
  CAD: "C$",
  AUD: "A$",
  NZD: "NZ$",
  BRL: "R$",
  RUB: "₽",
  TRY: "₺",
  SAR: "SAR",
  AED: "AED",
  ZAR: "R",
  HKD: "HK$",
  SGD: "S$",
  MXN: "MX$",
  SEK: "kr",
  NOK: "kr",
  DKK: "kr",
  PLN: "zł",
  THB: "฿",
  IDR: "Rp",
  MYR: "RM",
  PHP: "₱",
  VND: "₫",
  EGP: "£",
  KES: "KSh",
  GHS: "₵",
  ARS: "$",
  CLP: "$",
  COP: "$",
  PKR: "₨",
  BDT: "৳",
};

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
      ? "#F8E0FF"
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F",
  }),
};

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
  const [redeemInstructions, setRedeemInstructions] = useState(false);

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

  // const validateField = (name: string, value: string | undefined) => {
  //   switch (name) {
  //     case "amount":
  //       if (!value || value.trim() === "") {
  //         setErrors((prev) => ({ ...prev, amount: "Please select an amount" }));
  //       } else if (isNaN(Number(value))) {
  //         setErrors((prev) => ({ ...prev, amount: "Amount must be a number" }));
  //       } else if (Number(value) <= 0) {
  //         setErrors((prev) => ({
  //           ...prev,
  //           amount: "Amount must be greater than 0",
  //         }));
  //       } else if (
  //         selectedCard?.minRecipientDenomination != null &&
  //         Number(value) < selectedCard.minRecipientDenomination
  //       ) {
  //         const currencySymbol =
  //           currencyMap[selectedCard.recipientCurrencyCode as CurrencyCode] ||
  //           "";
  //         setErrors((prev) => ({
  //           ...prev,
  //           amount: `Amount must be at least ${currencySymbol}${selectedCard.minRecipientDenomination}`,
  //         }));
  //       } else if (
  //         selectedCard?.maxRecipientDenomination != null &&
  //         Number(value) > selectedCard.maxRecipientDenomination
  //       ) {
  //         const currencySymbol =
  //           currencyMap[selectedCard.recipientCurrencyCode as CurrencyCode] ||
  //           "";
  //         setErrors((prev) => ({
  //           ...prev,
  //           amount: `Amount must not exceed ${currencySymbol}${selectedCard.maxRecipientDenomination}`,
  //         }));
  //       } else {
  //         setErrors((prev) => ({ ...prev, amount: "" }));
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };

  const validateField = (name: string, value: string | undefined) => {
    switch (name) {
      case "amount":
        if (!value || value.trim() === "") {
          setErrors((prev) => ({ ...prev, amount: "Please select an amount" }));
        } else if (isNaN(Number(value))) {
          setErrors((prev) => ({ ...prev, amount: "Amount must be a number" }));
        } else if (Number(value) <= 0) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be greater than 0",
          }));
        } 
        // else if (
        //   selectedCard?.minRecipientDenomination != null && // ✅ ensures not null
        //   Number(value) < selectedCard.minRecipientDenomination
        // ) {
        //   setErrors((prev) => ({
        //     ...prev,
        //     amount: `Amount must be at least ${selectedCard.minRecipientDenomination}`,
        //   }));
        // } else if (
        //   selectedCard?.maxRecipientDenomination != null && // ✅ ensures not null
        //   Number(value) > selectedCard.maxRecipientDenomination
        // ) {
        //   setErrors((prev) => ({
        //     ...prev,
        //     amount: `Amount must not exceed ${selectedCard.maxRecipientDenomination}`,
        //   }));
        // }
         else {
          setErrors((prev) => ({ ...prev, amount: "" }));
        }
        break;

      default:
        break;
    }
  };

  const handleNext = () => {
    const validateField = (name: string, value: string) => {
      if (!value || value.trim() === "") {
        setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
        return false;
      }

      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    };

    console.log("Validation Errors:", formData.amount);

    const isAmountValid = validateField("amount", formData.amount);

    if (isAmountValid) {
      onNext();
    }
  };

  const selectedCard = allCards.find(
    (card) => card.productId.toString() === selectedGiftCardId
  );

  const redeemText = selectedCard?.redeemInstruction.verbose;

  const redeemSteps = redeemText
    ? redeemText.split(/\. +/).filter(Boolean)
    : [];

  if (!selectedCard)
    return <p className="text-red-500">Gift card not found.</p>;

  // Flatten the fixedRecipientDenominations array into a single array of objects
  const flattenedOptions =
    selectedCard?.fixedRecipientDenominations?.map((denomination) => ({
      value: denomination,
      label: `$${denomination}`,
    })) || [];

  const rate =
    (selectedCard?.minSenderDenomination || 0) /
    (selectedCard?.minRecipientDenomination || 0);

  return (
    <>
      {redeemInstructions && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white overflow-y-aut w-[600px]   z-[50]   p-6 pt-0 rounded-[15px] shadow-lg flex flex-col">
              <div className="flex items-center pt-6 border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                  Redeem Instructions
                </h3>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setRedeemInstructions(false);
                  }}
                >
                  <img src={cancel} alt="" />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center px-2  py-[2rem] ">
                <p>
                  {redeemSteps.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {redeemSteps.map((step, index) => (
                        <li
                          className="text-left  text-[13px] leading-[1rem]"
                          key={index}
                        >
                          {step.trim()}.
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No redemption instructions available.</p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center space-y-4 px-3 ">
        <div className="flex items-center pt-6 border-b border-b-[#E2E8F0] pb-[1rem] px-1 md:pr-[15px] justify-between">
          <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
            Gift Card
          </h3>
          <button
            className="cursor-pointer"
            onClick={() => {
              clearFormData();
              onClose();
            }}
          >
            <img className="w-5 sm:w-4" src={cancel} alt="" />
          </button>
        </div>

        <button
          className="flex md:pl-[1rem] cursor-pointer items-center mb-[1.5rem] justify-center bg-white "
          onClick={() => {
            clearFormData();
            onBack();
          }}
        >
          <img src={back} alt="" />
          <p> Back</p>
        </button>
        <div className="grid  grid-cols-1 md:grid-cols-5   gap-4 ">
          <div className=" col-span-1 md:col-span-2 ">
            <img
              src={selectedCard.logoUrls[0]}
              alt={selectedCard.productName}
              className="w-full rounded-[10px] max-w-full object-contain"
            />

            <div className="w-full flex mt-[1rem] ml-[7px] ">
              <button
                onClick={() => {
                  setRedeemInstructions(true);
                }}
                className=" text-[12px] cursor-pointer text-left  text-[#8003A9] "
              >
                See Redeem Instructions
              </button>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 ">
            <h2 className="text-[30px] text-left mt-[-10px] font-bold text-black">
              {selectedCard.productName}
            </h2>

            <div className="flex items-center justify-items-start w-full ">
              <div className="md:flex items-center  justify-center w-full gap-3">
                <div className="text-[12px] w-full md:w-[50%]">
                  <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] text-[12px] text-left mt-[10px] ">
                    Recipient Phone Number
                    {/* {selectedCard.fixedSenderDenominations} */}
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
                        border: errors.phoneNumber ? "1px solid red" : "",
                      } as React.CSSProperties
                    }
                  />
                </div>

                <div className="w-full">
                  <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] md:text-[12px] text-[15px] text-left mt-[10px] ">
                    Recipient Email
                  </p>
                  <div className="w-full">
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        updateFormData({ email: e.target.value })
                      }
                      onBlur={() => validateField("email", formData.email)}
                      className={`p-4 px-3 md:text-[15px]  w-full outline-none rounded-md
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

            <div className=" w-full md:w-[50%]">
              <p className="text-[#0A2E65]/60 pb-[3px] pl-[3px] md:text-[12px] text-[15px] text-left mt-[10px] ">
                Sender's Name
              </p>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="John Doe"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  onBlur={() => validateField("name", formData.name)}
                  className={`p-4 px-3 border  text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                    errors.name
                      ? "border border-red-600"
                      : "focus:border-purple-800"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center  w-full ">
              <div className=" w-full md:w-[50%] ">
                <p className="text-[#0A2E65]/60 mt-[10px] pb-[3px] pl-[3px] md:text-[12px] text-[15px] text-left  ">
                  {selectedCard.denominationType === "RANGE" ? (
                    <>
                      Amount{" "}
                      <span className=" font">
                        (amount must be between{" "}
                        {
                          currencyMap[
                            selectedCard.recipientCurrencyCode as CurrencyCode
                          ]
                        }
                        {selectedCard.minRecipientDenomination} and{" "}
                        {
                          currencyMap[
                            selectedCard.recipientCurrencyCode as CurrencyCode
                          ]
                        }
                        {selectedCard.maxRecipientDenomination})
                      </span>
                    </>
                  ) : (
                    <> Select Amount</>
                  )}
                </p>

                {selectedCard.denominationType === "RANGE" ? (
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Enter Amount"
                      name="amount"
                      value={formData.amount}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        console.log("Input Change:", name, value);
                        updateFormData({ [name]: value });
                        validateField(name, value || "");
                      }}
                      onBlur={() => validateField("amount", formData.amount)}
                      className={`p-4 px-3 border  text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                        errors.amount
                          ? "border border-red-600"
                          : "focus:border-purple-800"
                      }`}
                    />
                  </div>
                ) : (
                  <Select
                    options={flattenedOptions}
                    onChange={(selectedOption) => {
                      const value = selectedOption
                        ? String(selectedOption.value)
                        : "";
                      updateFormData({ amount: value });
                    }}
                    onBlur={() => validateField("amount", formData.amount)}
                    styles={{
                      ...customStyles,
                      control: (provided: any, state: any) => ({
                        ...provided,
                        borderRadius: "8px",
                        padding: "9px",
                        boxShadow: "none",
                        outline: "none",
                        fontSize: "15px",
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
                )}
                {errors.amount && (
                  <p className="text-red-600 text-[12px] text-left mt-[5px]">
                    {errors.amount}
                  </p>
                )}
              </div>

              {/* <div className="flex flex-col  ml-[1rem] mt-[2rem] text-[10px]">
                <p className="text-left">Estimated price</p>

                <p className=" text-left text-gray-600">
                  Price: {selectedCard.fixedRecipientDenominations}
                </p>
              </div> */}
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
                className="bg-[#8003A9] cursor-pointer w-full md:w-[70%] text-white sm:px-4 sm:py-2 py-3.5 rounded-[5px]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniqueGiftCard;
