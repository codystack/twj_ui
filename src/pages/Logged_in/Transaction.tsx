import ReactPaginate from "react-paginate";
import api from "../../services/api";
import { useEffect, useRef, useState } from "react";
import CrytoTransaction from "./Logged_in_components/CryptoTransaction";
import GiftCardTransaction from "./Logged_in_components/GiftcardTransaction";
import UtilityTransaction from "./Logged_in_components/UtilityBillsTransaction";
import TransactionSkeleton from "../../components/TransactionSkeleton";
import ErrorBoundary from "../../components/error/ErrorBoundry";
import { useLocation } from "react-router";

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
  encryptedPowerToken: string;
}

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
}

const Transaction = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "Crypto" | "GiftCard" | "BillsPayment"
  >("Crypto");
  const [loading, setLoading] = useState<boolean>(false);
  const [noTransaction, setNoTransaction] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [cryptoTransaction, setCryptoTransaction] = useState<
    CryptoTransactionType[]
  >([]);
  const [giftcardTransaction, setGiftcardTransaction] = useState<
    giftcardTransaction[]
  >([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

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

      const transactions = response.data.data.data;
      const noTransactionMessage = response.data.message;
      const totalRecords = response.data.data.totalRecords;

      if (type === "Crypto") {
        setCryptoTransaction(transactions as CryptoTransactionType[]);
      } else if (type === "GiftCard") {
        setGiftcardTransaction(transactions as giftcardTransaction[]);
      } else if (type === "BillsPayment") {
        setTransaction(transactions as TransactionType[]);
      }

      setTotalPages(Math.ceil(totalRecords / pageSize));
      setNoTransaction(noTransactionMessage);
      scrollContainer.current?.scrollTo({ top: 0 });
    } catch (err) {
      return err;
      // console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(activeTab, page + 1);
  }, [page, activeTab]);

  useEffect(() => {
    if (activeTab === "Crypto") {
      // console.log("transaction for Crypto ", cryptoTransaction);
    } else if (activeTab === "GiftCard") {
      // console.log("transaction for giftcard", giftcardTransaction);
    }
  }, [activeTab, cryptoTransaction, giftcardTransaction]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
  };

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff]  flex flex-col"
    >
      <div ref={scrollContainer} className="flex-1 overflow-y-auto pb-4 px-4">
        <div className=" flex flex-col  md:ml-[2%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] sm:mt-0 mt-[-1.2rem] sm:ml-0 ml-[-7px] fixed [@media(min-width:1350px)]:w-[78%]  w-[95%]   z-20 bg-[#fff]  ">
            <div className="bg-[#F5F7FA]/99  backdrop-blur-lg w-full   [@media(min-width:900px)]:w-[38%] bg-blur-md flex items-center rounded-[50px] justify-between p-[7px]">
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
                className={`flex-1 px-[20px] cursor-pointer py-[5px] whitespace-nowrap  rounded-[40px] ${
                  activeTab === "GiftCard"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent  text-[#7688B4]"
                }`}
                onClick={() => setActiveTab("GiftCard")}
              >
                Gift Cards
              </button>

              <button
                className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] whitespace-nowrap   ${
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
            {activeTab === "Crypto" &&
              (loading ? (
                <div className="w-full px-5 border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                  <TransactionSkeleton />
                </div>
              ) : (
                <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                  <CrytoTransaction
                    transactions={cryptoTransaction || []}
                    noTransaction={noTransaction}
                  />
                </div>
              ))}

            {/* Dynamic Content Security*/}
            {activeTab === "GiftCard" &&
              (loading ? (
                <div className="w-full px-5 border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                  <TransactionSkeleton />
                </div>
              ) : (
                <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                  <GiftCardTransaction
                    transactions={giftcardTransaction || []}
                    noTransaction={noTransaction}
                  />
                </div>
              ))}
            {/* Dynamic Content Bank*/}
            {activeTab === "BillsPayment" &&
              (loading ? (
                <div className="w-full px-5 border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                  <TransactionSkeleton />
                </div>
              ) : (
                <div className="w-full  border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%] [@media(min-width:900px)]:mt-[3%] ">
                  <ErrorBoundary>
                    <UtilityTransaction
                      transactions={transaction || []}
                      noTransaction={noTransaction}
                    />
                  </ErrorBoundary>
                </div>
              ))}
          </div>

          {loading ||
            (totalPages >= 2 && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
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
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
