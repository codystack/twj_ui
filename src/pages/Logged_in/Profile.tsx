import userIcon from "../../assets/dashboard_img/profile/userIcon.svg";
import Camera from "../../assets/dashboard_img/profile/Camera_light.svg";
import arrowRight from "../../assets/dashboard_img/profile/Arrow_right_light.svg";
import arrowRightBtn from "../../assets/dashboard_img/profile/arrow_rightbtn.svg";
import alarmIcon from "../../assets/dashboard_img/profile/Alarm_duotone.svg";
import Delete from "../../assets/dashboard_img/profile/Trash_duotone_line.svg";
import Edit from "../../assets/dashboard_img/profile/Edit_duotone_line.svg";
import Cancel from "../../assets/dashboard_img/profile/cancel.svg";
import eye from "../../assets/auth_imgs/Eye_light.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import ProfileSecurity from "./Logged_in_components/ProfileSecurity";
import ProfileBank from "./Logged_in_components/ProfileBank";
// import { PhoneNumber } from "react-phone-number-input";
import PhoneEditModal from "./Logged_in_components/PhoneEditModal";
import "../../App.css";
import { useBankStore } from "../../store/useBankStore";
import { useAuthorizationStore } from "../../store/authorizationStore";

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
    PhoneNumber: "",
  });
  // State for password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPhoneInputModalOpen, setIsPhoneInputModalOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const {
    bankList,
    // isFetchingBanks,
    // fetchError,
    fetchBanks,
  } = useBankStore(); // comment here
  const { accessToken } = useAuthorizationStore(); // Get accessToken from Zustand

  useEffect(() => {
    if (accessToken) {
      fetchBanks();
      // console.log("Fetching banks... in useEffect:", bankList);
    }
  }, [accessToken]);

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

  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: newPhoneNumber }));
  };

  useEffect(() => {
    // Get email and name from localStorage
    const phoneNumber = localStorage.getItem("phoneNumber");
    const uniqueTWJID = localStorage.getItem("uniqueTWJID");
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    setUniqueID(uniqueTWJID ?? "");
    setEmail(email ?? "");
    setPhone(phoneNumber ?? "");
    setUserName(userName ?? "");
    // setName(storedName ?? "");
  }, []);

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto pb-4 px-4">
        {/* Nav */}
        <div className=" flex flex-col ml-[4%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] fixed w-[74.5%] z-20 bg-[#fff]  ">
            <div className="bg-[#F5F7FA] w-[35%] h-[3rem] flex items-center rounded-[50px] justify-between px-[7px]">
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
                // onClick={() => setActiveTab("bank")}
                onClick={() => {
                  fetchBanks();
                  setActiveTab("bank");
                }}
              >
                Bank
              </button>
            </div>
          </div>

          {/* Dynamic Content profile*/}
          <div className=" h-[100%]  mt-[12%] ">
            {activeTab === "account" && (
              <div className="w-[38%]">
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
                      {userName}
                      {/* John Doe */}
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
                    <p className="text-[#27014F] text-[14px]  ">{uniqueID}</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[14px] ">Email address</p>
                    <p className="text-[#27014F] text-[14px]  ">{email}</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[14px]  ">Phone</p>
                    <span className="flex gap-[2px]">
                      <p className="text-[#27014F] text-[14px]  ">{phone}</p>

                      <button onClick={() => setIsPhoneInputModalOpen(true)}>
                        <img src={Edit} alt="" className=" cursor-pointer" />
                      </button>
                    </span>

                    <PhoneEditModal
                      isOpen={isPhoneInputModalOpen}
                      onClose={() => setIsPhoneInputModalOpen(false)}
                      phoneNumber={formData.PhoneNumber}
                      onSave={handlePhoneNumberChange}
                    />
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
                    <span className="flex items-center gap-[9px] ">
                      <span className="bg-[#FF3366]/20 rounded-[100%] ml-[5px] p-[2px] mr-[2px] ">
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
                    <img src={arrowRightBtn} className="mr-[10px]" alt="" />
                  </NavLink>

                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)} // Fix: Make sure the modal opens
                      className="pb-[10%] flex text-[#F80004] items-center gap-2 cursor-pointer "
                    >
                      <span className="bg-[#F80004]/10 flex justify-between items-center p-[12px] mr-2 rounded-[100%] ">
                        <img src={Delete} alt="" />
                      </span>
                      <p>Delete Account</p>
                    </button>
                  ) : (
                    // Fullscreen Dark Overlay with Centered   w-[600px]
                    <div className="fixed inset-0 flex  items-center justify-center bg-black/40  z-[20]">
                      {/* Dialog Box */}
                      <div className="p-[0.8rem] rounded-[20px] bg-[#fff]/20">
                        <div className="bg-white w-[600px]   z-[50]   p-6 rounded-[15px] shadow-lg flex flex-col">
                          <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] pr-[10px] justify-between">
                            <h3 className="text-[17px] tracking-[1px]  text-[#27014F] ">
                              Delete my TWJ Account
                            </h3>
                            <button
                              className="cursor-pointer"
                              onClick={() => setShowForm(false)}
                            >
                              <img src={Cancel} alt="" />
                            </button>
                          </div>
                          <div className="flex justify-center my-[5%] mb-[1rem]">
                            <span className="bg-[#FF3366]/15 rounded-[100%] w-[5rem] h-[5rem] flex justify-center items-center p-[2px] mr-[2px] ">
                              <img
                                src={alarmIcon}
                                className="w-[3.5rem] "
                                alt=""
                              />
                            </span>
                          </div>

                          <div className="flex justify-center items-center">
                            <div className="w-[70%]">
                              <p className="text-[14px] text-[#0A2E65]/60 text-center">
                                You are about to delete this account, the action
                                is not reversable. Please
                                <span className="text-[#8003A9] mx-[5px] cursor-pointer">
                                  contact support
                                </span>
                                if you have any concerns about the app. If you
                                want to complete this action, enter your reason
                                and password below.
                              </p>
                              {/* Textarea */}
                              <textarea
                                onBlur={() =>
                                  validateField("reason", formData.reason)
                                }
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange} // className=""
                                className={`h-[7rem] w-full border border-[#A4A4A4] p-2 text-[13px] resize-none  mt-3 focus:border-2 outline-none rounded-md ${
                                  errors.reason
                                    ? "border border-red-600"
                                    : "focus:border-purple-800"
                                } `}
                                placeholder="Reason for Deletion..."
                              />
                              {errors.reason && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.reason}
                                </p>
                              )}

                              <div className="relative w-full mt-[8px]">
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
                              <div className="flex justify-between w-[100%] mt-[5%] mb-[2rem]  ">
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
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dynamic Content Security*/}
            {activeTab === "security" && <ProfileSecurity />}
            {/* Dynamic Content Bank*/}
            {activeTab === "bank" && <ProfileBank bankList={bankList} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
