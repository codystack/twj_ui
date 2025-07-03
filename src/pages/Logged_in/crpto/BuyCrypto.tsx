import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";

import USDT from "../../../assets/crpto_icons/USDT-b-coin.svg";
import BITCOIN from "../../../assets/crpto_icons/BITCOIN.svg";
import ETHER from "../../../assets/crpto_icons/ETHER.svg";

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

const BuyCrypto = () => {
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
