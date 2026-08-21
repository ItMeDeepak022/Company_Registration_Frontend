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
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCompaniesData = () => {
        setLoading(true);
        api.get("/get-profile")
            .then((res) => {
                setCompanies(res.data?.data || []);
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
        <div className="min-h-screen sm:p-0 sm:pt-10 pb-15 p-3 py-10 bg-white sm:m-0 sm:px-10">

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">

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

                        companies.map((company) => (

                            <div
                                key={company._id}
                                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >

                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
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
                                            {company.companyName?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                </div>

                                {/* Status */}
                                <div className="mt-6">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isVerified
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

                            </div>

            ))
            :
            <div className="w-full text-2xl text-red-600"> No Company Data founds...</div>

                )}

        </div>
        </div >
    );
}