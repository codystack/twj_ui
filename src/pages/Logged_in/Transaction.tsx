import { useEffect, useRef, useState } from "react";
import CrytoTransaction from "./Logged_in_components/CryptoTransaction";
import GiftCardTransaction from "./Logged_in_components/GiftcardTransaction";
import UtilityTransaction from "./Logged_in_components/UtilityBillsTransaction";
import api from "../../services/api";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Access VITE env variable
interface TransactionType {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: string;
  status: string;
  time: string;
  name: string;
  direction: string;
  
  network: string;
  quantity: string;

  reference: string;
}

const Transaction = () => {
  const [activeTab, setActiveTab] = useState<
    "Crypto" | "GiftCard" | "BillsPayment"
  >("Crypto");
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [noTransaction, setNoTransaction] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  // Function to fetch transactions based on the activeTab
  const fetchTransactions = async (type: string) => {
    setLoading(true);
    setLoading(true);
    // setError(null);
    try {
      const response = await api.get(
        `${BASE_URL}/Transaction/allTransactions?TransactionType=${type}`
      );

      // console.log(response.data.data.data);
      const transactions: TransactionType[] = response.data.data.data; // Ensure correct data structure
      const NoTransactionResponse = response.data.message
      console.log('response for empty transaction',NoTransactionResponse);
      console.log(transactions);
      setTransaction(transactions); 
      setNoTransaction(NoTransactionResponse); 
    } catch (err) {
      // setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions whenever the activeTab changes
  useEffect(() => {
    fetchTransactions(activeTab);
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff]  flex flex-col"
    >
      <div className="flex-1 overflow-y-auto pb-4 px-4">
        <div className=" flex flex-col  ml-[3%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] fixed w-[76%]  z-20 bg-[#fff]  ">
            <div className="bg-[#F5F7FA]/99  backdrop-blur-lg  w-[calc(100%-63%)] bg-blur-md flex items-center rounded-[50px] justify-between p-[7px]">
              <button
                className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                  activeTab === "Crypto"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent text-[#7688B4]"
                }`}
                onClick={() => setActiveTab("Crypto")}
              >
                Crypto
              </button>

              <button
                className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                  activeTab === "GiftCard"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent  text-[#7688B4]"
                }`}
                onClick={() => setActiveTab("GiftCard")}
              >
                Gift Cards
              </button>

              <button
                className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px]  ${
                  activeTab === "BillsPayment"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent  text-[#7688B4]"
                }`}
                onClick={() => {
                  setActiveTab("BillsPayment");
                  handleScrollToTop();
                }}
              >
                Utility Bills
              </button>
            </div>
          </div>

          {/* Dynamic Content profile*/}
          <div className=" h-[100%]  mt-[10%] ">
            {activeTab === "Crypto" && (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
                <CrytoTransaction
                // transactions={transactions || []}
                />
              </div>
            )}

            {/* Dynamic Content Security*/}
            {activeTab === "GiftCard" && (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
                <GiftCardTransaction
                // transactions={transactions || []}
                />
              </div>
            )}
            {/* Dynamic Content Bank*/}
            {activeTab === "BillsPayment" && (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
                <UtilityTransaction
                transactions={transaction || []}
                noTransaction={noTransaction}
                />
              </div>
            )}
          </div>

          {loading && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
              <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
