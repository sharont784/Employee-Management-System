import { useCallback, useEffect, useState } from "react";
import { dummyAttendanceData } from "../assets/assets";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
import api from "../api/axios";
import {toast} from "react-hot-toast"

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/attendance");
      const json = res.data;
      setHistory(json.data || [])
      if(json.employee?.isDeleted) setIsDeleted(true)
    } catch (err) {
      toast.error(err.response?.data?.error || err?.message)      
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 text-lg font-medium">
          Loading...
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Attendance
        </h1>

        <p className="mt-1 text-gray-500">
          Track your work hours and daily check-ins
        </p>
      </div>

      {isDeleted ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm">
            You can no longer clock in or out because your employee
            records have been marked as deleted.
          </p>
        </div>
      ) : (
        <div className="fixed bottom-6 right-6 z-50">
          <CheckInButton
            todayRecord={todayRecord}
            onAction={fetchData}
          />
        </div>
      )}

      <AttendanceStats history={history} />

      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;