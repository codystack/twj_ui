import userIcon from "../../assets/dashboard_img/profile/userIcon.svg";
import Camera from "../../assets/dashboard_img/profile/Camera_light.svg";
import arrowRight from "../../assets/dashboard_img/profile/Arrow_right_light.svg";
import arrowRightBtn from "../../assets/dashboard_img/profile/arrow_rightbtn.svg";
import alarmIcon from "../../assets/dashboard_img/profile/Alarm_duotone.svg";
import Delete from "../../assets/dashboard_img/profile/Trash_duotone_line.svg";
import Edit from "../../assets/dashboard_img/profile/Edit_duotone_line.svg";
import BankIcon from "../../assets/dashboard_img/profile/Bank_icon.svg";
import AddRing from "../../assets/dashboard_img/profile/Add_ring_light.svg";
import Cancel from "../../assets/dashboard_img/profile/cancel.svg";
import BgImage from "../../assets/dashboard_img/profile/atmcard.jpg";
import eye from "../../assets/auth_imgs/Eye_light.svg";
import { useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import { NavLink } from "react-router";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"account" | "security" | "bank">(
    "account"
  );
  const [showForm, setShowForm] = useState(false);
  // const [reason, setReason] = useState("");
  const [errors, setErrors] = useState({
    reason: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    reason: "",
    password: "",
  });
  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Update form field value
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const validateField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "reason":
        // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!value.trim()) {
          setErrors((prev) => ({
            ...prev,
            reason: "This field is required",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            reason: "",
          }));
        }
        break;

      case "password":
        if (value.length === 0) {
          setErrors((prev) => ({
            ...prev,
            password: "This field is required",
          }));
        } else if (value.length < 8) {
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
        break;

      default:
        break;
    }
  };

  const isFormInvalid =
    Object.values(errors).some((error) => error) ||
    !formData.reason ||
    !formData.password;

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Nav */}
        <div className=" flex flex-col mt-[2.3%] ml-[4%] ">
          {/* Tab Buttons */}
          <div className="bg-[#F5F7FA] w-[35%] flex items-center rounded-[50px] justify-between p-[7px]">
            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                activeTab === "account"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent text-[#7688B4]"
              }`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>

            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px] ${
                activeTab === "security"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent  text-[#7688B4]"
              }`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>

            <button
              className={`flex-1 px-[20px] cursor-pointer py-[5px] rounded-[40px]  ${
                activeTab === "bank"
                  ? "bg-[#fff] text-[#8003A9] "
                  : "bg-transparent  text-[#7688B4]"
              }`}
              onClick={() => setActiveTab("bank")}
            >
              Bank
            </button>
          </div>

          {/* Dynamic Content profile*/}
          <div className=" h-[100%]  mt-[3%] ">
            {activeTab === "account" && (
              <div className="w-[40%]">
                <div className=" px-[1rem] flex items-center gap-4">
                  <div className="imgdiv  relative rounded-[100%] w-[7rem] ">
                    <img
                      src={userIcon}
                      className="rounded-[100%]"
                      alt="user icon place holder"
                    />
                    <img
                      src={Camera}
                      className="absolute cursor-pointer  top-[2.5rem] left-[2.5rem]"
                      alt="user icon place holder"
                    />
                  </div>
                  <div>
                    <p className="text-[#27014F] text-[24px] font-bold ">
                      John Doe
                    </p>
                    <NavLink
                      to="/profile/account_upgrade"
                      className="flex hover:bg-[#F1C8FF]/80 transition-colors duration-200 bg-[#F1C8FF] p-[6px] py-[4px] text-[#27014F] cursor-pointer rounded-[5px] text-[13px] items-center gap-1 w-fit"
                    >
                      <p>Tier One</p>
                      <img src={arrowRight} alt="pointing arror to the right" />
                    </NavLink>
                  </div>
                </div>
                <div className="mt-[8%] px-[0.6rem]">
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[14px] ">Unique ID</p>
                    <p className="text-[#27014F] text-[14px]  ">TWJ62425</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[14px] ">Email address</p>
                    <p className="text-[#27014F] text-[14px]  ">
                      aromej@gmail.com
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[14px]  ">Phone</p>
                    <span className="flex gap-[2px]">
                      <p className="text-[#27014F] text-[14px]  ">
                        +2348105064355
                      </p>
                      <img src={Edit} alt="" className=" cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-[7%] ">
                    <p className="text-[#7688B4] text-[14px]  ">
                      Date of birth
                    </p>
                    <p className="text-[#27014F] text-[14px]  ">
                      18th Nov 2000
                    </p>
                  </div>
                  <NavLink
                    to="/profile/account_upgrade"
                    className="flex cursor-pointer items-center w-full justify-between bg-[#FF3366]/13 hover:bg-[#FF3366]/20 transition-colors duration-300 p-[5px] py-[8px] rounded-[10px] border border-[#FF3366] mb-[12%] "
                  >
                    <span className="flex items-center">
                      <span className="bg-[#FF3366]/20 rounded-[100%] p-[2px] mr-[2px] ">
                        <img src={alarmIcon} alt="" />
                      </span>
                      <span className="leading-[0.8rem]">
                        <p className="text-[#27014F] text-start font-[500] text-[13px] ">
                          Upgrade Account
                        </p>
                        <p className="text-[10px] text-start text-[#343E65]">
                          upgrade your account to access all features and keep
                          it safe
                        </p>
                      </span>
                    </span>
                    <img src={arrowRightBtn} alt="" />
                  </NavLink>
                  <div className="relative">
                    {!showForm ? (
                      <button
                        onClick={() => setShowForm(true)} // Fix: Make sure the modal opens
                        className="pb-[10%] flex text-[#F80004] items-center gap-2 cursor-pointer "
                      >
                        <span>
                          <img src={Delete} alt="" />
                        </span>
                        <p>Delete Account</p>
                      </button>
                    ) : (
                      // Fullscreen Dark Overlay with Centered Popup
                      <div className="fixed inset-0 flex w-[100vw] items-center h-[100vh] justify-center bg-black/40  z-100">
                        {/* Dialog Box */}
                        <div className="p-[1rem] rounded-[20px] bg-[#fff]/10">
                          <div className="bg-white w-[900px] max-w-md  z-[50]  h-[calc(100vh-2rem)] p-6 rounded-[15px] shadow-lg flex flex-col">
                            <div className="flex items-center  border-b border-b-[#A4A4A4]/50  pb-[1rem] justify-between">
                              <h3 className="text-[17px] font-semibold text-[#27014F] ">
                                Delete my TWJ Account
                              </h3>
                              <button
                                className="cursor-pointer"
                                onClick={() => setShowForm(false)}
                              >
                                <img src={Cancel} alt="" />
                              </button>
                            </div>
                            <div className="flex justify-center my-[5%]">
                              <span className="bg-[#FF3366]/15 rounded-[100%] w-[5rem] h-[5rem] flex justify-center items-center p-[2px] mr-[2px] ">
                                <img
                                  src={alarmIcon}
                                  className="w-[3.5rem] "
                                  alt=""
                                />
                              </span>
                            </div>

                            {/* Textarea */}
                            <textarea
                              onBlur={() =>
                                validateField("reason", formData.reason)
                              }
                              name="reason"
                              value={formData.reason}
                              onChange={handleInputChange} // className=""
                              className={` w-full border border-[#A4A4A4] p-2  resize-none h-[40%] mt-3 focus:border-2 outline-none rounded-md ${
                                errors.reason
                                  ? "border border-red-600"
                                  : "focus:border-purple-800"
                              } `}
                              placeholder="Reason for Deletion..."
                            ></textarea>
                            {errors.reason && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.reason}
                              </p>
                            )}

                            <div className="relative w-full mt-[5%]">
                              <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={() =>
                                  validateField("password", formData.password)
                                }
                                className={`p-2.5 pl-3 pr-3 border text-[13px] border-[#A4A4A4] w-full focus:border-2 outline-none rounded-md ${
                                  errors.password
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
                            {errors.password && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.password}
                              </p>
                            )}

                            {/* Buttons */}
                            <div className="flex justify-between mt-[5%] w-full ">
                              <button
                                className={`bg-[#9605C5] w-full  text-white p-3 rounded-[6px]  ${
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
                                Delete Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Content Security*/}
            {activeTab === "security" && (
              <div className="mt-[4%] w-[40%]">
                <div className="flex items-center justify-between leading-[1.2rem]">
                  <div className=" flex flex-col">
                    <p className="font-[500]">Update Password</p>
                    <p className="text-[12px] text-[#7688B4]">
                      Change your old password to a new one
                    </p>
                  </div>
                  <button className="text-[#8003A9] cursor-pointer">
                    Change Password
                  </button>
                </div>
                <div className="flex items-center mt-[10%] justify-between leading-[1.2rem]">
                  <div className=" flex flex-col">
                    <p className="font-[500]">Update PIN</p>
                    <p className="text-[12px] text-[#7688B4]">
                      Change or reset your TWJ PIN
                    </p>
                  </div>
                  <button className="text-[#8003A9] cursor-pointer">
                    Change Pin
                  </button>
                </div>
                <div className="flex items-center mt-[10%] justify-between leading-[1.2rem]">
                  <div className=" flex flex-col">
                    <p className="font-[500]">Two-Factor Authentication</p>
                    <p className="text-[12px]  text-[#7688B4]">
                      Protect your TWJ account from unauthorised <br />{" "}
                      transaction using a software token
                    </p>
                  </div>
                  <button className="text-[#8003A9] cursor-pointer">
                    <ToggleButton />
                  </button>
                </div>
              </div>
            )}
            {/* Dynamic Content Bank*/}
            {activeTab === "bank" && (
              <div className="flex gap-[2.5rem]">
                <button className="h-[182px] w-[320px] border flex flex-col items-center justify-center cursor-pointer border-[#D0DAE6]  hover:border-[#8003A9] rounded-[10px]">
                  <img src={AddRing} alt="" />
                  <p className="text-[#8003A9]">Add bank account</p>
                </button>
                <div
                  className="relative h-[182px] w-[320px]  rounded-[10px] overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url(${BgImage})` }} // Ensure this path is correct
                >
                  {/* Overlay with opacity */}
                  <div className="absolute inset-0 bg-[#8003A9]/80"></div>{" "}
                  {/* Adjust /60 for more/less opacity */}
                  {/* Icon (Top-right) */}
                  <div className="absolute top-3 right-3 text-white text-xl cursor-pointer">
                    <img src={BankIcon} alt="" />
                  </div>
                  {/* Text (Bottom-left) */}
                  <div className="absolute bottom-3 left-3 leading-[1.1rem] text-white">
                    <p className="text-[16px] font-semibold">John Doe</p>
                    <p className="text-[14px] ">2364238745</p>
                    <p className="text-[12px] ">Sterling Bank</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
