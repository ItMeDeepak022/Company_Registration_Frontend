import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Dasheader from "./Dasheader";
import Footer from "../common/Footer";

export default function Dashboard() {



  return (
    <div className="min-h-screen flex">

      {/* ================= SIDEBAR ================= */}

      <div className="border-r-2 border-black sm:block hidden">
        <Sidebar />
      </div>



      {/* ================= RIGHT SIDE ================= */}
      <div className="sm:ml-64 flex-1 min-h-screen flex flex-col">

        {/* ================= HEADER ================= */}
        <Dasheader />


        {/* ================= OUTLET ================= */}
        <main className="flex-1 bg-[#E5ECFF]">

          <Outlet />

        </main>


        {/* ================= FOOTER ================= */}
        <footer className="sm:w-[83%]   w-[100%] fixed bottom-0 right-0 bg-white border-t-1 border-gray-200 px-6 py-4 sm:py-3 text-center">

          <p> &copy; {new Date().getFullYear()}  All Rights Reserved.</p>

        </footer>
        

      </div>

    </div>
  );
};

