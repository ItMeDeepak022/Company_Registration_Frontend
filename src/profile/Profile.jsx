import React, { useEffect, useState } from "react";
import api from "../services/api";

const statusStyles = {
    Verified: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
    Pending: "bg-amber-100 text-amber-700",
};

function SkeletonBlock({ className }) {
    return <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />;
}

export default function Profile() {
    const [companies, setCompanies] = useState([]);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    console.log(userData, "data hai");
    const getCompanies = () => {
        setLoading(true);
        setError("");

        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {
                const data = finalRes.data || [];
                setCompanies(data);

            })
            .catch((err) => {
                setError(
                    err?.response?.data?.message ||
                    "Couldn't load your profile. Please try again."
                );
            })
            .finally(() => setLoading(false));
    };

    let getUserData = async () => {
        await api.get('/user-auth/get-user')
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes);
                setUserData(finalRes.data);
            })
    }

    useEffect(() => {
        getUserData();
        getCompanies();

    }, []);

    

    return (
        <div className="h-screen bg-slate-50 px-3 pt-5 sm:pb-0 pb-20 py-10 sm:px-6">
            <div className="mx-auto max-w-5xl sm:pb-0 pb-18">


                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}{" "}
                        <button
                            onClick={getCompanies}
                            className="font-semibold underline underline-offset-2 hover:text-red-800"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* ================= LEFT PROFILE ================= */}
                    <div className="lg:sticky lg:top-10">
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            {loading ? (
                                <div className="space-y-4">
                                    <SkeletonBlock className="h-20 w-20 rounded-full" />
                                    <SkeletonBlock className="h-5 w-2/3" />
                                    <SkeletonBlock className="h-4 w-1/2" />
                                    <SkeletonBlock className="h-4 w-1/3" />
                                </div>
                            ) : (
                                <>
                                    {/* profile  */}
                                    {
                                        userData.map((obj) => {
                                            let {name}=obj
                                            let fn=name.charAt(0)
                                            return (
                                                <>
                                                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 text-2xl font-bold text-white  ">
                                                        {fn}
                                                    </div>

                                                    <h2 className="text-xl font-bold text-slate-800">
                                                        {obj.name}
                                                    </h2>

                                                    <div className="mt-5 space-y-4">
                                                        <div>
                                                            <p className="text-sm text-slate-500">Email</p>
                                                            <p className="break-all font-medium text-slate-800">
                                                                {obj.email}
                                                            </p>
                                                        </div>


                                                    </div>
                                                </>
                                            )
                                        })
                                    }
                                </>
                            )}
                        </div>
                    </div>

                    {/* ================= RIGHT COMPANY ================= */}
                    <div className="rounded-2xl bg-white  p-3 sm:p-6 shadow-sm ring-1 ring-slate-100 lg:col-span-2 ">
                        <div className="space-y-6 sm:pr-2 lg:max-h-[70vh] lg:overflow-y-auto">
                            {loading ? (
                                <div className="space-y-4 rounded-xl  p-5">
                                    <SkeletonBlock className="h-5 w-40" />
                                    <SkeletonBlock className="h-4 w-64" />
                                    <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                        <SkeletonBlock className="h-4 w-full" />
                                        <SkeletonBlock className="h-4 w-full" />
                                        <SkeletonBlock className="h-4 w-full" />
                                        <SkeletonBlock className="h-4 w-full" />
                                    </div>
                                </div>
                            ) : companies.length > 0 ? (
                                companies.map((company, index) => (
                                    <div
                                        key={company._id || index}
                                        className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                                    >
                                        {/* Header */}
                                        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">
                                                    Registered Company
                                                </h2>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Your registered company details
                                                </p>
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[company.verificationStatus] ||
                                                    "bg-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                {company.verificationStatus}
                                            </span>
                                        </div>

                                        {/* Company Details */}
                                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                            <div>
                                                <p className="text-sm text-slate-500">Company Name</p>
                                                <p className="mt-1 font-medium text-slate-800">
                                                    {company.companyName}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500">
                                                    Registration Number
                                                </p>
                                                <p className="mt-1 font-medium text-slate-800">
                                                    {company.registrationNumber}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500">PAN</p>
                                                <p className="mt-1 font-medium text-slate-800">
                                                    {company.pan}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500">Email</p>
                                                <p className="mt-1 break-all font-medium text-slate-800">
                                                    {company.email}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-slate-500">Phone</p>
                                                <p className="mt-1 font-medium text-slate-800">
                                                    {company.phone}
                                                </p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <p className="text-sm text-slate-500">Address</p>
                                                <p className="mt-1 font-medium text-slate-800">
                                                    {company.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                                    <p className="text-slate-500">No company registered yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}