import cancel from "../../../../../assets/dashboard_img/profile/cancel.svg";
import Nord from "../../../../../assets/giftcards_img/nord.png";
import Music from "../../../../../assets/giftcards_img/music.png";
import amazon from "../../../../../assets/giftcards_img/amazon.png";
import steam from "../../../../../assets/giftcards_img/steam.png";
import airbnb from "../../../../../assets/giftcards_img/airbnb.png";
import amc from "../../../../../assets/giftcards_img/amc.png";
import angahmi from "../../../../../assets/giftcards_img/angahmi_uae.png";
import switchd from "../../../../../assets/giftcards_img/swtich.png";
import xbox from "../../../../../assets/giftcards_img/xbox.png";
import uberrats from "../../../../../assets/giftcards_img/uberats.png";
import playstation from "../../../../../assets/giftcards_img/playstation.png";
import asos from "../../../../../assets/giftcards_img/asos.png";
import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
// import ReactFlagsSelect from "react-flags-select";
// import Select from "react-select";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import search from "../../../../../assets/dashboard_img/Search_light.svg";



const BASE_URL = import.meta.env.VITE_BASE_URL;


const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "5px",
    padding: "4px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    "&:hover": {
      border: state.isFocused ? "2px solid #8003A9" : "1px solid #a4a4a4",
    },
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    cursor: "pointer",
    textAlign: "left",
    backgroundColor: state.isSelected
      ? "#8003A9"
      : state.isFocused
      ? "#F8E0FF" // Hover background color
      : "#fff",
    color: state.isSelected ? "#fff" : "#27014F", // Text color change on selection
  }),
};

// const customStyles = {
//   control: (provided: any) => ({
//     ...provided,
//     display: "flex",
//     alignItems: "center",
//     paddingLeft: "0.5rem", // adjust to reduce left space
//   }),
//   singleValue: (provided: any) => ({
//     ...provided,
//     display: "flex",
//     alignItems: "center",
//     gap: "0.5rem",
//   }),
// };

export const giftCardsData = [
  { id: "1", name: "Amazon", image: amazon, price: "$100", country: "USA" },
  { id: "2", name: "Apple Music", image: Music, price: "$50", country: "USA" },
  { id: "3", name: "Steam", image: steam, price: "$25", country: "Global" },
  { id: "4", name: "Airbnb", image: airbnb, price: "$150", country: "Global" },
  { id: "5", name: "AMC", image: amc, price: "$30", country: "USA" },
  { id: "6", name: "Anghami", image: angahmi, price: "$20", country: "UAE" },
  {
    id: "7",
    name: "Nintendo Switch",
    image: switchd,
    price: "$60",
    country: "Japan",
  },
  { id: "8", name: "Xbox", image: xbox, price: "$80", country: "USA" },
  { id: "9", name: "Uber Eats", image: uberrats, price: "$40", country: "UK" },
  {
    id: "10",
    name: "PlayStation",
    image: playstation,
    price: "$70",
    country: "USA",
  },
  { id: "11", name: "ASOS", image: asos, price: "$45", country: "UK" },
  { id: "12", name: "Nordstrom", image: Nord, price: "$90", country: "USA" },
];

type Country = {
  currencyCode: string;
  currencyName: string;
  flagUrl: string;
  isoName: string;
  name: string;
};

type CountryOption = {
  value: string;
  label: string;
  flag: string;
};

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const AvailableGiftCards = ({ onNext, onClose }: ModalProps) => {
  const { setSelectedGiftCardId } = useGiftCardStore();
  // const [selected, setSelected] = useState("US");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null
  );

  useEffect(() => {
    // console.log("Fetching countries...");
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    // console.log("Fetching countries...");

    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/GiftCards/countries`
      );

      const data: Country[] = res.data.data;
      console.log("Raw country data:", data);

      const options = data.map((country: Country) => ({
        value: country.isoName,
        label: country.name,
        flag: country.flagUrl,
      }));

      setCountries(options);
      console.log("Parsed country options:", options);

      // const us = options.find((c) => c.value === "US");
      const us = options.find(
        (c: { value: string; label: string; flag: string }) => c.value === "US"
      );
      setLoading(false);

      if (us) setSelectedCountry(us);
    } catch (err) {
      setLoading(false);
      return err;
    }
  };

  // const customSingleValue = ({ data }: any) => (
  //   <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
  //     <img
  //       src={data.flag}
  //       alt=""
  //       style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }}
  //     />
  //   </div>
  // );

  const customSingleValue = ({ data }: any) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={data.flag}
        alt=""
        style={{
          marginTop: "-1.5rem",
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          display: "block",
        }}
      />
      {/* <span>{data.label}</span> */}
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          padding: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          // backgroundColor: "black",
          backgroundColor: props.isFocused ? "#F8E0FF" : "white",
        }}
      >
        <img
          src={data.flag}
          alt=""
          style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%" }}
        />
        <span>{data.label}</span>
      </div>
    );
  };

  const handleCardClick = (id: string) => {
    setSelectedGiftCardId(id);
    onNext();
  };

  useEffect(() => {
    console.log("Selected country:", selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <div className="text-center space-y-4">
        {/* <h2 className="text-2xl font-bold text-gray-800">All Available Gift Cards.</h2> */}
        <div className="">
          <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
            <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
              Gift Cards
            </h3>
            <button className="cursor-pointer" onClick={onClose}>
              <img src={cancel} alt="" />
            </button>
          </div>

          <div className="mt-[2rem] mx-[1.5rem]  flex items-center gap-4 ">
            <div className="  w-[18%]">
              <Select
                options={countries}
                value={selectedCountry}
                onChange={setSelectedCountry}
                components={{
                  SingleValue: customSingleValue,
                  Option: customOption,
                }}
                styles={customStyles}
                className="custom-select"
                // placeholder="Select a country"
                isSearchable={false}
              />
            </div>

            <div>
              <Select
                // options={plan}
                // isLoading={isFetchingPlan}
                // getOptionLabel={getOptionLabel}
                // getOptionValue={(e) => e.value}
                // styles={customStyles}
                // value={options.find(
                //   (options: any) => options.value === formData.plans
                // )}
                // value={plan.find((plan: any) => plan.value === formData.plans) ?? null}

                // onChange={handleSelectChange}
                styles={customStyles}
                placeholder="Select Category"
              />
            </div>

            <div className="relative ">
              <input
                type="text"
                placeholder="Search Gift Card"
                name="recipient"
                // value={formData.recipient}
                // onChange={handleChange}
                // onBlur={() =>
                //   validateField("recipient", formData.recipient)
                // }
                className={`  p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-[5px] focus:border-purple-800 `}
              />
              <img
                src={search}
                className="absolute bottom-[0.7rem] right-3"
                alt=""
              />
            </div>
          </div>

          <div className="grid my-[1.5rem] mt-[1rem] mx-[1.5rem] grid-cols-4 gap-6">
            {giftCardsData.map((card) => (
              <button
                onClick={() => handleCardClick(card.id)}
                key={card.id}
                className="flex flex-col bg-white    transition-all duration-300 ease-in-out  hover:scale-105 cursor-pointer"
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className=" object-cover mb-1.5"
                />
                <h4 className="text-[#000] ml-[3px] text-left font-semibold text-[15px]">
                  {card.name}
                </h4>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50 z-50">
          <div className="w-10 h-10 border-4 border-white border-t-[#8003A9] rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default AvailableGiftCards;
