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
import { useUserStore } from "../../store/useUserStore";
import { useLocation, Location } from "react-router-dom";
import api from "../../services/api";
import PinModal from "./Logged_in_components/someUtilityComponent/PinModal";
import SuccessModal from "./SuccessModal";
import cancel from "../../assets/dashboard_img/profile/cancel.svg";
import SetPinModal from "./Logged_in_components/someUtilityComponent/SetPinModal";
import { useModalStore } from "../../store/modalStore";

// const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const [name, setName] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [phoneToVerify, setPhoneToVerify] = useState<string | undefined>(
    undefined
  );
  const [showPinModal, setShowPinModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [proceedToSetPin, setProceedToSetPin] = useState(false);
  // const [showKycPrompt, setShowKycPrompt] = useState(false);
  const [shouldCheckPasscode, setShouldCheckPasscode] = useState(false);
  const { isSuccessModalStore, setDataSuccessModal } = useModalStore();
  const {
    bankList,
    // isFetchingBanks,
    // fetchError,
    fetchBanks,
  } = useBankStore();

  const { user, fetchUser } = useUserStore();
  const { accessToken } = useAuthorizationStore(); // Get accessToken from Zustand

  useEffect(() => {
    if (accessToken) {
      fetchBanks();
      fetchUser();
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

  // const handlePhoneNumberChange = (newPhoneNumber: string) => {
  //   setFormData((prev) => ({ ...prev, phoneNumber: newPhoneNumber }));
  // };

  useEffect(() => {
    // Get email and name from localStorage
    const phoneNumber = localStorage.getItem("phoneNumber");
    const uniqueTWJID = localStorage.getItem("uniqueTWJID");
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("fullname");

    setUniqueID(uniqueTWJID ?? "");
    setPhone(phoneNumber ?? "");
    setUserName(userName ?? "");
    setName(name ?? "");
    setEmail(email ?? "");
    // console.log(user?.dateOfBirth)
    // setName(storedName ?? "");
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`);
      setUniqueID(user.twjUserId);
      setPhone(user.phoneNumber);
      setUserName(user.userName);
    }
  }, [user]);

  type LocationState = {
    activeTab?: string;
  };

  const location = useLocation() as Location & { state: LocationState };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  const isPasscodeSet = () => localStorage.getItem("passcodeSet") === "true";
  const closeModal = () => {
    setShowPinModal(false);
    setPhoneToVerify(undefined);
  };

  const onVerify = () =>
    new Promise<void>((resolve, reject) => {
      (async () => {
        try {
          const payload = [
            {
              operationType: "Replace",
              path: "/phoneNumber",
              op: "replace",
              from: "",
              value: phoneToVerify,
            },
          ];

          const response = await api.patch(
            "/Users/updateUserProfiles",
            payload
          );
          // console.log("Phone number updated:", response.data);

          await fetchUser();
          setIsSuccessModal(true);
          resolve();
          return response;
        } catch (e) {
          // console.error("Failed to update phone number:", e);
          reject(e);
        }
      })();
    });

 
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto pb-4 px-4">
        {/* Nav */}
        <div className=" flex flex-col md:ml-[2%] ">
          {/* Tab Buttons */}
          <div className="py-[2.3%] md:ml-0 ml-[-7px]  fixed [@media(min-width:1350px)]:w-[75.5%] w-[95%] z-20 bg-[#fff]  ">
            <div className="bg-[#F5F7FA] w-full   [@media(min-width:900px)]:w-[35%] pr[2rem] h-[3rem] flex items-center rounded-[50px] justify-between px-[7px]">
              <button
                className={`flex-1 px-[20px] text-[17px] cursor-pointer py-[5px] rounded-[40px] ${
                  activeTab === "account"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent text-[#7688B4]"
                }`}
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>

              <button
                className={`flex-1 px-[20px] text-[17px] cursor-pointer py-[5px] rounded-[40px] ${
                  activeTab === "security"
                    ? "bg-[#fff] text-[#8003A9] "
                    : "bg-transparent  text-[#7688B4]"
                }`}
                onClick={() => setActiveTab("security")}
              >
                Security
              </button>

              <button
                className={`flex-1 px-[20px] text-[17px] cursor-pointer py-[5px] rounded-[40px]  ${
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
          <div className=" h-[100%]  mt-[18%] [@media(min-width:700px)]:mt-[12%]  ">
            {activeTab === "account" && (
              <div className="w-full md:w-[50%]   lg:w-[38%] ">
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
                      {name}
                    </p>
                    <NavLink
                      to="/profile/account_upgrade"
                      className="flex hover:bg-[#F1C8FF]/80 transition-colors duration-200 bg-[#F1C8FF] p-[6px] py-[4px] text-[#27014F] cursor-pointer rounded-[5px] md:text-[13px] text-[17px] items-center gap-1 w-fit"
                    >
                      <p>Tier One</p>
                      <img src={arrowRight} alt="pointing arror to the right" />
                    </NavLink>
                  </div>
                </div>
                <div className="mt-[8%] md:px-[0.6rem]">
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[17px] md:text-[14px] ">Username</p>
                    <p className="text-[#27014F] text-[17px] md:text-[14px]  "> {userName}</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[17px] md:text-[14px] ">Unique ID</p>
                    <p className="text-[#27014F] text-[17px] md:text-[14px]  ">{uniqueID}</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[17px] md:text-[14px] ">Email address</p>
                    <p className="text-[#27014F] text-[17px] md:text-[14px]  ">{email}</p>
                  </div>
                  <div className="flex items-center justify-between mb-[6%] ">
                    <p className="text-[#7688B4] text-[17px] md:text-[14px] ">Phone</p>
                    <span className="flex gap-[2px]">
                      <p className="text-[#27014F] text-[17px] md:text-[14px]  ">{phone}</p>

                      <button onClick={() => setIsPhoneInputModalOpen(true)}>
                        <img src={Edit} alt="" className=" cursor-pointer" />
                      </button>
                    </span>

                    {isPhoneInputModalOpen && (
                      <PhoneEditModal
                        onClose={() => setIsPhoneInputModalOpen(false)}
                        onSave={(phoneNumber) => {
                          setPhoneToVerify(phoneNumber);
                          setShowPinModal(true);
                          setShouldCheckPasscode(true);
                        }}
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-[7%] ">
                    <p className="text-[#7688B4] text-[17px] md:text-[14px]  ">
                      Date of birth
                    </p>
                    <p className="text-[#27014F] text-[17px] md:text-[14px]">
                      {user?.dateOfBirth &&
                      !isNaN(new Date(user.dateOfBirth).getTime())
                        ? new Date(user.dateOfBirth).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : ""}
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
                        <p className="text-[#27014F] text-start font-[500] text-[15px] md:text-[13px] ">
                          Upgrade Account
                        </p>
                        <p className="md:text-[10px] text-[12px] text-start text-[#343E65]">
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
                      <p className="text-[18px]">Delete Account</p>
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

            {showPinModal && isPasscodeSet() && (
              <PinModal
                onClose={() => {
                  setShowPinModal(false);
                  closeModal();
                }}
                onVerify={onVerify}
              />
            )}

            {/* Inline Info Modal (before SetPinModal) */}
            {showPinModal &&
              shouldCheckPasscode &&
              !isPasscodeSet() &&
              !proceedToSetPin && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-2xl  w-[500px] text-center">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowPinModal(false)}
                        className="px-4 py-2 mr-[5px] cursor-pointer "
                      >
                        <img src={cancel} alt="" />
                      </button>
                    </div>
                    <div className="flex flex-col items-center mt-4">
                      <div className="w-[70%] flex flex-col justify-center items-center">
                        <div className="my-5">
                          <span className="bg-[#FF3366]/15 rounded-full w-[5rem] h-[5rem] flex justify-center items-center p-[2px]">
                            <img
                              src={alarmIcon}
                              className="w-[3.5rem]"
                              alt="Alarm Icon"
                            />
                          </span>
                        </div>
                        <p className="text-[#0A2E65]/60 tracking-[1px] leading-[1.5rem] text-[20px] mb-6">
                          Setup transation PIN to complete transaction.
                        </p>
                        <div className="flex w-full justify-center gap-4">
                          <button
                            onClick={() => {
                              closeModal();
                              setProceedToSetPin(true);
                            }}
                            className="bg-[#8003A9] text-white px-4 w-full text-[18px] py-2 mb-[2rem]  ease-in-out duration-300 cursor-pointer rounded-[5px]  hover:bg-[#8003A9]/90 transition"
                          >
                            Setup PIN
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* After Proceed: Show SetPinModal */}
            {proceedToSetPin && (
              <SetPinModal onClose={() => setProceedToSetPin(false)} />
            )}

            {/* Success Modal */}
            {isSuccessModal && (
              <SuccessModal
                title="Phone Number Updated"
                message="Your phone number has been updated successfully!"
                onClose={() => {
                  setIsSuccessModal(false);
                  // fetchUser();
                }}
              />
            )}

            {isSuccessModalStore && (
              <SuccessModal
                title="PIN Set Successfully"
                message="Your transaction PIN has been created!"
                onClose={() => {
                  setDataSuccessModal(false);
                  // fetchUser();
                }}
              />
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
