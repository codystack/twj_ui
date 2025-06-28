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

const Wallet = () => {
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="grid md:grid-cols-3 gap-4">
          {cardData.map(({ id, icon, title, description, link }) => (
            <Link
              to={link}
              key={id}
              className="bg-white shadow p-4 rounded-xl text-left hover:shadow-md transition"
            >
              <img src={icon} alt={title} className="w-8 h-8 mb-2" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;

// import { Outlet } from "react-router-dom";

// const Wallet = () => {
//   return (
//     <div className="pt-[5rem] px-[1rem]">
//       <Outlet />
//     </div>
//   );
// };

// export default Wallet;
