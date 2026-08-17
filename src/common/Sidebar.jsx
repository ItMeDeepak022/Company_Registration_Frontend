import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Company Registration", path: "/dashboard/company-registration" },
  { name: "Company Verification", path: "/dashboard/company-verification" },
  { name: "All Companies", path: "/dashboard/companies" },
  { name: "Profile", path: "/dashboard/profile" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-[#d9dde002] border-r border-gray-200 fixed left-0 top-0 bottom-0 z-30">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-black">Dashboard</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              `block border-l-4 px-6 py-3 text-sm font-medium ${
                isActive
                  ? "border-blue-600 bg-blue-100 text-blue-600"
                  : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 ">
        <button
          onClick={logout}
          className="w-full py-2 text-sm font-medium text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
