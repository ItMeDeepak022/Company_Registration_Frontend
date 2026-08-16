import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
    // Dummy data - baad mein API se replace kar dena
    const user = {
        name: "Deepak Kushwaha",
        email: "deepak@example.com",
        phone: "9123456789",

        company: [
            {
                companyName: "TechNova Innovations Pvt Ltd",
                registrationNumber: "U72900KA2026PTC123456",
                pan: "AABCT1234K",
                email: "contact@technova.com",
                phone: "9123456789",
                address:
                    "2nd Floor, Manyata Tech Park, Nagawara, Bengaluru, Karnataka - 560045",
                verificationStatus: "Verified",
            },
            {
                companyName: "TechNova Innovations Pvt Ltd",
                registrationNumber: "U72900KA2026PTC123456",
                pan: "AABCT1234K",
                email: "contact@technova.com",
                phone: "9123456789",
                address:
                    "2nd Floor, Manyata Tech Park, Nagawara, Bengaluru, Karnataka - 560045",
                verificationStatus: "Verified",
            }
        ],
    };


    let [companies, setcompanies] = useState([])

    let [userData, setuserData] = useState({})

    console.log(userData, 'data hai n');
    const getCompanies = () => {
        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setcompanies(finalRes.data)
                setuserData(finalRes.data[0].userId)
            })
            .catch((error) => {
                console.log(error.response?.data);
            });
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div className="min-h-screen sm:m-0 m-3 py-15">

            <div className="mx-auto mt-5 max-w-5xl">

                {/* Heading */}
                <div className="mt-5 mb-5 sm:absolute top-25">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        View your profile and registered company information.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">

                    {/* ================= LEFT PROFILE ================= */}
                    <div className="lg:sticky lg:top-50">
                        <div className="rounded-xl bg-white p-6 shadow-md">

                            {/* Avatar */}
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                                {userData?.name?.charAt(0).toUpperCase()}
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">
                                {userData.name}
                            </h2>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="break-all font-medium text-gray-800">
                                        {userData.email}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone
                                    </p>

                                    <p className="font-medium text-gray-800">
                                        {userData.phone}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* ================= RIGHT COMPANY ================= */}
                    <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">

                        {/* Scrollable Company Area */}
                        <div className="max-h-[70vh] overflow-y-auto pr-2">

                            {companies.length > 0 ? (

                                companies.map((company, index) => (

                                    <div
                                        key={index}
                                        className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm last:mb-0"
                                    >

                                        {/* Header */}
                                        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800">
                                                    Registered Company
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Your registered company details
                                                </p>
                                            </div>

                                            {/* Status */}
                                            <span
                                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${company.verificationStatus === "Verified"
                                                    ? "bg-green-100 text-green-700"
                                                    : company.verificationStatus === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {company.verificationStatus}
                                            </span>

                                        </div>


                                        {/* Company Details */}
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Company Name
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {company.companyName}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Registration Number
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {company.registrationNumber}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    PAN
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {company.pan}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Email
                                                </p>

                                                <p className="mt-1 break-all font-medium text-gray-800">
                                                    {company.email}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Phone
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {company.phone}
                                                </p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-gray-500">
                                                    Address
                                                </p>

                                                <p className="mt-1 font-medium text-gray-800">
                                                    {company.address}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                                    <p className="text-gray-500">
                                        No company registered yet.
                                    </p>
                                </div>

                            )}

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

