import Lines from "../../assets/dashboard_img/Polygon.svg";
import eye_lines from "../../assets/dashboard_img/eye_covered.svg";
import eye from "../../assets/dashboard_img/Eye_open_white.svg";
// import virtualCard from "../../assets/dashboard_img/virtualcardxx 1.svg";
import ArrowUp from "../../assets/dashboard_img/Arrow_up.svg";
import ArrowDown from "../../assets/dashboard_img/Arrow_down.svg";
import { useEffect, useState } from "react";
// import Betting from "./Logged_in_components/someUtilityComponent/Betting";
// import CableTv from "./Logged_in_components/someUtilityComponent/CableTv";
// import Electricity from "./Logged_in_components/someUtilityComponent/Electricity";
// import Data from "./Logged_in_components/someUtilityComponent/Data";
// import Airtime from "./Logged_in_components/someUtilityComponent/Airtime";
// import Crypto from "./Logged_in_components/someUtilityComponent/Crypto";
// import GiftCard from "./Logged_in_components/someUtilityComponent/GiftCard";
// import Support from "./Logged_in_components/someUtilityComponent/Support";
// import ErrorBoundary from "../../components/error/ErrorBoundry";
import Credit from "../../assets/dashboard_img/Credit.svg";
import Add_icon from "../../assets/dashboard_img/Add_icon.svg";
import Debit from "../../assets/dashboard_img/Debit.svg";
import { useLocation } from "react-router-dom";
import cancel from "../../assets/dashboard_img/profile/cancel.svg";
import { useUserStore } from "../../store/useUserStore";
import copyImg from "../../assets/dashboard_img/withdrawal-copy-.svg";
import bankImg from "../../assets/dashboard_img/withdrawal_bank-icon.svg";
import Select from "react-select";
import Button from "../../components/Button";
import { useBankStore } from "../../store/useBankStore";
import RouteChangeHandler from "../../components/RouteChangeHandler";
import CreditDebitTransactions from "./Logged_in_components/CreditDebitTransactions";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ReactPaginate from "react-paginate";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TransactionSkeleton from "../../components/TransactionSkeleton";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "8px",
    padding: "9px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    "&:hover": {
      border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    },
  }),
  // option: (provided: any, state: any) => ({
  //   ...provided,
  //   cursor: "pointer",
  //   textAlign: "left",
  //   backgroundColor: state.isSelected ? "#8003A9" : "#fff",
  // }),
  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: state.isSelected
      ? "#8003A9"
      : state.isFocused
      ? "#F8E0FF" // Hover background color
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
  }),
};

