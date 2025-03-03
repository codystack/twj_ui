import verify from "../../assets/dashboard_img/profile/verification.svg";

import Back from "../../assets/dashboard_img/profile/Back.svg";
import arrowRight from "../../assets/dashboard_img/profile/arrow_rightbtn.svg";
import checkIcon from "../../assets/dashboard_img/profile/Check_fill.svg";
import { NavLink } from "react-router";

const AccountUpgrade = () => {
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="mt-[2%] ml-[2%]">
          <NavLink to="/profile" className="flex text-[#27014F] items-center gap-[7px] ">
            <img src={Back} alt="" />
            <p>Back</p>
         
          </NavLink>

          <h3 className="text-[#27014F] text-[20px] font-[600] mt-[2%] mb-[4%] ">
            UPGRADE ACCOUNT
            </h3>
        </div>
        <div className="flex w-full pl-[2%] gap-[1.5rem] ">
          <div className="relative w-[30%] flex flex-col border border-[#009933] rounded-[10px] px-[1.5rem] py-[2.5rem]">
            <img
              src={checkIcon}
              alt="Check"
              className=" absolute -top-2 -right-2"
            />

            <span className="flex justify-between text-[#27014F] text-[13px]">
              <p>Tier One</p>
              <img src={arrowRight} alt="" />
            </span>

            <p className="text-[#27014F] text-[14px] my-[7%]">
              You have a transfer limit of up <br /> to
              <span className="font-[700] ml-[3px]">&#8358;500,000 </span> per
              day.
            </p>

            <div>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>BVN</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Selfie</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Purpose of Account</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Saction Screening</p>
              </span>
            </div>
          </div>

          <div className="w-[30%] flex flex-col border border-[#D0DAE6] rounded-[10px] px-[1.5rem] py-[2.5rem]">
            <span className="flex justify-between text-[#27014F] text-[13px]">
              <p>Tier Two</p>
              <img src={arrowRight} alt="" />
            </span>

            <p className="text-[#27014F] text-[14px] my-[7%]">
              You have a transfer limit of up <br /> to
              <span className="font-[700] ml-[3px]">&#8358;1,000,000 </span> per
              day.
            </p>

            <div>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>NIN</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Employment Information</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Source of Income</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Expected Monthly Income</p>
              </span>
            </div>
          </div>
          <div className="w-[30%] flex flex-col border border-[#D0DAE6] rounded-[10px] px-[1.5rem] py-[2.5rem]">
            <span className="flex justify-between text-[#27014F] text-[13px]">
              <p>Tier Three</p>
              <img src={arrowRight} alt="" />
            </span>

            <p className="text-[#27014F] text-[14px] my-[7%]">
              You have a transfer limit of up <br /> to
              <span className="font-[700] ml-[3px]">
                &#8358;10,000,000{" "}
              </span>{" "}
              per day.
            </p>

            <div>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>Proof of Address</p>
              </span>
              <span className="flex gap-[4px]">
                <img src={verify} alt="" />
                <p>International Passport</p>
              </span>
            </div>
          </div>
          {/* <div className="h-[1000px] ">Scrollable content goes here...</div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountUpgrade;
