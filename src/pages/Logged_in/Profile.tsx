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
import { useState } from "react";
import ToggleButton from "../../components/ToggleButton";
import { NavLink } from "react-router";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"account" | "security" | "bank">(
    "account"
  );
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {/* Nav */}
        <div className=" flex flex-col mt-[1.3%] ml-[1%] ">
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
                <div className="mt-[3%] px-[0.6rem]">
                  <div className="flex items-center justify-between mb-[4%] ">
                    <p className="text-[#7688B4] text-[14px] ">Unique ID</p>
                    <p className="text-[#27014F] text-[14px]  ">TWJ62425</p>
                  </div>
                  <div className="flex items-center justify-between mb-[4%] ">
                    <p className="text-[#7688B4] text-[14px] ">Email address</p>
                    <p className="text-[#27014F] text-[14px]  ">
                      aromej@gmail.com
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-[4%] ">
                    <p className="text-[#7688B4] text-[14px]  ">Phone</p>
                    <span className="flex gap-[2px]">
                      <p className="text-[#27014F] text-[14px]  ">
                        +2348105064355
                      </p>
                      <img src={Edit} alt="" className=" cursor-pointer" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-[4%] ">
                    <p className="text-[#7688B4] text-[14px]  ">
                      Date of birth
                    </p>
                    <p className="text-[#27014F] text-[14px]  ">
                      18th Nov 2000
                    </p>
                  </div>
                  <NavLink
                    to="/profile/account_upgrade"
                    className="flex cursor-pointer items-center w-full justify-between bg-[#FF3366]/13 hover:bg-[#FF3366]/20 transition-colors duration-300 p-[5px] py-[8px] rounded-[10px] border border-[#FF3366] mb-[7%] "
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
                        className="mt-[5%] flex text-[#F80004] items-center gap-2 cursor-pointer "
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
                            <div className="flex items-center  border-b border-b-[#E2E8F0] pb-[1rem] justify-between">
                              <h3 className="text-[17px] font-semibold text-[#27014F] ">
                                Delete my TWJ Account
                              </h3>
                              <button className="cursor-pointer" onClick={() => setShowForm(false)}>
                                
                                <img src={Cancel} alt="" />
                              </button>
                            </div>

                            {/* Textarea */}
                            <textarea
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              className="w-full border p-2 rounded-md resize-none h-24 mt-3"
                              placeholder="Enter your reason..."
                            ></textarea>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4">
                              <button
                                onClick={() => {
                                  console.log("Reason:", reason);
                                  // Handle delete logic here
                                }}
                                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
                              >
                                Confirm Delete
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
                <div className="flex items-center mt-[6%] justify-between leading-[1.2rem]">
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
                <div className="flex items-center mt-[6%] justify-between leading-[1.2rem]">
                  <div className=" flex flex-col">
                    <p className="font-[500]">Two-Factor Authentication</p>
                    <p className="text-[12px] text-[#7688B4]">
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
