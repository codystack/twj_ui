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
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import search from "../../../../../assets/dashboard_img/Search_light.svg";
// import InfiniteScroll from "react-infinite-scroll-component";
import { SingleValue } from "react-select";
// import ErrorBoundary from "../../../../../components/error/ErrorBoundry";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: "5px",
    padding: "4px",
    boxShadow: "none",
    outline: "none",
    textAlign: "left",
    width: "100%",
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

  menu: (provided: any) => ({
    ...provided,
    width: "250px", // Set width wider than the input
    zIndex: 9999,
  }),
  menuPortal: (base: any) => ({
    ...base,
    zIndex: 9999,
  }),
};

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

// types for all gift cards
interface Countrys {
  isoName: string;
  name: string;
  flagUrl: string;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  brandId: number;
  brandName: string;
}

interface RedeemInstruction {
  concise: string;
  verbose: string;
}

interface GiftCard {
  productId: number;
  productName: string;
  global: boolean;
  status: string;
  supportsPreOrder: boolean;
  senderFee: number;
  senderFeePercentage: number;
  discountPercentage: number;
  denominationType: string;
  recipientCurrencyCode: string;
  senderCurrencyCode: string;
  minRecipientDenomination: number | null;
  maxRecipientDenomination: number | null;
  minSenderDenomination: number | null;
  maxSenderDenomination: number | null;
  fixedRecipientDenominations: number[];
  fixedSenderDenominations: number[];
  fixedRecipientToSenderDenominationsMap: Record<string, number>;
  metadata: Record<string, any>;
  logoUrls: string[];
  brand: Brand;
  category: Category;
  country: Countrys;
  redeemInstruction: RedeemInstruction;
  additionalRequirements: {
    userIdRequired: boolean;
  };
}

type OptionType = {
  label: string;
  value: string;
};

