import MyStaticLogo from "../../../assets/dashboard_img/profile//transactions/bitcoin.svg";
import ArrowDownIcon from "../../../assets/dashboard_img/profile/transactions/transactio_up.svg";
import ArrowUpIcon from "../../../assets/dashboard_img/profile//transactions/transaction_down.svg";
import { useState } from "react";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import Copy from "../../../assets/dashboard_img/profile/transactions/Copy_light.svg";
import HrtBroken from "../../../assets/dashboard_img/profile/transactions/heartbroken.svg";
import Report from "../../../assets/dashboard_img/profile/transactions/report.svg";
// import "../../../App.css";

const transactions = [
  {
    id: "QYWTU578HG",
    type: "Inward Crypto Transfer",
    amount: "₦1,880,500",
    date: "Mar 4, 2025",
    direction: "inward",
    status: "success",
    network: "USDT TRC20",
    time: "19:45",
    reference: "324578765342232334",
    address: "TRCuyghIlkWnnosqAb7jrrwpHGHJedwfwY8dqwx",
  },
  {
    id: "XYZ123456",
    type: "Outward Crypto Transfer",
    amount: "₦200,500",
    date: "Mar 3, 2025",
    direction: "outward",
    status: "pending",
    time: "10:42",
    network: "USDT TRC20",
    reference: "32457876534123454",
    address: "TRCuyghIlkWnnosqAb7jrrwpHGHJedwfwY8dqwx",
  },
  {
    id: "ABCD7890JK",
    type: "Outward Crypto Transfer",
    amount: "₦1,167,500",
    date: "Mar 2, 2025",
    direction: "outward",
    status: "failed",
    network: "USDT TRC20",
    reference: "324577564342232334",
    time: "1:26",
    address: "TRCuyghIlkWnnosqAb7jrrwpHGHJedwfwY8dqwx",
  },
  {
    id: "LMNOP45678",
    type: "Inward Crypto Transfer",
    amount: "₦1,200,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
    network: "USDT TRC20",
    time: "19:45",
    reference: "324578765342232334",
    address: "TRCuyghIlkWnnosqAb7jrrwpHGHJedwfwY8dqwx",
  },
];

type Transaction = {
  id: string;
  name: string;
  type: string;
  amount: string;
  date: string;
  direction: string;
  status: string;
  quantity: string;
  network: string;
  time: string;
  reference: string;
  address: string;
};

