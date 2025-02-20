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

const SignUp = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    isChecked: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
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
      case "fullName":
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
      fullName: validateField("fullname", formData.fullName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      phoneNumber: validateField("phoneNumber", formData.phoneNumber),
      isChecked: validateField("isChecked", formData.isChecked),
    };

    setErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // setIsLoading(true); // Start loading
      try {
        signUp(formData, navigate);
        console.log("submitted successfully");
        // Reset form on success
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          isChecked: false,
        });
        // setErrors({});
      } catch (error: any) {
        if (error.response) {
          setFormData({
            fullName: "",
            email: "",
            password: "",
            phoneNumber: "",
            isChecked: false,
          });
          console.log("Error Response Data:", error.response.data);
        }
      } finally {
        // setIsLoading(false); // Stop loading
      }
    } else {
      console.log("Form has errors:", errors);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // checks to disable the button.
  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.phoneNumber ||
    !formData.isChecked;

  return (
    <div className="flex h-screen w-full ">
      {/* Left: Signup Form */}
      <form onSubmit={handleSubmit} className=" w-1/2 my-[1rem] mx-[2rem] ">
        <div className="mt-8">
          <div className="Nav flex justify-between ">
            <a href="https://twjhub.com/" className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </a>
            <div className="flex items-center text-[15px]">
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
        <div className="mt-[4rem] max-w-[480px] mx-auto ">
          <div className="flex flex-col justify-center p-8 bg-white">
            <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
              Create an account
            </h2>
            <p className="text-[14px]">
              Create your account, it takes less than a minute.
            </p>
            <div className="flex flex-col mt-[2rem] ">
              <div className="w-full mb-4">
                <input
                  type="text"
                  placeholder="Full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={() => validateField("fullName", formData.fullName)}
                  className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                    errors.fullName
                      ? "border border-red-600"
                      : "focus:border-purple-800"
                  } `}
                />

                {errors.fullName && (
                  <p className="text-red-500 text-[13px] mt-[2px]">
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div className="w-full mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateField("email", formData.email)}
                  className={` text-[13px] focus:border-2 outline-none p-2.5 pl-3 pr-3 border border-[#A4A4A4] rounded-md w-full ${
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
                <PhoneInput
                  placeholder="Enter phone number"
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
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => validateField("password", formData.password)}
                  className={`  w-full focus:border-2 outline-none p-2.5 pl-3 pr-3 text-[13px] border border-[#A4A4A4] rounded-md  ${
                    errors.email
                      ? "border border-red-600"
                      : "focus:border-purple-800"
                  }`}
                />
                <img
                  className={`absolute  cursor-pointer right-[0.8rem] bottom-[0.45rem] 
                  }`}
                  src={eye}
                  alt="password visibility toggle"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}

              <p className="text-[13px] bold-semibold mt-[5px] ">
                Password must be at least 8 charaters
              </p>
              {signUpError && (
                <p className="text-red-600 text-[14px]  mt-1">{signUpError}</p>
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
                <div className="flex">
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
                className={`bg-[#9605C5] font-semibold text-white p-3 rounded-[10px] flex items-center justify-center
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
            </div>
          </div>
        </div>
      </form>

      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-[750px] m-[1rem]  ">
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

export default SignUp;
