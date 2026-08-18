import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";


const SkeletonCard = () => {
    return (
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="w-full">
                    <div className="h-5 w-40 rounded bg-gray-200"></div>

                    <div className="mt-4 h-4 w-56 rounded bg-gray-200"></div>

                    <div className="mt-3 h-4 w-40 rounded bg-gray-200"></div>

                    <div className="mt-6 h-9 w-20 rounded bg-gray-200"></div>
                </div>

                <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
            </div>
        </div>
    );
};


export default function CompanyVerification() {

    const [loadingId, setLoadingId] = useState(null);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate()

    const handleVerify = async (companyId) => {
        try {

            setLoadingId(companyId);

            const res = await api.post(
                `/verify/${companyId}`
            );

            if (res.data.status) {
                toast.success(res.data.message);
                getCompanies();
                setTimeout(() => {
                    navigate('/dashboard/companies')

                }, timeout);
            } else {
                toast.error(res.data.message);
            }

            setLoadingId(null);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Verification failed"
            );

            setLoadingId(null);
        }
    };



    let [companies, setcompanies] = useState([])

    const getCompanies = () => {
        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {
                setLoading(false)
                console.log(finalRes);
                setcompanies(finalRes.data)
            })
            .catch((error) => {
                console.log(error.response?.data);
            });
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-15 ">
            <ToastContainer />


            {/* Company Cards */}
            <div className="mx-auto grid max-w-full  grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {
                    loading ?
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                        :

                        companies.length > 0 ?
                            companies.map((company, index) => {
                                return (
                                    <div
                                        key={company.id}
                                        className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:shadow-md sm:p-6"
                                    >

                                        {/* Card Header */}
                                        <div className="mb-5">

                                            <div className="mb-3 flex items-center justify-between gap-3">

                                                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                                    Company {index + 1}
                                                </span>

                                                {/* Status */}
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${company.verificationStatus === "Verified"
                                                        ? "bg-green-100 text-green-700"
                                                        : company.verificationStatus === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {company.verificationStatus}
                                                </span>

                                            </div>

                                            <h2 className="break-words text-xl font-bold text-gray-800">
                                                {company.companyName}
                                            </h2>

                                        </div>

                                        {/* Company Details */}
                                        <div className="flex-1 space-y-4">

                                            {/* Registration Number */}
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                                    Registration Number
                                                </p>

                                                <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                                                    {company.registrationNumber}
                                                </p>
                                            </div>

                                            {/* PAN */}
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                                    PAN
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {company.pan}
                                                </p>
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                                    Email
                                                </p>

                                                <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                                                    {company.email}
                                                </p>
                                            </div>

                                            {/* Phone */}
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                                    Phone
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                                    {company.phone}
                                                </p>
                                            </div>

                                            {/* Address */}
                                            <div>
                                                <p className="text-xs font-medium text-gray-500 sm:text-sm">
                                                    Address
                                                </p>

                                                <p className="mt-1 break-words text-sm font-semibold leading-6 text-gray-800">
                                                    {company.address}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Verify Button */}
                                        <button
                                            type="button"
                                            onClick={() => handleVerify(company._id)}
                                            disabled={loadingId === company.id}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                        >

                                            {loadingId === company.id ? (
                                                <>
                                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                                                    Verifying...
                                                </>
                                            ) : (
                                                "Verify Company"
                                            )}

                                        </button>

                                    </div>
                                )
                            }



                            )

                            :

                            <div className="w-full text-2xl text-red-600"> No Varified Company Data founds...</div>

                }

            </div>

        </div>
    );
}