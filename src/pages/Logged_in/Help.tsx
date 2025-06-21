import { useState } from "react";
import {
  FaQuran,
  FaCog,
  FaHeadset,
  FaMoneyCheckAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
// const contentMap: Record<string, string> = {
//   button1: "This is content for Button 1",
//   button2: "This is content for Button 2",
//   button3: "This is content for Button 3",
//   // button4: "This is content for Button 4",
// };

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

const socialMediaButtons = [
  {
    icon: <AiTwotoneMail />,
    name: "hello@twjhub.com",
    label: "Email Address",
    url: "mailto:your_email@example.com",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <FaFacebook />,
    name: "facebook",
    label: "Social Media",
    url: "https://facebook.com/your_profile",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <FaInstagram />,
    name: "instagram",
    label: "Social Media",
    url: "https://instagram.com/your_profile",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <FaXTwitter />,
    name: "Twitter (X)",
    label: "Social Media",
    url: "https://twitter.com/your_profile",
    rightIcon: <IoIosArrowForward />,
  },
];

const Help = () => {
  const [activeButton, setActiveButton] = useState("button1");

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3   gap-8 h-full p-4">
          {/* Button Column: col-span-1 */}
          <div className="col-span-1 flex flex-col gap-7">
            {buttons.map((btn) =>
              btn.type === "link" ? (
                <a
                  key={btn.id}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border text-[#27014F] flex items-center gap-2 border-[#D0DAE6] hover:border-[#8003A9]"
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
          <div className="col-span-2 border border-[#D0DAE6] px-8 py-10 rounded-[10px] shadow">
            <h2 className="text-[29px] font-semibold mb-2 text-left">
              Contact Us
            </h2>
            <div className="text-[16px] text-[#000] text-left">
              <p className="text-[#7688B4]">
                You can reach us via the following channels
              </p>
              {/* <p>{contentMap[activeButton]}</p> */}

              <div className="flex flex-col gap-4 mt-4">
                {socialMediaButtons.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-[1rem] cursor-pointer rounded-[5px] justify-between  text-[#27014F] flex items-center gap-2 bg-[#A4A4A4]/10  hover:bg-[#A4A4A4]/20"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-[#000] pl-[2rem] pr-[1.25rem] ">
                        {social.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[#717684]">{social.label}</span>
                        <span>{social.name}</span>
                      </div>
                    </div>
                    <span className="pr-[1.25rem]"> {social.rightIcon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
