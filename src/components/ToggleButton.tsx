  import React from "react";

  interface ToggleButtonProps {
    isOn: boolean;
    onToggle: () => void;
  }

  const ToggleButton: React.FC<ToggleButtonProps> = ({ isOn, onToggle }) => {
    return (
      <div
        className={`w-[53px] h-auto flex items-center rounded-full p-[4px] px-[5px] cursor-pointer transition-all duration-300 ${
          isOn ? "bg-[#8003A9]" : "bg-[#D0DAE6]"
        }`}
        onClick={onToggle}
      >
        {/* Knob */}
        <div
          className={`w-[18px] h-[18px] bg-white rounded-full nx-1 transition-transform duration-300 ${
            isOn ? "translate-x-[24px]" : "translate-x-0"
          }`}
        ></div>
      </div>
    );
  };

  export default ToggleButton;