const Wallet = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [noTransaction, setNoTransaction] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [page, setPage] = useState(0); // react-paginate starts from 0
  const [totalPages, setTotalPages] = useState(1);

  const [isHidden, setIsHidden] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const { user, fetchUser } = useUserStore();
  const { bankList, fetchBanks } = useBankStore();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bank: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    bank: "",
  });

  const textToCopy = user?.accountNumber?.toString() ?? "No account number";

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const openWithdrawalModal = () => {
    // const completeKyc = localStorage.getItem("kycComplete");
    fetchBanks();
    setShowWithdrawalModal(true);
    // console.log(bankList);
    // if (completeKyc === "true") {
    //   setShowTopupModal(true);
    //   setShowKycModal(false);
    // } else {
    //   setShowTopupModal(false);
    //   setShowKycModal(true);
    // }
  };

  const openModal = () => {
    const completeKyc = localStorage.getItem("kycComplete");

    if (completeKyc === "true") {
      setShowTopupModal(true);
      setShowKycModal(false);
    } else {
      setShowTopupModal(false);
      setShowKycModal(true);
    }
  };

  const options = bankList.map((bank) => ({
    label: `${bank.accountNumber} - ${bank.bankName}`,
    value: bank.accountNumber,
  }));

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "amount":
        const amountValue = Number(value);
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount is required",
          }));
        } else if (isNaN(amountValue)) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be a number",
          }));
        } else if (amountValue < 1000) {
          setErrors((prev) => ({
            ...prev,
            amount: "Amount must be greater than or equal to ₦1000",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            amount: "",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate the field on change
    validateField(name, value);
  };

  useEffect(() => {
    fetchUser();
    // console.log(textToCopy);
    const timeout = setTimeout(() => {
      const kycComplete = localStorage.getItem("kycComplete");
      if (kycComplete !== "true" && location.pathname === "/wallet") {
        setShowKycModal(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(textToCopy));
      console.log(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2s
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to fetch wallet transactions based on the activeTab and page

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
    walletCategory: string;
  }

  const pageSize = 20;

  const fetchTransactions = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(
        `${BASE_URL}/Transaction/allTransactions?TransactionType=${"wallet"}&page=${page}&pageSize=${pageSize}`
      );

      const transactions: TransactionType[] = response.data.data.data;
      // const noTransactionMessage = response.data.message;
      const totalRecords = response.data.data.totalRecords;

      setTransaction(transactions);
      console.log(transactions);
      setTotalPages(Math.ceil(totalRecords / pageSize));
      setNoTransaction("No transactions yet!");
      // scrollContainer.current?.scrollTo({ top: 0,});
    } catch (err) {
      return err;
      // console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page + 1);
  }, [page]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.amount ||
    !formData.bank;

  return (
    <>
   {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white  py-6 px-4 sm:rounded-2xl sm:w-[600px] sm:h-auto h-[min(100dvh,100vh)] max-h-screen  w-[100vw] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setErrors({ amount: "", bank: "" });
                    setFormData({ amount: "", bank: "" });
                    setShowWithdrawalModal(false);
                  }}
                  className="px-4 py-2 sm:mr-[5px] mr-[-10px] cursor-pointer "
                >
                  <img className="w-5 sm:w-4" src={cancel} alt="" />
                </button>
              </div>

              <div className="flex flex-col sm:h-[60%]  justify-center ">
                {options.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-4">
                    <p className="text-[#0A2E65] mb-4">
                      You don't have any bank account set up yet.
                    </p>
                    <button
                      onClick={() => {
                        setShowWithdrawalModal(false);
                        navigate("/profile", { state: { activeTab: "bank" } });
                      }}
                      className="px-4 py-2 flex justify-center items-center bg-[#f2f4fc] text-[#0A2E65] rounded-[5px] cursor-pointer transition"
                    >
                      <img className="w-[1.2rem]" src={Add_icon} alt="" />
                      <span className="ml-1 text-[16px] text-black">
                        Add a bank account
                      </span>
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col h-full items-center ">
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                      <div className="sm:w-[70%] w-full flex flex-col justify-center">
                        <h5 className="text-[#0A2E65]/60 sm:text-[15px] text-[17px] ">
                          Available Balance
                        </h5>
                        <div className="flex items-center justify-center">
                          <div className="relative flex items-center gap-2">
                            <span className="mb-[8px] mr-[-5px] text-[16px]">
                              ₦
                            </span>
                            <p className="text-[32px] text-center font-semibold">
                              {user?.accountBalance?.toLocaleString() ?? ""}
                            </p>
                            <span className="text-[16px] mt-[12px] ml-[-7px]">
                              .00
                            </span>
                          </div>
                        </div>

                        <p className="text-[#0A2E65]/60 mt-[1rem] pl-[5px] text-[15px] pb-[3px] text-left">
                          Amount
                        </p>
                        <div className="w-full mb-4">
                          <input
                            type="amount"
                            placeholder="₦0.00"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            onBlur={() =>
                              validateField("amount", formData.amount)
                            }
                            className={`p-4 px-3  border text-[15px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                              errors.amount
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            } `}
                          />
                          {errors.amount && (
                            <p className="text-red-500 text-left text-[13px] mt-1">
                              {errors.amount}
                            </p>
                          )}
                        </div>

                        <p className="text-[#0A2E65]/60 pl-[5px] text-[15px] pb-[3px] text-left">
                          Bank Account
                        </p>
                        <div className="w-full">
                          <Select
                            options={options}
                            getOptionLabel={(e) => e.label}
                            getOptionValue={(e) => e.value}
                            onChange={(selected) => {
                              if (selected) {
                                setFormData((prev) => ({
                                  ...prev,
                                  bank: selected.value,
                                }));
                              }
                            }}
                            styles={customStyles}
                            value={options.find(
                              (option) => option.value === formData.bank
                            )}
                            placeholder="Select Bank Account"
                          />
                        </div>
                        <div className="w-full mt-[1.5rem] mb-[2rem]">
                          <Button type="submit" isDisabled={isFormInvalid}>
                            Make Withdrawal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topup Modal */}
      {showTopupModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-[0.8rem]  rounded-[20px] bg-[#fff]/20">
            <div className="bg-white py-6 px-4 sm:rounded-2xl  sm:w-[600px] sm:h-auto   h-[min(100dvh,100vh)] max-h-screen   w-[100vw] text-center">
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    fetchUser();
                    setShowTopupModal(false);
                  }}
                  className="px-4 py-2 md:mr-[5px] mr-[-10px] cursor-pointer "
                >
                  <img className="w-5 sm:w-4" src={cancel} alt="" />
                </button>
              </div>
              <div>
                <div className="flex flex-col items-center  h-[60%] justify-center ">
                  <div className="sm:w-[70%] flex flex-col justify-center items-center">
                    <div className="sm:mt-5 sm:mb-2 mb-5">
                      <span className="  rounded-full flex justify-center flex-col items-center p-[2px]">
                        <img src={bankImg} className="w-[]" alt="Alarm Icon" />
                        <h4 className="text-[#27014F] font-semibold mt-[1rem] text-[24px] ">
                          Account Top-up
                        </h4>
                        <p className="text-[#0A2E65]/60 tracking-[1px] text-[16px]  leading-[1.5rem]  mb-6">
                          Transfer money to your virtual account wallet
                          <br className="sm:block hidden" /> using the account
                          number below.
                        </p>
                      </span>
                    </div>
                  </div>

                  <div className="sm:w-[77%] w-full">
                    <div className="text-[#022B69] w-full flex justify-between   ">
                      <p>Account Name</p>
                      <p> {user?.accountName ?? ""}</p>
                    </div>
                    <div className="text-[#022B69] sm:mt-[16px] mt-[20px] w-full flex justify-between   ">
                      <p>Account Number</p>
                      <div className="flex relative items-center justify-center text-[#8003A9]">
                        <p>{textToCopy}</p>
                        <button
                          onClick={handleCopy}
                          className="ml-[2px] relative cursor-pointer"
                        >
                          <img src={copyImg} alt="" />
                        </button>
                        {copied && (
                          <div className="bg-[#32A071]/20 absolute px-[5px] py-[1px] rounded-[2px] bottom-[12.5rem] text-[14px] left-[54rem] text-[#32A071]">
                            Copied!
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-[#022B69] sm:mt-[16px] mt-[20px] mb-[2rem] w-full flex justify-between   ">
                      <p>Bank Name</p>
                      <p> {user?.bankName ?? ""}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showKycModal && (
        <RouteChangeHandler
          isVisible={showKycModal}
          onClose={() => {
            setShowKycModal(false);
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
        <div className="flex-1 overflow-y-auto pb-[1.5rem] px-[1rem]">
          <div className="md:h-[2rem]  h-[1rem] bg-[white] [@media(min-width:1350px)]:w-[78%]  w-[97%] fixed z-20 "></div>
          <div className=" md:ml-[2%] py-[2.3%] bg-[#fff]  ">
            <div className="  block gap-[1.5rem] mt-[1rem] [@media(min-width:900px)]:flex">
              <div className="flex relative [@media(min-width:900px)]:w-auto w-full">
                <div className="[@media(min-width:900px)]:w-[505px] w-full relative sm:h-[253px] h-[200px] bg-[#27014F] rounded-[10px] flex items-center justify-center">
                  <img
                    src={Lines}
                    className="absolute h-[110%] w-full top-0 left-0"
                    alt=""
                  />

                  <div className="flex flex-col items-center text-[#fff]">
                    <p className="sm:text-[20px] text-[18px] leading-[rem]">
                      Wallet Balance
                    </p>
                    {user?.accountBalance === undefined ? (
                      <SkeletonTheme
                        baseColor="#3e1a65"
                        highlightColor="#5a2d8a"
                      >
                        <Skeleton
                          height={30}
                          width={150}
                          className="lg:mb-0 mb-3"
                        />
                      </SkeletonTheme>
                    ) : (
                      <div className=" relative mb-4 flex items-center gap-2">
                        <span className=" mb-[8px] mr-[-5px] text-[16px]">
                          {isHidden ? "" : " ₦"}
                        </span>
                        <p className="sm:text-[32px] text-[30px] font-semibold">
                          {isHidden
                            ? "*******"
                            : user?.accountBalance?.toLocaleString()}
                        </p>

                        <span className="text-[16px] mt-[12px] ml-[-7px] ">
                          {isHidden ? "" : ".00"}
                        </span>
                        <button
                          onClick={toggleVisibility}
                          className=" ml-[2px] cursor-pointer "
                        >
                          {isHidden ? (
                            <img
                              src={eye_lines}
                              className=" top-[1.5px]  left-[2px]"
                              alt=""
                            />
                          ) : (
                            <img src={eye} className="w-full h-full" alt="" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* topup and withdrawal on smaller screens */}
                    <div>
                      <div className=" lg:hidden mb-[-1rem] flex w-full  z-30    gap-[1rem] rounded-[10px]">
                        <button
                          onClick={openWithdrawalModal}
                          className=" relative cursor-pointer border border-white text-left text-[#fff] sm:text-[14px] text-[13px] py-[0.5rem] w-fit  px-[1rem] rounded-[40px] m"
                        >
                          <p> WITHDRAW </p>
                        </button>
                        <button
                          onClick={openModal}
                          className="bg-[#fff] relative text-left cursor-pointer text-[#27014F] sm:text-[14px] text-[13px] py-[0.5rem] w-fit  px-[1rem] rounded-[40px]"
                        >
                          <p className="whitespace-nowrap"> TOP UP WALLET</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:flex hidden justify-center items-center">
                  <div className=" flex flex-col  w-[8rem] gap-[1rem] rounded-[10px]">
                    <button
                      onClick={openWithdrawalModal}
                      className="bg-[#FF3366] relative cursor-pointer text-left text-[#fff] text-[12px] py-[1rem] pr-[2.5rem] w-fit  pl-[5px] rounded-r-[40px] m"
                    >
                      <p> WITHDRAW </p>
                      <img
                        className="absolute right-[1rem] bottom-[10px]"
                        src={ArrowUp}
                        alt=""
                      />
                    </button>
                    <button
                      onClick={openModal}
                      className="bg-[#32A071] relative text-left cursor-pointer text-[#fff] text-[12px] p-[1rem] pl-[5px] rounded-r-[40px]"
                    >
                      <p> TOP UP WALLET</p>
                      <img
                        className="absolute right-[7px] bottom-[12px]"
                        src={ArrowDown}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className=" [@media(min-width:900px)]:w-[423px] w-full sm:h-[253px] h-[200px] [@media(min-width:900px)]:my-[0px] my-[1.5rem] bg-[#F2F4FC] border border-[#326CF6] rounded-[10px] ">
                <div className="flex flex-col items-center justify-center gap-12">
                  <div className=" leading-[1.7rem] sm:mt-10 mt-4">
                    <p className="text-[#27014F]">Daily Withdrawal Limit</p>
                    <p className="text-[#27014F] font-bold sm:text-[24px] text-[20px]">
                      ₦500,000
                    </p>
                  </div>

                  <div className=" flex [@media(min-width:900px)]:gap-10 sm:gap-40 gap-10">
                    <div className=" leading-[1.7rem] ">
                      <p className="text-[#27014F]">Total Credit</p>
                      <div className="flex gap-1 justify-center items-center">
                        <img src={Credit} alt="" />
                        <p className="text-[#27014F] font-bold sm:text-[24px] text-[20px]">
                          ₦350,000
                        </p>
                      </div>
                    </div>
                    <div className=" leading-[1.7rem]">
                      <p className="text-[#27014F]">Total Debit</p>
                      <div className="flex gap-1 justify-center items-center">
                        <img src={Debit} alt="" />
                        <p className="text-[#27014F] font-bold sm:text-[24px] text-[20px]">
                          ₦150,000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="w-full px-5 border border-[#E2E8F0] rounded-[10px] mt-[10%] sm:mt-[4.5%]  [@media(min-width:900px)]:mt-[3%] ">
                <TransactionSkeleton />
              </div>
            ) : (
              <div className="w-full border border-[#E2E8F0] rounded-[10px] mt-[3%] ">
                <CreditDebitTransactions
                  transactions={transaction || []}
                  noTransaction={noTransaction}
                />
              </div>
            )}
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
    </>
  );
};

export default Wallet;
