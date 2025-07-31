import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import NGN from "../../../assets/crpto_icons/MaskNGN.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";
import scan from "../../../assets/crpto_icons/Scan_alt.svg";
import CustomSelect from "../../../components/CustomSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import warning from "../../../assets/crpto_icons/Alarm.svg";
import { Wallet } from "../../../types/types.ts";
import btc from "../../../assets/crpto_icons/wallet_icons/Bitcoin.svg";
import eth from "../../../assets/crpto_icons/wallet_icons/Ethereumm.svg";
import usdt from "../../../assets/crpto_icons/wallet_icons/usdt.svg";
import bnb from "../../../assets/crpto_icons/wallet_icons/Binace_coin.svg";
import sol from "../../../assets/crpto_icons/wallet_icons/solana.svg";
import usdc from "../../../assets/crpto_icons/wallet_icons/USDC.svg";
import trx from "../../../assets/crpto_icons/wallet_icons/Tron.svg";
import ton from "../../../assets/crpto_icons/wallet_icons/ton_coin.svg";
import { useUserStore } from "../../../store/useUserStore";
import api from "../../../services/api.ts";
import useAutoRefreshSwap from "./count_hooks/useAutoRefreshSwap.tsx";
import PinModal from "../Logged_in_components/someUtilityComponent/PinModal.tsx";
import SuccessModal from "../SuccessModal.tsx";
// import SendCrypto from "./SendCrypto.tsx";

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

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

// const networkOptions = [
//   {
//     id: "brc20",
//     label: "Bitcoin BRC20",
//     value: "btc_backend_id_123",
//     // displayValue: ".102 BTC",
//     // image: BITCOIN,
//   },
//   {
//     id: "usd",
//     label: "brc20(usdt)",
//     value: "usd_backend_id_789",
//     // displayValue: ".504 ETH",
//     // image: ETHER,
//   },
// ];

