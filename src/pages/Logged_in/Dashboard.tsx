import { NavLink, Outlet } from "react-router";
import DashboardIcon from "../../assets//dashboard_img/Home_fill.svg";
// import Bills from "../../assets//dashboard_img/Paper_fill.svg";
// import GiftCards from "../../assets//dashboard_img/gift_cards.svg";
// import Crypto from "../../assets//dashboard_img/Crypto.svg";
// import Wallet from "../../assets//dashboard_img/Wallet_alt_fill.svg";
// import Transaction from "../../assets//dashboard_img/Transactiont_fill.svg";
// import Profile from "../../assets//dashboard_img/User_alt_fill.svg";
// import Rate from "../../assets//dashboard_img/Rate_fill.svg";
// import Help from "../../assets//dashboard_img/Chat_alt_2_duotone_line.svg";
// import Log_out from "../../assets//dashboard_img/Sign_out_circle_duotone_line.svg";
import Logo from "../../assets/dashboard_img/Logo.svg";
import Alert from "../../assets/dashboard_img/Bell_pin_light.svg";
import profileImage from "../../assets/auth_imgs/reset-img.png";

// const img = [
//   // { name: "Dashboard", path: "/dashboard/home", icon: DashboardIcon },
//   { name: "Bills Payments", path: "/dashboard/bills", icon: Bills },
//   { name: "Gift Cards", path: "/dashboard/gift_cards", icon: GiftCards },
//   { name: "Crypto", path: "/dashboard/crypto", icon: Crypto },
//   { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
//   { name: "Transactions", path: "/dashboard/transaction", icon: Transaction },
//   { name: "Profile", path: "/dashboard/profile", icon: Profile },
//   { name: "Rates", path: "/dashboard/rate", icon: Rate },
//   { name: "Help", path: "/dashboard/help", icon: Help },
//   { name: "Log Out", path: "/some/part", icon: Log_out },
// ];

const Dashboard = () => {
  return (
    <nav className="bg-[#F5F5F5] h-[calc(100vh-1px)] ">
      <div className="flex border w-full bg-[#F5F5F5] z-[999] fixed items-center justify-between">
        <NavLink to="/dashboard/dashboard" className="p-[12px] cursor-pointer -[10px]">
          <img src={Logo} alt="" />
        </NavLink>
        <div className="flex items-center ">
          <div className="bg-[#fff] rounded-[100%] h-[40px] w-[40px] flex items-center justify-center border mr-[1rem] border-[#8003A9]">
            <img src={Alert} alt="" />
          </div>
          <div className=" flex gap-[15px] items-center border border-[#8003A9] mr-[1rem] rounded-r-[50px] rounded-l-[50px] px-[7px] py-[7px]">
            <div>
              <img
                src={profileImage}
                alt="Profile"
                className="w-[40px] h-[40px] object-cover object-top rounded-full"
              />
            </div>
            <div className="mr-[10px]">
              <p className="mb-[-3px] text-[15px] text-[#27014F] font-bold ">
                Name
              </p>
              <p className="text-[12px] text-[#534D5A]">edcsdail@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex w-[100vw]">
        {/* The left Screen */}
        <div className=" pt-[8rem] bg-[#F5F5F5]  fixed h-[calc(100vh-1px)]  flex flex-col justify-between border w-[250px]">
          {/* Top Section - First 5 Items */}
          <div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  />
                  Dashboard
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="/dashboard/bills"
                  className={({ isActive }) =>
                    `flex items-center gap- ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6 "
                  />{" "}
                  Bills
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  {/* <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  /> */}
                  Dashboard
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  {/* <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  /> */}
                  Dashboard
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  {/* <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  /> */}
                  Dashboard
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  {/* <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  /> */}
                  Dashboard
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink
                  to="dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive ? "text-blue-500" : "text-gray-700"
                    }`
                  }
                >
                  <img
                    src={DashboardIcon}
                    alt="DashboardIcon"
                    className="w-6 h-6"
                  />
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Bottom Section - Last 5 Items */}
          {/* <div>
            <ul className="flex flex-col gap-4">
              {navLinks.slice(8).map((link) => (
                <li key={link.name} className="flex items-center gap-2">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 ${
                        isActive ? "text-blue-500" : "text-gray-700"
                      }`
                    }
                  >
                    <img src={link.icon} alt={link.name} className="w-6 h-6" />
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        {/* The right screen(Chilren route to dashboard) */}
          <Outlet />
 
        {/* <div className="ml-[250px]  flex-1 p-4">
          <Outlet />
       </div> */}
      </div>
    </nav>
  );
};

export default Dashboard;
