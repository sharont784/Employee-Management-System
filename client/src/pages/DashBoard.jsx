import { useEffect, useState } from "react";
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from "../assets/assets";
import EmployeeDashboard from "../components/EmployeeDashboard";
import Loading from "../components/Loading";
import AdminDashboard from "../components/AdminDashboard";

const DashBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => { 
    setData(dummyAdminDashboardData);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading/>
  if (!data) return <p className="text-slate-500">Failed to load Dashboard</p>;

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data}/>;
  } else {
    return <EmployeeDashboard data={data}/>
  }
};

export default DashBoard;
