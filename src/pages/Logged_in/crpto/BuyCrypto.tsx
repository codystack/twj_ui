import CustomSelect from "../../../components/CustomSelect";
import Bitcoin from "../../../assets/crpto_icons/Btc-coin.757f6cb3 2.svg";
import Eth from "../../../assets/crpto_icons/ETH-b-coin.eac01ea4 1.svg";

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

export type Optiontype = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

const BuyCrypto = () => {
  const handleSelection = (selected: Optiontype) => {
    console.log(" Selected from parent:", selected);
    console.log(" Backend value:", selected.value);
  };

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div>Buy Crypto</div>
          <div className="p-4">
            <CustomSelect
              options={options}
              placeholder="Choose a coin"
              inputWidth="w-64"
              optionsWidth="w-80"
              onChange={handleSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
