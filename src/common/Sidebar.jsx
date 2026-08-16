import React from 'react'
import { Link, useNavigate } from 'react-router'

export default function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <aside className="w-64 bg-white sm:block hidden text-white border-r-1 border-gray-200 fixed left-0 top-0 bottom-0">

            {/* Logo */}
            <div className="h-16 flex items-center px-6 bg-red-600 ">
                <h1 className="text-xl font-bold text-white">
                   Dashboard
                </h1>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-2 mt-5">

                <Link
                    to="/dashboard"
                    className="block px-4 py-3 rounded-lg   text-black bg-[#E2E8F0] hover:bg-gray-300"
                >
                    Dashboard
                </Link>

                <Link
                    to="/dashboard/company-registration"
                    className="block px-4 py-3 rounded-lg  text-black bg-[#E2E8F0] hover:bg-gray-300"
                >
                    Company Registration
                </Link>

                <Link
                    to="/dashboard/company-verification"
                    className="block px-4 py-3 rounded-lg  text-black bg-[#E2E8F0] hover:bg-gray-300"
                >
                    Company Verification
                </Link>

                <Link
                    to="/dashboard/companies"
                    className="block px-4 py-3 rounded-lg  text-black bg-[#E2E8F0] hover:bg-gray-300"
                >
                    All Companies
                </Link>

                <Link
                    to="/dashboard/profile"
                    className="block px-4 py-3 rounded-lg  text-black bg-[#E2E8F0] hover:bg-gray-300"
                >
                    Profile
                </Link>

            </nav>

            {/* Logout */}
            <div className="absolute w-full text-center h-15 bottom-0 border-t-1 border-gray-200">

                <button
                    onClick={logout}
                    className=" cursor-pointer w-[80%] bg-red-600 py-3 px-10  rounded-[10px] mt-1"
                >
                    Logout
                </button>

            </div>

        </aside>
    )
}
