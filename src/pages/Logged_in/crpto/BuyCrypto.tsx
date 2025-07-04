import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";
import USDT from "../../../assets/crpto_icons/USDT-b-coin.svg";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import NGN from "../../../assets/crpto_icons/MaskNGN.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";
import CustomSelect from "../../../components/CustomSelect";
import { useState } from "react";

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

const coins = [
  {
    name: "Bitcoin",
    short: "BTC",
    value: "(0.00 BTC)",
    img: BITCOIN,
  },
  {
    name: "Ethereum",
    short: "ETH",
    value: "(1.25 ETH)",
    img: ETHER,
  },
  {
    name: "Tether",
    short: "USDT",
    value: "(20.00 USDT)",
    img: USDT,
  },
  {
    name: "Binance Coin",
    short: "BNB",
    value: "(5.10 BNB)",
    img: BITCOIN,
  },
  {
    name: "Solana",
    short: "SOL",
    value: "(12.00 SOL)",
    img: ETHER,
  },
];

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

const BuyCrypto = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedCoin, setSelectedCoin] = useState<Optiontype>(options[0]);

  const handleSelection = (selected: Optiontype) => {
    console.log("Selected from parent:", selected);
    console.log("Backend value:", selected.value);
    setSelectedCoin(selected);
  };
  const secHandleChange = (val: Optiontype) => {
  console.log(val);
};

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div className=" w-full  p-4">
            <div className="flex justify-start items-center mb-2">
              <NavLink className="flex items-center gap-1 " to="/wallet">
                <FaArrowLeft className="text- cursor-pointer" />
                <p className="text-[15px]">Back</p>
              </NavLink>
            </div>
            <div className="w-full grid [grid-template-columns:45%_55%]   ">
              {/* Left section */}
              <div className=" ">
                <h3 className="text-[18px] my-[1rem]">Crypto Wallets</h3>
                <div className="flex flex-col gap-4">
                  {coins.map((coin, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.img}
                          alt={coin.name}
                          className="w-6 h-6"
                        />
                        <span className="font-medium">{coin.name}</span>
                      </div>
                      <span className="text-gray-500">{coin.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right section */}
              <div className=" mt-[1rem] ml-[2rem]">
                {!showConfirmation ? (
                  <>
                    <p className="pt-2 pb-1 text-[14px] text-[#000]">
                      Select Cryptocurrency
                    </p>
                    <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                      <p className="w-full text-[16px] font-medium">
                        {selectedCoin.label}
                      </p>

                      <div className="w-full flex">
                        <div className="ml-auto w-[50%]">
                          <CustomSelect
                            options={options}
                            defaultSelected={options[0]}
                            inputWidth="w-full"
                            optionsWidth="w-full"
                            px="px-1"
                            py="py-1"
                            textSize="text-[15px]"
                            onChange={handleSelection}
                            borderColor="#fff"
                            backgroundColor="#EAEFF6"
                            optionsPx="px-1"
                            optionsPy="py-1"
                            //  showDropdownIcon={false}
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
                          <span>N</span>
                          <span>50,000</span>
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
                        <span className="text-[13px] font-medium">NGN</span>
                      </div>

                      {/* Input Field */}
                      <input
                        type="text"
                        placeholder="50,000"
                        className="w-full px-1 py-2 outline-none bg-white rounded-r-md text-sm"
                      />
                    </div>

                    <div className="mt-[0.5rem]">
                      <p className="pt-2 pb-1 text-[14px] text-[#000]">
                        What you'll receive
                      </p>

                      <div className="grid grid-cols-2 items-center px-2 py-1 border border-gray-300 rounded-lg">
                        <p className="w-full text-[16px] font-medium">
                          0.00237
                        </p>

                        <div className="w-full flex">
                          <div className="ml-auto w-[50%]">
                            <CustomSelect
                              options={options}
                              defaultSelected={options[0]}
                              inputWidth="w-full"
                              optionsWidth="w-full"
                              px="px-1"
                              py="py-1"
                              textSize="text-[15px]"
                              onChange={secHandleChange}
                              borderColor="#fff"
                              backgroundColor="#EAEFF6"
                              optionsPx="px-1"
                              optionsPy="py-1"
                              showDropdownIcon={false}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex mt-9 justify-end">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setShowConfirmation(true)}
                            className="border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[4rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col gap-[2px]">
                        <p className="text-[18px] mb-[-8px] text-center">
                          Purchase
                        </p>
                        <h4 className="flex justify-center gap-0.5   items-center text-[24px]">
                          <span>0.0003667</span> <span>BTC</span>
                        </h4>
                        <p className="flex mt-[-8px] items-center gap-0.5 justify-center text-[#FF3366] text-[13px]">
                          <span>-</span> <span>50,000</span>
                          <span>NGN</span>
                        </p>
                      </div>
                    </div>
                    <div className="border border-gray-300 mt-[2rem] px-4 py-6 rounded-md bg-white shadow">
                      <div className="flex justify-between text-[15px] mb-4">
                        <p className="">Price Per Asset</p>
                        <span className="  flex items-center gap-1">
                          <span>3,505.03</span>
                          <span>NGN</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-[15px] mb-4">
                        <p className="">Cost</p>
                        <span className=" flex items-center gap-1">
                          <span>50,000</span>
                          <span>NGN</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-[15px] mb-4">
                        <p className="">Transaction Fee</p>
                        <span className="flex items-center gap-1">
                          <span>0.0012</span>
                          <span>BTC</span>
                        </span>
                      </div>

                      <div className="flex justify-between text-[15px] ">
                        <p className="">You will receive</p>
                        <span className="flex items-center gap-1">
                          <span>0.0012</span>
                          <span>BTC</span>
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
                        <button className="border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]">
                          Create Wallet
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
