// import React from 'react'
import { useEffect, useState } from "react";
import ToggleButton from "../../../components/ToggleButton";
import eye from "../../../assets/auth_imgs/Eye_light.svg";
import Cancel from "../../../assets/dashboard_img/profile/cancel.svg";
import OtpModal from "./OtpModal";
import SetPinModal from "./someUtilityComponent/SetPinModal";
import api from "../../../services/api";
import { AxiosError } from "axios";
import SuccessModal from "../SuccessModal";
import { useUserStore } from "../../../store/useUserStore";
import TwoFactorAuthModal from "../../../components/TwoFactorAuthModal";

const ProfileSecurity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [changePinModal, SetChangePinModal] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({ oldPassword: "", newPassword: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [openSetPinModal, setOpenSetPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalStep, setModalStep] = useState<"start" | "code">("start");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [twoFaSuccess, setTwoFaSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { fetchUser } = useUserStore();
  const isTwoFASet = useUserStore((state) => state.user?.isTwoFASet);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (typeof isTwoFASet === "boolean") {
      setIsTwoFAEnabled(isTwoFASet);
    }
  }, [isTwoFASet]);

  const passcodeSet = useUserStore((state) => state.user?.passcodeSet);

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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      validateField(name, value, updatedFormData);
      return updatedFormData;
    });
  };

  const closeModal = () => {
    setFormData({ oldPassword: "", newPassword: "" });
    setErrors({ oldPassword: "", newPassword: "" });
    setIsOpen(false);
  };
  const closeChangePinModal = () => {
    SetChangePinModal(false);
  };
  const openChangePinModal = () => {
    SetChangePinModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { oldPassword, newPassword } = formData;

    if (!oldPassword || !newPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      const response = await api.post(
        "/Authentication/changePassword",
        payload
      );

      // console.log("Password updated successfully:", response.data);
      setIsSuccessModal(true);
      setIsLoading(false);
      setFormData({ oldPassword: "", newPassword: "" });
      setIsOpen(false);
      setError("");
      return response.data;
      // Optionally clear form or redirect
    } catch (e) {
      const error = e as AxiosError<{ message: string }> | Error;
      const errorMessage =
        ("response" in error && error.response?.data?.message) ||
        error.message ||
        "An error occurred. Please try again.";
      setIsLoading(false);
      setError(errorMessage);
      return;
    }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.newPassword ||
    !formData.newPassword;

  // functions for 2FA
  const handleToggle = async () => {
    if (!isTwoFAEnabled) {
      setModalStep("start");
      setIsModalVisible(true);
    } else {
      setIsTwoFAEnabled(false);
      api
        .post("/Authentication/disable2Fa")
        .then(() => setIsTwoFAEnabled(false));
      await fetchUser();
    }
  };

  const reSendCode = async () => {
    await api.post("/Authentication/enable2Fa");
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      await api.post("/Authentication/enable2Fa");
      setModalStep("code");
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await api.post("/Authentication/verify2Fa", {
        twoFactorCode: code,
      });

      if (res?.data?.statusCode === "OK") {
        setIsTwoFAEnabled(true);
        setIsModalVisible(false);
        setTwoFaSuccess(true);
        setCode("");
      } else {
        setErrorMessage("Invalid verification code. Please try again.");
      }
    } catch (error) {
      // console.error("Error verifying 2FA:", error);
      setErrorMessage("Something went wrong. Please try again.");
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" mt-[5%]  md:mt-[1%] lg:[-1%]  w-full md:w-[60%]   lg:w-[40%]">
        <div className="flex items-center justify-between leading-[1.2rem]">
          <div className=" flex mt-[2rem] md:mt-0 flex-col">
            <p className="font-[500] text-[17px] md:text-[15px]">
              Update Password
            </p>
            <p className="md:text-[12px] text-[14px] text-[#7688B4]">
              Change your old password to a new one
            </p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#8003A9] whitespace-nowrap cursor-pointer"
          >
            Change Password
          </button>

          {/* Modal */}
          {isOpen && (
            <div className="fixed inset-0 flex z-20 items-center justify-center bg-black/40 bg-opacity-50">
              <div className="p-[1rem] rounded-[20px] bg-[#fff]/20">
                <div className="bg-white p-6 text-[#27014F] sm:w-[600px] w-[100vw] sm:h-auto h-[100vh] overflow-y-auto  sm:rounded-[15px] ">
                  <div className="flex justify-between items-center pb-[1rem] mb-[2rem] border-b-[#E2E8F0]  border-b ">
                    <h2 className="text-[20px] sm:text-[17px] pl-[10px] ">
                      Change Password
                    </h2>
                    <button
                      className="cursor-pointer mr-[10px] p-[10px]"
                      onClick={closeModal}
                    >
                      <img className="sm:w-4 w-5" src={Cancel} alt="" />
                    </button>
                  </div>
                  {/* Input Fields */}

                  <form onSubmit={handleSubmit}>
                    <div className=" flex  justify-center items-center]">
                      <div className="sm:w-[70%] w-full flex flex-col ">
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
                            className={`p-4 px-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                              errors.oldPassword
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            } `}
                          />
                          <img
                            className="absolute cursor-pointer right-[0.8rem] bottom-[0.8rem]"
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
                            className={`p-4 px-3 border text-[15px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                              errors.newPassword
                                ? "border border-red-600"
                                : "focus:border-purple-800"
                            } `}
                          />
                          <img
                            className="absolute cursor-pointer right-[0.8rem] bottom-[0.8rem]"
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

                    {error && (
                      <p className="text-red-500 text-[13px]  ml-[5.4rem] text-left">
                        {error}
                      </p>
                    )}
                    <div className="flex justify-center items-center pt-[5%]  ">
                      <button
                        type="submit"
                        className={`bg-[#9605C5]  sm:w-[70%] w-full sm:mt-0 mt-[2rem] mb-[2rem] text-white px-3 py-4 rounded-[6px]  ${
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
                          "Change Password"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {twoFaSuccess && (
            <SuccessModal
              title="2FA Activated"
              message="You have activated 2FA successfully."
              onClose={() => {
                setTwoFaSuccess(false);
                fetchUser();
              }}
            />
          )}
          {isSuccessModal && (
            <SuccessModal
              title="Password Changed"
              message="Your password has been updated successfully."
              onClose={() => {
                setIsSuccessModal(false);
                // fetchUser();
              }}
            />
          )}
        </div>
        <div className="flex items-center md:mt-[10%] mt-[16%] justify-between leading-[1.2rem]">
          <div className=" flex flex-col">
            <p className="font-[500] text-[17px] md:text-[15px]">Update PIN</p>
            <p className="md:text-[12px] text-[14px] text-[#7688B4]">
              Change or reset your TWJ PIN
            </p>
          </div>

          <>
            {passcodeSet ? (
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
        <div className="flex items-center md:mt-[10%] mt-[16%] justify-between leading-[1.2rem]">
          <div className=" flex flex-col">
            <p className="font-[500] md:text-[15px] text-[17px]">
              Two-Factor Authentication
            </p>
            <p className="md:text-[12px] text-[14px]  text-[#7688B4]">
              Protect your TWJ account from unauthorised <br /> transaction
              using a software token
            </p>
          </div>

          <>
            <button className="text-[#8003A9] cursor-pointer">
              <ToggleButton isOn={isTwoFAEnabled} onToggle={handleToggle} />
            </button>

            <TwoFactorAuthModal
              isVisible={isModalVisible}
              step={modalStep}
              code={code}
              loading={loading}
              onResend={reSendCode}
              onCodeChange={setCode}
              onClose={() => {
                setErrorMessage("");
                setIsModalVisible(false);
              }}
              onContinue={handleSendCode}
              onVerify={handleVerifyCode}
              errorMessage={errorMessage}
            />
          </>
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
