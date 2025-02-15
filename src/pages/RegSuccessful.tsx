import { LuHouse } from "react-icons/lu";
import SignUpImg from "../assets/auth_imgs/pexels-keira-burton.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import "react-phone-number-input/style.css";
import Success from "../assets/auth_imgs/success.svg";
import "../App.css";

const RegSuccessful = () => {
  return (
    <div className="flex h-screen w-full  ">
      {/* Left: Signup Form */}
      <div className=" w-1/2 my-[1rem] mx-[2rem] h-screen ">
        <div className="Nav mt-8 flex justify-between ">
          <div className="cursor-pointer">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="flex items-center text-[15px]"></div>
        </div>

        <div className="flex flex-col justify-center  h-[80%]  items-center  ">
          <div className=" max-w-[480px] mx-auto ">
            <div className="flex  flex-col justify-center  bg-white">
              <img src={Success} className=" h-[195px]" alt="" />
              <div className="">
                <h2 className="text-2xl mt-[1rem] font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
                  Registration Successful
                </h2>
                <p className="text-[14px] mb-[-3px] mt-[0.5rem] text-[#27014F] text-center">
                  Your account has Successfully been created.
                </p>
                <p className="text-[14px] text-[#27014F] text-center">
                  Click to continue to login.
                </p>
                <div className="flex flex-col mt-[2rem] ">
                  <button className="bg-[#9605C5] w cursor-pointer font-semibold text-white p-3 rounded-[10px]">
                    Create Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-full m-[1rem]  ">
        {/* Background Image */}
        <img
          src={SignUpImg}
          alt="Signup"
          className="w-full h-full rounded-[3rem] object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>

        {/* Top-Right Icon */}

        <div className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer">
          <LuHouse className=" text-[#27014F] text-[1.5rem]" />
        </div>
        {/* Bottom Text */}
        <div className="absolute bottom-[4rem] left-10 text-white t]">
          <h3 className="text-[48px] leading-[3rem] font-semibold">
            Trade the future, <br /> today.
          </h3>
          <p className="text-[32px] text-[#D671F7] ">
            safe, secure, and simple.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegSuccessful;
