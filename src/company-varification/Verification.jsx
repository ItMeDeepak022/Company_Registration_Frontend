import React, { useEffect, useState } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import { CheckCircle2, ShieldCheck, Clock } from "lucide-react";
=======
import { CheckCircle2 } from "lucide-react";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
    const [companies, setCompanies] = useState([]);
>>>>>>> Stashed changes
    const navigate = useNavigate();

    const handleVerify = async (companyId) => {
        try {
            setLoadingId(companyId);

            const res = await api.post(`/verify/${companyId}`);

            if (res.data.status) {
                toast.success(res.data.message || "Company verified successfully");
                getCompanies();
                setTimeout(() => {
                    navigate('/dashboard/companies');
                }, 1200);
            } else {
                toast.error(res.data.message || "Verification failed");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Verification failed"
            );
        } finally {
            setLoadingId(null);
        }
    };

    const getCompanies = () => {
        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {
                setLoading(false);
                setCompanies(finalRes.data || []);
            })
            .catch((error) => {
                console.log(error.response?.data);
                setLoading(false);
            });
    };

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div className="min-h-screen w-full px-4 pt-8 pb-28 sm:px-10 sm:pt-10 sm:pb-32">
            <ToastContainer />

            {/* Company Cards */}
            <div className="mx-auto grid max-w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {loading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : companies.length > 0 ? (
                    companies.map((company, index) => {
                        const status = company.verificationStatus?.toLowerCase();
                        const isVerified = status === "verified";
                        const isRejected = status === "rejected";

                        return (
                            <div
                                key={company._id || index}
                                className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:shadow-md sm:p-6"
                            >
                                {/* Card Header */}
                                <div className="mb-5">
                                    <div className="mb-3 flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                                            Company {index + 1}
                                        </span>

<<<<<<< Updated upstream
                        companies.length > 0 ? (
                            companies.map((company, index) => {
                                const status = company.verificationStatus?.toLowerCase();
                                const isVerified = status === "verified";
                                const isRejected = status === "rejected";

                                return (
                                    <div
                                        key={company._id || index}
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
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                        isVerified
                                                            ? "bg-green-100 text-green-700"
                                                            : isRejected
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                    {company.verificationStatus || "Pending"}
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
                                            disabled={loadingId === company._id || isVerified}
                                            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition duration-300 ${
                                                isVerified
                                                    ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                                                    : "bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                            }`}
                                        >
                                            {loadingId === company._id ? (
                                                <>
                                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                    Verifying...
                                                </>
                                            ) : isVerified ? (
                                                <>
                                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                    Company Verified
                                                </>
                                            ) : (
                                                "Verify Company"
                                            )}
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                                <p className="text-lg font-medium text-gray-600">No companies found for verification.</p>
                                <p className="mt-1 text-sm text-gray-400">Register a company first to perform verification.</p>
                            </div>
                        )
                }
=======
                                        {/* Status */}
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                isVerified
                                                    ? "bg-green-100 text-green-700"
                                                    : isRejected
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {company.verificationStatus || "Pending"}
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
                                    disabled={loadingId === company._id || isVerified}
                                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition duration-300 ${
                                        isVerified
                                            ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                                            : "bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    }`}
                                >
                                    {loadingId === company._id ? (
                                        <>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                            Verifying...
                                        </>
                                    ) : isVerified ? (
                                        <>
                                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                                            Company Verified
                                        </>
                                    ) : (
                                        "Verify Company"
                                    )}
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                        <p className="text-lg font-medium text-gray-600">No companies found for verification.</p>
                        <p className="mt-1 text-sm text-gray-400">Register a company first to perform verification.</p>
                    </div>
                )}
>>>>>>> Stashed changes
            </div>
        </div>
    );
}