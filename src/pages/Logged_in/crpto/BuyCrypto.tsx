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
              <div className="border ">
              
hell
              

                
              </div>

              {/* Right section */}
              <div className=" border ">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
