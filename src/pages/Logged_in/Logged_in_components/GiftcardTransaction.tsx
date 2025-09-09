import MyStaticLogo from "../../../assets/dashboard_img/profile//transactions/gift_card_icon.svg";
import { useState } from "react";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import Copy from "../../../assets/dashboard_img/profile/transactions/Copy_light.svg";
import HrtBroken from "../../../assets/dashboard_img/profile/transactions/heartbroken.svg";
import Report from "../../../assets/dashboard_img/profile/transactions/report.svg";
import warning from "../../../assets/dashboard_img/disabled-warning .png";
import ArrowDownIcon from "../../../assets/dashboard_img/profile/transactions/transactio_up.svg";
import ArrowUpIcon from "../../../assets/dashboard_img/profile//transactions/transaction_down.svg";

interface giftcardTransaction {
  id: string;
  amount: number;
  currency: string;
  transactionType: string;
  billPaymentCategory: string;
  walletCategory: string;
  transactionReference: string;
  transactionStatus: string;
  transactionId: string;
  transactionDate: string;
  encryptedPowerToken: string | null;
  createdDate: string;
  network: string | null;
  twjUserId: string;
  giftCardName: string;
  giftCardProductAmount: number;
  giftCardProductCurrency: string;
  giftCardRecipientEmail: string;
  giftCardRecipientName: string;
  giftCardRecipientPhone: string;
  giftCardsCategory: string;
}

