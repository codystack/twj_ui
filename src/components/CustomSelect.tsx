import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

type Option = {
  id: string;
  label: string;
  value: string;
  image?: string;
  displayValue?: string;
};

interface CustomSelectProps {
  options?: Option[];
  defaultSelected?: Option;
  value?: Option;
  onChange?: (selected: Option) => void;
  inputWidth?: string;
  optionsWidth?: string;
  placeholder?: string;
  px?: string;
  py?: string;
  textSize?: string;
  borderColor?: string;
  backgroundColor?: string;
  optionsPx?: string;
  optionsPy?: string;
  showDropdownIcon?: boolean;
  optionsOffsetX?: number;
  readOnly?: boolean;
  displayValue?: boolean;
  optionDisplayValue?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  defaultSelected,
  onChange,
  inputWidth = "w-full",
  optionsWidth,
  placeholder = "",
  px = "px-4",
  py = "py-2",
  textSize = "text-base",
  borderColor = "#8A95BF",
  backgroundColor = "#ffffff",
  optionsPx = "px-4",
  optionsPy = "py-3",
  showDropdownIcon = true,
  optionsOffsetX = 0,
  readOnly = false,
  displayValue = false,
  optionDisplayValue = false,
}) => {
  const [selected, setSelected] = useState<Option | undefined>(
    value || defaultSelected
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Sync internal state with external value
  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative" ref={selectRef}>
      {/* Selected Field */}
      <div
        tabIndex={0}
        onClick={() => {
          if (!readOnly) setIsOpen((prev) => !prev);
        }}
        className={`outline-none ${px} ${py} ${textSize} rounded-md flex justify-between items-center ${inputWidth} ${
          readOnly ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        style={{
          border: isOpen
            ? `2px solid ${borderColor}`
            : `1px solid ${borderColor}`,
          backgroundColor: backgroundColor,
        }}
      >
        {selected ? (
          <>
            <div className="flex items-center gap-2">
              {selected.image && (
                <img
                  src={selected.image}
                  alt={selected.label}
                  className="w-6 h-6 rounded-full ml-1.5 my-1"
                />
              )}
              <span className="font-medium pr-1">{selected.label}</span>
            </div>
            <div className="flex items-center gap-1">
              {selected.displayValue && (
                <span className="text-gray-400 ml-2 text-sm">
                  {displayValue ? selected.displayValue : ""}
                </span>
              )}
              {showDropdownIcon && (
                <FiChevronDown className="text-gray-500 text-base" />
              )}
            </div>
          </>
        ) : (
          <>
            <span className="text-gray-400">{placeholder}</span>
            {showDropdownIcon && (
              <FiChevronDown className="text-gray-500 text-base" />
            )}
          </>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul
          className={`absolute mt-2 bg-white border z-20 rounded-md shadow  max-h-60 overflow-y-auto ${
            optionsWidth || inputWidth
          }`}
          style={{
            border: "1px solid #8A95BF",
            left: `${optionsOffsetX}px`,
          }}
        >
          {options?.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`flex justify-between items-center ${optionsPx} ${optionsPy} hover:bg-[#f5f7fd] cursor-pointer rounded-md mx-2 my-2`}
            >
              <div className="flex items-center gap-1">
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
                  {optionDisplayValue ? option.displayValue : ""}
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

// all the props for this Component

// | Prop              | Type                                      | Description                                                                                                                                 |
// | ----------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
// | `options`         | `Option[]`                                | **(Required)** Array of selectable options. Each option should include `id`, `label`, and `value`; `image` and `displayValue` are optional. |
// | `defaultSelected` | `Option` *(optional)*                     | The option that should be selected by default.                                                                                              |
// | `onChange`        | `(selected: Option) => void` *(optional)* | Callback triggered when a new option is selected.                                                                                           |
// | `inputWidth`      | `string` *(optional)*                     | Tailwind width class for the input field (e.g., `"w-full"`, `"w-[50%]"`).                                                                   |
// | `optionsWidth`    | `string` *(optional)*                     | Tailwind width class for the dropdown list. Defaults to the value of `inputWidth`.                                                          |
// | `placeholder`     | `string` *(optional)*                     | Placeholder text when no option is selected. Defaults to an empty string (`""`).                                                            |
// | `px`              | `string` *(optional)*                     | Tailwind horizontal padding for the input field (e.g., `"px-4"`).                                                                           |
// | `py`              | `string` *(optional)*                     | Tailwind vertical padding for the input field (e.g., `"py-2"`).                                                                             |
// | `textSize`        | `string` *(optional)*                     | Tailwind text size class for the input field (e.g., `"text-base"`, `"text-[15px]"`).                                                        |
// | `borderColor`     | `string` *(optional)*                     | CSS border color for the input field (e.g., `"#3a57e8"` or `"white"`).                                                                      |
// | `backgroundColor` | `string` *(optional)*                     | CSS background color for the input field (e.g., `"#f9f9f9"`, `"rgba(...)"`).                                                                |
// | `optionsPx`       | `string` *(optional)*                     | Tailwind horizontal padding for each dropdown option (e.g., `"px-4"`).                                                                      |
// | `optionsPy`       | `string` *(optional)*                     | Tailwind vertical padding for each dropdown option (e.g., `"py-3"`).                                                                        |
// | `optionsOffsetX`  | `string` *(optional)*                     | Tailwind horizontal offset for each dropdown option (e.g., `"-50%"`).                                                                        |
// | `displayValue`    | `boolean` *(optional)*                    | Whether to display the value of the selected option. Defaults to `false`.                                                                     |
// | `optionDisplayValue`| `boolean` *(optional)*                  | Whether to display the value of the selected option. Defaults to `false`.                                                                     |
