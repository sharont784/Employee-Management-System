import { Loader2Icon, LogInIcon, LogOutIcon } from "lucide-react";
import React, { useState } from "react";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onAction();
    }, 1000);
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Work Day Completed
        </h3>

        <p className="text-gray-500 mt-1">
          Great job! See you tomorrow.
        </p>
      </div>
    );
  }

  const ischeckedIn = !!todayRecord?.ischeckedIn;

  return (
    <div className="">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`group flex items-center gap-4 px-6 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-white ${
          ischeckedIn
            ? "bg-gradient-to-r from-red-500 to-red-600"
            : "bg-gradient-to-r from-purple-500 to-indigo-600"
        } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <Loader2Icon className="w-6 h-6 animate-spin flex-shrink-0" />
        ) : ischeckedIn ? (
          <LogOutIcon className="w-6 h-6 flex-shrink-0" />
        ) : (
          <LogInIcon className="w-6 h-6 flex-shrink-0" />
        )}

        <div className="text-left">
          <h2 className="font-semibold text-lg capitalize">
            {loading
              ? "Processing..."
              : ischeckedIn
              ? "Clock Out"
              : "Clock In"}
          </h2>

          <p className="text-sm text-white/80">
            {ischeckedIn
              ? "Click to end your shift"
              : "Start your work day"}
          </p>
        </div>
      </button>
    </div>
  );
};

export default CheckInButton;