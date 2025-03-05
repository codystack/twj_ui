// import { FaArrowDown, FaArrowUp, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
// import { MyStaticLogo, ArrowDownIcon, ArrowUpIcon, SuccessIcon, PendingIcon, FailedIcon } from "@/assets/icons";
import MyStaticLogo from "../../../assets/dashboard_img/profile//transactions/bitcoin.svg";
import ArrowDownIcon from "../../../assets/dashboard_img/profile/transactions/transactio_up.svg";
import ArrowUpIcon from "../../../assets/dashboard_img/profile//transactions/transaction_down.svg";

const transactions = [
  {
    id: "QYWTU578HG",
    type: "Inward Crypto Transfer",
    amount: "₦1,880,500",
    date: "Mar 4, 2025",
    direction: "inward",
    status: "success",
  },
  {
    id: "XYZ123456",
    type: "Outward Crypto Transfer",
    amount: "₦200,500",
    date: "Mar 3, 2025",
    direction: "outward",
    status: "pending",
  },
  {
    id: "ABCD7890JK",
    type: "Outward Crypto Transfer",
    amount: "₦1,167,500",
    date: "Mar 2, 2025",
    direction: "outward",
    status: "failed",
  },
  {
    id: "LMNOP45678",
    type: "Inward Crypto Transfer",
    amount: "₦1,200,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
  },
];

const CrytoTransaction = () => {
  return (
    <div className="space-y-4 p-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center bg-white border-b  border-[#E2E8F0] p-4"
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
                <span className="text-[11px] text-[#0A2E65]">
                  {transaction.id}
                </span>
                {/* Unique Status Icon */}
                {transaction.status === "success" && (
                  <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
             
                    SUCCESS
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
            <p className="font-semibold text-[#27014F]  ">{transaction.amount}</p>
            <p className="text-sm text-[#27014F] text-[11px]">{transaction.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrytoTransaction;
