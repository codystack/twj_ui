import { LuHouse } from "react-icons/lu";
import Reset from "../assets/auth_imgs/reset-img.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import Back from "../assets/auth_imgs/Vector 9.svg";
import "react-phone-number-input/style.css";
import { useState } from "react";
import "../App.css";
import { NavLink } from "react-router";

const VerifyOtp = () => {
  // Using array to store each OTP digit
  const [otp, setOtp] = useState(["", "", "", "", "",""]);

  // Handle input change for OTP fields
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    // Allow only digits
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to the next field if not the last field
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Handle backspace for seamless navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP:", otpCode);

    // Add your verification logic here
  };

  return (
    <div className="flex h-screen w-full ">
      {/* Left: Signup Form */}
      <form className="w-1/2 my-[1rem] mx-[2rem]" onSubmit={handleSubmit}>
        <div className="mt-8">
          <div className="Nav flex justify-between">
            <div className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </div>
            <NavLink to="/reset-password" className="flex items-center text-[15px]">
             <img src={Back} alt="" />
              <p className="cursor-pointer font-semibold ml-[5px] text-[#27014F]">
               Go Back
              </p>
            </NavLink>
          </div>
        </div>
        <div className="mt-[4rem] max-w-[480px] mx-auto ">
          <div className="flex flex-col justify-center p-8 bg-white">
            <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
              Verify account
            </h2>
            <p className="text-[14px]">
              Please enter the code sent to your email{" "}
              <span className="text-[#8003A9]"> ...kpoju@gmail.com</span>
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-center gap-[1rem] mt-[1.5rem]">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="focus:border-purple-800 w-[55px] h-[55px] font-semibold text-[32px] text-center focus:border-2 outline-none p-2.5 border border-[#A4A4A4] rounded-md"
                />
              ))}
            </div>

            <button
              className="bg-[#9605C5] cursor-pointer font-semibold text-white p-3 rounded-[10px] mt-[2rem]"
              disabled={otp.some((digit) => digit === "")}
            >
              Verify Account
            </button>

            <div className="flex flex-col w-full items-center mt-2.5">
              <p>Didn't receive OTP? </p>
              <a href="#" className="mt-[-2px] underline text-[#9605C5]">
                Resend Code
              </a>
            </div>
          </div>
        </div>
      </form>

      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-screen m-[1rem]">
        {/* Background Image */}
        <img
          src={Reset}
          alt="Signup"
          className="w-full h-full rounded-[3rem] object-top object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>

        {/* Top-Right Icon */}
        <div className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer">
          <LuHouse className="text-[#27014F] text-[1.5rem]" />
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-[4rem] left-10 text-white">
          <h3 className="text-[48px] leading-[3rem] font-semibold">
            Trade the future, <br /> today.
          </h3>
          <p className="text-[32px] text-[#D671F7]">safe, secure, and simple.</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
