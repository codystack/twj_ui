import { LuHouse } from "react-icons/lu";
import SignUpImg from "../assets/auth_imgs/pexels-keira-burton.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import "react-phone-number-input/style.css";
import Success from "../assets/auth_imgs/success.svg";
import "../App.css";
import { motion } from "framer-motion";
// import { useState } from "react";

const RegSuccessful = () => {
  // const [checked, setChecked] = useState(false);

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

        <div className="flex flex-col justify-center   h-[80%]  items-center  ">
          <div className=" max-w-[480px] mx-auto ">
            <div className="flex  flex-col justify-center  bg-white">
              <img src={Success} className=" h-[195px]" alt="" />

              {/* 
      <svg xmlns="http://www.w3.org/2000/svg" width="203" height="203" viewBox="0 0 203 203" fill="none">
  <circle cx="101.5" cy="97.5" r="97.5" fill="#9605C5"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M137.212 76.3272C138.803 74.4179 138.545 71.5804 136.636 69.9893C134.727 68.3983 131.889 68.6563 130.298 70.5655L92.4455 115.989L71.3253 94.8689C69.568 93.1115 66.7187 93.1115 64.9614 94.8689C63.204 96.6262 63.204 99.4755 64.9614 101.233L88.0173 124.289L88.0896 124.361C88.3732 124.646 88.8567 125.132 89.3548 125.508C90.0016 125.997 91.2285 126.745 92.9299 126.668C94.6312 126.591 95.7854 125.735 96.3853 125.189C96.8471 124.769 97.2847 124.242 97.5413 123.933L97.5414 123.933L97.6069 123.854L137.212 76.3272Z" fill="white"/>
</svg> */}

              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="203"
                height="203"
                viewBox="0 0 203 203"
                fill="none"
              >
                {/* Background Circle */}
                <circle cx="101.5" cy="97.5" r="97.5" fill="#9605C5" />
                <path fill-rule="evenodd" clip-rule="evenodd" fill="white" />

                {/* Animated Checkmark */}
                <motion.path
                  d="M64 98L92 126L137 75"
                  fill="none"
                  stroke="white"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </motion.svg>

              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="203"
                height="203"
                viewBox="0 0 203 203"
                fill="none"
              >
                {/* Background Circle */}
                <circle cx="101.5" cy="97.5" r="97.5" fill="#9605C5" />

                {/* Animated Checkmark */}
                <motion.path
                  d="M137.212 76.3272L97.6069 123.854Q97 126 92.5 126Q88 126 88 124.5L64.9614 101.233"
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinecap="butt" // Keeps all edges sharp except the bottom
                  strokeLinejoin="round" // Adds smoothness at key points
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>

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
