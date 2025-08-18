import { useEffect, useState } from "react";
import Airtime from "../../../assets/dashboard_img/profile//transactions/airitime.svg";
import Data from "../../../assets/dashboard_img/profile//transactions/data.svg";
import Electricity from "../../../assets/dashboard_img/profile//transactions/electricity.svg";
import Gift from "../../../assets/dashboard_img/profile//transactions/gift.svg";
import Television from "../../../assets/dashboard_img/profile//transactions/television.svg";
// import Delete from "../../assets/dashboard_img/profile/";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import Copy from "../../../assets/dashboard_img/profile/transactions/Copy_light.svg";
import Report from "../../../assets/dashboard_img/profile/transactions/report.svg";
import HrtBroken from "../../../assets/dashboard_img/profile/transactions/heartbroken.svg";

interface TransactionType {
  name: string;
  id: string;
  time: string;
  amount: number;
  description: string;
  status: string;
  transactionStatus: string;
  billPaymentCategory: string;
  transactionDate: string;
  transactionReference: string;
  date: string;
  type: string;
  direction: string;
  network: string;
  quantity: string;
  reference: string;
}

const UtilityTransaction: React.FC<{
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

  const [copiedRef, setCopiedRef] = useState<string | null>(null); // Track copied reference

  const handleCopy = (reference: string) => {
    navigator.clipboard.writeText(reference);
    setCopiedRef(reference);

    setTimeout(() => setCopiedRef(null), 1000);
  };

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "reference":
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

  // Handle closing the modal
  const handleClose = () => {
    setMessage({ reference: "", messageSent: "" });
    setErrors({ reference: "", messageSent: "" });
    setShowReportForm(false);
    handleCloseModal();
  };

  useEffect(() => {
    if (transactions.length > 0) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 500); // short delay lets the DOM update
    }
  }, [transactions]);

  return (
    <div className="space-y-1 p-4 px-3">
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <button
            onClick={() => handleOpenModal(transaction)}
            key={transaction.id}
            className="flex justify-between cursor-pointer items-center bg-white border-b  w-full border-[#E2E8F0] last:border-b-0 md:p-4 md:py-3 py-1"
          >
            <div className="flex items-center gap-4 relative">
              <div className="relative">
                {transaction.billPaymentCategory === "Data" && (
                  <img
                    src={Data}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                )}
                {transaction.billPaymentCategory === "Electricity" && (
                  <img
                    src={Electricity}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                )}
                {transaction.billPaymentCategory === "Airtime" && (
                  <img
                    src={Airtime}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                )}
                {transaction.billPaymentCategory === "CableTV" && (
                  <img
                    src={Television}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                )}
                {transaction.billPaymentCategory === "Betting" && (
                  <img
                    src={Gift}
                    alt="Transaction Logo"
                    className="w-12 h-12"
                  />
                )}
              </div>

              {/* Transaction Details */}
              <div>
                <p className="text-[16px] text-left text-[#27014F]">
                  {transaction.billPaymentCategory} Purchase
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  {/* Tracking ID */}
                  <span className="text-[11px] sm:block hidden text-left text-[#0A2E65] border-r pr-[0.5rem] border-[#9ea5ad]">
                    {transaction.id}
                  </span>

                  <p className="text-sm block sm:hidden text-[#27014F] border-r pr-[0.5rem] border-[#9ea5ad] text-[11px]">
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
                      SUCCESSLL
                    </div>
                  )}
                  {transaction.transactionStatus === "processing" && (
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
              <p className="font-semibold text-[#27014F]">
                ₦{Number(transaction.amount).toLocaleString("en-NG")}
              </p>

              <p className="text-sm sm:block hidden text-[#27014F] text-[11px]">
                {new Date(transaction.transactionDate).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </button>
        ))
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-18rem)]">
          <p className="text-gray-500 text-lg">{noTransaction}</p>
        </div>
      )}

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100">
            {/* Modal Content */}
            <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
              {/* Conditional UI for Transaction Details OR Report Form */}
              {!showReportForm ? (
                <div className="bg-white overflow-y-auto sm:w-[600px] w-[100vw] sm:h-auto h-[min(100dvh,100vh)] max-h-screen   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
                  <div className=" flex flex-row-reverse">
                    {/* Close Button */}
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px] mb-[2rem] mt-[rem] "
                      onClick={handleCloseModal}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>

                  <div className="flex justify-between pb-[4%] border-b border-b-[#E2E8F0]  items-center">
                    <h2 className="text-[32px] font-semibold text-[#27014F] mb-2">
                      ₦{selectedTransaction.amount}
                    </h2>

                    {selectedTransaction.billPaymentCategory === "Data" && (
                      <img
                        src={Data}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.billPaymentCategory ===
                      "Electricity" && (
                      <img
                        src={Electricity}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.billPaymentCategory === "Airtime" && (
                      <img
                        src={Airtime}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.billPaymentCategory === "CableTV" && (
                      <img
                        src={Television}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.billPaymentCategory === "Betting" && (
                      <img
                        src={Gift}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                  </div>

                  <div className="flex gap-[5rem] mt-[8%]">
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Network</p>
                      <div className="flex text-[#0A2E65] items-center gap-[3px] text-[13px]">
                        <p>{selectedTransaction.network.toUpperCase()}</p>
                        <p>{selectedTransaction.quantity}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Date</p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        {new Date(
                          selectedTransaction.transactionDate
                        ).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-[#0A2E65]/60 mb-[10px]">Status</p>

                      {/* Unique Status Icon */}
                      {selectedTransaction.transactionStatus === "success" && (
                        <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                          SUCCESSLL
                        </div>
                      )}
                      {selectedTransaction.transactionStatus ===
                        "processing" && (
                        <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                          PENDING
                        </div>
                      )}
                      {selectedTransaction.transactionStatus === "failed" && (
                        <div className="bg-[#FF3366]/20 px-[5px]  py-[1px] w-fit rounded-[2px] text-[8px] text-[#FF3366]">
                          FAILED
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="my-[6%]">
                    <p className="text-[#0A2E65]/60 mb-[10px]">Reference</p>
                    <div className="flex text-[#0A2E65] items-center text-[13px]">
                      <div className="flex items-center">
                        <p>{selectedTransaction.transactionReference}</p>
                        <button
                          onClick={() =>
                            handleCopy(selectedTransaction.transactionReference)
                          }
                          className="relative flex items-center justify-center cursor-pointer"
                        >
                          <img src={Copy} alt="" />
                          {copiedRef ===
                            selectedTransaction.transactionReference && (
                            <span
                              className={`ml-2 absolute bg-[#32A071]/20 px-[10px] py-[1px] w-fit rounded-[2px] text-[13px] text-[#32A071]  top-[2rem]  ${
                                copiedRef ===
                                selectedTransaction.transactionReference
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
                  {/* Report Button */}
                  <div className=" flex items-center justify-center w-full">
                    {selectedTransaction.status === "pending" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1 flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem]" src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                    {selectedTransaction.status === "failed" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1 flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem]" src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Report Form UI */
                <div className="bg-[#fff] w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
                  <div className="flex justify-between border-b border-b-[#E2E8F0]  pb-[0.rem] items-center">
                    <h2 className="text-[20px] font-semibold text-[#27014F] mb-2 ">
                      Report Transaction
                    </h2>
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px] mb-[2rem] mt-[1rem] "
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
                      <div className="flex mb-[2rem] justify-between">
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

export default UtilityTransaction;
