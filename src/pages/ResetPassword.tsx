import { LuHouse } from "react-icons/lu";
import Logo from "../assets/auth_imgs/Logo.svg";
import Back from "../assets/auth_imgs/Vector 9.svg";
import Reset from "../assets/auth_imgs/reset-img.png";
import "react-phone-number-input/style.css";
import { useState } from "react";
import "../App.css";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const ResetPassword = () => {
  const navigate = useNavigate();
  // Single state to hold all form values (inputs)
  const [formData, setFormData] = useState({
    emailOrPhoneNumber: "",
  });

  // Separate state for errors
  const [errors, setErrors] = useState({
    email: "",
    // PhoneNumber: "",
  });

  const {
    forgotpasswordemail,
    isLoadingEmailForgotPass,
    emailForgotPasswordError,
  } = useAuthStore();

  // localStorage.setItem("forgotPasswordEmail", emailOrPhoneNumber);

  // Update form field value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Validate Email
  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            email: "This field is required",
          }));
        } else if (!emailRegex.test(value)) {
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
        break;
    }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.emailOrPhoneNumber;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Call the login function from Zustand store
    forgotpasswordemail(formData, navigate);
    setFormData({
      emailOrPhoneNumber: "",
    });
  };

  return (
    <div className="flex h-screen w-full ">
      {/* Left: Signup Form */}
      <form onSubmit={handleSubmit} className=" w-1/2 my-[1rem] mx-[2rem] ">
        <div className="mt-8">
          <div className="Nav flex justify-between ">
            <div className="cursor-pointer">
              <img src={Logo} alt="Logo" />
            </div>

            <NavLink to="/" className="flex items-center text-[15px]">
              <img src={Back} alt="" />
              <div className=" cursor-pointer font-semibold ml-[5px] text-[#27014F]">
                Go Back
              </div>
            </NavLink>
          </div>
        </div>
        <div className="flex  h-[80%] w-[480px] justify-center m-auto items-center ">
          <div className="flex flex-col justify-center w-full p-8 bg-white">
            <h2 className="text-2xl font-bold mb-[0.4rem] text-[40px] text-[#27014F] w-full leading-[2.5rem]">
              Reset password
            </h2>
            <p className="text-[14px] text-[#27014F]">
              Please enter your registered email address to reset your password.{" "}
            </p>
            <div className="flex flex-col mt-[1rem] ">
              <div className="w-full mb-4">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  name="emailOrPhoneNumber"
                  value={formData.emailOrPhoneNumber}
                  onChange={handleInputChange}
                  onBlur={() =>
                    validateField("email", formData.emailOrPhoneNumber)
                  }
                  className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2  outline-none rounded-md ${
                    errors.email
                      ? "border border-red-600"
                      : "focus:border-purple-800"
                  } `}
                />
                {emailForgotPasswordError && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {emailForgotPasswordError}
                  </p>
                )}
              </div>

              <button
                className={`bg-[#9605C5] mt-[2rem] font-semibold text-white p-3 rounded-[10px]  ${
                  isFormInvalid
                    ? "opacity-60 cursor-not-allowed"
                    : "  cursor-pointer"
                }`}
                disabled={isFormInvalid}
              >
                {isLoadingEmailForgotPass ? (
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
                  "  Reset Password"
                )}
              </button>
              {/* <NavLink
                to=" /auth-account"
                className="bg-[#9605C5] mt-[1rem] cursor-pointer text-center font-semibold text-white p-3 rounded-[10px]"
              >
               c
              </NavLink> */}
            </div>
          </div>
        </div>
      </form>

      {/* Right: Image with Overlay */}
      <div className="relative w-[641px] h-[calc(100vh-2rem)] m-[1rem]  ">
        {/* Background Image */}
        <img
          src={Reset}
          alt="Signup"
          className="w-full h-full rounded-[3rem] bg-top object-cover object-top"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t rounded-[3rem] from-[#27014F] to-transparent opacity-90"></div>

        {/* Top-Right Icon */}

        <a
          href="https://twjhub.com/"
          className="absolute top-8 right-8 bg-white rounded-full p-[0.8rem] text-2xl cursor-pointer"
        >
          <LuHouse className=" text-[#27014F] text-[1.5rem]" />
        </a>
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

export default ResetPassword;
