import { LuHouse } from "react-icons/lu";
import SignUpImg from "../assets/auth_imgs/pexels-keira-burton.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useState } from "react";
import { NavLink } from "react-router";
import eye from "../assets/auth_imgs/Eye_light.svg";
import "../App.css";

const SignUp = () => {
  const [value, setValue] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>(""); 

  // Single state to hold all form values (inputs)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Separate state for errors
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    PhoneNumber: "",
  });

  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Update form field value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate Full Name
  const validateFullName = () => {
    if (!formData.fullName.trim()) {
      setErrors((prev) => ({
        ...prev,
        fullName: "This field is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        fullName: "",
      }));
    }
  };

  // Validate Email
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "This field is required",
      }));
    } else if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  // Validation for phone number
  const handlePhoneNumberChange = (value: string | undefined) => {
    setValue(value);
    // Validate the phone number based on the selected country
    if (value && !isValidPhoneNumber(value)) {
      setError("Please enter a valid phone number");
    } else {
      setError(""); // Clear the error if valid
    }
  };

  // Validate Password
  const validatePassword = (password: string) => {
    if (password.length === 0) {
      setErrors((prev) => ({
        ...prev,
        password: "This field is required",
      }));
    } else if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Please enter a valid password",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full ">
      {/* Left: Signup Form */}
      <form className=" w-1/2 my-[1rem] mx-[2rem] ">
        <div className="mt-8">
          <div className="Nav flex justify-between ">
            <NavLink to="/" className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </NavLink>
            <div className="flex items-center text-[15px]">
              <p className="font-semibold text-[#27014F]">
                Already have an account?
              </p>
              <NavLink to="/Login" className=" cursor-pointer font-semibold ml-[5px] text-[#9605C5]">
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
                  onChange={handleInputChange}
                  onBlur={validateFullName}
                  className=" p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2 focus:border-purple-800 outline-none rounded-md "
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
                  onChange={handleInputChange}
                  onBlur={validateEmail}
                  className="focus:border-purple-800 text-[13px] focus:border-2 outline-none p-2.5 pl-3 pr-3 border border-[#A4A4A4] rounded-md w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-[1rem]">
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="NG"
                  value={value}
                  onChange={handlePhoneNumberChange}
                  style={
                    {
                      "--PhoneInputCountrySelect-marginRight": "0em",
                    } as React.CSSProperties
                  }
                />
                {error && (
                  <p className="text-red-500 text-[13px] mt-">{error}</p>
                )}{" "}
                {/* Show error message if invalid */}
              </div>

              <div className="relative w-full">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={() => validatePassword(formData.password)}
                  className="focus:border-purple-800  w-full focus:border-2 outline-none p-2.5 pl-3 pr-3 text-[13px] border border-[#A4A4A4] rounded-md"
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
              <div className="flex text-[14px] gap-[6px] my-[1.6rem] ">
                <input className="term" type="checkbox" id="terms" />
                <div className="flex">
                  <p>I agree to the </p>
                  <a href="" className="ml-[2.5px] underline text-[#9605C5]">
                    terms & conditions
                  </a>
                </div>
              </div>

              <button className="bg-[#9605C5] cursor-pointer font-semibold text-white p-3 rounded-[10px]">
                Create Account
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
