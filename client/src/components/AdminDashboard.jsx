import { Building2Icon, CalendarIcon, FileTextIcon } from "lucide-react";
import React from "react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: CalendarIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organization units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];
  return (
    <div className="animate-fade-in p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>

        <p className="text-slate-500 mt-1">
          Welcome back Admin, here's your overview
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="text-sm text-slate-500 mb-1">{s.label}</p>

              <p className="text-3xl font-semibold text-slate-900">{s.value}</p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <s.icon className="w-6 h-6 text-slate-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
