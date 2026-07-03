import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  Loader2,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useAuth } from "../context/authContext";
import api from "../api/axios";

const Sidebar = () => {
  const { pathname } = useLocation();

  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      if (data.firstName)
        setUserName(`${data.firstName}${data.lasttName || ""}`.trim());
    });
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = user?.role;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },

    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },

    { name: "Leave", href: "/leave", icon: FileTextIcon },

    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },

    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout()
    window.location.href = "/login";
  };

  const sidebarcontent = (
    <>
      {/* brand header */}
      <div className="border-b border-white/10 p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="w-7 h-7 text-white" />

            <div>
              <p className="text-white font-semibold text-lg">Employee MS</p>

              <p className="text-slate-400 text-sm">Management System</p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* user profile card */}
      {userName && (
        <div className="p-4">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-white/10 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>

              <div>
                <p className="text-white font-medium">{userName}</p>

                <p className="text-slate-400 text-sm">
                  {role === "ADMIN" ? "Administrator" : "Employee"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* section label */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
          Navigation
        </p>
      </div>

      {/* navigation list */}
      <div className="px-3 space-y-2">
        {loading ? (
          <div>
            <Loader2 className="animate-spin w-4 h-4"/>
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative
              
              ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-200"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-400" />
                )}

                <item.icon
                  className={`w-5 h-5 transition-colors
                ${
                  isActive
                    ? "text-indigo-300"
                    : "text-slate-400 group-hover:text-white"
                }`}
                />

                <span className="font-medium flex-1">{item.name}</span>

                {isActive && (
                  <ChevronRightIcon className="w-4 h-4 text-indigo-300" />
                )}
              </Link>
            );
          })
        )}
      </div>

      {/* logout */}
      <div className="mt-auto border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          <LogOutIcon className="w-5 h-5" />

          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg shadow-lg"
      >
        <MenuIcon size={20} />
      </button>

      {/* mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* sidebar - desktop */}
      <aside className="hidden md:flex w-72 min-h-screen bg-[#050B2C] border-r border-white/10 flex-col">
        {sidebarcontent}
      </aside>

      {/* sidebar - mobile */}
      <aside
        className={`fixed top-0 left-0 z-50 w-72 min-h-screen bg-[#050B2C] border-r border-white/10 flex flex-col transition-transform duration-300 md:hidden

        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarcontent}
      </aside>
    </>
  );
};

export default Sidebar;
