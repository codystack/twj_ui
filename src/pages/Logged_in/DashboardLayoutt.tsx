import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "../../assets/dashboard_img/Logo.svg";
import Alert from "../../assets/dashboard_img/Bell_pin_light.svg";
import userIcon from "../../assets/dashboard_img/profile/userIcon.svg";
import { useEffect, useState, useRef } from "react";

import Dashboard from "./Dashboard";
// import Bills from "./Bills";
// import Crypto from "./Crypto";
import Wallet from "./Wallet";
// import Sidebar from "./Sidebar";
import Transaction from "./Transaction";
import Profile from "./Profile";
// import Rates from "./Rates";
import AccountUpgrade from "./AccountUpgrade";
import Referals from "./Referals";
import LogoutModal from "../../modals/LogoutModal";
import { useAuthStore } from "../../store/authStore";
import { useUserStore } from "../../store/useUserStore";
import MobileNav from "../../modals/MobileNav";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Help from "./Help";
import BuyCrypto from "./crpto/BuyCrypto";
import SellCrypto from "./crpto/SellCrypto";
import SwapCrypto from "./crpto/SwapCrypto";
import Crypto from "./Crypto";
import SetPinModal from "./Logged_in_components/someUtilityComponent/SetPinModal";
import SuccessModal from "./SuccessModal";
import { useModalStore } from "../../store/modalStore";

