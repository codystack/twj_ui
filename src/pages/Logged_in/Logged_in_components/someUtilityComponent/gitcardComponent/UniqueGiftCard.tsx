
type ModalProps = {
    onNext: () => void;
    onBack: () => void;
    onClose: () => void;
  };

  
const UniqueGiftCard = ({ onNext, onBack, onClose }: ModalProps) => {
  return (
    <div className="text-center space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">Unique Gift Cards</h2>
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
  )
}

export default UniqueGiftCard