const CrytoTransaction = () => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [message, setMessage] = useState({
    reference: "",
    messageSent: "",
  });
  const [errors, setErrors] = useState({
    reference: "",
    messageSent: "",
  });

  const [copiedRef, setCopiedRef] = useState<string | null>(null); // Track copied reference

  const handleCopy = (reference: string) => {
    navigator.clipboard.writeText(reference);
    setCopiedRef(reference);

    setTimeout(() => setCopiedRef(null), 1000);
  };

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "reference":
        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            reference: "This field is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            reference: "",
          }));
        }
        break;

      case "messageSent":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            messageSent: "This field is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            messageSent: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !message.reference ||
    !message.messageSent;

  const handleOpenModal = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  // for report
  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessage((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Handle form toggle
  const handleReportClick = () => {
    setShowReportForm(true);
  };

  // Handle form submission
  // const handleSubmitReport = () => {
  //   console.log("Report Submitted:", message.messageSent);
  //   setShowReportForm(false);
  // };

  // Handle closing the modal
  const handleClose = () => {
    setMessage({ reference: "", messageSent: "" });
    setErrors({ reference: "", messageSent: "" });
    setShowReportForm(false);
    handleCloseModal();
  };

  return (
    <div className="space-y-4 p-4">
      {transactions.map((transaction) => (
        <button
          onClick={() => handleOpenModal(transaction)}
          key={transaction.id}
          className="flex justify-between w-full cursor-pointer items-center bg-white border-b  border-[#E2E8F0] last:border-b-0  md:p-4 py-3"
        >
          {/* Left Side: Static Logo + Transaction Details */}
          <div className="flex items-center gap-4 relative">
            {/* Static Logo Container */}
            <div className="relative">
              <img
                src={MyStaticLogo}
                alt="Transaction Logo"
                className="w-12 h-12"
              />
              {/* Unique Direction Arrow (Absolute Positioning) */}
              {transaction.direction === "inward" ? (
                <img
                  src={ArrowDownIcon}
                  alt="Inward Transaction"
                  className="absolute bottom-0 right-0 w-4 h-4"
                />
              ) : (
                <img
                  src={ArrowUpIcon}
                  alt="Outward Transaction"
                  className="absolute right-0 bottom-0 w-4 h-4"
                />
              )}
            </div>

            {/* Transaction Details */}
            <div>
              <p className="text-[16px] text-[#27014F]">{transaction.type}</p>
              <div className="flex items-center gap-2 text-gray-600">
                {/* Tracking ID */}
                <span className="text-[11px] text-[#0A2E65] border-r pr-[0.5rem] border-[#9ea5ad]">
                  {transaction.id}
                </span>
                {/* Unique Status Icon */}
                {transaction.status === "success" && (
                  <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                    SUCCESSFULL
                  </div>
                )}
                {transaction.status === "pending" && (
                  <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                    PENDING
                  </div>
                )}
                {transaction.status === "failed" && (
                  <div className="bg-[#FF3366]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FF3366]">
                    FAILED
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Date & Amount */}
          <div className="text-right">
            <p className="font-semibold text-[#27014F]  ">
              {transaction.amount}
            </p>
            <p className="text-sm text-[#27014F] text-[11px]">
              {transaction.date}
            </p>
          </div>
        </button>
      ))}

      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100">
            {/* Modal Content */}
            <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
              {!showReportForm ? (
                <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
                  <div className=" flex flex-row-reverse">
                    {/* Close Button */}
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px] mb-[2rem] mt-[1rem] "
                      onClick={handleCloseModal}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>

                  <div className="flex justify-between  border-b border-b-[#E2E8F0] pb-[1rem] items-center">
                    <h2 className="text-[32px] font-semibold text-[#27014F] mb-2">
                      {selectedTransaction.amount}
                    </h2>

                    <div className="relative">
                      <img
                        src={MyStaticLogo}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                      {/* Unique Direction Arrow (Absolute Positioning) */}
                      {selectedTransaction.direction === "inward" ? (
                        <img
                          src={ArrowDownIcon}
                          alt="Inward Transaction"
                          className="absolute bottom-0 right-0 w-4 h-4"
                        />
                      ) : (
                        <img
                          src={ArrowUpIcon}
                          alt="Outward Transaction"
                          className="absolute right-0 bottom-0 w-4 h-4"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-[5rem] mt-[8%]">
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Network</p>
                      <div className="flex text-[#0A2E65] items-center gap-[3px] text-[13px]">
                        <p>{selectedTransaction.network}</p>
                        <p>{selectedTransaction.quantity}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Date</p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <p>{selectedTransaction.date}</p>
                        <div className="w-[5px] h-[5px] rounded-full mx-[4px] bg-[#0A2E65]/70  ">
                          .
                        </div>
                        <p>{selectedTransaction.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Status</p>

                      {/* Unique Status Icon */}
                      {selectedTransaction.status === "success" && (
                        <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                          SUCCESSLL
                        </div>
                      )}
                      {selectedTransaction.status === "pending" && (
                        <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                          PENDING
                        </div>
                      )}
                      {selectedTransaction.status === "failed" && (
                        <div className="bg-[#FF3366]/20 px-[5px]  py-[1px] w-fit rounded-[2px] text-[8px] text-[#FF3366]">
                          FAILED
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-[3rem]">
                    <div className="my-[6%]">
                      <p className="text-[#0A2E65]/60 mb-[10px]">Reference</p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <div className="flex items-center">
                          <p>{selectedTransaction.reference}</p>
                          <button></button>

                          <button
                            onClick={() =>
                              handleCopy(selectedTransaction.reference)
                            }
                            className="relative flex items-center justify-center cursor-pointer"
                          >
                            <img src={Copy} alt="" />
                            {copiedRef === selectedTransaction.reference && (
                              <span
                                className={`ml-2 absolute bg-[#32A071]/20 px-[10px] py-[1px] w-fit rounded-[2px] text-[13px] text-[#32A071]  top-[2rem]  ${
                                  copiedRef === selectedTransaction.reference
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              >
                                Copied
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="my-[6%]">
                      <p className="text-[#0A2E65]/60 mb-[10px]">
                        Wallet Address
                      </p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <div className="flex items-center">
                          <p>{selectedTransaction.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Report Button */}
                  <div className=" flex items-center justify-center w-full">
                    {selectedTransaction.status === "pending" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1  flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem] " src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                    {selectedTransaction.status === "failed" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] flex items-center gap-1 justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem] " src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Report Form UI */
                <div className="bg-[#fff] w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
                  <div className="flex justify-between border-b border-b-[#E2E8F0]  py-[1rem]  items-center">
                    <h2 className="text-[20px] font-semibold text-[#27014F] mb-2 ">
                      Report Transaction
                    </h2>
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px]  "
                      onClick={handleClose}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>
                  <div className="flex justify-center items-center my-[1rem]">
                    <img src={HrtBroken} alt="" />
                  </div>
                  <p className="text-[#0A2E65]/60 text-center mb-[10px] ">
                    Please fill in the details below
                  </p>
                  <div className=" flex items-center justify-center w-full">
                    <div className="flex flex-col gap-4 w-[70%] ">
                      <div>
                        {/* Reference Input */}
                        <input
                          onBlur={() =>
                            validateField("reference", message.reference)
                          }
                          type="text"
                          name="reference"
                          className={` w-full border border-[#A4A4A4] p-2  resize-none h-[40%]  focus:border-2 outline-none rounded-md ${
                            errors.reference
                              ? "border border-red-600"
                              : "focus:border-purple-800"
                          } `}
                          value={message.reference}
                          onChange={handleInputChange}
                          placeholder="Transaction Reference"
                        />
                        {errors.reference && (
                          <p className="text-red-500 mt-[2px] text-xs">
                            {errors.reference}
                          </p>
                        )}
                      </div>

                      <div>
                        {/* Message Input */}
                        <textarea
                          onBlur={() =>
                            validateField("messageSent", message.messageSent)
                          }
                          name="messageSent"
                          className={` w-full border border-[#A4A4A4] p-2  resize-none h-[7rem] focus:border-2 outline-none rounded-md ${
                            errors.messageSent
                              ? "border border-red-600"
                              : "focus:border-purple-800"
                          } `}
                          value={message.messageSent}
                          onChange={handleInputChange}
                          placeholder="Add anything else you would like us to know..."
                        />
                        {errors.messageSent && (
                          <p className="text-red-500 text-xs mt-[2px]">
                            {errors.messageSent}
                          </p>
                        )}
                      </div>

                      {/* Submit & Close Buttons */}
                      <div className="flex justify-between mb-[2rem]">
                        <button
                          // onClick={handleSubmitReport}
                          className={`bg-[#9605C5] w-full  text-white p-3 rounded-[6px]  ${
                            isFormInvalid
                              ? "opacity-60 cursor-not-allowed"
                              : "  cursor-pointer"
                          }`}
                          disabled={isFormInvalid}
                        >
                          Submit Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrytoTransaction;
