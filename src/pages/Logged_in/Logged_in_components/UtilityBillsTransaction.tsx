import { useState } from "react";
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

const transactions = [
  {
    id: "XYZ123456",
    name: "Data Purchase",
    type: "data",
    amount: "₦20,500",
    date: "Mar 3, 2025",
    direction: "outward",
    status: "failed",
    network: "AIRTEL",
    quantity: "10GB Data",
    time: "1:45",
    reference: "21345467800000653",
  },
  {
    id: "QYWTU578HG",
    name: "Electricity Purchase",
    type: "electricity",
    amount: "₦30,500",
    date: "Mar 4, 2025",
    direction: "inward",
    status: "success",
    network: "AIRTEL",
    quantity: "4GB Data",
    time: "1:45",
    reference: "000005234567865443",
  },

  {
    id: "ABCD7890JK",
    name: "Gift Card Sale",
    type: "gift",
    amount: "₦7,500",
    date: "Mar 2, 2025",
    direction: "outward",
    status: "failed",
    network: "AIRTEL",
    quantity: "3GB Data",
    time: "12:05",
    reference: "1111123450653",
  },
  {
    id: "LMNO09896",
    name: "Data Purchase",
    type: "data",
    amount: "₦10,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
    network: "GLO",
    quantity: "10GB Data",
    time: "4:43",
    reference: "42356001234000",
  },
  {
    id: "LMNOP4FDYT7",
    name: "Airtime Purchase",
    type: "airtime",
    amount: "₦1,250",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "pending",
    network: "MTN",
    quantity: "1.5GB Data",
    time: "11:35",
    reference: "00000111234567",
  },
  {
    id: "LMN34WRT4567",
    name: "Cable TV Subscriton",
    type: "Cable_tv",
    amount: "₦2,750",
    date: "Mar 1, 2025",
    direction: "inward",
    status: "success",
    network: "AIRTEL",
    quantity: "4GB Data",
    time: "1:45",
    reference: "203429400000000112",
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
  network: string;
  quantity: string;
  time: string;
  reference: string;
};

const UtilityTransaction = () => {
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
          className="flex justify-between cursor-pointer items-center bg-white border-b  w-full border-[#E2E8F0] last:border-b-0 p-4"
        >
          <div className="flex items-center gap-4 relative">
            <div className="relative">
              {transaction.type === "data" && (
                <img src={Data} alt="Transaction Logo" className="w-12 h-12" />
              )}
              {transaction.type === "electricity" && (
                <img
                  src={Electricity}
                  alt="Transaction Logo"
                  className="w-12 h-12"
                />
              )}
              {transaction.type === "airtime" && (
                <img
                  src={Airtime}
                  alt="Transaction Logo"
                  className="w-12 h-12"
                />
              )}
              {transaction.type === "Cable_tv" && (
                <img
                  src={Television}
                  alt="Transaction Logo"
                  className="w-12 h-12"
                />
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
                <span className="text-[11px] text-[#0A2E65] border-r pr-[0.5rem] border-[#9ea5ad]">
                  {transaction.id}
                </span>

                {/* Unique Status Icon */}
                {transaction.status === "success" && (
                  <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                    SUCCESSLL
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

      {/* Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark Layered Background */}
          <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100">
            {/* Modal Content */}
            <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
              {/* Conditional UI for Transaction Details OR Report Form */}
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

                  <div className="flex justify-between pb-[4%] border-b border-b-[#E2E8F0]  items-center">
                    <h2 className="text-[32px] font-semibold text-[#27014F] mb-2">
                      {selectedTransaction.amount}
                    </h2>

                    {selectedTransaction.type === "data" && (
                      <img
                        src={Data}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.type === "electricity" && (
                      <img
                        src={Electricity}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.type === "airtime" && (
                      <img
                        src={Airtime}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.type === "Cable_tv" && (
                      <img
                        src={Television}
                        alt="Transaction Logo"
                        className="w-12 h-12"
                      />
                    )}
                    {selectedTransaction.type === "gift" && (
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
                  <div className="my-[6%]">
                    <p className="text-[#0A2E65]/60 mb-[10px]">Reference</p>
                    <div className="flex text-[#0A2E65] items-center text-[13px]">
                      <div className="flex items-center">
                        <p>{selectedTransaction.reference}</p>
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
