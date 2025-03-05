import Airtime from "../../../assets/dashboard_img/profile//transactions/airitime.svg";
import Data from "../../../assets/dashboard_img/profile//transactions/data.svg";
import Electricity from "../../../assets/dashboard_img/profile//transactions/electricity.svg";
import Gift from "../../../assets/dashboard_img/profile//transactions/gift.svg";
import Television from "../../../assets/dashboard_img/profile//transactions/television.svg";

const transactions = [
  {
    id: "XYZ123456",
    name: "Data Purchase",
    type: "data",
    amount: "₦200,500",
    date: "Mar 3, 2025",
    direction: "outward",
    status: "failed",
  },
  {
    id: "QYWTU578HG",
    name: "Electricity Purchase",
    type: "electricity",
    amount: "₦1,880,500",
    date: "Mar 4, 2025",
    direction: "inward",
    status: "success",
  },

  {
    id: "ABCD7890JK",
    name: "Gift Card Sale",
    type: "gift",
    amount: "₦1,167,500",
    date: "Mar 2, 2025",
    direction: "outward",
    status: "failed",
  },
  {
    id: "LMNO09896",
    name: "Data Purchase",
    type: "data",
    amount: "₦1,200,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
  },
  {
    id: "LMNOP4FDYT7",
    name: "Airtime Purchase",
    type: "airtime",
    amount: "₦1,200,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "pending",
  },
  {
    id: "LMN34WRT4567",
    name: "Cable TV Subscriton",
    type: "Cable_tv",
    amount: "₦1,200,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
  },
];

const UtilityTransaction = () => {
  return (
    <div className="space-y-4 p-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex justify-between items-center bg-white border-b  border-[#E2E8F0] p-4"
        >
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              {transaction.type === "data" && (
                <img src={Data} alt="Transaction Logo" className="w-12 h-12" />
              )}
              {transaction.type === "electricity" && (
                <img src={Electricity} alt="Transaction Logo" className="w-12 h-12" />
              )}
              {transaction.type === "airtime" && (
                <img src={Airtime} alt="Transaction Logo" className="w-12 h-12" />
              )}
              {transaction.type === "Cable_tv" && (
                <img src={Television} alt="Transaction Logo" className="w-12 h-12" />
              )}
              {transaction.type === "gift" && (
                <img src={Gift} alt="Transaction Logo" className="w-12 h-12" />
              )}
            </div>

            {/* Transaction Details */}
            <div>
              <p className="text-[16px] text-[#27014F]">{transaction.name}</p>
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
            <p className="font-semibold text-[#27014F]  ">
              {transaction.amount}
            </p>
            <p className="text-sm text-[#27014F] text-[11px]">
              {transaction.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UtilityTransaction;