const BuyCrypto = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Optiontype>(options[0]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Optiontype[]>([]);

  const [networkOptions, setNetworkOptions] = useState<Optiontype[]>([]);
  // const [selectedNetwork, setSelectedNetwork] = useState<Optiontype | null>(
  //   null
  // );
  const [selectedNetwork, setSelectedNetwork] = useState<Optiontype | undefined>(undefined);


  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");
  const [loadingData, setLoadingData] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [quotePrice, setQuotePrice] = useState<string>("");
  const [quoteId, setQuoteId] = useState<string>("");
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [openPinModal, setOpenPinModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"buy" | "send">("buy");
  const [form, setForm] = useState({
    narration: "",
    network: "",
    amount: "",
    quotationId: "",
  });

  const {
    user,
    fetchUser,
    // loading,
    // error
  } = useUserStore();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const numericAmount = parseFloat(amount);

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
    fetchUser();
    if (userSubAccountId) {
      fetchWallets();
    }
  }, [userSubAccountId]);

  useEffect(() => {
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

  useEffect(() => {
    const allReady =
      quoteId &&
      // userId &&
      selectedCoin?.value &&
      numericAmount &&
      numericAmount > 0;

    if (allReady) {
      if (countdown > 0) return;
      startCountdown(60);
    }
  }, [quoteId, selectedCoin, numericAmount]);

  const balance = user?.accountBalance ?? 0;

  const handleBlur = async () => {
    setError("");
    setIsInputFocused(false);

    if (!amount || isNaN(numericAmount)) {
      // setError("Amount is required.");
      return;
    }

    if (numericAmount > balance) {
      setError("Insufficient wallet balance.");
      return;
    }

    if (numericAmount <= 999) {
      setError("Amount must be atleast NGN1000");
      return;
    }

    try {
      setLoadingData(true);
      const res = await api.post("/Crypto/swapQuotation?userId=me", {
        fromCurrency: "ngn",
        toCurrency: selectedCoin.value,
        fromAmount: numericAmount,
      });
      const response = res?.data;

      // startCountdown(13);
      setToAmount(response?.data?.toAmount);
      setCurrency(response?.data?.toCurrency);
      setQuotePrice(response?.data?.quotedPrice);
      setQuoteId(response?.data?.id);
      resumeCountdown();
      if (countdown > 0) return;
      startCountdown(60);
    } catch (err) {
      setError("Failed to submit amount.");
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const { countdown, startCountdown, resumeCountdown, stopCountdown } =
    useAutoRefreshSwap({
      quoteId,
      selectedCoin,
      numericAmount,
      setToAmount,
      setCurrency,
      setQuotePrice,

      setError,
    });

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const res = await api.post("/Crypto/buyCrypto", {
            amount: numericAmount,
            quotationId: quoteId,
          });

          // if (!res.data.isSuccessful) {
          //   throw new Error(
          //     res.data.message || "An error occurred"
          //   );
          // }

          if (res.data.statusCode !== "OK") {
            throw new Error(res.data.message || "An error occurred");
          }
          setIsSuccessModal(true);
          setToAmount("");
          setAmount("");
          setCurrency("");
          setQuoteId("");
          setQuotePrice("");
          setSelectedCoin(options[0]);
          stopCountdown();

          resolve();
        } catch (e) {
          reject(e);
        } finally {
          stopCountdown();
        }
      })();
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError("");

    // Only allow numbers and decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // send crypto

  useEffect(() => {
    updateNetworksForCoin(selectedCoin);
  }, [selectedCoin, wallets]);

  type OptionType = {
    label: string;
    value: string;
  };

  const updateNetworksForCoin = (coin: OptionType | null) => {
    if (!coin) {
      setNetworkOptions([]);
      setSelectedNetwork(undefined);
      return;
    }

    const selectedWallet = wallets.find(
      (wallet) => wallet.currency.toLowerCase() === coin.value
    );

    if (selectedWallet) {
      const networks = selectedWallet.networks || [];
      const formattedNetworks = networks.map((net) => ({
        id: net.id,
        label: net.id,
        value: net.id,
      }));
      setNetworkOptions(formattedNetworks);
      setSelectedNetwork(formattedNetworks[0] || null);
    } else {
      setNetworkOptions([]);
      setSelectedNetwork(undefined);
    }
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const isDisabled =
    isInputFocused || !!error || loadingData || !amount || countdown < 1;

  return (
    <>
      {openPinModal && (
        <PinModal onVerify={onVerify} onClose={() => setOpenPinModal(false)} />
      )}

      {/* Success Modal */}
      {isSuccessModal && (
        <SuccessModal
          title="Buy Crypto"
          message="Your purchase was successful"
          onClose={() => {
            setShowConfirmation(false);
            setIsSuccessModal(false);
            fetchUser();
          }}
        />
      )}

      <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 ">
          <div className="flex justify-center items-center">
            <div className=" w-full  p-4">
              <div className="flex justify-start items-center mb-2">
                <NavLink className="flex items-center gap-1 " to="/crypto">
                  <FaArrowLeft className="text- cursor-pointer" />
                  <p className="text-[15px]">Back</p>
                </NavLink>
              </div>
              <div className="w-full grid [grid-template-columns:45%_55%]   ">
                {/* Left section */}
                <div className=" ">
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
                <div className=" mt-[1rem] ml-[2rem]">
                  <div className="py-[2.3%] md:ml-0 ml-[-7px] flex justify-center w-z-20 bg-[#fff]">
                    <div className="bg-[#F5F7FA] w-[60%] pr[2rem] h-[3rem] flex items-center rounded-[50px] justify-between px-[7px]">
                      <button
                        className={`flex-1 px-[20px] text-[17px] cursor-pointer py-[5px] rounded-[40px] ${
                          activeTab === "buy"
                            ? "bg-[#fff] text-[#8003A9]"
                            : "bg-transparent text-[#7688B4]"
                        } ${
                          showConfirmation || loading
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                        onClick={() => {
                          if (!showConfirmation && !loading)
                            setActiveTab("buy");
                          setError("");
                          setToAmount("");
                          setAmount("");
                          setCurrency("");
                          setQuoteId("");
                          // setSelectedCoin(options[0]);
                          stopCountdown();
                          setSelectedNetwork(undefined)
                          setForm({
                            narration: "",
                            network: "",
                            amount: "",
                            quotationId: "",
                          });
                        }}
                      >
                        Buy
                      </button>

                      <button
                        className={`flex-1 px-[20px] text-[17px] cursor-pointer py-[5px] rounded-[40px] ${
                          activeTab === "send"
                            ? "bg-[#fff] text-[#8003A9]"
                            : "bg-transparent  text-[#7688B4]"
                        } ${
                          showConfirmation || loading
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                        onClick={() => {
                          if (!showConfirmation && !loading)
                            setActiveTab("send");
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  {countdown > 0 && (
                    <div className="flex justify-center mb-[1rem] items-center">
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

                  {!showConfirmation ? (
                    activeTab === "buy" ? (
                      <>
                        {/* Buy Form UI */}
                        <p className="pt-2 pb-1 text-[14px] text-[#000]">
                          Select Cryptocurrency
                        </p>
                        <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
                          ) : (
                            <p className="w-full text-[16px] font-medium">
                              {selectedCoin.label}
                            </p>
                          )}
                          <div className="w-full flex">
                            <div className="ml-auto w-auto">
                              <CustomSelect
                                options={selectOptions}
                                value={selectedCoin}
                                // onChange={(val) => {
                                //   setError("");
                                //   setToAmount("");
                                //   setAmount("");
                                //   setCurrency("");
                                //   setQuoteId("");
                                //   setSelectedCoin(val);
                                //   stopCountdown();
                                // }}

                                inputWidth="w-auto"
                                optionsWidth="w-[15rem]"
                                optionsOffsetX={-90}
                                px="px-1"
                                py="py-1"
                                textSize="text-[15px]"
                                // onChange={handleSelection}
                                borderColor="#fff"
                                backgroundColor="#EAEFF6"
                                optionsPx="px-1"
                                optionsPy="py-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between  mt-[0.5rem]   items-center">
                          <p className="pt-2 pb-1 text-[14px] text-[#000]">
                            Enter Amount
                          </p>

                          <div className="flex items-center justify-between text-[#6779A7] ">
                            <p className="mr-1">Wallel Balance:</p>
                            <span className="flex justify-center items-center">
                              {/* <span>N</span> */}

                              <span>
                                {user
                                  ? user.accountBalance.toLocaleString(
                                      "en-NG",
                                      {
                                        style: "currency",
                                        currency: "NGN",
                                      }
                                    )
                                  : "₦0.00"}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:border-2 focus-within:border-gray-300">
                          {/* Left Section with Flag and NGN */}
                          <div className="flex items-center mx-1 my-1 gap-1 px-3 py-2 bg-[#EAEFF6] rounded-l-md">
                            <img
                              src={NGN}
                              alt="NGN flag"
                              className="w-4 h-4 rounded-sm"
                            />
                            <span className="text-[13px] font-medium pr-4 ">
                              NGN
                            </span>
                          </div>

                          {/* Input Field */}
                          <input
                            type="text"
                            placeholder="50,000"
                            className="w-full px-1 py-3 outline-none bg-white rounded-r-md text-[16px]"
                            value={amount}
                            onChange={(e) => {
                              stopCountdown();
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            onFocus={() => {
                              stopCountdown();
                              handleFocus();
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleBlur();
                              }
                            }}
                          />
                        </div>
                        {error && (
                          <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <div className="mt-[0.5rem]">
                          <p className="pt-2 pb-1 text-[14px] text-[#000]">
                            What you'll receive
                          </p>

                          <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                            <p className="w-full text-[16px] font-medium">
                              {loadingData ? (
                                <div className="w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
                              ) : toAmount ? (
                                `${toAmount} ${currency.toUpperCase()}`
                              ) : (
                                "0.00"
                              )}
                            </p>

                            <div className="w-full flex">
                              <div className="ml-auto w-auto">
                                <CustomSelect
                                  // options={options}
                                  inputWidth="w-full"
                                  optionsWidth="w-full"
                                  px="px-1"
                                  py="py-1"
                                  textSize="text-[1rem]"
                                  value={selectedCoin}
                                  borderColor="#fff"
                                  backgroundColor="#EAEFF6"
                                  optionsPx="px-1"
                                  optionsPy="py-1"
                                  showDropdownIcon={false}
                                  readOnly={true}
                                  defaultSelected={selectedCoin}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="w-full flex mt-9 justify-end">
                            <div className="flex items-center gap-3">
                              <button
                                disabled={isDisabled}
                                onClick={() => setShowConfirmation(true)}
                                className={`border-[2px] ${
                                  isDisabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                } border-[#8003A9] bg-[#8003A9] text-[#fff] px-[4rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]`}
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : activeTab === "send" ? (
                      <>
                        {/* Pending Send Form UI */}
                        {/* <SendCrypto wallets={wallets} /> */}

                        <>
                          {/* Buy Form UI */}
                          <p className="pt-2 pb-1 text-[14px] text-[#000]">
                            Select Cryptocurrency
                          </p>
                          <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                            {loading ? (
                              <div className="w-5 h-5 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
                            ) : (
                              <p className="w-full text-[16px] font-medium">
                                {selectedCoin.displayValue}
                              </p>
                            )}
                            <div className="w-full flex">
                              <div className="ml-auto w-auto">
                                <CustomSelect
                                  options={selectOptions}
                                  value={selectedCoin}
                                  onChange={(val) => {
                                    setError("");
                                    setToAmount("");
                                    setAmount("");
                                    setCurrency("");
                                    setQuoteId("");
                                    setSelectedCoin(val);
                                    stopCountdown();
                                    updateNetworksForCoin(val);
                                  }}
                                  inputWidth="w-auto"
                                  optionsWidth="w-[15rem]"
                                  optionsOffsetX={-90}
                                  px="px-1"
                                  py="py-1"
                                  textSize="text-[15px]"
                                  // onChange={handleSelection}
                                  borderColor="#fff"
                                  backgroundColor="#EAEFF6"
                                  optionsPx="px-1"
                                  optionsPy="py-1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between  mt-[0.5rem]   items-center">
                            <p className="pt-2 pb-1 text-[14px] text-[#000]">
                              Address
                            </p>
                          </div>

                          <div className=" relative flex items-center w-full border border-gray-300 rounded-md focus-within:border-2 focus-within:border-gray-300">
                            {/* Input Field */}
                            <input
                              type="text"
                              placeholder="Paste [name of crypto] wallet address"
                              className="w-full px-3 py-3 outline-none bg-white text-[16px] rounded-md"
                            />

                            <img
                              src={scan}
                              className="absolute right-2"
                              alt=""
                            />
                          </div>
                          <div className="flex justify-between  mt-[0.5rem]   items-center">
                            <p className="pt-2 pb-1 text-[14px] text-[#000]">
                              Network{" "}
                              <span className="text-gray-400">(Optional)</span>
                            </p>
                          </div>

                          <div className="w-full border border-gray-300 rounded-md focus-within:border-2 focus-within:border-gray-300">
                            <CustomSelect
                              options={networkOptions}
                              value={selectedNetwork}
                              onChange={(val) => setSelectedNetwork(val)}
                              // onChange={(val) => {
                              //   setForm({ ...form });
                              //   form.network = val.value;
                              // }}
                              placeholder="Select Network"
                              inputWidth="w-auto"
                              optionsWidth="w-full"
                              // optionsOffsetX={-90}
                              px="px-2"
                              py="py-3"
                              textSize="text-[15px]"
                              // onChange={handleSelection}
                              borderColor="border-gray-300"
                              backgroundColor="#fff"
                              optionsPx="px-1"
                              optionsPy="py-1"
                            />
                          </div>

                          <div className="mt-[0.5rem]">
                            <p className="pt-2 pb-1 text-[14px] text-[#000]">
                              Amount
                            </p>

                            <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                              <input
                                type="text"
                                placeholder="0.00104"
                                className="w-full pr-3 py-3 outline-none bg-white text-[16px] rounded-md"
                                value={amount}
                                onChange={(e) => {
                                  stopCountdown();
                                  handleChange(e);
                                }}
                              />
                              <div className="w-full flex">
                                <div className="ml-auto w-auto">
                                  <CustomSelect
                                    // options={options}
                                    inputWidth="w-full"
                                    optionsWidth="w-full"
                                    px="px-1"
                                    py="py-1"
                                    textSize="text-[1rem]"
                                    value={selectedCoin}
                                    borderColor="#fff"
                                    backgroundColor="#EAEFF6"
                                    optionsPx="px-1"
                                    optionsPy="py-1"
                                    showDropdownIcon={false}
                                    readOnly={true}
                                    defaultSelected={selectedCoin}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between  mt-[0.5rem]   items-center">
                              <p className="pt-2 pb-1 text-[14px] text-[#000]">
                                Narration
                              </p>
                            </div>
                            <div className="w-full border border-gray-300 rounded-md focus-within:border-2 focus-within:border-gray-300">
                              <input
                                type="text"
                                placeholder="Enter narration"
                                className="w-full px-3 py-3 outline-none bg-white text-[16px] rounded-md"
                                value={form.narration}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    narration: e.target.value,
                                  })
                                }
                                onBlur={handleBlur}
                                onFocus={() => {
                                  stopCountdown();
                                  handleFocus();
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleBlur();
                                  }
                                }}
                              />
                            </div>

                            {/* {error && (
                              <p className="text-red-500 text-sm">{error}</p>
                            )} */}

                            <div className="w-full flex mt-9 justify-end">
                              <div className="flex items-center gap-3">
                                <button
                                  // disabled={isDisabled}
                                  onClick={() => setShowConfirmation(true)}
                                  className={`border-[2px] ${
                                    isDisabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer"
                                  } border-[#8003A9] bg-[#8003A9] text-[#fff] px-[4rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]`}
                                >
                                  Continue
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      </>
                    ) : null
                  ) : activeTab === "buy" ? (
                    <>
                      {/* Confirmation UI for Buy */}

                      <>
                        <div className="flex items-center justify-center">
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[18px] mb-[-8px] text-center">
                              Purchase
                            </p>
                            <h4 className="flex justify-center gap-0.5   items-center text-[24px]">
                              <span>
                                {toAmount
                                  ? `${toAmount} ${currency.toUpperCase()}`
                                  : 0.0}
                              </span>
                            </h4>
                            <p className="flex mt-[-8px] items-center gap-0.5 justify-center text-[#FF3366] text-[13px]">
                              <span>-</span> <span>{numericAmount}</span>
                              <span>NGN</span>
                            </p>
                          </div>
                        </div>
                        <div className="border border-gray-300 mt-[2rem] px-4 py-6 rounded-md bg-white shadow">
                          <div className="flex justify-between text-[15px] mb-4">
                            <p className="">Price Per Asset</p>
                            <span className="  flex items-center gap-1">
                              <span>{Number(quotePrice).toLocaleString()}</span>
                              <span>{currency}</span>
                            </span>
                          </div>

                          <div className="flex justify-between text-[15px] mb-4">
                            <p className="">Cost</p>
                            <span className=" flex items-center gap-1">
                              <span>{numericAmount}</span>
                              <span>NGN</span>
                            </span>
                          </div>

                          {/* <div className="flex justify-between text-[15px] mb-4">
                        <p className="">Transaction Fee</p>
                        <span className="flex items-center gap-1">
                          <span>0.0012</span>
                          <span>BTC</span>
                        </span>
                      </div> */}

                          <div className="flex justify-between text-[15px] ">
                            <p className="">You will receive</p>
                            <span className="flex items-center gap-1">
                              <span>
                                {toAmount
                                  ? `${toAmount} ${currency.toUpperCase()}`
                                  : 0.0}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex mt-9 justify-end">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setShowConfirmation(false)}
                              className="border-[2px] cursor-pointer  text-[#8003A9] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]"
                            >
                              Edit Purchase
                            </button>
                            <button
                              className={`border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]`}
                              onClick={() => setOpenPinModal(true)}
                            >
                              Create Purchase
                            </button>
                          </div>
                        </div>
                      </>
                    </>
                  ) : activeTab === "send" ? (
                    <>
                      {/* Confirmation UI for Send */}

                      <>
                        <div className="flex items-center justify-center">
                          <div className="flex flex-col gap-[2px]">
                            <p className="text-[18px] mb-[-8px] text-center">
                              Sending
                            </p>
                            <h4 className="flex justify-center gap-0.5   items-center text-[24px]">
                              <span>
                                {toAmount
                                  ? `${toAmount} ${currency.toUpperCase()}`
                                  : 0.0}
                              </span>
                            </h4>
                            <p className="flex mt-[-8px] items-center gap-0.5 justify-center text-[#FF3366] text-[13px]">
                              <span>-</span> <span>{numericAmount}</span>
                              <span>NGN</span>
                            </p>
                          </div>
                        </div>
                        <div className="border border-gray-300 mt-[2rem] px-4 py-6 rounded-md bg-white shadow">
                          <div className="flex justify-between text-[15px] mb-4">
                            <p className="">Amount</p>
                            <span className="  flex items-center gap-1">
                              <span>{Number(quotePrice).toLocaleString()}</span>
                              <span>{currency}</span>
                            </span>
                          </div>
                          <div className="flex justify-between text-[15px] mb-4">
                            <p className="">Wallet balance</p>
                            <span className="  flex items-center gap-1">
                              <span>{Number(quotePrice).toLocaleString()}</span>
                              <span>{currency}</span>
                            </span>
                          </div>

                          <div className="flex justify-between text-[15px] mb-4">
                            <p className="">Transaction fee</p>
                            <span className=" flex items-center gap-1">
                              <span>{numericAmount}</span>
                              <span>NGN</span>
                            </span>
                          </div>

                          {/* <div className="flex justify-between text-[15px] mb-4">
                        <p className="">Transaction Fee</p>
                        <span className="flex items-center gap-1">
                          <span>0.0012</span>
                          <span>BTC</span>
                        </span>
                      </div> */}

                          <div className="flex justify-between text-[15px] ">
                            <p className="">Address</p>
                            <span className="flex items-center gap-1">
                              <span>
                                {toAmount
                                  ? `${toAmount} ${currency.toUpperCase()}`
                                  : 0.0}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="w-full flex mt-9 justify-end">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setShowConfirmation(false)}
                              className="border-[2px] cursor-pointer  text-[#8003A9] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]"
                            >
                              Edit Purchase
                            </button>
                            <button
                              className={`border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]`}
                              onClick={() => setOpenPinModal(true)}
                            >
                              Create Purchase
                            </button>
                          </div>
                        </div>
                      </>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyCrypto;

const WalletSkeleton = () => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg animate-pulse">
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 bg-gray-200 rounded-full" />
      <div className="w-24 h-4 bg-gray-200 rounded" />
    </div>
    <div className="w-12 h-4 bg-gray-200 rounded" />
  </div>
);
