import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import warning from "../../../assets/crpto_icons/Alarm.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";
import CustomSelect from "../../../components/CustomSelect";
import NGN from "../../../assets/crpto_icons/MaskNGN.svg";
import empty from "../../../assets/crpto_icons/emptycircle.svg";
import swap from "../../../assets/crpto_icons/swap.svg";
import { useUserStore } from "../../../store/useUserStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Wallet } from "../../../types/types.ts";
import btc from "../../../assets/crpto_icons/wallet_icons/Bitcoin.svg";
import eth from "../../../assets/crpto_icons/wallet_icons/Ethereumm.svg";
import usdt from "../../../assets/crpto_icons/wallet_icons/usdt.svg";
import bnb from "../../../assets/crpto_icons/wallet_icons/Binace_coin.svg";
import sol from "../../../assets/crpto_icons/wallet_icons/solana.svg";
import usdc from "../../../assets/crpto_icons/wallet_icons/USDC.svg";
import trx from "../../../assets/crpto_icons/wallet_icons/Tron.svg";
import ton from "../../../assets/crpto_icons/wallet_icons/ton_coin.svg";
import api from "../../../services/api.ts";
import useAutoRefreshSellSwap from "./count_hooks/useAutoRefreshSellSwap.tsx";
import SuccessModal from "../SuccessModal.tsx";
import PinModal from "../Logged_in_components/someUtilityComponent/PinModal.tsx";

const options = [
  {
    id: "btc",
    label: "Bitcoin",
    value: "btc_backend_id_123",
    // displayValue: ".102 BTC",
    image: BITCOIN,
  },
  {
    id: "eth",
    label: "Ethereum",
    value: "eth_backend_id_456",
    // displayValue: ".504 ETH",
    image: ETHER,
  },
];

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

