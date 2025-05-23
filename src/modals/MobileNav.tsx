import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Sidebar from "../pages/Logged_in/Sidebar";
import { useLocation } from "react-router-dom";
import Logo from "../assets/dashboard_img/Logo.svg";
// import Logo from "../../assets/dashboard_img/Logo.svg";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Close sidebar on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/60 bg-opacity-40 z-[997]"
        onClick={onClose}
      ></div>

      {/* Sidebar menu */}
      <nav
        id="site-nav"
        className="fixed top-0 left-0 h-full bg-white transition-transform duration-300 z-[998] overflow-y-auto w-[40vw] max-w-[300px] translate-x-0"
      >
        <div>
          <img src={Logo} className="w-[9rem] my-5 ml-3" alt="logo image" />
        </div>
        <Sidebar />
      </nav>
    </>,
    document.body
  );
};

export default MobileNav;
