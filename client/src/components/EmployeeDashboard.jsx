import {
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  ArrowRightIcon,
} from "lucide-react";

import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {

  const emp = data.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },

    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },

    {
      icon: DollarSignIcon,
      value: data.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",

      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];

  return (
    <div className="animate-fade-in p-6">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-semibold text-slate-900">
          Welcome, {emp?.firstName}!
        </h1>

        <p className="text-slate-500 mt-1">
          {emp?.position} - {emp?.department || "No Department"}
        </p>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {cards.map((card, index) => (

          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
          >

            <div>

              <p className="text-sm text-slate-500 mb-1">
                {card.title}
              </p>

              <p className="text-3xl font-semibold text-slate-900">
                {card.value}
              </p>

            </div>

            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">

              <card.icon className="w-6 h-6 text-slate-500" />

            </div>

          </div>

        ))}

      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <Link
          to="/attendance"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          Mark Attendance

          <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link
          to="/leave"
          className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-100 text-slate-700 px-5 py-3 rounded-xl font-medium transition"
        >
          Apply for Leave
        </Link>

      </div>

    </div>
  );
};

export default EmployeeDashboard;