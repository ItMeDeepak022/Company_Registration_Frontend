import React, { useState } from 'react'
import { CiMenuFries } from "react-icons/ci";
import { Link, useNavigate } from 'react-router';
import { MdOutlineCancel } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";


export default function Dasheader() {

    const navItems = [
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

    let [showMenu, setshowMenu] = useState(false)
    let showNav = () => {
        setshowMenu(!showMenu)
    }
    const navigate = useNavigate();

     

    const logout = () => {
        localStorage.clear()
        navigate("/");
    };

    return (


        <header className="sm:w-[83.3%] w-[100%]  flex h-16 bg-white sm:border-b-0 border-b-1  border-slate-200 shadow sm:flex items-center justify-between px-6 fixed top-0 right-0 z-20">

            <div>
                <h2 className="text-2xl font-normal text-black sm:block hidden">
                    <span className='text-[#155DFC]'>Welcome</span> <span className='text-red-600 mr-2'>Company Registration</span>
                    <span className='text-[#155DFC]'>&</span>   <span className='text-red-600 ' >Verification Application</span>

                </h2>

                <div className=' sm:hidden block'>
                    {
                        showMenu ?
                            <MdOutlineCancel onClick={showNav} className='text-[28px]' />
                            :
                            <CiMenuFries onClick={showNav} className='text-[28px]' />
                    }




                </div>
            </div>

            <div className="flex justify-center items-center gap-4 sm:mr-2">

                <span className="text-black text-[18px] sm:mr-0 mr-2">
                    Welcome, Admin
                </span>

                <MdAdminPanelSettings  className='text-[55px]'/>

            </div>


            <div className={`absolute top-16  left-0 sm:hidden block w-full h-screen bg-white
                 overflow-hidden transition-all duration-700 ease-in-out
  ${showMenu
                    ? "max-h-[500px] translate-y-0 scale-100 opacity-100"
                    : "max-h-0 translate-y-2  opacity-0"}

                        `}>

                <nav className="flex flex-col">

                    {
                        navItems.map((obj, index) => {
                            return (
                                <>
                                    <Link onClick={showNav} to={obj.path} className={`cursor-pointer p-4 pl-5 border-b-1 border-gray-200
                                       `}  >


                                        {obj.name}
                                    </Link>


                                </>
                            )
                        })
                    }
                    <div onClick={logout} className={`cursor-pointer text-red-600 p-4 pl-5 border-b-1 border-gray-200
                                       `}  >

                        Logout

                    </div>



                </nav >

            </div >

        </header >
    )
}


