import Referal from "../../assets/dashboard_img/profile/giftbox-referal.svg";
import Copy from "../../assets/dashboard_img/profile/Copy_ref.svg";
import { useEffect, useState } from "react";
import eye_lines from "../../assets/dashboard_img/Eye_hide_dark.svg";
import eye from "../../assets/dashboard_img/Eye_opne_dark.svg";
import cancel from "../../assets/dashboard_img/profile/cancel.svg";
import Button from "../../components/Button";
import api from "../../services/api";
import { useUserStore } from "../../store/useUserStore";
import SuccessModal from "./SuccessModal";

export type Referral = {
  id: string;
  referredUserId: string;
  referrerId: string;
  userName: string;
  status: "Pending" | "Approved" | "Rejected" | string;
  expiryDate: string;
  referredDate: string | null;
  firstName: string | null;
  lastName: string | null;
};

const Referals = () => {
  // const walletAmount = "20,500";
  const [copied, setCopied] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [referral, setReferral] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // pending
  const [successModal, setSuccessModal] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const referralBonus = useUserStore(
    (state) => state.user?.referralBonusBalance ?? 0
  );
  const fetchUser = useUserStore((state) => state.fetchUser);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrors("");
    setAmount("");
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await api.post(
        `/Referrals/withdraw-bonus?amount=${parseFloat(amount)}`
      );

      if (response.data?.statusCode === "OK") {
        // console.log("Withdrawal successful:", response.data);
        setIsModalOpen(false);
        setSuccessModal(true);
        fetchUser();
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error withdrawing referral bonus:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle password visibility
  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  useEffect(() => {
    // Get email and name from localStorage
    const referralLink = localStorage.getItem("referralLink");

    setReferral(referralLink ?? "");
    // setName(storedName ?? "");
  }, []);

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const response = await api.get("/Referrals/getUserReferrals");
        setReferrals(response?.data?.data?.referrals);
        // console.log("ref", referrals);
      } catch (err: any) {
        console.error("Error fetching referrals:", err);
        setError("Failed to fetch referrals");
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referral).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  // Field Validation using Switch Statement

  const validateField = (fieldName: string, value: string) => {
    const enteredAmount = parseFloat(value);

    switch (fieldName) {
      case "amount":
        if (!value.trim()) {
          setErrors("This field is required");
        } else if (isNaN(enteredAmount)) {
          setErrors("Please enter a valid number");
        } else if (enteredAmount > referralBonus) {
          setErrors(
            `You can't withdthraw amount greater than ${referralBonus}`
          );
        } else {
          setErrors("");
        }
        break;
      default:
        break;
    }
  };

  // Update form field value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const numericValue = rawValue.replace(/[^0-9.]/g, "");

    const cleanValue =
      numericValue.split(".").length > 2
        ? numericValue.slice(0, numericValue.lastIndexOf("."))
        : numericValue;

    setAmount(cleanValue);
    validateField("amount", cleanValue);
  };

  const isFormInvalid = Object.values(errors).some((error) => error) || !amount;

  return (
    <>
      {/* Just for deployment purpose */}
      {referrals.length === 0 && loading && (
        <div className="hidden">{error}</div>
      )}
      <div className="w-full z-10 overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
        <div className="flex-1 overflow-y-auto  md:px-4 px-2.5">
          <div className="h-[2rem] sm:block hidden not-only: md:block bg-[white] w-[98%] fixed  z-20 "></div>
          <div className=" flex flex-col  md:flex-col lg:flex-row  py-[2.3%] ml-[2%] mt-[1.5rem] lg:mt-[1rem]  gap-[2rem]">
            <div className=" flex flex-col gap-[1.5rem] w-full  lg:w-[40%]  ">
              <div className="w-full  bg-[#F2F4FC] border border-[#326CF6] relative h-[179px]  rounded-[10px] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-[#fff]">
                  <p className="text-[15px] text-[#27014F] leading-[rem]">
                    Referral bonus
                  </p>
                  <div className=" relative flex items-center gap-2">
                    <span className=" mb-[8px] mr-[-5px] text-[#0A2E65]/60 left-[-0.8rem] bottom-[1rem] text-[16px]">
                      {isHidden ? "" : " ₦"}
                    </span>
                    <p className="text-[32px] text-[#27014F] font-semibold">
                      {isHidden ? "*******" : referralBonus}
                    </p>
                    <span className="text-[16px] text-[#7688B4] ml-[-8px] mt-[0.8rem] ">
                      {isHidden ? "" : ".00"}
                    </span>
                    <button
                      onClick={toggleVisibility}
                      className=" ml-[rem] cursor-pointer "
                    >
                      {isHidden ? (
                        <img
                          src={eye_lines}
                          className=" top-[1.5px]  left-[px]"
                          alt=""
                        />
                      ) : (
                        <img src={eye} className="w-full h-full" alt="" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={openModal}
                    className="text-[#8003A9] text-[13px] cursor-pointer  mt-[0.5rem]"
                  >
                    Make Withdrawal
                  </button>
                </div>
              </div>

              <div className="h-fit border w-full rounded-[10px] p-[2rem]  border-[#D0DAE6]">
                <div className="flex flex-col items-center gap[2rem]">
                  <img className="w-[8rem]" src={Referal} alt="" />
                  <h5 className="text-[#27014F] text-[20px] font-[600] py-[0.2rem]">
                    Get fee waivers
                  </h5>
                  <p className="text-center text-[14px] text-[#0A2E65]/60">
                    Enjoy zero fees on transactions when your friends signup,
                    with your referal code.
                  </p>
                  <div className="relative w-full z-0">
                    <div className="border z-[-1] mt-[1rem] border-[#8A95BF] w-full h-[3rem] rounded-[5px] pl-[8px] flex px-0 items-center">
                      <span className="w-[85%] text-[#0A2E65]/60   text-[15px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {referral}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="bg-[#8003A9] rounded-tr-[5px] rounded-r-[5px] w-[15%] cursor-pointer h-full p-[10px]"
                      >
                        <img src={Copy} alt="" />
                      </button>
                    </div>

                    {/* Copied text message */}
                    {copied && (
                      <span className="  bg-[#32A071]/20 text-[#32A071] absolute top-[3.2rem] right-0  px-2 py-1 text-[15px] rounded-md opacity-100 transition-opacity duration-1000 ease-in-out">
                        Copied!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border w-full lg:w-[60%] rounded-[10px] h-fit border-[#D0DAE6]">
              <ul className="space-y-3 py-[2rem] sm:px-[2rem] px-[1rem]">
                {loading ? (
                  <ul className="space-y-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b border-b-[#E2E8F0] pb-6 last:border-b-0 animate-pulse"
                      >
                        {/* Left side: Skeleton name and status */}
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-24 bg-gray-300 rounded"></div>
                          <div className="h-3 w-14 bg-gray-200 rounded"></div>
                        </div>
                        {/* Right side: Skeleton date */}
                        <div className="h-3 w-28 bg-gray-200 rounded"></div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {referrals.map((ref) => (
                      <li
                        key={ref.id}
                        className="flex justify-between items-center border-b border-b-[#E2E8F0] pb-6 last:border-b-0"
                      >
                        {/* Left side: Status + Name */}
                        <div className="flex items-center gap-2">
                          <span className="text-[#27014F] text-[16px] text-left font-[600]">
                            {ref.firstName
                              ? `${ref.firstName} ${ref.lastName}`
                              : ref.userName}
                          </span>

                          {ref.status === "Successful" && (
                            <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                              SUCCESSFULL
                            </div>
                          )}
                          {ref.status === "Pending" && (
                            <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                              PENDING
                            </div>
                          )}
                          {ref.status === "Failed" && (
                            <div className="bg-[#FF3366]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FF3366]">
                              FAILED
                            </div>
                          )}
                        </div>

                        {/* Right side: Date */}
                        <span className="text-[#343E65] text-[13px]">
                          {ref.referredDate
                            ? new Date(ref.referredDate).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                }
                              )
                            : "N/A"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (Rendered inline if open) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="p-[0.7rem] rounded-[20px] bg-[#fff]/20">
            <div className="bg-white py-6 px-4 rounded-lg  sm:w-[600px] w-[100vw]  sm:h-auto h-[min(100dvh,100vh)] max-h-screen  overflow-y-auto  ">
              <div className="flex justify-end">
                <button
                  className="text-black mr-3 p-[5px] cursor-pointer"
                  onClick={closeModal}
                >
                  <img className="sm:w-4 w-5" src={cancel} alt="" />
                </button>
              </div>

              <div className="flex justify-center items-center">
                <div className="sm:w-[80%] w-full  flex flex-col items-center ">
                  <p className="mt-[3rem] text-[#0A2E65]/60 text-[15px]">
                    Referral bonus balance
                  </p>

                  <div className="flex my-[0.1rem] ">
                    <span className="mt-[7.5px] text-[16px] mr-[2px] text-[#0A2E65]/60">
                      ₦
                    </span>
                    <p className="text-[32px] text-[#27014F] font-semibold">
                      {referralBonus}
                    </p>
                  </div>
                  <p className=" text-[#0A2E65]/60 text-center  mb-[0.4rem] text-[15px]">
                    How much would you like to withdraw?
                  </p>

                  {/* Form with submit handler */}
                  <form onSubmit={handleSubmit} className=" w-full my-[1rem]  ">
                    <div className="w-full   ">
                      <input
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                        onBlur={() => validateField("amount", amount)}
                        className={`p-4 px-3 border text-[15px]  border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                          errors
                            ? "border border-red-600"
                            : "focus:border-purple-800"
                        } `}
                      />
                      {errors && (
                        <p className="text-red-500 text-left text-[13px] ">
                          {errors}
                        </p>
                      )}
                    </div>

                    <div className="w-full mt-[2rem] mb-[2rem]">
                      <Button
                        type="submit"
                        isDisabled={isFormInvalid}
                        isLoading={isSubmitting}
                        // className="w-full"
                      >
                        Withdraw to Wallet
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {successModal && (
        <SuccessModal
          title="Withdrawal Successful!"
          message="Your referral bonus has been withdrawn to your wallet successfully."
          onClose={() => {
            setSuccessModal(false);
          }}
        />
      )}
    </>
  );
};

export default Referals;
