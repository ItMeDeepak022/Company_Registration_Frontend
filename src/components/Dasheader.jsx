import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineCancel, MdAdminPanelSettings } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Company Registration", path: "/dashboard/company-registration" },
  { name: "Company Verification", path: "/dashboard/company-verification" },
  { name: "All Companies", path: "/dashboard/companies" },
  { name: "Profile", path: "/dashboard/profile" },
];

export default function Dasheader() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    // sticky (not fixed) — no width math needed, and it can never overlap page content.
    // Parent (Dashboard.jsx) already offsets content with lg:pl-64 for the sidebar.
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-4 sm:px-6 shadow border-b border-slate-200">
      <div className="flex items-center gap-3 min-w-0">
        <h2 className="hidden lg:block truncate text-2xl  font-bold text-[#312C85]">
          VerifyFlow <span> & Varification App</span>
        </h2>

        {/* Mobile menu toggle — shown below the lg breakpoint, matching Sidebar's cutoff */}
        <button
          onClick={toggleMenu}
          aria-label={showMenu ? "Close menu" : "Open menu"}
          className="lg:hidden text-2xl text-slate-700"
        >
          {showMenu ? <MdOutlineCancel /> : <CiMenuFries />}
        </button>

        <span className="sm:hidden block text-[25px]  font-bold text-[#312C85] ml-10"> VerifyFlow </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-slate-700 text-base">Welcome, Admin</span>
        <MdAdminPanelSettings className="text-4xl text-slate-500" />
      </div>

      {/* Mobile dropdown nav */}
      <div
        className={`absolute left-0 top-16 w-full min-h-screen bg-white lg:hidden
          overflow-hidden transition-all duration-500 ease-in-out
          ${showMenu ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={toggleMenu}
              className={({ isActive }) =>
                `p-4 pl-5 border-b border-gray-200 ${isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <button
            onClick={logout}
            className="text-left p-4 pl-5 border-b border-gray-200 text-red-600 font-medium"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
