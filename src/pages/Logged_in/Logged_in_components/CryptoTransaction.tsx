import swap from "../../../assets/crpto_icons/swap_174.svg";
import send from "../../../assets/crpto_icons/out_crypto.svg";
import buy from "../../../assets/crpto_icons/in_crypto.svg";
import { useState } from "react";
import Delete from "../../../assets/dashboard_img/profile/cancel.svg";
import Copy from "../../../assets/dashboard_img/profile/transactions/Copy_light.svg";
import HrtBroken from "../../../assets/dashboard_img/profile/transactions/heartbroken.svg";
import Report from "../../../assets/dashboard_img/profile/transactions/report.svg";
import btc from "../../../assets/crpto_icons/wallet_icons/Bitcoin.svg";
import eth from "../../../assets/crpto_icons/wallet_icons/Ethereumm.svg";
import usdt from "../../../assets/crpto_icons/wallet_icons/usdt.svg";
import bnb from "../../../assets/crpto_icons/wallet_icons/Binace_coin.svg";
import sol from "../../../assets/crpto_icons/wallet_icons/solana.svg";
import usdc from "../../../assets/crpto_icons/wallet_icons/USDC.svg";
import trx from "../../../assets/crpto_icons/wallet_icons/Tron.svg";
import ton from "../../../assets/crpto_icons/wallet_icons/ton_coin.svg";
import warning from "../../../assets/dashboard_img/disabled-warning .png";

interface CryptoTransactionType {
  amount: number;
  billPaymentCategory: string;
  createdDate: string;
  cryptoCategory: string;
  cryptoFromAmount: number;
  cryptoFromCurrency: string;
  cryptoNetwork: string | null;
  cryptoToAmount: number;
  cryptoToCurrency: string;
  currency: string;
  id: string;
  network: string | null;
  transactionDate: string;
  transactionId: string | null;
  transactionReference: string;
  transactionStatus: "Processing" | "success" | "Failed" | string;
  transactionType: string;
  twjUserId: string;
  walletCategory: string;
}

