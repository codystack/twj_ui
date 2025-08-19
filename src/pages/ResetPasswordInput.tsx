import { LuHouse } from "react-icons/lu";
import Logo from "../assets/auth_imgs/Logo.svg";
import Back from "../assets/auth_imgs/Vector 9.svg";
import Reset from "../assets/auth_imgs/reset-img.png";
import "react-phone-number-input/style.css";
import { useEffect, useState } from "react";
import eye from "../assets/auth_imgs/Eye_light.svg";
import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
import "../App.css";
import { usenewPasswordStore } from "../store/newPasswordstore";

const ResetPasswordInput = () => {
  // const navigate = useNavigate();
  // Single state to hold all form values (inputs)

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [isVerified, setIsVerified] = useState(false);

  const { isLoading, authOtp, newPasswordError, newPasswordChange } =
    usenewPasswordStore();

  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Field Validation using Switch Statement

  const validateField = (fieldName: string, value: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: "" })); // Clear previous error

    switch (fieldName) {
      case "newPassword":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "This field is required",
          }));
        } else if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "Password must be at least 8 characters",
          }));
        } else if (
          typeof value === "string" &&
          !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(value)
        ) {
          setErrors((prev) => ({
            ...prev,
            newPassword:
              "Password must include uppercase, lowercase, and a number",
          }));
        } else if (value !== formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        }

        break;

      case "confirmPassword":
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "This field is required",
          }));
        } else if (value !== formData.newPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" })); // Clear error if they match
        }
        break;

      default:
        break;
    }
  };

  // Update form field value
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    validateField(name, value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.newPassword ||
    !formData.confirmPassword;

  // submit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !errors.newPassword &&
      !errors.confirmPassword &&
      formData.newPassword &&
      formData.confirmPassword
    ) {
      newPasswordChange(formData.newPassword);
    }
  };

  useEffect(() => {
    if (authOtp === true) {
      setIsVerified(true);
    }
    // console.log({ otpAuth });
  }, [authOtp]);

  return (
    <div className="flex h-[calc(100vh-1rem)] w-full">
      {/* Left:  Form */}

      {!isVerified ? (
        <form
          onSubmit={handleSubmit}
          className="[@media(min-width:1000px)]:w-1/2 w-full my-[1rem]   md:mx-[2rem] mx-[10px]"
        >
          <div className="mt-8">
            <div className="Nav flex justify-between">
              <a href="https://twjhub.com/" className="cursor-pointer">
                <img
                  src={Logo}
                  className="md:w-[188px]  w-[150px] "
                  alt="Logo"
                />
              </a>
              <div className="flex items-center text-[15px]">
                <NavLink
                  to="/email_for_reset_password"
                  className="flex items-center text-[15px]"
                >
                  <img src={Back} alt="" />
                  <span className="cursor-pointer whitespace-nowrap font-semibold ml-[5px] text-[#27014F]">
                    Go Back
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[80%] md:w-[490px] mx-auto justify-center items-center">
            <div className="flex flex-col justify-center w-full py-8 bg-white">
              <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
                Password Reset
              </h2>
              <p className="text-[18px] text-[#27014F]">
                Please enter your new password.
              </p>
              <div className="flex flex-col mt-[1rem]">
                {/* New Password Field */}
                <div className="w-full  relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    onBlur={() => validateField("email", formData.newPassword)}
                    className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                      errors.newPassword
                        ? "border border-red-600"
                        : "focus:border-purple-800"
                    } `}
                  />
                  <img
                    className="absolute cursor-pointer right-[0.8rem] bottom-[0.45rem]"
                    src={eye}
                    alt="password visibility toggle"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.newPassword}
                  </p>
                )}
                <div className="w-full h-full mt-4 relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder=" Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() =>
                      validateField("email", formData.confirmPassword)
                    }
                    className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                      errors.confirmPassword
                        ? "border border-red-600"
                        : "focus:border-purple-800"
                    } `}
                  />
                  <img
                    className="absolute cursor-pointer right-[0.8rem] bottom-[0.45rem]"
                    src={eye}
                    alt="password visibility toggle"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.confirmPassword}
                  </p>
                )}

                {newPasswordError && (
                  <p className="text-red-600 text-[14px]  mt-1">
                    {newPasswordError}
                  </p>
                )}

                <button
                  className={`bg-[#9605C5] mt-[2rem] font-semibold text-white p-3 rounded-[10px]  ${
                    isFormInvalid
                      ? "opacity-60 cursor-not-allowed"
                      : "  cursor-pointer"
                  }`}
                  disabled={isFormInvalid}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
                    </div>
                  ) : (
                    "Submit Password"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="[@media(min-width:1100px)]:w-1/2 w-full my-[1rem]   md:mx-[2rem] mx-[10px]">
          <div className="Nav mt-8 flex justify-between ">
            <div className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center text-[15px]"></div>
          </div>

          <div className="flex flex-col justify-center  h-[80%]  items-center  ">
            <div className=" max-w-[480p]  ">
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
                <div className=" flex  flex-col w-full justify-center items-center">
                  <h2 className="text-2xl mt-[1rem] font-bold mb-[0.4rem] text-[40px] text-[#27014F] text-center leading-[2.5rem]">
                    Password Reset Successful
                  </h2>
                  <p className="text-[14px] mb-[-3px] mt-[0.5rem] text-[#27014F]  text-center">
                    Your password has been changed click continue to login.
                  </p>
                  <p className="text-[14px] text-[#27014F] text-center">
                    Click continue to login.
                  </p>
                  <div className="flex items-center justify-center mt-[1rem] w-[480px] ">
                    <NavLink
                      to="/"
                      className="bg-[#9605C5] w-[80%] cursor-pointer font-semibold text-white text-center p-3 rounded-[10px]"
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
      <div className="  hidden [@media(min-width:1000px)]:block [@media(min-width:1000px)]:relative  w-[641px] h-[calc(100vh-2rem)] m-[1rem]">
        <img
          src={Reset}
          alt="Signup"
          className="w-full h-full rounded-[3rem] object-top object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>
        <a
          href="https://twjhub.com/"
          className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer"
        >
          <LuHouse className="text-[#27014F] text-[1.5rem]" />
        </a>
        <div className="absolute bottom-[4rem] left-10 text-white">
          <h3 className="text-[48px] whitespace-nowrap leading-[3rem] font-semibold">
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

export default ResetPasswordInput;
