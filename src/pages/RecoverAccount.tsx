import { LuHouse } from "react-icons/lu";
import Reset from "../assets/auth_imgs/reset-img.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import Back from "../assets/auth_imgs/Vector 9.svg";
import "react-phone-number-input/style.css";
// import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
// import { Navigate } from "react-router-dom";

const RecoverAccount = () => {
  const requireTwoFa = localStorage.getItem("requireTwoFa");
  const navigate = useNavigate();
  const [token, setToken] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  // const API_URL = import.meta.env.VITE_API_URL;
  const {
    // otpAuth,
    isLoading,
    ForgotOtpError,
    forgotpasswordVerification,
  } = useAuthStore();

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

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const otpCode: string = token.join("");
  //   forgotpasswordVerification(otpCode, navigate);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpCode: string = token.join("");

    setLoading(true);
    try {
      if (requireTwoFa) {
        // call the login 2FA verification endpoint
        const response = await fetch(
          `https://twjmobileapi.runasp.net/api/Authentication/verifyLogin2Fa?email=${email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ twoFactorCode: otpCode }),
          }
        );

        if (!response.ok) {
          throw new Error("2FA verification failed");
        }

        const data = await response.json();
        console.log("2FA success:", data);

        localStorage.setItem("name", data.data.userDetails.fullName);
        localStorage.setItem("email", data.data.userDetails.email);
        localStorage.setItem("userName", data.data.userDetails.userName);
        localStorage.setItem("uniqueTWJID", data.data.userDetails.uniqueTWJID);
        localStorage.setItem(
          "referralLink",
          data.data.userDetails.referralLink
        );
        localStorage.setItem("phoneNumber", data.data.userDetails.phoneNumber);
        localStorage.setItem("passcodeSet", data.data.passcodeSet);
        localStorage.setItem("kycComplete", data.data.kycComplete);
        localStorage.setItem("isAuthenticated", "true");

        // maybe navigate to dashboard or home after success
        // navigate("/dashboard");
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        setIsAuthenticated(true);
        localStorage.removeItem("requireTwoFa");
        navigate("/dashboard");
        setLoading(false);
      } else {
        // your existing forgot password flow
        await forgotpasswordVerification(otpCode, navigate);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      return;
      // show some error message to user
    } finally {
      setLoading(false);
    }
  };

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

      <form
        className="[@media(min-width:1100px)]:w-1/2 w-full my-[1rem]   md:mx-[2rem] mx-[10px]"
        onSubmit={handleSubmit}
      >
        <div className="mt-8">
          <div className="Nav flex justify-between">
            <div className="cursor-pointer">
              <img src={Logo} className="md:w-[188px]  w-[150px] " alt="Logo" />
            </div>
            {!requireTwoFa ? (
              <NavLink
                to="/email_for_reset_password"
                className="flex items-center text-[15px]"
              >
                <img src={Back} alt="" />
                <span className="cursor-pointer whitespace-nowrap font-semibold ml-[5px] text-[#27014F]">
                  Go Back
                </span>
              </NavLink>
            ) : (
              <NavLink to="/" className="flex items-center text-[15px]">
                <img src={Back} alt="" />
                <span className="cursor-pointer whitespace-nowrap font-semibold ml-[5px] text-[#27014F]">
                  Go Back
                </span>
              </NavLink>
            )}
          </div>
          <div className="mt-12 mb-8"></div>
        </div>
        <div className="mt-[4rem] w-full  sm:px-0 px-3 sm:max-w-[480px] mx-auto ">
          <div className="flex flex-col justify-center sm:p-8 py-8 bg-white">
            {requireTwoFa ? (
              <>
                <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
                  Enter 2FA Code
                </h2>
                <p className="text-[14px]">
                  Enter the code sent to your email or phone to complete login.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
                  Verify account
                </h2>
                <p className="text-[14px]">
                  Please enter the code sent to your email{" "}
                  <span className="text-[#8003A9]">
                    {email && maskEmail(email)}
                  </span>
                </p>
              </>
            )}
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
                  className="focus:border-purple-800 sm:w-[55px] sm:h-[55px] w-[45px] h-[45px] font-semibold text-[32px] text-center focus:border-2 outline-none p-2.5 border border-[#A4A4A4] rounded-md"
                />
              ))}
            </div>

            {ForgotOtpError && (
              <p className="text-red-600 text-[14px]  mt-1">{ForgotOtpError}</p>
            )}
            <button
              className={`bg-[#9605C5] font-semibold text-white p-3 rounded-[10px] mt-4 ${
                token.some((digit) => digit === "")
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={token.some((digit) => digit === "")}
            >
              {requireTwoFa ? (
                loading ? (
                  // Spinner
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
                  "Verify 2FA"
                )
              ) : isLoading && loading ? (
                // Spinner
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
              {requireTwoFa ? (
                <button className="mt-[-2px] underline text-[#9605C5]">
                  Resend Code
                </button>
              ) : (
                <button className="mt-[-2px] underline text-[#9605C5]">
                  Resend Code
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Right: Image with Overlay */}
      <div className="  hidden [@media(min-width:1000px)]:block [@media(min-width:1000px)]:relative  w-[641px] h-[calc(100vh-2rem)] m-[1rem]">
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
