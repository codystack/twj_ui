import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";
import USDT from "../../../assets/crpto_icons/USDT-b-coin.svg";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import warning from "../../../assets/crpto_icons/Alarm.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";
import CustomSelect from "../../../components/CustomSelect";
import NGN from "../../../assets/crpto_icons/MaskNGN.svg";
import empty from "../../../assets/crpto_icons/emptycircle.svg";
import swap from "../../../assets/crpto_icons/swap.svg";
import { useState } from "react";

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

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

const SwapCrypto = () => {
  const [selectedCoin, setSelectedCoin] = useState<Optiontype>(options[0]);

  const handleSelection = (selected: Optiontype) => {
    console.log("Selected from parent:", selected);
    console.log("Backend value:", selected.value);
    setSelectedCoin(selected);
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
              <div className=" ml-[2rem] mt-[-1rem] ">
                <div className="flex justify-center items-center">
                  <div className="flex justify-center w-[60%] items-center px-5 py-2 mt-4 rounded-[10px]  bg-[#FBEEFF] ">
                    <div className="flex items-center  gap-3 justify-center ">
                      <img src={warning} alt="" />
                      <p className="leading-[0.9rem] text-[#8003A9] text-left text-[13px]">
                        0:15 seconds to refresh asset rates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={swap}
                    className="absolute top-[9.67rem] z-20 right-[16.25rem]"
                    alt=""
                  />
                  <img
                    src={empty}
                    className="absolute top-[8.6rem] right-[15rem]"
                    alt=""
                  />
                  <div className="mt-[1rem] pt-10 px-12 pb-13.5 rounded-2xl bg-[#F5F7FA] ">
                    <div>
                      <p className=" pb-1 text-[14px] text-[#000]">
                        Select Cryptocurrency
                      </p>
                      <div className="grid grid-cols-2 items-center px-2 py-1 border bg-white border-gray-300 rounded-lg">
                        <p className="w-full text-[16px] font-medium">
                          {selectedCoin.label}
                        </p>

                        <div className="w-full flex">
                          <div className="ml-auto w-[60%]">
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
                    </div>
                  </div>
                  <div className="mt-[6px] pt-10  px-12 pb-13.5 rounded-2xl bg-[#F5F7FA] ">
                    <div>
                      <p className=" pb-1 text-[14px] text-[#000]">
                        Select Cryptocurrency
                      </p>
                      <div className="flex items-center w-full border border-gray-300 bg-white rounded-md focus-within:border-2 focus-within:border-gray-300">
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
                    </div>
                  </div>


                       <div className="w-full flex mt-7 justify-end">
                      <div className="flex items-center gap-3">
                      
                        <button className="border-[2px] cursor-pointer border-[#8003A9] bg-[#8003A9] text-[#fff] px-[4rem] py-[0.8rem] text-[16px] font-semibold rounded-[5px]">
                          Swap Now
                        </button>
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

export default SwapCrypto;
