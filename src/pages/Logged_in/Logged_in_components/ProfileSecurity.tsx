// import React from 'react'
import { useEffect, useState } from "react";
import ToggleButton from "../../../components/ToggleButton";
import eye from "../../../assets/auth_imgs/Eye_light.svg";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";
import OtpModal from "./OtpModal";
import SetPinModal from "./someUtilityComponent/SetPinModal";

const ProfileSecurity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changePinModal, SetChangePinModal] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({ oldPassword: "", newPassword: "" });
  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasscodeSet, setIsPasscodeSet] = useState(false);
  const [openSetPinModal, setOpenSetPinModal] = useState(false);

  useEffect(() => {
    const passcodeSet = localStorage.getItem("passcodeSet");

    if (passcodeSet === "true") {
      setIsPasscodeSet(true);
    } else {
      setIsPasscodeSet(false);
    }
  }, []);

  const validateField = (
    fieldName: string,
    value: string,
    formData: { oldPassword: string; newPassword: string }
  ) => {
    switch (fieldName) {
      case "oldPassword":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            oldPassword: "This field is required",
          }));
        } else if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            oldPassword: "Please enter a valid password",
          }));
        } else if (formData.newPassword && value === formData.newPassword) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "Old password must be different from the new password",
          }));
        } else {
          setErrors((prev) => ({ ...prev, oldPassword: "" }));
        }
        break;

      case "newPassword":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "This field is required",
          }));
        } else if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "Please enter a valid password",
          }));
        } else if (formData.oldPassword && value === formData.oldPassword) {
          setErrors((prev) => ({
            ...prev,
            newPassword: "New password must be different from the old password",
          }));
        } else {
          setErrors((prev) => ({ ...prev, newPassword: "" }));
        }
        break;

      default:
        break;
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Update form field value
  // const handleInputChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   validateField(name, value, );

  //   // validateField(name, value);
  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      validateField(name, value, updatedFormData); // ✅ Pass updated formData
      return updatedFormData;
    });
  };

  const closeModal = () => {
    setFormData({ oldPassword: "", newPassword: "" });
    setErrors({ oldPassword: "", newPassword: "" });
    setIsOpen(false);
  };
  const closeChangePinModal = () => {
    // setErrors({ oldPassword: "", newPassword: "" });
    SetChangePinModal(false);
  };
  const openChangePinModal = () => {
    // setErrors({ oldPassword: "", newPassword: "" });
    SetChangePinModal(true);
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.newPassword ||
    !formData.newPassword;

  return (
    <>
      <div className="mt-[1%] w-[40%]">
        <div className="flex items-center justify-between leading-[1.2rem]">
          <div className=" flex flex-col">
            <p className="font-[500]">Update Password</p>
            <p className="text-[12px] text-[#7688B4]">
              Change your old password to a new one
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#8003A9] cursor-pointer"
          >
            Change Password
          </button>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex z-20 items-center justify-center bg-black/40 bg-opacity-50">
              <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
                <div className="bg-white p-6 text-[#27014F] w-[600px] rounded-[15px] ">
                  <div className="flex justify-between items-center pb-[1rem] mb-[2rem] mt-[1rem] border-b-[#E2E8F0]  border-b ">
                    <h2 className="text-xl pl-[10px] font-semibold ">
                      Change Password
                    </h2>
                    <button
                      className="cursor-pointer mr-[10px] p-[10px]"
                      onClick={closeModal}
                    >
                      <img src={Cancel} alt="" />
                    </button>
                  </div>
                  {/* Input Fields */}

                  <div className=" flex  justify-center items-center]">
                    <div className="w-[70%] flex flex-col ">
                      <div className="relative w-full">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="Old Password"
                          name="oldPassword"
                          value={formData.oldPassword}
                          onChange={handleInputChange}
                          // onBlur={() =>
                          //   validateField("password", formData.oldPassword)
                          // }
                          onBlur={() =>
                            validateField(
                              "oldPassword",
                              formData.oldPassword,
                              formData
                            )
                          }
                          className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                            errors.oldPassword
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
                      {errors.oldPassword && (
                        <p className="text-red-500 text-[13px] ">
                          {errors.oldPassword}
                        </p>
                      )}

                      <div className="relative mt-[15px] w-full">
                        <input
                          type={isPasswordVisible ? "text" : "password"}
                          placeholder="New Password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          // onBlur={() =>
                          //   validateField("password", formData.newPassword)
                          // }
                          onBlur={() =>
                            validateField(
                              "newPassword",
                              formData.newPassword,
                              formData
                            )
                          }
                          className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
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
                        <p className="text-red-500 text-[13px] mt-[px]">
                          {errors.newPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center items-center pt-[5%]  ">
                    <button
                      className={`bg-[#9605C5]  w-[70%] mb-[2rem] text-white p-3 rounded-[6px]  ${
                        isFormInvalid
                          ? "opacity-60 cursor-not-allowed"
                          : "  cursor-pointer"
                      }`}
                      disabled={isFormInvalid}
                    >
                      {/* {isLoadingLogin ? (
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
                  "Log In"
                )} */}
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center mt-[10%] justify-between leading-[1.2rem]">
          <div className=" flex flex-col">
            <p className="font-[500]">Update PIN</p>
            <p className="text-[12px] text-[#7688B4]">
              Change or reset your TWJ PIN
            </p>
          </div>
          {/* <button
          onClick={openChangePinModal}
          className="text-[#8003A9] cursor-pointer"
        >
          Change Pin
        </button> */}
          <>
            {isPasscodeSet ? (
              <button
                onClick={openChangePinModal}
                className="text-[#8003A9] cursor-pointer"
              >
                Change PIN
              </button>
            ) : (
              <button
                onClick={() => setOpenSetPinModal(true)}
                className="text-[#8003A9] cursor-pointer"
              >
                Set PIN
              </button>
            )}
          </>
          {/* OTP Modal */}
          <OtpModal
            changePinModal={changePinModal}
            closeChangePinModal={closeChangePinModal}
          />
        </div>
        <div className="flex items-center mt-[10%] justify-between leading-[1.2rem]">
          <div className=" flex flex-col">
            <p className="font-[500]">Two-Factor Authentication</p>
            <p className="text-[12px]  text-[#7688B4]">
              Protect your TWJ account from unauthorised <br /> transaction
              using a software token
            </p>
          </div>
          <button className="text-[#8003A9] cursor-pointer">
            <ToggleButton />
          </button>
        </div>
      </div>

      {/* Set PIN Modal */}
      {openSetPinModal && (
        <SetPinModal onClose={() => setOpenSetPinModal(false)} />
      )}
    </>
  );
};

export default ProfileSecurity;
