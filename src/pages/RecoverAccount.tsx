import { LuHouse } from "react-icons/lu";
import Reset from "../assets/auth_imgs/reset-img.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import Back from "../assets/auth_imgs/Vector 9.svg";
import "react-phone-number-input/style.css";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../App.css";
import { NavLink } from "react-router";
import { useAuthStore } from "../store/authStore";

const RecoverAccount = () => {
  // Using array to store each OTP digit
  // const [otp, setOtp] = useState(["", "", "", "", "",""]);
  const [token, setToken] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string | null>("");
  const [isVerified, setIsVerified] = useState(false);

  const { otpAuth, isLoading, ForgotOtpError, forgotpasswordVerification } =
    useAuthStore();

  // Handle input change for OTP fields
  // const handleOtpChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const { value } = e.target;

  //   // Allow only digits
  //   if (/^\d*$/.test(value)) {
  //     const newOtp = [...otp];
  //     newOtp[index] = value;
  //     setOtp(newOtp);

  //     // Auto-focus to the next field if not the last field
  //     if (value && index < otp.length - 1) {
  //       const nextInput = document.getElementById(`otp-${index + 1}`);
  //       nextInput?.focus();
  //     }
  //   }
  // };

  // Handle backspace for seamless navigation
  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   if (e.key === "Backspace" && !otp[index] && index > 0) {
  //     const prevInput = document.getElementById(`otp-${index - 1}`);
  //     prevInput?.focus();
  //   }
  // };

  // Handle input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Allow only digits
      const newOtp = [...token];
      newOtp[index] = value;
      setToken(newOtp);

      // Move to the next field automatically
      if (value && index < token.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && token[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste event
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setToken(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  // Handle submit
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const otpCode = otp.join("");
  //   console.log("OTP:", otpCode);

  //   // Add your verification logic here
  // };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode: string = token.join("");
    // const strOtpCode = otpCode.toString();
    console.log("OTP to be Submitted:", otpCode);
    forgotpasswordVerification(otpCode);
    console.log("OTP Submitted:", otpCode);
  };

  useEffect(() => {
    if (otpAuth === true) {
      setIsVerified(true); // User is verified
    }
    // console.log({ otpAuth });
  }, [otpAuth]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("forgotPasswordEmail");
    setEmail(storedEmail);
  }, []);

  const maskEmail = (email: string) => {
    const [name, domain] = email.split("@");
    const maskedName = name[0] + "***" + name.slice(-3);
    return `${maskedName}@${domain}`;
  };

  return (
    <div className="flex  h-[calc(100vh-2rem)] w-full ">
      {/* Left: Signup Form */}
      {!isVerified ? (
        <form className="w-1/2 my-[1rem] mx-[2rem]" onSubmit={handleSubmit}>
          <div className="mt-8">
            <div className="Nav flex justify-between">
              <div className="cursor-pointer">
                <img src={Logo} alt="Logo" />
              </div>
              <NavLink
                to="/reset-password"
                className="flex items-center text-[15px]"
              >
                <img src={Back} alt="" />
                <span
                  className="cursor-pointer font-semibold ml-[5px] text-[#27014F]"
                >
                  Go Back
                </span>
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
                <span className="text-[#8003A9]">
                  {email && maskEmail(email)}
                </span>
              </p>

              {/* OTP Input Fields */}
              <div className="flex justify-center gap-[1rem] mt-[2rem]">
                {token.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    id={`otp-${index}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onPaste={handleOtpPaste}
                    autoFocus={index === 0}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="focus:border-purple-800 w-[55px] h-[55px] font-semibold text-[32px] text-center focus:border-2 outline-none p-2.5 border border-[#A4A4A4] rounded-md"
                  />
                ))}
              </div>

              {ForgotOtpError && (
                <p className="text-red-600 text-[14px]  mt-1">
                  {ForgotOtpError}
                </p>
              )}
              <button
                className={`bg-[#9605C5] font-semibold text-white p-3 rounded-[10px] mt-4 ${
                  token.some((digit) => digit === "")
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                disabled={token.some((digit) => digit === "")}
              >
                {isLoading ? (
                  // Spinner (Tailwind CSS example)
                  <svg
                    className="animate-spin h-5 w-5 text-white mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  "Verify Account"
                )}
              </button>

              <div className="flex flex-col w-full items-center mt-2.5">
                <p>Didn't receive OTP? </p>
                <button className="mt-[-2px] underline text-[#9605C5]">
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className=" w-1/2 my-[1rem] mx-[2rem] h-[calc(100vh-1rem)] ">
          <div className="Nav mt-8 flex justify-between ">
            <div className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center text-[15px]"></div>
          </div>

          <div className="flex flex-col justify-center  h-[80%]  items-center  ">
            <div className=" max-w-[480px] mx-auto ">
              <div className="flex w-full  flex-col justify-center  items-center  bg-white">
                <div className="flex justify-center items-center">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="150"
                    viewBox="0 0 203 203"
                    fill="none"
                  >
                    {/* Background Circle */}
                    <circle cx="101.5" cy="97.5" r="97.5" fill="#9605C5" />
                    <path fillRule="evenodd" clipRule="evenodd" fill="white" />

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
                </div>
                <div className=" flex flex-col  justify-center items-center">
                  <h2 className="text-2xl mt-[1rem] font-bold mb-[0.4rem] text-[40px] text-[#27014F]  leading-[2.5rem]">
                    Registration Successful
                  </h2>
                  <p className="text-[14px] mb-[-3px] mt-[0.5rem] text-[#27014F] text-center">
                    Your account has Successfully been created.
                  </p>
                  <p className="text-[14px] text-[#27014F] text-center">
                    Click to continue to login.
                  </p>
                  <div className="flex items-center justify-center mt-[2rem] w-[480px] ">
                    <NavLink
                      to="/"
                      className="bg-[#9605C5] lg:w-[80%] cursor-pointer font-semibold text-white text-center p-3 rounded-[10px]"
                    >
                      Continue
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-[calc(100vh-2rem)] m-[1rem]">
        {/* Background Image */}
        <img
          src={Reset}
          alt="Signup"
          className="w-full h-full rounded-[3rem] object-top object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>

        {/* Top-Right Icon */}
        <a
          href="https://twjhub.com/"
          className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer"
        >
          <LuHouse className="text-[#27014F] text-[1.5rem]" />
        </a>

        {/* Bottom Text */}
        <div className="absolute bottom-[4rem] left-10 text-white">
          <h3 className="text-[48px] leading-[3rem] font-semibold">
            Trade the future, <br /> today.
          </h3>
          <p className="text-[32px] text-[#D671F7]">
            safe, secure, and simple.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverAccount;
