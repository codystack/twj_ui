import ReactPaginate from "react-paginate";
import api from "../../services/api";
import { useEffect, useRef, useState } from "react";
import CrytoTransaction from "./Logged_in_components/CryptoTransaction";
import GiftCardTransaction from "./Logged_in_components/GiftcardTransaction";
import UtilityTransaction from "./Logged_in_components/UtilityBillsTransaction";

const BASE_URL = import.meta.env.VITE_BASE_URL;
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
}

const Transaction = () => {
  const [activeTab, setActiveTab] = useState<
    "Crypto" | "GiftCard" | "BillsPayment"
  >("Crypto");
  const [loading, setLoading] = useState<boolean>(false);
  const [noTransaction, setNoTransaction] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [page, setPage] = useState(0); // react-paginate starts from 0
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  // Function to fetch transactions based on the activeTab and page

  const pageSize = 20;

  const fetchTransactions = async (type: string, page: number) => {
    setLoading(true);
    try {
      const response = await api.get(
        `${BASE_URL}/Transaction/allTransactions?TransactionType=${type}&page=${page}&pageSize=${pageSize}&BillPaymentCategory=${"all"}`
      );

      const transactions: TransactionType[] = response.data.data.data;
      const noTransactionMessage = response.data.message;
      const totalRecords = response.data.data.totalRecords;

      setTransaction(transactions);
      setTotalPages(Math.ceil(totalRecords / pageSize));
      setNoTransaction(noTransactionMessage);
      // window.scrollTo({ top: 0, behavior: "smooth" });
   
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(activeTab, page + 1);
  }, [page, activeTab]);



  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff]  flex flex-col"
    >
      <div className="flex-1 overflow-y-auto pb-4 px-4">
        <div className=" flex flex-col  ml-[3%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] fixed w-[75%]  z-20 bg-[#fff]  ">
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

          {totalPages >= 2 && (
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange}
              forcePage={page}
              containerClassName="flex items-center justify-center mt-4 space-x-2"
              // Styles for <li> wrapper
              pageClassName="border border-[#8003A9] rounded-[5px]"
              previousClassName="border border-[#8003A9] rounded-[5px]"
              nextClassName="border  border-[#8003A9] rounded-[5px]"
              breakClassName=""
              // Styles for <a> inside
              pageLinkClassName="px-3 py-1 w text-[#27014F] rounded-[5px] cursor-pointer hover:bg-[#8003A9]/15 hover:text-[#27014F]"
              previousLinkClassName="px-3 py-1 text-[#27014F] rounded-[5px] cursor-pointer hover:bg-[#8003A9]/15 hover:text-[#27014F]"
              nextLinkClassName="px-3 py-1 text-[#27014F] rounded-[5px] cursor-pointer hover:bg-[#8003A9]/15 hover:text-[#27014F]"
              breakLinkClassName="px-3 py-1 text-[#27014F] rounded-[5px] cursor-default"
              activeLinkClassName="bg-[#8003A9] text-white"
            />
          )}

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
