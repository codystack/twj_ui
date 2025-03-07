import BankIcon from "../../../assets/dashboard_img/profile/Bank_icon.svg";
import AddRing from "../../../assets/dashboard_img/profile/Add_ring_light.svg";
import BgImage from "../../../assets/dashboard_img/profile/atmcard.jpg";

const ProfileBank = () => {
  return (
    <div className="flex gap-[2.5rem]">
      <button className="h-[182px] w-[320px] border flex flex-col items-center justify-center cursor-pointer border-[#D0DAE6]  hover:border-[#8003A9] transition duration-300 rounded-[10px]">
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
  );
};

export default ProfileBank;
