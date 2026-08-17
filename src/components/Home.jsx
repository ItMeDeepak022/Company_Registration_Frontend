import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Users,
  UserCircle,
} from "lucide-react";

const pages = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Company Registration",
    path: "/dashboard/company-registration",
    icon: Building2,
  },
  {
    name: "Company Verification",
    path: "/dashboard/company-verification",
    icon: ShieldCheck,
  },
  {
    name: "All Companies",
    path: "/dashboard/companies",
    icon: Users,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: UserCircle,
  },
];

export default function Home() {
  return (
     
    <div className="w-full px-4 py-8 pb-20 sm:p-10">
       

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.path}
              to={page.path}
              className="flex h-28 items-center gap-4 rounded-lg border border-gray-200 bg-white px-5 shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-md sm:h-36 sm:flex-col sm:justify-center sm:gap-3 sm:px-4 lg:h-40"
            >
              <Icon className="h-8 w-8 shrink-0 text-blue-600 sm:h-9 sm:w-9" />
              <h2 className="text-base font-semibold text-gray-800 sm:text-center sm:text-lg lg:text-xl">
                {page.name}
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}