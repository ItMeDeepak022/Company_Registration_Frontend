import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Dasheader from "./Dasheader";
import Footer from "../common/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex">
      {/* ================= SIDEBAR ================= */}
      
      <Sidebar />

      {/* ================= RIGHT SIDE ================= */}
       
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64"> 
        <Dasheader />

        {/* ================= OUTLET ================= */}
   
        <main className="flex-1 bg-[#E5ECFF]  ">
          <Outlet />
        </main>

        {/* ================= FOOTER ================= */}
        <Footer />
      </div>
    </div>
  );
}
