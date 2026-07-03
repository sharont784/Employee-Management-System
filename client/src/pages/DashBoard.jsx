import { useEffect, useState } from "react";
import {
  dummyAdminDashboardData,
  dummyEmployeeDashboardData,
} from "../assets/assets";
import EmployeeDashboard from "../components/EmployeeDashboard";
import Loading from "../components/Loading";
import AdminDashboard from "../components/AdminDashboard";
import toast from "react-hot-toast";
import api from "../api/axios";

const DashBoard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => toast.error(err.response?.data?.error || err?.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (!data) return <p className="text-slate-500">Failed to load Dashboard</p>;

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default DashBoard;
