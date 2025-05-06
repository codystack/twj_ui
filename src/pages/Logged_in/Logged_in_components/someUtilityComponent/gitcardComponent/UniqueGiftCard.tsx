
// type ModalProps = {
//     onNext: () => void;
//     onBack: () => void;
//     onClose: () => void;
//   };

  
// const UniqueGiftCard = ({ onNext, onBack, onClose }: ModalProps) => {
//   return (
//     <div className="text-center space-y-4">
//     <h2 className="text-2xl font-bold text-gray-800">Unique Gift Cards</h2>
//     <div className="flex justify-center gap-2">
//       <button
//         onClick={onNext}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//       >
//         Next
//       </button>
//       <button
//         onClick={onBack}
//         className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//       >
//         Back
//       </button>
//       <button
//         onClick={onClose}
//         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//       >
//         Close
//       </button>
//     </div>
//   </div>
//   )
// }

// export default UniqueGiftCard



// import { useGiftCardStore } from "../../../../stores/useGiftCardStore";
import { useGiftCardStore } from "../../../../../store/useGiftCardStore";
import { giftCardsData } from "../gitcardComponent/AvailableGiftCards"; // assuming this is where your data is

type ModalProps = {
  onNext: () => void;
  onBack: () => void;
  onClose: () => void;
};

const UniqueGiftCard = ({ onNext, onBack, onClose }: ModalProps) => {
  const { selectedGiftCardId } = useGiftCardStore();
  const selectedCard = giftCardsData.find((card) => card.id === selectedGiftCardId);

  if (!selectedCard) return <p className="text-red-500">Gift card not found.</p>;

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{selectedCard.name}</h2>
      <img
        src={selectedCard.image}
        alt={selectedCard.name}
        className="mx-auto max-w-[200px]"
      />
      <p className="text-lg text-gray-600">Price: {selectedCard.price}</p>

      <div className="flex justify-center gap-2">
        <button
          onClick={onNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Next
        </button>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UniqueGiftCard;