const CrytoTransaction: React.FC<{
  transactions: CryptoTransactionType[];
  noTransaction: string | null;
}> = ({ transactions, noTransaction }) => {
  const [selectedTransaction, setSelectedTransaction] =
    useState<CryptoTransactionType | null>(null);
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

  const handleOpenModal = (transaction: CryptoTransactionType) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

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
    <div className="space-y-4 p-4 px-3">
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
              className="flex justify-between w-full cursor-pointer items-center bg-white border-b  border-[#E2E8F0] last:border-b-0  md:p-4  md:py-3 p-1 "
            >
              {/* Left Side: Static Logo + Transaction Details */}
              <div className="flex items-center gap-4 relative">
                {/* Static Logo Container */}
                <div className="relative">
                  {transaction.currency === "btc" && (
                    <img
                      src={btc}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "usdt" && (
                    <img
                      src={usdt}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "ton" && (
                    <img
                      src={ton}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "eth" && (
                    <img
                      src={eth}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "bnb" && (
                    <img
                      src={bnb}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "usdc" && (
                    <img
                      src={usdc}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "trx" && (
                    <img
                      src={trx}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "sol" && (
                    <img
                      src={sol}
                      alt="Transaction Logo"
                      className="sm:w-12 sm:h-12 w-10 h-10"
                    />
                  )}
                  {transaction.currency === "ngn" && (
                    <>
                      {transaction.cryptoFromCurrency === "BTC" && (
                        <img
                          src={btc}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "USDT" && (
                        <img
                          src={usdt}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "TON" && (
                        <img
                          src={ton}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "ETH" && (
                        <img
                          src={eth}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "BNB" && (
                        <img
                          src={bnb}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "USDC" && (
                        <img
                          src={usdc}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "TRX" && (
                        <img
                          src={trx}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "SOL" && (
                        <img
                          src={sol}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                      {transaction.cryptoFromCurrency === "TON" && (
                        <img
                          src={ton}
                          alt="Transaction Logo"
                          className="sm:w-12 sm:h-12 w-10 h-10"
                        />
                      )}
                    </>
                  )}

                  {/* Unique Direction Arrow (Absolute Positioning) */}
                  {transaction.cryptoCategory === "Buy" && (
                    <img
                      src={buy}
                      alt="Inward Transaction"
                      className="absolute bottom-0 right-0 "
                    />
                  )}
                  {transaction.cryptoCategory === "Swap" && (
                    <img
                      src={swap}
                      alt="Inward Transaction"
                      className="absolute bottom-0 right-0"
                    />
                  )}
                  {transaction.cryptoCategory === "Send" && (
                    <img
                      src={send}
                      alt="Inward Transaction"
                      className="absolute bottom-0 right-0"
                    />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="sm:py-0 py-2">
                  <p className="text-[16px] text-[#27014F] sm:mb-0 mb-1 text-left">
                    {transaction.currency.toLowerCase() === "ngn"
                      ? `Swap ${transaction.cryptoFromAmount}  ${transaction.cryptoFromCurrency} `
                      : `${transaction.currency.toUpperCase()} ${
                          transaction.cryptoCategory.charAt(0).toUpperCase() +
                          transaction.cryptoCategory.slice(1).toLowerCase()
                        }`}
                  </p>

                  <div className="flex items-center gap-2 text-gray-600">
                    {/* Tracking ID */}
                    {/* <span className="text-[11px]  hidden text-[#0A2E65] border-r pr-[0.5rem] border-[#9ea5ad]">
                      {transaction.transactionReference}
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
                        SUCCESSFUL
                      </div>
                    )}
                    {transaction.transactionStatus === "Processing" && (
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
                  {transaction.cryptoToAmount === null ? (
                    <p>
                      {transaction.currency.toUpperCase()}{" "}
                      {new Intl.NumberFormat("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(transaction.amount)}
                    </p>
                  ) : (
                    <p>
                      {transaction.currency.toUpperCase() === "NGN"
                        ? `₦ ${(
                            transaction.cryptoToAmount ?? 0
                          ).toLocaleString()}`
                        : `₦ ${(
                            transaction.cryptoFromAmount ?? 0
                          ).toLocaleString()}`}
                    </p>
                  )}
                </p>

                {/* <p className="text-sm sm:block hidden text-[#27014F] text-[11px]">
                  {new Date(transaction.transactionDate).toLocaleString(
                    "en-US",
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }
                  )}
                </p> */}
              </div>
            </button>
          ))
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-18rem)]">
          <img src={warning} className="md:w-[9rem] w-[5rem]" alt="" />
          <p className="text-gray-500 text-lg">{noTransaction}!</p>
        </div>
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100">
            {/* Modal Content */}
            <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
              {!showReportForm ? (
                <div className="bg-white overflow-y-auto sm:w-[600px] w-[100vw] sm:h-auto h-[min(100dvh,100vh)] max-h-screen  z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
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
                      {selectedTransaction.currency.toUpperCase() === "NGN"
                        ? `₦ ${(
                            selectedTransaction.cryptoToAmount ?? 0
                          ).toLocaleString()}`
                        : `₦ ${(
                            selectedTransaction.cryptoFromAmount ?? 0
                          ).toLocaleString()}`}
                    </h2>

                    <div className="relative">
                      {selectedTransaction.currency === "btc" && (
                        <img
                          src={btc}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "usdt" && (
                        <img
                          src={usdt}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "ton" && (
                        <img
                          src={ton}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "eth" && (
                        <img
                          src={eth}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "bnb" && (
                        <img
                          src={bnb}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "usdc" && (
                        <img
                          src={usdc}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "trx" && (
                        <img
                          src={trx}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}
                      {selectedTransaction.currency === "sol" && (
                        <img
                          src={sol}
                          alt="Transaction Logo"
                          className="w-12 h-12"
                        />
                      )}

                      {selectedTransaction.currency === "ngn" && (
                        <>
                          {selectedTransaction.cryptoFromCurrency === "BTC" && (
                            <img
                              src={btc}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency ===
                            "USDT" && (
                            <img
                              src={usdt}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "TON" && (
                            <img
                              src={ton}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "ETH" && (
                            <img
                              src={eth}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "BNB" && (
                            <img
                              src={bnb}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency ===
                            "USDC" && (
                            <img
                              src={usdc}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "TRX" && (
                            <img
                              src={trx}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "SOL" && (
                            <img
                              src={sol}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                          {selectedTransaction.cryptoFromCurrency === "TON" && (
                            <img
                              src={ton}
                              alt="Transaction Logo"
                              className="w-12 h-12"
                            />
                          )}
                        </>
                      )}

                      {/* Unique Direction Arrow (Absolute Positioning) */}
                      {selectedTransaction.cryptoCategory === "Buy" && (
                        <img
                          src={buy}
                          alt="Inward Transaction"
                          className="absolute bottom-0 right-0 "
                        />
                      )}
                      {selectedTransaction.cryptoCategory === "Swap" && (
                        <img
                          src={swap}
                          alt="Inward Transaction"
                          className="absolute bottom-0 right-0"
                        />
                      )}
                      {selectedTransaction.cryptoCategory === "Send" && (
                        <img
                          src={send}
                          alt="Inward Transaction"
                          className="absolute bottom-0 right-0"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-[5rem] mt-[8%]">
                    {/* <div> */}
                    {selectedTransaction.network && (
                      <>
                        <p className="text-[#0A2E65]/60 mb-[10px]">Network</p>
                        <div className="flex text-[#0A2E65] items-center gap-[3px] text-[13px]">
                          <p>
                            {selectedTransaction.network
                              ? selectedTransaction.network
                              : "---"}
                          </p>
                          {/* <p>{selectedTransaction.quantity}</p> */}
                        </div>
                      </>
                    )}
                    {/* </div> */}
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
                      <p className="text-[#0A2E65]/60 mb-[10px]">
                        {" "}
                        Crypto Value
                      </p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <p>
                          {selectedTransaction.currency.toUpperCase() === "NGN"
                            ? `${selectedTransaction.cryptoFromCurrency.toUpperCase()} ${(
                                selectedTransaction.cryptoFromAmount ?? 0
                              ).toLocaleString()}`
                            : `${selectedTransaction.currency.toUpperCase()} ${(
                                selectedTransaction.cryptoToAmount ?? 0
                              ).toLocaleString()}`}{" "}
                        </p>
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
                        "Processing" && (
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
                  <div className="flex gap-[3rem]">
                    <div className="my-[6%]">
                      <p className="text-[#0A2E65]/60 mb-[10px]">Reference</p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <div className="flex items-center">
                          <p>{selectedTransaction.transactionReference}</p>
                          <button></button>

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
                    <div className="my-[6%]">
                      <p className="text-[#0A2E65]/60 mb-[10px]">
                        Wallet Address
                      </p>
                      <div className="flex text-[#0A2E65] items-center text-[13px]">
                        <div className="flex items-center">
                          <p>{selectedTransaction.transactionReference}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Report Button */}
                  <div className=" flex items-center justify-center w-full">
                    {selectedTransaction.transactionStatus === "pending" && (
                      <button
                        onClick={handleReportClick}
                        className="w-[360px] gap-1  flex items-center justify-center my-[2rem] cursor-pointer py-3 bg-[#FF3366] hover:bg-[#FF3366]/90  transition duration-300 text-white rounded-lg"
                      >
                        <img className="w-[1.1rem] " src={Report} alt="" />
                        <p> Report Transaction</p>
                      </button>
                    )}
                    {selectedTransaction.transactionStatus === "failed" && (
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
