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
// import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { BsWhatsapp } from "react-icons/bs";

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
    url: "mailto:hello@twjhub.com",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <FaFacebook />,
    name: "facebook",
    label: "Social Media",
    url: "https://web.facebook.com/twjhub/?_rdc=1&_rdr#",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <FaInstagram />,
    name: "instagram",
    label: "Social Media",
    url: "https://www.instagram.com/twjhub",
    rightIcon: <IoIosArrowForward />,
  },
  {
    icon: <BsWhatsapp />,
    name: "WhatsApp",
    label: "Social Media",
    url: "https://api.whatsapp.com/send/?phone=%2B2348108514863&text=Hello%2C+TWJ+I+would+like+to+reach+out+to+the+support+team.+&type=phone_number&app_absent=0",
    rightIcon: <IoIosArrowForward />,
  },
];

const Help = () => {
  const [activeButton, setActiveButton] = useState("button1");
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3   gap-8 h-full p-4 sm:px-4 px-1">
          {/* Button Column: col-span-1 */}
          <div className="[@media(min-width:850px)]:flex col-span-1  hidden flex-col gap-7">
            {buttons.map((btn) =>
              btn.type === "link" ? (
                <a
                  key={btn.id}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border text-[#27014F] flex items-center gap-2 border-[#D0DAE6] hover:border-[#8003A9]"
                >
                  <span className="text-xl   pl-[1.25rem] pr-[0.5rem]">
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
                  <span className="text-xl  pl-[1.25rem] pr-[0.5rem]">
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </button>
              )
            )}
          </div>

          {/* Mobile Button Column: col-span-1 */}
          <div className="[@media(min-width:850px)]:hidden flex col-span-4  flex-col sm:gap-7 gap-5">
            {buttons.map((btn) =>
              btn.type === "link" ? (
                <a
                  key={btn.id}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border text-[#27014F] flex items-center sm:gap-2 gap-1 border-[#D0DAE6] hover:border-[#8003A9]"
                >
                  <span className="text-xl   pl-[1.25rem] pr-[0.5rem]">
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </a>
              ) : (
                <button
                  key={btn.id}
                  onClick={() => {
                    setActiveButton(btn.id);
                    setShowContactModal(true); // show modal
                  }} // style={{
                  //   borderColor:
                  //     activeButton === btn.id ? "#8003A9" : "#A4A4A4",
                  // }}
                  className="py-[1.5rem] cursor-pointer rounded-[5px] border border-[#D0DAE6]  hover:border-[#8003A9] text-[#27014F] flex items-center gap-2"
                >
                  <span className="text-xl  pl-[1.25rem] pr-[0.5rem]">
                    {btn.icon}
                  </span>
                  <span>{btn.label}</span>
                </button>
              )
            )}
          </div>

          {/* Display Area: spans 3 columns */}
          <div className="col-span-2 border [@media(min-width:850px)]:block hidden border-[#D0DAE6] px-8 py-10 rounded-[10px]">
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
                    className="py-[1rem] cursor-pointer rounded-[5px] justify-between  text-[#27014F] flex items-center gap-2  border-b border-b-[#E2E8F0] last:border-b-0  hover:bg-[#A4A4A4]/10"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl  pl-[2rem] pr-[1.25rem] ">
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
          {/* Mobile Display Area: spans 3 columns */}
          {showContactModal && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center ">
              <div className="bg-white w-full   p-6 h-[min(100dvh,100vh)] max-h-screen shadow-lg relative">
                <div className="w-full mb-4 flex ">
                  <button
                    className=" text-left   cursor-pointer mt-[0.6rem] text-gray-600 text-lg font-bold"
                    onClick={() => setShowContactModal(false)}
                  >
                    <GoArrowLeft className="text-[1.7rem]" />
                  </button>
                </div>

                <h2 className="sm:text-[29px] text-[22px]  font-semibold sm:mb-2 mb-1 text-left">
                  Contact Us
                </h2>
                <div className="text-[16px] text-[#000] text-left">
                  <p className="text-[#7688B4]">
                    You can reach us via the following channels
                  </p>

                  <div className="flex flex-col  gap-4 mt-4">
                    {socialMediaButtons.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-[1rem] cursor-pointer rounded-[5px] justify-between text-[#27014F] flex items-center gap-2 border-b border-b-[#E2E8F0] last:border-b-0 hover:bg-[#A4A4A4]/10"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:pl-[2rem] pl-[0.8rem] pr-[1.25rem] ">
                            {social.icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[#717684]">
                              {social.label}
                            </span>
                            <span>{social.name}</span>
                          </div>
                        </div>
                        <span className="pr-[1.25rem]">{social.rightIcon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
