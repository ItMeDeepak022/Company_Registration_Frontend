import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import api from "../services/api";
import { ToastContainer } from "react-toastify";

export default function Dasheader() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const [fname, setFname] = useState('');

  const getUserData = async () => {
    try {
      const res = await api.get('/user-auth/get-user');
      const finalRes = res.data;
      if (finalRes?.data && finalRes.data.length > 0) {
        setFname(finalRes.data[0].name || '');
      }
    } catch (err) {
      console.log("Error fetching user data in header:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const firstLetter = fname?.charAt(0)?.toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between bg-white px-4 sm:px-6 shadow border-b border-slate-200">
      <div className="flex items-center gap-3 min-w-0">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        {/* Mobile menu toggle — shown below the lg breakpoint, matching Sidebar's cutoff */}
=======
        {/* Mobile menu toggle */}
>>>>>>> Stashed changes
=======
        {/* Mobile menu toggle */}
>>>>>>> Stashed changes
        <button
          onClick={toggleMenu}
          aria-label={showMenu ? "Close menu" : "Open menu"}
          className="lg:hidden text-2xl text-slate-700 pl-3"
        >
          {showMenu ? <MdOutlineCancel /> : <CiMenuFries />}
        </button>

        <div className="sm:flex flex-col sm:pl-0 pl-10 hidden">
          <p className="text-gray-400 uppercase text-xs">Welcome Back</p>
          <h2 className="hidden lg:block font-bold text-[#312C85]">
            {fname || 'User'}
          </h2>
        </div>
      </div>

      <ToastContainer />

      <div className="flex items-center gap-5 sm:gap-10 sm:pr-10 pr-3">
        {/* Notification Button */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* User Circle */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold uppercase text-white shadow-sm">
          {firstLetter}
        </div>
      </div>

      {/* Mobile dropdown nav */}
      <div
        className={`absolute left-0 top-16 min-h-screen w-full bg-white lg:hidden overflow-hidden transform transition-transform duration-500 ease-in-out ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col">
          <NavLink
            to="/dashboard"
            onClick={() => setShowMenu(false)}
            className="border-b border-gray-200 p-4 pl-5 text-slate-700"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/company-registration"
            onClick={() => setShowMenu(false)}
            className="border-b border-gray-200 p-4 pl-5 text-slate-700"
          >
            Company Registration
          </NavLink>

          <NavLink
            to="/dashboard/company-verification"
            onClick={() => setShowMenu(false)}
            className="border-b border-gray-200 p-4 pl-5 text-slate-700"
          >
            Company Verification
          </NavLink>

          <NavLink
            to="/dashboard/companies"
            onClick={() => setShowMenu(false)}
            className="border-b border-gray-200 p-4 pl-5 text-slate-700"
          >
            All Companies
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            onClick={() => setShowMenu(false)}
            className="border-b border-gray-200 p-4 pl-5 text-slate-700"
          >
            Profile
          </NavLink>

          <button
            onClick={logout}
            className="border-b border-gray-200 p-4 pl-5 text-left text-red-600"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
