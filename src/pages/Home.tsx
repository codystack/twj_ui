
import { NavLink } from "react-router";
const Home = () => {
  return (
   <div>
     <div className="text-[50px] flex-col font-bold flex justify-center items-center h-screen w-full">
      <div className="">Home</div>
      <div className="flex gap-4">
        <NavLink to="signup" className="w-fit rounded-[5px] p-[10px] text-[15px] text-white bg-black">Sign Up </NavLink>
        <NavLink to="Login" className='w-fit p-[10px] rounded-[5px] text-[15px] text-white bg-black'>Login </NavLink>
      </div>
     
    </div>
    
   </div>
  );
};

export default Home;
