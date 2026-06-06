import { AlertCircleIcon, CalculatorIcon, ClockIcon } from "lucide-react";
import React from "react";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE",
  ).length;

  const totalLate = history.filter(
    (h) => h.status === "LATE",
  ).length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: CalculatorIcon,
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon,
    },
    {
      label: "Avg. Work Hrs",
      value: "8.5 Hrs",
      icon: ClockIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="relative bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-400 rounded-l-2xl" />

          <div className="bg-gray-100 p-4 rounded-xl">
            <s.icon className="w-6 h-6 text-gray-600" />
          </div>

          <div>
            <p className="text-gray-500 text-sm font-medium">
              {s.label}
            </p>

            <p className="text-3xl font-bold text-gray-900">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;