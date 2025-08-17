import { LuHouse } from "react-icons/lu";
import SignUpImg from "../assets/auth_imgs/pexels-keira-burton.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NavLink } from "react-router";
import eye from "../assets/auth_imgs/Eye_light.svg";
import "../App.css";
import { useAuthStore } from "../store/authStore";
import eye_lines from "../assets/dashboard_img/Eye_hide_dark.svg";
import { useLocation } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refCode = searchParams.get("refCode");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    isChecked: false,
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    isChecked: "",
  });
  const { signUp, signUpError, isLoading } = useAuthStore();

  // const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const validateField = (name: string, value: string | boolean | undefined) => {
    let error = "";

    switch (name) {
      case "userName":
        if (!value) error = "fullname is required";
        break;

      case "email":
        if (!value) error = "Email is required";
        else if (
          typeof value === "string" &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Invalid email address";
        }
        break;

      case "password":
        if (!value) error = "Password is required";
        else if (typeof value === "string" && value.length < 8) {
          error = "Password must be at least 8 characters";
        } else if (
          typeof value === "string" &&
          !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(value)
        ) {
          error = "Password must include uppercase, lowercase, and a number";
        }
        break;

      case "phoneNumber":
        if (!value) error = "Phone number is required";
        else if (typeof value === "string" && !isValidPhoneNumber(value)) {
          error = "Invalid phone number";
        }
        break;

      case "isChecked":
        if (value !== true) error = "You must agree to the terms";
        break;

      default:
        break;
    }

    setErrors((prevState) => ({
      ...prevState,
      [name]: error,
    }));

    return error;
  };

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  // Handle phone number change
  const handlePhoneNumberChange = (value: string | undefined) => {
    setFormData((prevState) => ({
      ...prevState,
      phoneNumber: value || "",
    }));

    validateField("phoneNumber", value);
  };

  // Check all fields for errors before submission
  const validateForm = () => {
    const newErrors = {
      userName: validateField("fullname", formData.userName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      isChecked: validateField("isChecked", formData.isChecked),
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        await signUp(formData, navigate, refCode);

        setFormData({
          userName: "",
          email: "",
          password: "",
          phoneNumber: "",
          isChecked: false,
        });
      } catch (error: any) {
        if (error.response) {
          // console.error("Signup error:", error.response.data);
          return error;
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // checks to disable the button.
  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.userName ||
    !formData.email ||
    !formData.password ||
    !formData.phoneNumber ||
    !formData.isChecked;

  return (
    <div className="flex h-screen w-full ">
      {/* Left: Signup Form */}
      <div className="[@media(min-width:950px)]:w-1/2 w-full h-full hide-scrollbar overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="  my-[1rem]  md:mx-[2rem] mx-[1rem] "
        >
          <div className="sm:mt-8 mt-2">
            <div className="Nav flex justify-between ">
              <a href="https://twjhub.com/" className="cursor-pointer">
                <img
                  src={Logo}
                  className="md:w-[188px] w-[150px] h-auto"
                  alt="Logo"
                />
              </a>
              <div className="sm:flex hidden items-center text-[15px]">
                <p className="font-[500] text-[#27014F]">
                  Already have an account?
                </p>
                <NavLink
                  to="/"
                  className=" cursor-pointer font-[500] ml-[5px] text-[#9605C5]"
                >
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
          <div className="mt-[2rem]  md:max-w-[480px] mx-auto ">
            <div className="flex flex-col justify-center sm:p-8 p-0 bg-white">
              <div className="flex flex-col mb-[1rem] items-center justify-center ">
                <h3 className="text-[#27014F] text-center ">
                  Please check that you are visiting the correct URL
                </h3>

                <div className=" flex items-center justify-center gap-0.5 mt-2 mb-4 border border-[#b8c1cd] rounded-[30px] px-8 py-2.5">
                  <span className="flex items-center gap-1 text-[#15aa64] text-[16px]">
                    <FaLock /> <p>https://</p>
                  </span>
                  <span className="text-[#27014F]">twjhub.app/signup</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold sm:mb-[0.4rem]  sm:text-[40px] text-[30px] text-[#27014F] w-full leading-[2.5rem]">
                Create an account
              </h2>
              <p className="md:text-[14px] text-[16px]">
                Create your account, it takes less than a minute.
              </p>
              <div className="flex flex-col mt-[2rem] ">
                <div className="w-full mb-4">
                  <label
                    htmlFor="Username"
                    className="md:hidden block my-2 text-[16px] text-[#8b8989] "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    onBlur={() => validateField("fullName", formData.userName)}
                    className={`md:p-2.5 p-4 px-3 border  text-[16px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                      errors.userName
                        ? "border border-red-600"
                        : "focus:border-purple-800"
                    } `}
                  />

                  {errors.userName && (
                    <p className="text-red-500 text-[13px] mt-[2px]">
                      {errors.userName}
                    </p>
                  )}
                </div>
                <div className="w-full mb-4">
                  <label
                    htmlFor="email"
                    className="md:hidden block my-2 text-[16px] text-[#8b8989]"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => validateField("email", formData.email)}
                    className={`  text-[16px] focus:border-2 outline-none md:p-2.5 p-4  px-3 border border-[#A4A4A4] rounded-md w-full ${
                      errors.email
                        ? "border border-red-600"
                        : "focus:border-purple-800"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[13px] mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div
                  className={` mb-[1rem] ${
                    errors.phoneNumber
                      ? "border-red-500"
                      : "focus:border-purple-800"
                  }`}
                >
                  <label
                    htmlFor="phoneNumber"
                    className="md:hidden block my-2 text-[16px] text-[#8b8989]"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    placeholder="Enter your phone number"
                    defaultCountry="NG"
                    value={formData.phoneNumber}
                    onChange={handlePhoneNumberChange}
                    style={
                      {
                        "--PhoneInputCountrySelect-marginRight": "0em",
                        borderRadius: "0.375rem",
                        ...(errors.phoneNumber && {
                          border: "1px solid red", // Override with red border if there's an error
                        }),
                      } as React.CSSProperties
                    }
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-[13px] mt-">
                      {errors.phoneNumber}
                    </p>
                  )}{" "}
                  {/* Show error message if invalid */}
                </div>

                <div className="relative w-full">
                  <label
                    htmlFor="password"
                    className="md:hidden block my-2 text-[16px] text-[#8b8989]"
                  >
                    Password
                  </label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => validateField("password", formData.password)}
                    className={`  w-full focus:border-2 outline-none md:p-2.5 p-4 px-3 text-[16px] border border-[#A4A4A4] rounded-md  ${
                      errors.password
                        ? "border border-red-600"
                        : "focus:border-purple-800"
                    }`}
                  />
                  <div
                    className={`absolute  cursor-pointer right-[0.8rem]  bottom-[0.7rem]
                  }`}
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <img src={eye} className="w-full h-full" alt="" />
                    ) : (
                      <img
                        src={eye_lines}
                        className=" top-[1.5px]  left-[px]"
                        alt=""
                      />
                    )}
                  </div>

                  {/* <img
               
                  src={eye}
                  alt="password visibility toggle"
                /> */}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}

                <p className="md:text-[13px] text-[16px] bold-semibold mt-[5px] ">
                  Password must be at least 8 charaters
                </p>
                {signUpError && (
                  <p className="text-red-600 text-[14px]  mt-1">
                    {signUpError}
                  </p>
                )}
                <div className="flex text-[14px] gap-[6px] my-[1.6rem] ">
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="terms"
                    name="isChecked"
                    checked={formData.isChecked}
                    onChange={handleChange}
                  />
                  <div className="flex text-[16px] md:text-[14px]">
                    <p>I agree to the </p>
                    <a
                      href="https://twjhub.com/terms"
                      target="_blank"
                      className="ml-[2.5px] underline text-[#9605C5]"
                    >
                      terms & conditions
                    </a>
                  </div>
                </div>

                {/* <button
                type="submit"
                className={`bg-[#9605C5]  font-semibold text-white p-3 rounded-[10px] 
    ${isFormInvalid ? "opacity-60 cursor-not-allowed " : " cursor-pointer"}`}
                disabled={isFormInvalid}
              >
                Create Account
              </button> */}

                <button
                  type="submit"
                  className={`bg-[#9605C5] font-semibold text-white md:p-3 p-4 md:text-[14px] text-[17px] rounded-[10px] flex items-center justify-center
  ${
    isFormInvalid || isLoading
      ? "opacity-60 cursor-not-allowed"
      : "  cursor-pointer"
  }`}
                  disabled={isFormInvalid || isLoading}
                >
                  {isLoading ? (
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
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="sm:hidden mb-[2rem] mt-4 flex  items-center justify-center text-[16px]">
                  <p className="font-[500] text-[#27014F]">
                    Already have an account?
                  </p>
                  <NavLink
                    to="/"
                    className=" cursor-pointer font-[500] ml-[5px] text-[#9605C5]"
                  >
                    Log in
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Right: Image with Overlay */}
      <div className="fixed    hidden [@media(min-width:950px)]:block [@media(min-width:950px)]:relative   right-0 top-0 w-[50%] h-screen p-[1rem]">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={SignUpImg}
            alt="Signup"
            className="w-full h-full rounded-[3rem] object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>

          <a
            href="https://twjhub.com/"
            className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer"
          >
            <LuHouse className=" text-[#27014F] text-[1.5rem]" />
          </a>

          <div className="absolute bottom-[4rem] left-10 text-white">
            <h3 className="text-[48px] leading-[3rem] font-semibold">
              Trade the future, <br /> today.
            </h3>
            <p className="text-[32px] text-[#D671F7] ">
              safe, secure, and simple.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
