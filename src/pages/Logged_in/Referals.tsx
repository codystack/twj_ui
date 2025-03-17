import Referal from "../../assets/dashboard_img/profile/giftbox-referal.svg";
import Copy from "../../assets/dashboard_img/profile/Copy_ref.svg";
import { useState } from "react";
import eye_lines from "../../assets/dashboard_img/Eye_hide_dark.svg";
import eye from "../../assets/dashboard_img/Eye_opne_dark.svg";

type Ref = {
  id: string;
  name: string;
  date: string;
  status: string;
};
// const ref: Ref[] = [
//   { id: "1", name: "ertyuioipo", status: "Pending", date: "2024-03-01" },
//   { id: "2", name: "iuytretytui", status: "Successfull", date: "2024-03-01" },

// ];

const ref: Ref[] = [
  { id: "1", name: "John Doe", status: "Pending", date: "2024-03-01" },
  { id: "2", name: "Jane Smith", status: "Successful", date: "2024-03-02" },
  { id: "3", name: "Michael Brown", status: "Failed", date: "2024-03-03" },
  { id: "4", name: "Sarah Johnson", status: "Successful", date: "2024-03-04" },
  { id: "5", name: "David Wilson", status: "Pending", date: "2024-03-05" },
  { id: "6", name: "Emily Davis", status: "Failed", date: "2024-03-06" },
  { id: "7", name: "Daniel White", status: "Successful", date: "2024-03-07" },
  { id: "8", name: "Jessica Martin", status: "Pending", date: "2024-03-08" },
  { id: "9", name: "Chris Taylor", status: "Successful", date: "2024-03-09" },
  { id: "10", name: "Sophia Anderson", status: "Failed", date: "2024-03-10" },
];

const Referals = () => {
  const [copied, setCopied] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden((prev) => !prev);
  };

  const textToCopy = "https://twjhub.com/sign-up-ref/uw78721567";

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div className="w-full z-10 overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className=" flex p-[1rem] gap-[2rem]">
          <div className=" flex flex-col gap-[2rem]  w-[40%] ">
            <div className="w-full border  border-[#D0DAE6] relative h-[179px] bg-[#F5F5F5] rounded-[10px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-[#fff]">
                <p className="text-[15px] text-[#27014F] leading-[rem]">
                  Referral bonus
                </p>
                <div className=" relative flex items-center gap-2">
                  <span className=" mb-[8px] mr-[-5px] text-[#0A2E65]/60 left-[-0.8rem] bottom-[1rem] text-[16px]">
                    {isHidden ? "" : " ₦"}
                  </span>
                  <p className="text-[32px] text-[#27014F] font-semibold">
                    {isHidden ? "*******" : "20,500"}
                  </p>
                  <span className="text-[16px] text-[#7688B4] ml-[-8px] mt-[0.8rem] ">
                    {isHidden ? "" : ".00"}
                  </span>
                  <button
                    onClick={toggleVisibility}
                    className=" ml-[rem] cursor-pointer "
                  >
                    {isHidden ? (
                      <img
                        src={eye_lines}
                        className=" top-[1.5px]  left-[px]"
                        alt=""
                      />
                    ) : (
                      <img src={eye} className="w-full h-full" alt="" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="h-fit border rounded-[10px] p-[2rem]  border-[#D0DAE6]">
              <div className="flex flex-col items-center gap[2rem]">
                <img className="w-[8rem]" src={Referal} alt="" />
                <h5 className="text-[#27014F] text-[20px] font-[600] py-[0.2rem]">
                  Get fee waivers
                </h5>
                <p className="text-center text-[14px] text-[#0A2E65]/60">
                  Enjoy zero fees on transactions when your friends signup, with
                  your referal code.
                </p>
                <div className="relative z-0">
                  <div className="border z-[-1] mt-[1rem] border-[#8A95BF] h-[3rem] rounded-[5px] pl-[8px] flex px-0 items-center">
                    <span className="w-[85%] text-[#0A2E65]/60   text-[15px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {textToCopy}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="bg-[#8003A9] rounded-tr-[5px] rounded-r-[5px] w-[15%] cursor-pointer h-full p-[10px]"
                    >
                      <img src={Copy} alt="" />
                    </button>
                  </div>

                  {/* Copied text message */}
                  {copied && (
                    <span className="  bg-[#32A071]/20 text-[#32A071] absolute top-[3.2rem] right-0  px-2 py-1 text-[15px] rounded-md opacity-100 transition-opacity duration-1000 ease-in-out">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border w-[60%] rounded-[10px] h-fit border-[#D0DAE6]">
            <ul className="space-y-3 p-[2rem]">
              {ref.map((ref) => (
                <li
                  key={ref.id}
                  className="flex justify-between items-center border-b border-b-[#E2E8F0] pb-6 last:border-b-0"
                >
                  {/* Left side: Status + Name */}
                  <div className="flex items-center gap-2">
                    <span className="text-[#27014F] text-[16px] font-[600]">
                      {ref.name}
                    </span>
                    {/* Unique Status Icon */}
                    {ref.status === "Successful" && (
                      <div className="bg-[#32A071]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#32A071]">
                        SUCCESSFULL
                      </div>
                    )}
                    {ref.status === "Pending" && (
                      <div className="bg-[#FFB700]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FFB700]">
                        PENDING
                      </div>
                    )}
                    {ref.status === "Failed" && (
                      <div className="bg-[#FF3366]/20 px-[5px] py-[1px] rounded-[2px] text-[8px] text-[#FF3366]">
                        FAILED
                      </div>
                    )}
                  </div>

                  {/* Right side: Date */}
                  <span className="text-[#343E65] text-[13px]">{ref.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referals;
