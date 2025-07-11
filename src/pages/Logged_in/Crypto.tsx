// WalletHome.tsx
import { Link } from "react-router-dom"; // use 'react-router-dom', not 'react-router'
import BuyCrypto from "../../assets/crpto_icons/c-down.svg";
import SellCrypto from "../../assets/crpto_icons/c-sell.svg";
import SwapCrypto from "../../assets/crpto_icons/c-swap.svg";

const cardData = [
  {
    id: 1,
    icon: BuyCrypto,
    title: "Buy Crypto",
    description:
      "Buy various cryptocurrencies easily and instantly at the best market rates.",
    link: "/wallet/buycrypto",
  },
  {
    id: 2,
    icon: SellCrypto,
    title: "Sell Crypto",
    description:
      "Sell various cryptocurrencies easily and instantly at the best market rates.",
    link: "/wallet/sellcrypto",
  },
  {
    id: 3,
    icon: SwapCrypto,
    title: "Swap Crypto",
    description: "Swap various cryptocurrencies easily and instantly to NGN.",
    link: "/wallet/swapcrypto",
  },
];

const Crypto = () => {
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="grid md:grid-cols-3 gap-5 mt-5 [@media(min-width:1000px)]:ml-5">
          {cardData.map(({ id, icon, title, description, link }) => (
            <Link
              to={link}
              key={id}
              className="  cursor-pointer border h-[156px] min-width-[291px] bg-[#F2F4FC]/60 border-[#D0DAE6] hover:border-[#326CF6]  duration-300 rounded-[10px]   p-4 text-left transition"
            >
              <img src={icon} alt={title} className="w-8 h-8 mt-[9px] mb-2" />
              <h3 className="font-semibold text-[#27014F] text-lg">{title}</h3>
              <p className="text-[16px] leading-[1rem] mt-[5px] sm:text-[14px]  text-[#0A2E65]">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crypto;