const GiftCardTransaction: React.FC<{
  transactions: giftcardTransaction[];
  noTransaction: string | null;
}> = ({ transactions, noTransaction }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<giftcardTransaction | null>(null);

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

  function formatNGNPhone(phone: string): string {
    // Remove non-digits just in case
    let cleaned = phone.replace(/\D/g, "");

    // Ensure it starts with +234
    if (cleaned.startsWith("234")) {
      cleaned = "+" + cleaned;
    } else if (cleaned.startsWith("0")) {
      cleaned = "+234" + cleaned.slice(1);
    } else if (!cleaned.startsWith("+234")) {
      cleaned = "+234" + cleaned;
    }

    // Format as +234 XXX XXX XXXX
    return cleaned.replace(/(\+234)(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
  }

  return (
    <div className="p-4">
      {transactions.length > 0 ? (
        transactions
          ?.slice()
          .sort(
            (a, b) =>
              new Date(b.transactionDate).getTime() -
              new Date(a.transactionDate).getTime()
          )
          .map((transaction) => (
            <button
              onClick={() => handleOpenModal(transaction)}
              key={transaction.id}
              className="flex justify-between w-full cursor-pointer items-center bg-white border-b  border-[#E2E8F0] last:border-b-0 md:p-4 py-3"
            >
              {/* Left Side: Static Logo + Transaction Details */}
              <div className="flex items-center gap-4 relative">
                {/* Static Logo Container */}
                <div className="relative">
                  <img
                    src={MyStaticLogo}
                    alt="Transaction Logo"
                    className="w-10 h-10"
                  />
                  {/* Unique Direction Arrow (Absolute Positioning) */}
                  {transaction.giftCardsCategory === "Buy" ? (
                    <img
                      src={ArrowUpIcon}
                      alt="Outward Transaction"
                      className="absolute right-0 bottom-0 w-4 h-4"
                    />
                  ) : (
                    <img
                      src={ArrowDownIcon}
                      alt="Inward Transaction"
                      className="absolute bottom-0 right-0 w-4 h-4"
                    />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="sm:py-0 py-2">
                  <p className="text-[16px] text-left text-[#27014F]">
                    {transaction.giftCardName}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600">
                    {/* Tracking ID */}
                    {/* <span className="text-[11px]  text-[#0A2E65] border-r pr-[0.5rem] border-[#9ea5ad]">
                      {transaction.id}
                    </span> */}
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
                    {transaction.transactionStatus === "PENDING" && (
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
                  ₦{transaction.amount.toLocaleString()}
                </p>
              </div>
            </button>
          ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-18rem)]">
          <img src={warning} className="md:w-[9rem] w-[5rem]" alt="" />
          <p className="text-gray-500 text-lg">{noTransaction}!</p>
        </div>
      )}

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
            {/* Dialog Box */}
            <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
              {!showReportForm ? (
                <div className="bg-white overflow-y-auto sm:w-[600px] w-[100vw] sm:h-auto h-[min(100dvh,100vh)] max-h-screen   z-[50]   py-6 px-4 sm:rounded-[15px]  flex flex-col">
                  <div className=" flex flex-row-reverse">
                    {/* Close Button */}
                    <button
                      className="  cursor-pointer p-[5px] mr-[10px] mb-[1rem] pr-[10px] mt-[1rem] "
                      onClick={handleCloseModal}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>

                  <div className="flex justify-between pb-[4%] border-b border-b-[#E2E8F0] items-center">
                    <h2 className="text-[32px] font-semibold text-[#27014F] mb-2">
                      ₦{selectedTransaction.amount.toLocaleString()}
                    </h2>

                    {/* Static Logo Container */}
                    <div className="relative">
                      <img
                        src={MyStaticLogo}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                      {/* Unique Direction Arrow (Absolute Positioning) */}
                      {selectedTransaction.giftCardsCategory === "Buy" ? (
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
                  <>
                    <div className="sm:block hidden">
                      <div className="flex gap-[3rem] items-center jus mt-[8%]">
                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">Name</p>
                          <div className="flex text-[#0A2E65] items-center gap-[3px] text-[13px]">
                            <p>{selectedTransaction.giftCardName}</p>
                            {/* <p>{selectedTransaction.quantity}</p> */}
                          </div>
                        </div>
                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">
                            Recipient Email
                          </p>
                          <div className="flex text-[#0A2E65] items-center text-[13px]">
                            {selectedTransaction.giftCardRecipientEmail}
                          </div>
                        </div>
                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">
                            Recippient Phone
                          </p>
                          <div className="flex text-[#0A2E65] items-center text-[13px]">
                            {selectedTransaction.giftCardRecipientPhone
                              ? formatNGNPhone(
                                  selectedTransaction.giftCardRecipientPhone
                                )
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div className="my-[6%] flex gap-[3rem] items-center">
                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">
                            Reference
                          </p>
                          <div className="flex text-[#0A2E65] items-center text-[13px]">
                            <div className="flex items-center">
                              <p>{selectedTransaction.transactionReference}</p>
                              <button
                                onClick={() =>
                                  handleCopy(
                                    selectedTransaction.transactionReference
                                  )
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

                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">Date</p>
                          <div className="flex text-[#0A2E65] items-center text-[13px]">
                            <p>
                              {new Date(
                                selectedTransaction.transactionDate
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                              })}
                            </p>
                            <div className="w-[5px] h-[5px] rounded-full mx-[4px] bg-[#0A2E65]/70"></div>
                            <p>
                              {new Date(
                                selectedTransaction.transactionDate
                              ).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">Action</p>
                          <div className="flex text-[#0A2E65] items-center text-[13px]">
                            {selectedTransaction.giftCardsCategory} Gift Card
                          </div>
                        </div>
                        <div>
                          <p className="text-[#0A2E65]/60 mb-[10px]">Status</p>

                          {/* Unique Status Icon */}
                          {selectedTransaction.transactionStatus ===
                            "success" && (
                            <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                              SUCCESSLL
                            </div>
                          )}
                          {selectedTransaction.transactionStatus ===
                            "PENDING" && (
                            <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                              PENDING
                            </div>
                          )}
                          {selectedTransaction.transactionStatus ===
                            "failed" && (
                            <div className="bg-[#FF3366]/20 px-[5px]  py-[1px] w-fit rounded-[2px] text-[8px] text-[#FF3366]">
                              FAILED
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="block mt-8 sm:hidden">
                      <div className="border border-gray-300 rounded-[10px] p-3 space-y-4">
                        {/* Name */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Name</p>
                          <p className="text-[#0A2E65]">
                            {selectedTransaction.giftCardName}
                          </p>
                        </div>

                        {/* Recipient Email */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Recipient Email</p>
                          <p className="text-[#0A2E65]">
                            {selectedTransaction.giftCardRecipientEmail}
                          </p>
                        </div>

                        {/* Recipient Phone */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Recipient Phone</p>
                          <p className="text-[#0A2E65]">
                            {selectedTransaction.giftCardRecipientPhone
                              ? formatNGNPhone(
                                  selectedTransaction.giftCardRecipientPhone
                                )
                              : ""}
                          </p>
                        </div>

                        {/* Reference */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Reference</p>
                          <div className="flex items-center gap-2">
                            <p>{selectedTransaction.transactionReference}</p>
                            <button
                              onClick={() =>
                                handleCopy(
                                  selectedTransaction.transactionReference
                                )
                              }
                              className="cursor-pointer"
                            >
                              <img src={Copy} alt="copy" />
                            </button>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Date & Time</p>
                          <p className="text-[#0A2E65]">
                            {new Date(
                              selectedTransaction.transactionDate
                            ).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            ·{" "}
                            {new Date(
                              selectedTransaction.transactionDate
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Action</p>
                          <p className="text-[#0A2E65]">
                            {selectedTransaction.giftCardsCategory} Gift Card
                          </p>
                        </div>

                        {/* Status */}
                        <div className="flex justify-between items-center text-[13px]">
                          <p className="text-[#0A2E65]/60">Status</p>
                          {selectedTransaction.transactionStatus ===
                            "success" && (
                            <span className="bg-[#32A071]/20 px-2 py-[1px] rounded-[2px] text-[12px] text-[#32A071]">
                              SUCCESS
                            </span>
                          )}
                          {selectedTransaction.transactionStatus ===
                            "PENDING" && (
                            <span className="bg-[#FFB700]/20 px-2 py-[1px] rounded-[2px] text-[12px] text-[#FFB700]">
                              PENDING
                            </span>
                          )}
                          {selectedTransaction.transactionStatus ===
                            "failed" && (
                            <span className="bg-[#FF3366]/20 px-2 py-[1px] rounded-[2px] text-[12px] text-[#FF3366]">
                              FAILED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </>

                  {/* Report Button */}
                  <div className=" flex items-center justify-center w-full">
                    {selectedTransaction.transactionStatus === "pending" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1 flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem] " src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                    {selectedTransaction.transactionStatus === "failed" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1  flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
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

export default GiftCardTransaction;
