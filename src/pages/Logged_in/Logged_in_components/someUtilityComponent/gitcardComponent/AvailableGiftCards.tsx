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

export const giftCardsData = [
  { id: "1", name: "Amazon", image: amazon, price: "$100" },
  { id: "2", name: "Apple Music", image: Music, price: "$50" },
  { id: "3", name: "Steam", image: steam, price: "$25" },
  { id: "4", name: "Airbnb", image: airbnb, price: "$150" },
  { id: "5", name: "AMC", image: amc, price: "$30" },
  { id: "6", name: "Anghami", image: angahmi, price: "$20" },
  { id: "7", name: "Nintendo Switch", image: switchd, price: "$60" },
  { id: "8", name: "Xbox", image: xbox, price: "$80" },
  { id: "9", name: "Uber Eats", image: uberrats, price: "$40" },
  { id: "10", name: "PlayStation", image: playstation, price: "$70" },
  { id: "11", name: "ASOS", image: asos, price: "$45" },
  { id: "12", name: "Nordstrom", image: Nord, price: "$90" },
];

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const AvailableGiftCards = ({ onNext, onClose }: ModalProps) => {
  const { setSelectedGiftCardId } = useGiftCardStore();

  const handleCardClick = (id: string) => {
    setSelectedGiftCardId(id);
    onNext();
  };


  return (
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

        <div className="grid my-[2rem] mx-[3rem] grid-cols-4 gap-6">
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
              {/* <p className="text-[#0A2E65] text-xs">{card.price}</p> */}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableGiftCards;