const DashboardLayoutt = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { isSuccessModalStore, setDataSuccessModal } = useModalStore();

  const [showSetPinModal, setShowSetPinModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // If clicked outside both modal and button, close it
      if (
        showProfile &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const { user } = useUserStore();
  const passcodeSet = useUserStore((state) => state.user?.passcodeSet);
  // const kysSet = useUserStore((state) => state.user?.kycSet);

  useEffect(() => {
    if (!passcodeSet) {
      setShowSetPinModal(true);
    }

    // const kycS = false;
    // if (!kycS) {
    //   setShowKycModal(true);
    // }

    // const kycComplete = localStorage.getItem("kycComplete");
    // if (kycComplete !== "true" && location.pathname === "/dashboard") {
    //   setShowKycModal(true);
    // }
  }, [passcodeSet]);
  // Get logout function from store
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const location = useLocation();
  const rawPageName = location.pathname.split("/").pop() || "";

  // Capitalize and insert space before 'crypto' if present
  const pageName = rawPageName
    .replace(/_/g, " ")
    .replace(/crypto$/i, " Crypto")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toUpperCase();

  let CurrentPage;
  switch (location.pathname) {
    case "/dashboard":
      CurrentPage = <Dashboard />;
      break;
    case "/crypto":
      CurrentPage = <Crypto />;
      break;
    case "/crypto/buycrypto":
      CurrentPage = <BuyCrypto />;
      break;
    case "/crypto/sellcrypto":
      CurrentPage = <SellCrypto />;
      break;
    case "/crypto/swapcrypto":
      CurrentPage = <SwapCrypto />;
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
    case "/support":
      CurrentPage = <Help />;
      break;
    case "/referrals":
      CurrentPage = <Referals />;
      break;
    default:
      CurrentPage = <Dashboard />;
  }

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(`${user.firstName ?? name} ${user.lastName ?? ""}`);
    }
  }, [user]);

  useEffect(() => {
    // Get email and name from localStorage
    const storedEmail = localStorage.getItem("email");
    const storedName = localStorage.getItem("userName");

    setEmail(storedEmail ?? ""); // Use empty string if null
    setName(storedName ?? "");
  }, []);

  return (
    <>
      <nav className=" h-full ">
        <div className="flex   w-full bg-[#F5F5F5]  z-5  fixed items-center justify-between">
          <NavLink
            to="/dashboard"
            className=" [@media(min-width:1350px)]:block hidden p-[12px] cursor-pointer "
          >
            <img src={Logo} alt="logo image" />
          </NavLink>

          {/* Hand burger menu here */}
          <button
            type="button"
            className="relative  md:ml-[1.5rem] ml-2  cursor-pointer [@media(min-width:1350px)]:hidden flex flex-col justify-center items-center gap-[6px] p-2 z-[999]"
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls="site-nav"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <div
              className={`bg-[#27014F] w-[25px] h-[2px] rounded transition-all duration-300 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]
          ${isOpen ? "rotate-45 translate-y-[8px]" : "rotate-0 translate-y-0"}`}
            ></div>
            <div
              className={`bg-[#27014F] w-[25px] h-[2px] rounded transition-all duration-300 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]
          ${isOpen ? "opacity-0" : "opacity-100"}`}
            ></div>
            <div
              className={`bg-[#27014F] w-[25px] h-[2px] rounded transition-all duration-300 ease-[cubic-bezier(0.455,0.03,0.515,0.955)]
          ${
            isOpen ? "-rotate-45 -translate-y-[8px]" : "rotate-0 translate-y-0"
          }`}
            ></div>
          </button>

          <h3 className="text-[#0A2E65] md:text-[16px] text-[14px] md:tracking-[2px] tracking-[2px] font-semibold">
            {pageName}
          </h3>
          <div className="flex items-center ">
            <div className="bg-[#fff] rounded-[100%] md:h-[40px] md:w-[40px] h-[35px] w-[35px] flex items-center justify-center border md:mr-[1rem] mr-[0.5rem]  border-[#8003A9]">
              <img src={Alert} alt="" />
            </div>
            <div className=" md:flex hidden  md:gap-[15px] items-center border border-[#8003A9]  md:mr-[1rem] mr-2 rounded-r-[50px] [@media(min-width:1350px)]:my-0 my-2  rounded-l-[50px] md:p-[7px] p-[4px] ">
              <div>
                <img
                  src={userIcon}
                  alt="Profile"
                  className="md:w-[40px] md:h-[40px] h-[30px] w-[30px] object-cover object-top rounded-full"
                />
              </div>
              <div className="md:mr-[10px]">
                <p className="mb-[-3px] hidden md:block text-[15px] text-[#27014F] font-bold ">
                  {typeof name === "string" && name.trim().length > 0 ? (
                    name
                  ) : (
                    <Skeleton width={150} height={15} />
                  )}
                </p>

                <p className="text-[12px] hidden md:block text-[#534D5A]">
                  {email || <Skeleton width={150} height={10} />}
                </p>
              </div>
            </div>

            {/* Mobile button for profile */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={() => setShowProfile((prev) => !prev)}
                className=" cursor-pointer md:hidden flex md:gap-[15px] items-center border border-[#8003A9]  md:mr-[1rem] mr-4 rounded-r-[50px] [@media(min-width:1350px)]:my-0 my-2  rounded-l-[50px] md:p-[7px] p-[4px] "
              >
                <div>
                  <img
                    src={userIcon}
                    alt="Profile"
                    className="md:w-[40px] md:h-[40px] h-[30px] w-[30px] object-cover object-top rounded-full"
                  />
                </div>
              </button>

              {showProfile && (
                <div
                  ref={modalRef}
                  className="absolute top-16 right-3 w-[260px]  rounded-xl bg-white border border-[#8003A9] shadow-xl p-5 z-50"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-[#27014F]">
                      {name}
                    </h2>
                    <p className="text-sm text-[#534D5A]">{email}</p>
                  </div>

                  {/* Divider */}
                  <hr className="border-t border-[#E0CCE9] my-3" />

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <a
                      href="#"
                      className="text-[15px] text-[#27014F] hover:text-[#8003A9] transition-colors duration-200"
                    >
                      Help
                    </a>
                    <button
                      onClick={() => logout(navigate)}
                      className="text-[15px] text-left text-[#27014F] hover:text-[#8003A9] transition-colors duration-200"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="[@media(min-width:1350px)]:bg-[#F5F5F5] h-screen flex w-full ">
          {/* The left Screen */}
          <div className="[@media(min-width:1350px)]:block hidden  pt-[8%]  bg-[#F5F5F5]   fixed h-full   w-[20%]">
            {/* Top Section - First 5 Items */}

            {/* <Sidebar /> */}
            <div className=" flex-col h-full [@media(min-width:1350px)]:flex z-0 hidden justify-between">
              <ul className="flex flex-col gap-[0.3rem] ">
                <li className="flex items-center gap-2">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center w-[68%] gap-2 transition-colors rounded-r-[50px] duration-100 py-[12px]  pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-6 h-6  ${
                            isActive ? "#fff" : "text-[#2014F]"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z"
                          />
                        </svg>
                        Dashboard
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="flex items-center gap-2">
                  <NavLink
                    to="/wallet"
                    className={({ isActive }) =>
                      `flex items-center w-[68%] gap-2 transition-colors rounded-r-[50px] duration-100 py-[12px] pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.87868 3.87868C2 4.75736 2 6.17157 2 9V15C2 17.8284 2 19.2426 2.87868 20.1213C3.75736 21 5.17157 21 8 21H18C18.93 21 19.395 21 19.7765 20.8978C20.8117 20.6204 21.6204 19.8117 21.8978 18.7765C22 18.395 22 17.93 22 17H16C14.3431 17 13 15.6569 13 14C13 12.3431 14.3431 11 16 11H22V9C22 6.17157 22 4.75736 21.1213 3.87868C20.2426 3 18.8284 3 16 3H8C5.17157 3 3.75736 3 2.87868 3.87868ZM7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H7Z"
                            fill="currentColor"
                          />
                          <path
                            d="M17 14H16"
                            stroke="#27014F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className={`w-6 h-6  ${
                              isActive ? "#fff" : "text-[#2014F]"
                            }`}
                          />
                        </svg>
                        Wallet
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="flex items-center gap-2">
                  <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                      `flex items-center  gap-2 transition-colors rounded-r-[50px] w-[73%] duration-100 py-[12px] pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V7Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18 10H12.6569C11.8394 10 11.4306 10 11.0631 9.84776C10.6955 9.69552 10.4065 9.40649 9.82843 8.82843L9.82843 8.82843L9.17157 8.17157C8.59351 7.59351 8.30448 7.30448 7.93694 7.15224C7.5694 7 7.16065 7 6.34315 7H3V17C3 18.8856 3 19.8284 3.58579 20.4142C4.17157 21 5.11438 21 7 21H17C18.8856 21 19.8284 21 20.4142 20.4142C21 19.8284 21 18.8856 21 17V7C21 7.93188 21 8.39782 20.8478 8.76537C20.6448 9.25542 20.2554 9.64477 19.7654 9.84776C19.3978 10 18.9319 10 18 10ZM7 15C6.44772 15 6 15.4477 6 16C6 16.5523 6.44772 17 7 17H15C15.5523 17 16 16.5523 16 16C16 15.4477 15.5523 15 15 15H7Z"
                            fill="currentColor"
                            className={`w-6 h-6  ${
                              isActive ? "#fff" : "text-[#2014F]"
                            }`}
                          />
                        </svg>
                        Transactions
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="flex items-center gap-2">
                  <NavLink
                    to="/referrals"
                    className={({ isActive }) =>
                      `flex items-center  gap-2 transition-colors rounded-r-[50px] w-[68%] duration-100 py-[12px] pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9 6.31592H2C1.05719 6.31592 0.585786 6.31592 0.292893 6.60881C0 6.9017 0 7.37311 0 8.31592V9.57908C0 10.5219 0 10.9933 0.292893 11.2862C0.585786 11.5791 1.05719 11.5791 2 11.5791H3.33333V11.6314H9V6.31592ZM3.33333 13.6314V18.0001C3.33333 18.9429 3.33333 19.4143 3.62623 19.7072C3.91912 20.0001 4.39052 20.0001 5.33333 20.0001H9V13.6314H3.33333ZM11 20.0001H14.6667C15.6095 20.0001 16.0809 20.0001 16.3738 19.7072C16.6667 19.4143 16.6667 18.9429 16.6667 18.0001V13.6314H11V20.0001ZM16.6667 11.6314V11.5791H18C18.9428 11.5791 19.4142 11.5791 19.7071 11.2862C20 10.9933 20 10.5219 20 9.57908V8.31592C20 7.37311 20 6.9017 19.7071 6.60881C19.4142 6.31592 18.9428 6.31592 18 6.31592H11V11.6314H16.6667Z"
                            fill="currentColor"
                          />
                          <path
                            d="M14.7382 5.17032L16.3799 4.65192C17.2119 4.38916 17.7776 3.60857 17.7776 2.73601C17.7776 1.38875 16.4688 0.41331 15.1841 0.819011C13.6005 1.3191 12.1512 2.17241 10.9456 3.31454L9.99981 4.21053V5.26316H14.136C14.3403 5.26316 14.5434 5.23185 14.7382 5.17032Z"
                            fill="currentColor"
                          />
                          <path
                            d="M5.26177 5.17032L3.62015 4.65192C2.78809 4.38916 2.22241 3.60857 2.22241 2.73601C2.22241 1.38875 3.53123 0.41331 4.81595 0.819011C6.39955 1.3191 7.84885 2.17241 9.05443 3.31454L10.0002 4.21053V5.26316H5.86403C5.65971 5.26316 5.4566 5.23185 5.26177 5.17032Z"
                            fill="currentColor"
                            className={`w-6 h-6  ${
                              isActive ? "#fff" : "text-[#2014F]"
                            }`}
                          />
                        </svg>
                        Referrals
                      </>
                    )}
                  </NavLink>
                </li>

                <li className="flex items-center gap-2">
                  <a
                    href="http://rates.twjhub.com"
                    target="_blank"
                    className="flex items-center w-[70%] gap-2 transition-colors  duration-100 py-[10px]    rounded-r-[50px] pl-[1.7rem]  text-[#27014F]"
                  >
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.87868 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16V8C22 5.17157 22 3.75736 21.1213 2.87868C20.2426 2 18.8284 2 16 2H8C5.17157 2 3.75736 2 2.87868 2.87868ZM17.8321 9.5547C18.1384 9.09517 18.0142 8.4743 17.5547 8.16795C17.0952 7.8616 16.4743 7.98577 16.1679 8.4453L13.1238 13.0115L12.6651 12.094C11.9783 10.7205 10.0639 10.6013 9.2121 11.8791L6.16795 16.4453C5.8616 16.9048 5.98577 17.5257 6.4453 17.8321C6.90483 18.1384 7.5257 18.0142 7.83205 17.5547L10.8762 12.9885L11.3349 13.906C12.0217 15.2795 13.9361 15.3987 14.7879 14.1209L17.8321 9.5547Z"
                          fill="currentColor"
                          className="w-6 h-6 text-[#2014F]"
                        />
                      </svg>
                      Rates
                    </>
                  </a>
                </li>

                <li className="flex items-center gap-2">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center w-[68%] gap-2 transition-colors rounded-r-[50px] duration-100 py-[12px]  pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="8" r="4" fill="#currentColor" />
                          <path
                            d="M5.33788 17.3206C5.99897 14.5269 8.77173 13 11.6426 13H12.3574C15.2283 13 18.001 14.5269 18.6621 17.3206C18.79 17.8611 18.8917 18.4268 18.9489 19.0016C19.0036 19.5512 18.5523 20 18 20H6C5.44772 20 4.99642 19.5512 5.0511 19.0016C5.1083 18.4268 5.20997 17.8611 5.33788 17.3206Z"
                            fill="currentColor"
                            className={`w-6 h-6  ${
                              isActive ? "#fff" : "text-[#2014F]"
                            }`}
                          />
                        </svg>
                        Profile
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>

              <ul className="mb-[15%] flex flex-col gap-2">
                <li className="flex items-center  ">
                  <NavLink
                    to="/support"
                    className={({ isActive }) =>
                      `flex items-center w-[68%] gap-2 transition-colors rounded-r-[50px] duration-100 py-[12px]  pl-[1.7rem] ${
                        isActive
                          ? "white bg-[#8003A9] rounded-r-[50px] pr-[30px] text-[#fff]"
                          : "text-[#27014F]"
                      }`
                    }
                  >
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path
                          d="M19.3259 5.77772C20 6.78661 20 8.19108 20 11C20 13.8089 20 15.2134 19.3259 16.2223C19.034 16.659 18.659 17.034 18.2223 17.3259C17.3409 17.9148 16.1577 17.9892 14 17.9986V18L12.8944 20.2111C12.5259 20.9482 11.4741 20.9482 11.1056 20.2111L10 18V17.9986C7.8423 17.9892 6.65907 17.9148 5.77772 17.3259C5.34096 17.034 4.96596 16.659 4.67412 16.2223C4 15.2134 4 13.8089 4 11C4 8.19108 4 6.78661 4.67412 5.77772C4.96596 5.34096 5.34096 4.96596 5.77772 4.67412C6.78661 4 8.19108 4 11 4H13C15.8089 4 17.2134 4 18.2223 4.67412C18.659 4.96596 19.034 5.34096 19.3259 5.77772Z"
                          fill="currentColor"
                          fillOpacity="0.25"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 9L15 9"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 13H12"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Help
                    </>
                  </NavLink>
                </li>
                <li className="flex  items-center gap-2">
                  <div className="relative">
                    <div
                      onClick={() => {
                        // /console.log("Button clicked"); // Debugging
                        setIsModalOpen(true);
                      }}
                      className=" flex cursor-pointer  pl-[1.7rem] pb-[10px] justify-center gap-2 text-[#27014F] "
                    >
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <ellipse
                            cx="6"
                            cy="6"
                            rx="6"
                            ry="6"
                            transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 21 18)"
                            fill="#7E869E"
                            fillOpacity="0.25"
                          />
                          <path
                            d="M8.7 12C8.7 8.52061 11.5206 5.7 15 5.7C18.4794 5.7 21.3 8.52061 21.3 12C21.3 15.4794 18.4794 18.3 15 18.3C11.5206 18.3 8.7 15.4794 8.7 12Z"
                            stroke="#7E869E"
                            strokeOpacity="0.25"
                            strokeWidth="0.6"
                          />
                          <path
                            d="M9 18.9282C10.2162 19.6303 11.5957 20 13 20C14.4043 20 15.7838 19.6303 17 18.9282C18.2162 18.2261 19.2261 17.2162 19.9282 16C20.6303 14.7838 21 13.4043 21 12C21 10.5957 20.6303 9.21615 19.9282 8C19.2261 6.78385 18.2162 5.77394 17 5.0718C15.7838 4.36965 14.4043 4 13 4C11.5957 4 10.2162 4.36965 9 5.0718"
                            stroke="#27014F"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M3 12L2.41435 11.5315L2.03953 12L2.41435 12.4685L3 12ZM12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25V12.75ZM6.41435 6.53148L2.41435 11.5315L3.58565 12.4685L7.58565 7.46852L6.41435 6.53148ZM2.41435 12.4685L6.41435 17.4685L7.58565 16.5315L3.58565 11.5315L2.41435 12.4685ZM3 12.75H12V11.25H3V12.75Z"
                            fill="#27014F"
                          />
                        </svg>
                        Log Out
                      </>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className=" [@media(min-width:1350px)]:w-[79.5%] w-full  [@media(min-width:1350px)]:ml-[20%]">
            {CurrentPage}
          </div>
        </div>
      </nav>

      {/* Hamburger Mobile  Menu */}
      <MobileNav isOpen={isOpen} onClose={toggleMenu} />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => logout(navigate)}
      />

      {showSetPinModal && (
        <SetPinModal onClose={() => setShowSetPinModal(false)} />
      )}

      {isSuccessModalStore && (
        <SuccessModal
          title="PIN Set Successfully"
          message="Your transaction PIN has been created!"
          onClose={() => {
            setDataSuccessModal(false);
            // fetchUser();
          }}
        />
      )}
    </>
  );
};

export default DashboardLayoutt;
