import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

  const pages = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Company Registration",
      path: "/dashboard/company-registration",
    },
    {
      name: "Company Verification",
      path: "/dashboard/company-verification",
    },
    {
      name: "All Companies",
      path: "/dashboard/companies",
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="min-h-screen w-full px-4 py-6 mt-15 mb-10 sm:mb-0 sm:mt-15 sm:p-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {pages.map((page, index) => (
          <Link
            key={index}
            to={page.path}
            className="flex h-28 items-center sm:justify-center justify-start  rounded-lg border border-gray-300 bg-white shadow transition-all duration-300 hover:bg-gray-50 hover:shadow-md sm:h-36 lg:h-40"
          >
            <h2 className="text-base  font-semibold text-gray-800 sm:ml-0 ml-20 sm:text-lg lg:text-xl">
              {page.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