const SwapCrypto = () => {
  const [selectedCoin, setSelectedCoin] = useState<Optiontype>(options[0]);
  const [shouldBlur, setShouldBlur] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Optiontype[]>([]);
  const [error, setError] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [loadingData, setLoadingData] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [quoteId, setQuoteId] = useState<string>("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  // const [editedValue, setEditedValue] = useState(
  //   selectedCoin.displayValue || ""
  // );
  const [editedValue, setEditedValue] = useState("");
  const [inputError, setInputError] = useState("");

  const {
    user,
    fetchUser,
    // loading,
    // error
  } = useUserStore();
  const originalValue = parseFloat(selectedCoin.displayValue || "0");
  const numericAmount = parseFloat(editedValue);

  // useEffect(() => {
  //   console.log("Selected value:", originalValue);
  // }, [selectedCoin]);

  const {
    countdown,
    startCountdown,
    pauseCountdown,
    stopCountdown,
    isLoading,
    resumeCountdown,
  } = useAutoRefreshSellSwap({
    quoteId,
    userId: user?.userSubAccountId,
    selectedCoin,
    numericAmount,
    setToAmount,
    setCurrency,
    // setQuotePrice,
    setError,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const currencyIcons: Record<string, string> = {
    btc,
    eth,
    usdt,
    usdc,
    bnb,
    sol,
    trx,
    ton,
  };

  const allowedCurrencies = [
    "btc",
    "usdt",
    "eth",
    "usdc",
    "bnb",
    "sol",
    "trx",
    "ton",
  ];

  const userSubAccountId = useUserStore(
    (state) => state.user?.userSubAccountId
  );

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/Crypto/users/wallets?userId=${userSubAccountId}`
        );

        const rawResponse: Wallet[] = response.data?.data?.data;

        // setRawWallets(rawResponse);

        const filteredWallets = rawResponse.filter((wallet) =>
          allowedCurrencies.includes(wallet.currency.toLowerCase())
        );

        setWallets(filteredWallets);
      } catch (err) {
        // setError("Failed to fetch wallets");
        return err;
      } finally {
        setLoading(false);
      }
    };

    if (userSubAccountId) {
      fetchWallets();
    }
  }, [userSubAccountId]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (shouldBlur && selectedCoin && editedValue > "0.0") {
      timeoutId = setTimeout(() => {
        handleBlur();
        setShouldBlur(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedCoin, editedValue]);

  useEffect(() => {
    // fetchUser();
    if (wallets.length > 0) {
      const options = wallets.map((wallet) => ({
        id: wallet.id,
        label: wallet.name,
        value: wallet.currency.toLowerCase(),
        image: currencyIcons[wallet.currency.toLowerCase()],
        displayValue: wallet.balance ? `${wallet.balance}` : "",
      }));
      setSelectOptions(options);
      setSelectedCoin(options[0]);
    }
  }, [wallets]);

  // useEffect(() => {
  //   setEditedValue(selectedCoin.displayValue || "");
  // }, [selectedCoin]);

  useEffect(() => {
    const allReady =
      quoteId &&
      // userId &&
      selectedCoin?.value &&
      numericAmount &&
      numericAmount > 0;

    if (allReady) {
      startCountdown(60);
    }
  }, [quoteId, selectedCoin, numericAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputError("");
    pauseCountdown();

    // Allow only numbers or decimals
    if (!/^\d*\.?\d*$/.test(newValue)) return;

    const numericValue = parseFloat(newValue);

    // handleBlur();

    if (!isNaN(numericValue) && numericValue > originalValue) {
      setInputError("Amount cannot exceed your wallet balance");
    } else {
      setInputError("");
    }

    setEditedValue(newValue);
  };

  // const balance = user?.accountBalance ?? 0;

  const handleBlur = async () => {
    setError("");
    setIsInputFocused(false);

    if (!editedValue) {
      // setError("Amount is required.");
      return;
    }

    if (numericAmount > originalValue) {
      // setError("Insufficient wallet balance.");
      return;
    }

    // if (numericAmount <= ) {
    //   setError("Amount must be atleast NGN1000");
    //   return;
    // }

    try {
      setLoadingData(true);
      const res = await api.post(
        `/Crypto/swapQuotation?userId=${userSubAccountId}`,
        {
          fromCurrency: selectedCoin.value,
          toCurrency: "ngn",
          fromAmount: numericAmount,
        }
      );
      const response = res?.data;
      // console.log("Swap response:", response?.data);
      setToAmount(response?.data?.toAmount);
      setCurrency(response?.data?.toCurrency);
      // setQuotePrice(response?.data?.quotedPrice);
      setQuoteId(response?.data?.id);

      resumeCountdown();
      startCountdown(60);
    } catch (err) {
      setError("Failed to submit amount.");
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    stopCountdown();
    setToAmount("");
    setCurrency("");
  }, [selectedCoin]);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const res = await api.post("/Crypto/sellCrypto", {
            amount: numericAmount,
            quotationId: quoteId,
          });

          if (res.data.statusCode !== "OK") {
            throw new Error(res.data.message || "An error occurred");
          }
          setIsSuccessModal(true);
          setToAmount("");
          setCurrency("");
          setQuoteId("");
          setSelectedCoin(options[0]);
          stopCountdown();
          setIsSuccessModal(true);
          setError("");
          resolve();
        } catch (e) {
          reject(e);
        } finally {
          stopCountdown();
        }
      })();
    });

  return (
    <>
      {openPinModal && (
        <PinModal
          onVerify={onVerify}
          onClose={() => {
            stopCountdown();
            setToAmount("");
            setOpenPinModal(false);
          }}
        />
      )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Swap Crypto"
          message="Your swap was successful"
          onClose={() => {
            stopCountdown();
            setToAmount("");
            setCurrency("");
            setQuoteId("");
            setSelectedCoin(options[0]);
            setEditedValue("");
            setIsSuccessModal(false);
            fetchUser();
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 ">
          <div className="flex justify-center items-center">
            <div className=" w-full  md:p-4">
              <div className="flex justify-start items-center mb-2">
                <NavLink className="flex items-center gap-1 " to="/crypto">
                  <FaArrowLeft className="text- cursor-pointer" />
                  <p className="text-[15px]">Back</p>
                </NavLink>
              </div>
              <div className="w-full grid grid-cols-1 md:[grid-template-columns:45%_55%]">
                {/* Left section */}
                <div className="order-2 md:order-1 ">
                  <h3 className="text-[18px] my-[1rem]">Crypto Wallets</h3>
                  <div className="flex flex-col gap-4">
                    {loading
                      ? Array.from({ length: 5 }).map((_, index) => (
                          <WalletSkeleton key={index} />
                        ))
                      : wallets.map((wallet, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={
                                  currencyIcons[wallet.currency.toLowerCase()]
                                }
                                alt={wallet.currency}
                                className="w-7 h-7"
                              />
                              <span className="font-medium">{wallet.name}</span>
                            </div>
                            <span className="text-gray-500">
                              {wallet.balance}
                            </span>
                          </div>
                        ))}
                  </div>
                </div>
                {/* Right section */}
                <div className="order-1 md:order-2  md:ml-[2rem] mt-[-1rem] ">
                  {countdown > 0 && (
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center w-[70%] items-center px-5 py-2 mt-4 rounded-[10px] bg-[#FBEEFF]">
                        <div className="flex items-center gap-3 justify-center">
                          <img src={warning} alt="" />
                          <p className="leading-[0.9rem] text-[#8003A9] text-left text-[13px]">
                            0:{countdown < 10 ? `0${countdown}` : countdown}{" "}
                            seconds left to complete your transaction
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <>
                    <div className="relative mt-[1rem]  h-auto w-full">
                      <img
                        src={swap}
                        className="absolute top-[10rem] z-10 right-[0rem] left-[0rem] mx-auto"
                        alt=""
                      />
                      <img
                        src={empty}
                        className="absolute top-[8.9rem] right-[0rem] left-0 mx-auto "
                        alt=""
                      />

                      <div className=" pt-10 px-12 pb-13.5 rounded-2xl bg-[#F5F7FA] ">
                        <div>
                          <p className=" pb-1 text-[14px] text-[#000]">
                            Select Cryptocurrency
                          </p>
                          <div
                            className={`grid grid-cols-2 items-center px-2 py-1 border bg-white ${
                              inputError ? "border-red-500" : "border-gray-300"
                            } rounded-lg`}
                          >
                            <input
                              type="text"
                              value={editedValue}
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              onFocus={handleFocus}
                              placeholder={
                                loading || isLoading ? "Loading" : "0.00"
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleBlur();
                                }
                              }}
                              className={`w-full text-[16px] font-medium bg-transparent outline-none  `}
                            />
                            <div className="w-full flex">
                              <div className="ml-auto w-auto">
                                <CustomSelect
                                  options={selectOptions}
                                  value={selectedCoin}
                                  onChange={(val) => {
                                    setInputError("");
                                    setSelectedCoin(val);
                                    setEditedValue("");
                                  }}
                                  inputWidth="w-auto"
                                  optionsWidth="w-[15rem]"
                                  optionsOffsetX={-90}
                                  px="px-1"
                                  py="py-1"
                                  textSize="text-[15px]"
                                  borderColor="#fff"
                                  backgroundColor="#EAEFF6"
                                  optionsPx="px-1"
                                  optionsPy="py-1"
                                />
                              </div>
                            </div>
                          </div>
                          {inputError && (
                            <p className="text-red-500 text-sm ">
                              {inputError}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-[6px] pt-10  px-12 pb-13.5 rounded-2xl bg-[#F5F7FA] ">
                        <div>
                          <p className=" pb-1 text-[14px] text-[#000]">
                            What you'll receive
                          </p>
                          <div className="flex items-center w-full border border-gray-300 bg-white rounded-md  focus-within:border-gray-300">
                            {/* Left Section with Flag and NGN */}
                            <div className="flex items-center mx-1 my-1 gap-1 px-3 py-2 bg-[#EAEFF6] rounded-l-md">
                              <img
                                src={NGN}
                                alt="NGN flag"
                                className="w-4 h-4 rounded-sm"
                              />
                              <span className="text-[13px] font-medium pr-4">
                                NGN
                              </span>
                            </div>

                            {/* Input Field */}
                            <div className="relative w-full">
                              <input
                                type="text"
                                readOnly
                                value={
                                  loadingData || error
                                    ? ""
                                    : toAmount
                                    ? `${toAmount} ${currency.toUpperCase()}`
                                    : "0.00"
                                }
                                placeholder={
                                  loadingData ? "Loading..." : "50,000"
                                }
                                className="w-full px-1 py-3 text-[15px] outline-none bg-white rounded-r-md text-sm pr-8"
                              />

                              {loadingData && (
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>

                    <div className="w-full flex mt-7 justify-end">
                      <div className="flex w-full justify-end  items-center gap-3">
                        <button
                          disabled={isInputFocused || !!error}
                          onClick={() => setOpenPinModal(true)}
                          className={`border-[2px] ${
                            isInputFocused ||
                            error ||
                            loadingData ||
                            countdown < 1
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          } border-[#8003A9] bg-[#8003A9] text-[#fff] 
         px-[4rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]
         w-full sm:w-auto`}
                        >
                          Swap Now
                        </button>
                      </div>
                    </div>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwapCrypto;

const WalletSkeleton = () => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-gray-200 rounded-full" />
      <div className="w-24 h-4 bg-gray-200 rounded" />
    </div>
    <div className="w-12 h-4 bg-gray-200 rounded" />
  </div>
);
