import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import api from "../services/api";

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

export default function AllCompanies() {

    const [companies, setcompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCompaniesData = () => {

        setLoading(true);

        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {

                // console.log(finalRes);

                setcompanies(finalRes.data);

            })
            .catch((error) => {

                console.log(error.response?.data);

            })
            .finally(() => {

                setLoading(false);

            });
    };

    useEffect(() => {
        getCompaniesData();
    }, []);

    return (
        <div className="min-h-screen w-full px-4 pt-8 pb-28 sm:px-10 sm:pt-10 sm:pb-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {loading ? (

                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />


                    </>

                ) : (

                        companies.length > 0
                        ?
                        companies.map((company) => {
                            const status = company.verificationStatus?.toLowerCase();
                            const isVerified = status === "verified";
                            const isRejected = status === "rejected";

                            return (
                                <div
                                    key={company._id}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0 flex-1">
                                            <h2 className="text-xl font-bold text-gray-800 truncate">
                                                {company.companyName}
                                            </h2>

                                            <p className="mt-2 text-sm text-gray-500 break-all">
                                                {company.email}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {company.phone}
                                            </p>
                                        </div>

                                        {/* Icon  */}
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                            <span className="text-lg font-bold text-blue-600">
                                                {company.companyName?.charAt(0)?.toUpperCase() || 'C'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="mt-6">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                                isVerified
                                                    ? "bg-green-50 text-green-700 border border-green-200"
                                                    : isRejected
                                                    ? "bg-red-50 text-red-700 border border-red-200"
                                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                            }`}
                                        >
                                            {company.verificationStatus || "Pending"}
                                        </span>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                                        <p className="text-xs text-gray-400">
                                            Company Details
                                        </p>

                                        <Link
                                            state={company}
                                            to={`/dashboard/edit-company-registration/${company._id}`}
                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                        : (
                            <div className="col-span-full rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
                                <p className="text-lg font-medium text-gray-600">No companies found.</p>
                                <p className="mt-1 text-sm text-gray-400">Click "Company Registration" to register your first business.</p>
                            </div>
                        )
                )}
            </div>
        </div>
    );
}