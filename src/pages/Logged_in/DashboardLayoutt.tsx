import { NavLink, useLocation } from "react-router";
import Logo from "../../assets/dashboard_img/Logo.svg";
import Alert from "../../assets/dashboard_img/Bell_pin_light.svg";
// import profileImage from "../../assets/auth_imgs/reset-img.png";
import userIcon from "../../assets/dashboard_img/profile/userIcon.svg";

import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Bills from "./Bills";
import Crypto from "./Crypto";
import Wallet from "./Wallet";
import Sidebar from "./Sidebar";
import Transaction from "./Transaction";
import Profile from "./Profile";
import Rates from "./Rates";
import AccountUpgrade from "./AccountUpgrade";
import Referals from "./Referals";




const DashboardLayoutt = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const location = useLocation(); // Get current path

  const locations = useLocation();
  const pageName = locations.pathname .split("/") 
  .pop() 
  ?.replace(/_/g, " ") 
  .toUpperCase(); 

  let CurrentPage;
  switch (location.pathname) {
    case "/dashboard":
      CurrentPage = <Dashboard />;
      break;
    case "/bills_payment":
      CurrentPage = <Bills />;
      break;
    case "/crypto":
      CurrentPage = <Crypto />;
      break;
    case "/wallet":
      CurrentPage = <Wallet />;
      break;
    case "/transactions":
      CurrentPage = <Transaction />;
      break;
    case "/profile":
      CurrentPage = <Profile />;
      break;
    case "/profile/account_upgrade":
      CurrentPage = <AccountUpgrade />;
      break;
    case "/rates":
      CurrentPage = <Rates />;
      break;
    case "/referrals":
      CurrentPage = <Referals />;
      break;
    default:
      CurrentPage = <Dashboard />; // Default page
  }

  useEffect(() => {
    // Get email and name from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("userName");

    setEmail(storedEmail ?? ""); // Use empty string if null
    setName(storedName ?? "");
  }, []);


  return (
    <nav className="bg-[#F5F5F5] h-full ">
      <div className="flex   w-full bg-[#F5F5F5] z-5 fixed items-center justify-between">
        <NavLink to="/dashboard" className="p-[12px] cursor-pointer ">
          <img src={Logo} alt="logo image" />
        </NavLink>
        <h3 className="text-[#0A2E65] text-[16px] tracking-[2.5px] font-semibold">{pageName}</h3>
        <div className="flex items-center ">
          <div className="bg-[#fff] rounded-[100%] h-[40px] w-[40px] flex items-center justify-center border mr-[1rem] border-[#8003A9]">
            <img src={Alert} alt="" />
          </div>
          <div className=" flex gap-[15px] items-center border border-[#8003A9] mr-[1rem] rounded-r-[50px] rounded-l-[50px] px-[7px] py-[7px]">
            <div>
              <img
                src={userIcon}
                alt="Profile"
                className="w-[40px] h-[40px] object-cover object-top rounded-full"
              />
            </div>
            <div className="mr-[10px]">
              <p className="mb-[-3px] text-[15px] text-[#27014F] font-bold ">
                {name}
              </p>
              <p className="text-[12px] text-[#534D5A]">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] h-screen flex w-full ">
        {/* The left Screen */}
        <div className=" pt-[8%] bg-[#F5F5F5] fixed h-full   w-[20%]">
          {/* Top Section - First 5 Items */}
          <Sidebar />
        </div>
        <div className=" w-[79.5%] ml-[20%]">{CurrentPage}</div>
      </div>
    </nav>
  );
};

export default DashboardLayoutt;
