import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Option = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

interface CustomSelectProps {
  options: Option[];
  defaultSelected?: Option;
  onChange?: (selected: Option) => void;
  inputWidth?: string;
  optionsWidth?: string;
  placeholder?: string;
  px?: string; 
  py?: string; 
  textSize?: string; 
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultSelected,
  onChange,
  inputWidth = "w-full",
  optionsWidth,
  placeholder = "Select an option",
  px = "px-4",
  py = "py-2",
  textSize = "text-base",
}) => {
  const [selected, setSelected] = useState<Option | undefined>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative">
      {/* Selected Field */}
      <div
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`outline-none ${px} ${py} ${textSize} rounded-md flex justify-between items-center cursor-pointer bg-white ${inputWidth}`}
        style={{
          border: isOpen ? "2px solid #8A95BF" : "1px solid #8A95BF",
        }}
      >
        {selected ? (
          <>
            <div className="flex items-center gap-2">
              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.label}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span className="font-medium">{selected.label}</span>
            </div>
            <div className="flex items-center gap-1">
              {selected.displayValue && (
                <span className="text-gray-400 text-sm">
                  {selected.displayValue}
                </span>
              )}
              <FiChevronDown className="text-gray-500 text-base" />
            </div>
          </>
        ) : (
          <>
            <span className="text-gray-400">{placeholder}</span>
            <FiChevronDown className="text-gray-500 text-base" />
          </>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className={`absolute mt-2 bg-white border rounded-md shadow z-10 max-h-60 overflow-y-auto ${
            optionsWidth || inputWidth
          }`}
          style={{ border: "1px solid #8A95BF" }}
        >
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="flex justify-between items-center px-4 py-3 hover:bg-[#f5f7fd] cursor-pointer rounded-md mx-2 my-2"
            >
              <div className="flex items-center gap-2">
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <span>{option.label}</span>
              </div>
              {option.displayValue && (
                <span className="text-gray-400 text-sm">
                  {option.displayValue}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;

// use case for this
{
  // <CustomSelect
  //   options={options}
  //   defaultSelected={options[0]}
  //   inputWidth="w-64"
  //   optionsWidth="w-80"
  //   onChange={(selected) => {
  //     console.log("Send this value to backend:", selected.value);
  //    }}
  //  />
}

// <CustomSelect
//   options={options}
//   placeholder="Choose a coin"
//   inputWidth="w-64"
//   optionsWidth="w-80"
//   onChange={(selected) => {
//     console.log("Backend value:", selected.value);
//   }}
// />
