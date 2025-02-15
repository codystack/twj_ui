import { LuHouse } from "react-icons/lu";
import LoginImg from "../assets/auth_imgs/login-img.png";
import Logo from "../assets/auth_imgs/Logo.svg";
import "react-phone-number-input/style.css";
import { useState } from "react";
import eye from "../assets/auth_imgs/Eye_light.svg";
import "../App.css";
import { NavLink } from "react-router";

const Login = () => {
  // Single state to hold all form values (inputs)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Separate state for errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    // PhoneNumber: "",
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
            <div className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="flex items-center text-[15px]">
              <p className="font-semibold text-[#27014F]">
                Don't have an account?
              </p>
              <NavLink
                to="/signup"
                className=" cursor-pointer font-semibold ml-[5px] text-[#9605C5]"
              >
                Create Account
              </NavLink>
            </div>
          </div>
        </div>
        <div className="flex w-full h-[80%] justify-center items-center ">
          <div className="flex flex-col justify-center w-full p-8 bg-white">
            <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
              Welcome back
            </h2>
            <p className="text-[14px] text-[#27014F]">
              We're happy to see you here again.
            </p>
            <div className="flex flex-col mt-[2rem] ">
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

              <p className="text-[13px] text-end cursor-pointer text-[#27014F] underline bold-semibold mt-[5px] ">
                Forgot password?
              </p>

              <button className="bg-[#9605C5] mt-[2rem] cursor-pointer font-semibold text-white p-3 rounded-[10px]">
                Log In
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-screen m-[1rem]  ">
        {/* Background Image */}
        <img
          src={LoginImg}
          alt="Signup"
          className="w-full h-full rounded-[3rem] object-top object-cover"
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

export default Login;
