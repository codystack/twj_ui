// import { useParams } from "react-router";
const Dashboard = () => {
  // const params = useParams<{ dashboardId: string }>();
  // console.log(params);
  return (
    <div className="w-full overflow-hidden h-[calc(100vh-5.2rem)] mr-[2rem] mt-[5rem] rounded-tl-[30px] bg-[#fff] text-center flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        Component for Dashboardd
        {/* Simulating long content */}
        <div className="h-[1000px] ">
          Scrollable content goes here...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
