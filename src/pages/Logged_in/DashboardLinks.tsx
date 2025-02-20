import { useParams } from "react-router";
const DashboardLinks = () => {
  const params = useParams<{ dashboardId: string }>();
  console.log(params);
  return (
    <div className="w-[80%] overflow-hidden  ml-[250px] h-[100] mr-[2rem] mt-[6rem]  rounded-tl-[30px]   bg-[#fff] flex justify-center items-center">
      ergegergerg
      <div className="text-[30px] h-[1212px] font-bold"> {params.dashboardId}</div>
    </div>
  );
};

export default DashboardLinks;
