import { useState } from "react";
import { FaQuran, FaCog, FaHeadset, FaMoneyCheckAlt } from "react-icons/fa";

const contentMap: Record<string, string> = {
  button1: "This is content for Button 1",
  button2: "This is content for Button 2",
  button3: "This is content for Button 3",
  // button4: "This is content for Button 4",
};

const buttons = [
  { id: "button1", label: "Contact Us", icon: <FaHeadset /> },
  {
    id: "button2",
    label: "FAQs",
    icon: <FaQuran />,
    type: "link",
    href: "https://twjhub.com/faq",
  },
  {
    id: "button3",
    label: "Terms & Conditions",
    icon: <FaCog />,
    type: "link",
    href: "https://twjhub.com/terms",
  },
  {
    id: "button4",
    label: "Anti-money Laundering",
    icon: <FaMoneyCheckAlt />,
    type: "link",
    href: "https://twjhub.com/aml",
  },
  // { id: "button4", label: "Support", icon: <FaTools /> },
];

const Help = () => {
  const [activeButton, setActiveButton] = useState("button1");

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3   gap-4 h-full p-4">
          {/* Button Column: col-span-1 */}
          <div className="col-span-1 flex flex-col gap-7">
            {buttons.map((btn) =>
              btn.type === "link" ? (
                <a
                  key={btn.id}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border text-[#27014F] flex items-center gap-2 border-[#A4A4A4] hover:border-[#8003A9]"
                >
                  <span className="text-xl text-[#000] pl-[1.25rem] pr-[0.5rem]">
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </a>
              ) : (
                <button
                  key={btn.id}
                  onClick={() => setActiveButton(btn.id)}
                  style={{
                    borderColor:
                      activeButton === btn.id ? "#8003A9" : "#A4A4A4",
                  }}
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border text-[#27014F] flex items-center gap-2"
                >
                  <span className="text-xl text-[#000] pl-[1.25rem] pr-[0.5rem]">
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </button>
              )
            )}
          </div>

          {/* Display Area: spans 3 columns */}
          <div className="col-span-2 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Display Area</h2>
            <p>{contentMap[activeButton]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