const AvailableGiftCards = ({ onNext, onClose }: ModalProps) => {
  const { allCards, setAllCards, setSelectedGiftCardId } = useGiftCardStore();
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<
    CountryOption | OptionType | null
  >(countries.find((country) => country.value === "United States") || null);

  // const [selectedCountrys, setSelectedCountrys] = useState<
  //   OptionType | OptionType
  // >();
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCountryChange = (newValue: SingleValue<OptionType>) => {
    setSelectedCountry(newValue);
  };

  const handleCategoryChange = (option: OptionType | null) => {
    setSelectedCategory(option);
  };

  useEffect(() => {
    fetchCountries();
    fetchCategories();
  }, []);

  const fetchCountries = async () => {
    // console.log("Fetching countries...");
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/GiftCards/countries`);

      const data: Country[] = res.data.data;
      // console.log("Raw country data:", data);

      const options = data.map((country: Country) => ({
        value: country.name,
        label: country.name,
        flag: country.flagUrl,
      }));

      setCountries(options);
      // console.log("Parsed country options:", options);

      // const us = options.find((c) => c.value === "US");
      const us = options.find(
        (c: { value: string; label: string; flag: string }) =>
          c.value === "United States"
      );
      setLoading(false);

      if (us) setSelectedCountry(us);
    } catch (err) {
      setLoading(false);
      return err;
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/GiftCards/categories`);

      // Assuming the structure is: { data: [ { id: 1, name: "Payment Cards" }, ... ] }
      const data: { id: number; name: string }[] = res.data.data;
      // console.log("Raw category data:", data);

      const options = data.map((category) => ({
        value: String(category.id),
        label: category.name,
      }));

      setCategories(options);
      // console.log("Parsed category options:", options);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      // console.error("Error fetching categories:", err);
      return err;
    }
  };

  const page = 1;
  const fetchGiftCards = async (page: number) => {
    // console.log("Fetching gift cards for page:", page);
    const pageSize = 0;
    try {
      setLoading(true);
      // console.log("Fetching gift cards...");
      const res = await axios.get(
        `${BASE_URL}/GiftCards/products?size=${pageSize}&page=${page}`
      );

      const data: GiftCard[] = res.data.data.content || [];
      // console.log("Raw gift card data:", data.length);

      const uniqueData = Array.from(
        new Map(data.map((card) => [card.productId, card])).values()
      );
      setAllCards((prev) => {
        const existingIds = new Set(prev.map((card) => card.productId));
        const newUnique = uniqueData.filter(
          (card) => !existingIds.has(card.productId)
        );
        return [...prev, ...newUnique];
      });

      // Set `hasMore` to false if no more data
      // if (data.length < pageSize - 2) {
      //   console.log(data.length);
      //   setHasMore(false);
      //   // console.log("has set to false");
      // }

      setLoading(false);
    } catch (err) {
      // console.error("Error fetching gift cards:", err);
      setLoading(false);
      return err;
    }
  };

  // const loadMore = () => {
  //   // console.log("Loading more cards...");
  //   setPage((prevPage) => {
  //     const newPage = prevPage + 1;
  //     fetchGiftCards(newPage);
  //     return newPage;
  //   });
  // };

  useEffect(() => {
    fetchGiftCards(page);
  }, [page]);

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

  // const customFilterOption = (option: any, inputValue: any) => {
  //   const { data } = option;
  //   const label = data.label.toLowerCase();
  //   const searchValue = inputValue.toLowerCase();
  //   return label.includes(searchValue);
  // };

  const filteredCards = allCards.filter((card) => {
    const countryMatch = selectedCountry
      ? card.country.name === selectedCountry.value
      : true;
    const categoryMatch = selectedCategory
      ? card.category.id.toString() === selectedCategory.value
      : true;
    const searchMatch = card.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return countryMatch && categoryMatch && searchMatch;
  });

  return (
    <>
      <div
        id="scrollableDiv"
        className="text-center overflow-y-aut w-full  hide-scrollbar  space-y-4"
        style={{ height: "90vh", overflow: "auto" }}
      >
        <div className="">
          <div className="sticky p-6  top-0 z-20 w-full  flex items-center border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between bg-white">
            <h3 className="text-[17px] tracking-[1px] text-[#27014F]">
              Gift Cards
            </h3>
            <button
              className="cursor-pointer"
              onClick={() => {
                setAllCards([]);
                onClose();
              }}
            >
              <img src={cancel} alt="" />
            </button>
          </div>
          {/* inittially was sticky not fixed  and top-60px */}
          <div className="pt-[1rem]  w-[720px]  pb-4  z-20 mx-[1.5rem] fixed  left-[19rem] bg-white flex items-center gap-4">
            <div className="  w-[18%]">
              <Select
                options={countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                components={{
                  SingleValue: customSingleValue,
                  Option: customOption,
                }}
                styles={customStyles}
                className="custom-select"
                isSearchable={false}

                // menuPortalTarget={document.body}
                // menuPlacement="auto"
                // isSearchable={true} // Enable search functionality
                // filterOption={customFilterOption}
              />
            </div>

            <div>
              <Select
                options={categories}
                value={selectedCategory}
                onChange={handleCategoryChange}
                styles={customStyles}
                placeholder="Select Category"
              />
            </div>

            <div className="relative ">
              <input
                type="text"
                placeholder="Search Gift Card"
                name="searchTerm"
                value={searchTerm}
                onChange={handleSearchChange}
                className={`  p-2.5 pl-3 pr-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-[5px] focus:border-purple-800 `}
              />
              <img
                src={search}
                className="absolute bottom-[0.7rem] right-3"
                alt=""
              />
            </div>
          </div>

          {/* <InfiniteScroll
            dataLength={allCards.length}
            next={() => {
              // console.log("Triggered next!");
              loadMore();
            }}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
            scrollableTarget="scrollableDiv"
          > */}
          <div className="grid my-[1.5rem] mt-[6rem] z-10 h-[calc(100vh-rem)] mx-[1.5rem] grid-cols-4 gap-6">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <button
                  onClick={() => handleCardClick(card.productId.toString())}
                  key={card.productId}
                  className="flex flex-col bg-white transition-all duration-300 ease-in-out hover:scale-105 cursor-pointer"
                >
                  <img
                    src={card.logoUrls[0]}
                    alt={card.productName}
                    className="object-cover rounded-[10px] mb-1.5"
                  />
                  <h4 className="text-[#000] ml-[3px] text-left font-semibold text-[15px]">
                    {card.productName}
                  </h4>
                </button>
              ))
            ) : (
              <div className="col-span-4 text-center text-xl text-gray-500">
                No gift cards available!
              </div>
            )}
          </div>

          {/* </InfiniteScroll> */}
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
