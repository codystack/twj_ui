import { FaArrowLeft } from "react-icons/fa";
import { NavLink } from "react-router";

const BuyCrypto = () => {
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 ">
        <div className="flex justify-center items-center">
          <div className=" w-full  p-4">
            <div className="flex justify-start items-center mb-2">
              <NavLink className="flex items-center gap-1 " to="/wallet">
                <FaArrowLeft className="text- cursor-pointer" />
                <p className="text-[15px]">Back</p>
              </NavLink>
            </div>
            <div className="w-full grid [grid-template-columns:45%_55%]   ">
              {/* Left section */}
              <div className="border ">hell</div>

              {/* Right section */}
              <div className=" border "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCrypto;
