import { useState } from "react";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import Copy from "../../../assets/dashboard_img/profile/transactions/Copy_light.svg";
import HrtBroken from "../../../assets/dashboard_img/profile/transactions/heartbroken.svg";
import Report from "../../../assets/dashboard_img/profile/transactions/report.svg";
import Credit from "../../../assets/dashboard_img/BigCredit.svg";
import Debit from "../../../assets/dashboard_img/BigDebit.svg";
import warning from "../../../assets/dashboard_img/disabled-warning .png";

interface TransactionType {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: string;
  status: string;
  transactionStatus: string;
  time: string;
  name: string;
  direction: string;
  billPaymentCategory: string;
  transactionDate: string;
  transactionReference: string;
  network: string;
  quantity: string;
  reference: string;
  walletCategory: string;
}

const CreditDebitTransactions: React.FC<{
  transactions: TransactionType[];
  noTransaction: string | null;
}> = ({ transactions, noTransaction }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [message, setMessage] = useState({
    reference: "",
    messageSent: "",
  });
  const [errors, setErrors] = useState({
    reference: "",
    messageSent: "",
  });

  const [copiedRef, setCopiedRef] = useState<string | null>(null);

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

  const handleOpenModal = (transaction: TransactionType) => {
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

  // Handle closing the modal
  const handleClose = () => {
    setMessage({ reference: "", messageSent: "" });
    setErrors({ reference: "", messageSent: "" });
    setShowReportForm(false);
    handleCloseModal();
  };

  return (
    <div className="space-y-4 p-4">
      {transactions.length > 0 && noTransaction ? (
        transactions.map((transaction) => (
          <button
            onClick={() => handleOpenModal(transaction)}
            key={transaction.id}
            className="flex justify-between w-full cursor-pointer items-center bg-white border-b  border-[#E2E8F0] last:border-b-0  sm:p-4 py-3"
          >
            {/* Left Side: Static Logo + Transaction Details */}
            <div className="flex items-center gap-4 relative">
              {/* Static Logo Container */}
              <div className="relative">
                {transaction.walletCategory === "TopUp" ? (
                  <img
                    src={Credit}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                ) : (
                  <img
                    src={Debit}
                    alt="Outward Transaction"
                    className="w-12 h-12"
                  />
                )}
              </div>

              {/* Transaction Details */}
              <div>
                <p className="text-[16px] text-left text-[#27014F]">
                  Wallet{" "}
                  {(() => {
                    const word = transaction.walletCategory
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .toLowerCase();

                    return word === "withdraw" ? "withdrawal" : word;
                  })()}
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  {/* Tracking ID */}
                  <p className="text-sm block text-[#27014F] border-r pr-[0.5rem] border-[#9ea5ad] text-[11px]">
                    {new Date(transaction.transactionDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )}
                  </p>
                  {/* Unique Status Icon */}
                  {transaction.transactionStatus === "success" && (
                    <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                      SUCCESSFULL
                    </div>
                  )}
                  {transaction.transactionStatus === "pending" && (
                    <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                      PENDING
                    </div>
                  )}
                  {transaction.transactionStatus === "failed" && (
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
                ₦{transaction.amount}
              </p>
            </div>
          </button>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-18rem)]">
          <img src={warning} className="md:w-[9rem] w-[5rem]" alt="" />
          <p className="text-gray-500 text-lg">{noTransaction}</p>
        </div>
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          {/* <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100"> */}
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
              {/* <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20"> */}
              {!showReportForm ? (
                <div className="bg-white py-6 px-4 sm:rounded-2xl  sm:w-[600px] sm:h-auto   h-[min(100dvh,100vh)] max-h-screen   w-[100vw] text-center">
                  <div className=" flex flex-row-reverse">
                    {/* Close Button */}
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px] mb-[2rem] mt-[1rem] "
                      onClick={handleCloseModal}
                    >
                      <img className="w-5 sm:w-4" src={Delete} alt="" />
                    </button>
                  </div>

                  <div className="flex justify-between  border-b border-b-[#E2E8F0] pb-[1rem] items-center">
                    <h2 className="text-[32px] font-semibold text-[#27014F] mb-2">
                      ₦{selectedTransaction.amount}
                    </h2>

                    <div className="relative">
                      {selectedTransaction.walletCategory === "TopUp" ? (
                        <img
                          src={Credit}
                          alt="Transaction Logo"
                          className="w-15 h-15"
                        />
                      ) : (
                        <img
                          src={Debit}
                          alt="Outward Transaction"
                          className="w-15 h-15"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-[5rem] mt-[8%]">
                    <div>
                      <p className="text-[#0A2E65]/60 whitespace-nowrap text-left mb-[10px]">
                        Transaction type
                      </p>
                      <div className="flex text-[#0A2E65] items-center gap-[3px] text-[13px]">
                        <p className="text-[16px] text-left text-[#27014F]">
                          Wallet{" "}
                          {(() => {
                            const word = selectedTransaction.walletCategory
                              .replace(/([a-z])([A-Z])/g, "$1 $2")
                              .toLowerCase();

                            return word === "withdraw" ? "withdrawal" : word;
                          })()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px] text-left">
                        Date
                      </p>

                      <>
                        {(() => {
                          const dateObj = new Date(
                            selectedTransaction.transactionDate
                          );
                          const formattedDate = dateObj.toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          );

                          return (
                            <>
                              <div className="flex text-[#0A2E65] items-center text-[13px]">
                                <p>{formattedDate}</p>
                                {/* <p>{formattedTime}</p> */}
                              </div>
                            </>
                          );
                        })()}
                      </>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px] whitespace-nowrap text-left">
                        Time
                      </p>

                      <>
                        {(() => {
                          const dateObj = new Date(
                            selectedTransaction.transactionDate
                          );

                          const formattedTime = dateObj.toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          );

                          return (
                            <>
                              <div className="flex text-[#0A2E65] items-center text-[13px]">
                                {/* <p>{formattedDate}</p> */}
                                <p>{formattedTime}</p>
                              </div>
                            </>
                          );
                        })()}
                      </>
                    </div>
                  </div>
                  <div className="flex gap-[3rem]">
                    <div className="my-[6%]">
                      <p className="text-[#0A2E65]/60 text-left mb-[10px]">
                        Reference
                      </p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <div className="flex items-center">
                          <p>{selectedTransaction.id}</p>
                          <button></button>

                          <button
                            onClick={() => handleCopy(selectedTransaction.id)}
                            className="relative flex items-center justify-center cursor-pointer"
                          >
                            <img src={Copy} alt="" />
                            {copiedRef === selectedTransaction.id && (
                              <span
                                className={`ml-2 absolute bg-[#32A071]/20 px-[10px] py-[1px] w-fit rounded-[2px] text-[13px] text-[#32A071]  top-[2rem]  ${
                                  copiedRef === selectedTransaction.id
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
                      <>
                        <p className="text-[#0A2E65]/60 mb-[10px]">Status</p>

                        {/* Unique Status Icon */}
                        {selectedTransaction.transactionStatus ===
                          "success" && (
                          <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                            SUCCESSLL
                          </div>
                        )}
                        {selectedTransaction.transactionStatus ===
                          "pending" && (
                          <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                            PENDING
                          </div>
                        )}
                        {selectedTransaction.transactionStatus === "failed" && (
                          <div className="bg-[#FF3366]/20 px-[5px]  py-[1px] w-fit rounded-[2px] text-[8px] text-[#FF3366]">
                            FAILED
                          </div>
                        )}
                      </>
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

export default CreditDebitTransactions;
