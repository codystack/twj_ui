import { useState } from "react";
import CustomSelect from "../../../components/CustomSelect";
import Bitcoin from "../../../assets/crpto_icons/Btc-coin.757f6cb3 2.svg";
import Eth from "../../../assets/crpto_icons/ETH-b-coin.eac01ea4 1.svg";
import warning from "../../../assets/crpto_icons/warning_c.svg";
import DOGE from "../../../assets/crpto_icons/Doge-coin.de2aebc7 1.svg";
import USDT from "../../../assets/crpto_icons/USDT-b-coin.9404ef8d 1.svg";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";
import positive from "../../../assets/crpto_icons/positive.svg";
import negative from "../../../assets/crpto_icons/negative.svg";
import QR from "../../../assets/crpto_icons/qrcodee.svg";
import copy from "../../../assets/crpto_icons/Copy_lightC.svg";
import warRed from "../../../assets/crpto_icons/warn_red.svg";

const options = [
  {
    id: "btc",
    label: "Bitcoin",
    value: "btc_backend_id_123",
    displayValue: ".102 BTC",
    image: Bitcoin,
  },
  {
    id: "eth",
    label: "Ethereum",
    value: "eth_backend_id_456",
    displayValue: ".504 ETH",

    image: Eth,
  },
];

const cryptoData = [
  {
    id: "btc",
    shortName: "BTC",
    fullName: "Bitcoin",
    priceNGN: "₦75,300,000",
    percentChange: 2.15,
    image: BITCOIN,
  },
  {
    id: "eth",
    shortName: "ETH",
    fullName: "Ethereum",
    priceNGN: "₦4,580,000",
    percentChange: -1.32,
    image: ETHER,
  },
  {
    id: "usdt",
    shortName: "USDT",
    fullName: "Tether",
    priceNGN: "₦1,320",
    percentChange: 0.05,
    image: USDT,
  },
  {
    id: "usdc",
    shortName: "DOGE",
    fullName: "Doge",
    priceNGN: "₦1,310",
    percentChange: -0.12,
    image: DOGE,
  },
];

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

const BuyCrypto = () => {
  const [copied, setCopied] = useState(false);

  // Full wallet address
  const fullAddress = "bc1qkuv9jc9qgfzzvgqev8zsu3e4gzeux09pq3nvs5";

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const handleSelection = (selected: Optiontype) => {
    console.log(" Selected from parent:", selected);
    console.log(" Backend value:", selected.value);
  };

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div className=" w-full  p-4">
            <div className="w-full grid [grid-template-columns:45%_55%]   ">
              {/* Left section */}
              <div className=" ">
                <div className="flex flex-col">
                  <p className="py-3 text-[14px] text-[#000]">
                    Select Cryptocurrency Asset
                  </p>
                  <CustomSelect
                    options={options}
                    placeholder="Choose a coin"
                    inputWidth="w-full"
                    optionsWidth="w-full"
                    px="px-5"
                    py="py-3"
                    textSize="text-[15px]"
                    onChange={handleSelection}
                  />
                </div>

                <div className="flex justify-center items-center px-7 py-3 mt-4 rounded-[10px] w-full bg-[#FBEEFF] ">
                  <div className="flex items-center  gap-3 justify-center ">
                    <img src={warning} alt="" />
                    <p className="leading-[0.9rem] text-[#8003A9] text-left text-[13px]">
                      Your wallet will automatically be credited with Naira
                      after confirmations on your transaction.
                    </p>
                  </div>
                </div>

                <div className="w-full flex mt-9 justify-end">
                  <div className="flex items-center gap-3">
                    <button className="border-[2px] cursor-pointer  text-[#8003A9] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]">
                      Swap Asset
                    </button>
                    <button className="border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[2rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]">
                      Create Wallet
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mt-7">
                    <p className=" text-[19px] font-[500]">Market</p>
                  </div>

                  <div className="w-full border  px-5 py-4 mt-2 border-[#8A95BF] rounded-md overflow-hidden">
                    {cryptoData.map((coin, index) => (
                      <div
                        key={coin.id}
                        className={`flex justify-between items-center  py-3 ${
                          index !== cryptoData.length - 1 ? "border-b" : ""
                        } border-[#8A95BF]`}
                      >
                        {/* Left: Coin Image + Name */}
                        <div className="flex items-center gap-3">
                          <img
                            src={coin.image}
                            alt={coin.fullName}
                            className="w-8 h-8"
                          />
                          <div className="leading-tight">
                            <p className="text-[15px]">{coin.shortName}</p>
                            <p className="text-[12px] text-gray-500">
                              {coin.fullName}
                            </p>
                          </div>
                        </div>

                        {/* Right: Price + Change */}
                        <div className="text-right leading-tight flex flex-col items-end">
                          <p className="text-[15px]">{coin.priceNGN}</p>
                          <p
                            className={`text-sm flex items-center gap-1 ${
                              coin.percentChange >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            <img
                              src={
                                coin.percentChange >= 0 ? positive : negative
                              }
                              alt={
                                coin.percentChange >= 0
                                  ? "positive"
                                  : "negative"
                              }
                              className="w-3 h-3"
                            />
                            {coin.percentChange}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right section */}
              <div className=" relative  ml-5 w-full h-full flex justify-center items-center ">
                <div className="border border-[#8A95BF] rounded-[10px] bg-[#F5F7FA] w-[85%] border-dashed">
                  <div className="flex justify-center items-center mt-15">
                    <img src={QR} alt="qr code" />
                  </div>

                  <div className="mt-10  px-[3rem]">
                    <p className="mb-[-6px]">Wallet Address</p>

                    <div className="flex my-[0.7rem] items-center w-full max-w-md border border-[#8A95BF] rounded-md overflow-hidden">
                      {/* Address section */}
                      <div className="px-4 py-2 text-sm text-gray-700 truncate w-full">
                        {fullAddress}
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={handleCopy}
                        className="bg-[#8003A9] cursor-pointer hover:bg-[#6c028b] text-white p-3 flex items-center justify-center"
                        title="Copy address"
                      >
                        <img src={copy} alt="" />
                      </button>
                    </div>

                    {/* Copied tag */}
                    {copied && (
                      <span className=" absolute buttom--[20px] right-[5rem] text-[13px] text-green-600 font-medium">
                        Copied!
                      </span>
                    )}
                  </div>

                  <div className="px-[2rem] mb-[2rem]">
                    <div className="flex justify-center  items-center px-7 py-3 mt-4 rounded-[10px] w-full bg-[#FFEEF2] ">
                      <div className="flex items-center  gap-3 justify-center ">
                        <img src={warRed} alt="" />
                        <p className="leading-[0.9rem] text-[#27014F] text-left text-[13px]">
                          Sending less than $10 will result in receiving credit
                          at a significantly lower exchange rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
