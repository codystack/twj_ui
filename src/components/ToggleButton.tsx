import { useState } from "react";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`w-[50px] h-[25px] flex items-center rounded-full p-[3px] cursor-pointer transition-all duration-300 ${
        isOn ? "bg-[#8003A9]" : "bg-[#D0DAE6]"
      }`}
      onClick={() => setIsOn(!isOn)}
    >
      {/* Knob */}
      <div
        className={`w-[18px] h-[18px] bg-white rounded-full transition-transform duration-300 ${
          isOn ? "translate-x-[24px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;
