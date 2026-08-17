import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function AllCompanies() {


    let [companies, setcompanies] = useState([])

    const getCompanies = () => {
        api.get("/get-profile")
            .then((res) => res.data)
            .then((finalRes) => {
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
        <div className="min-h-screen sm:m-0 m-3 py-18 sm:px-10 ">

             

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {
                    companies.length > 0 ?
                        companies.map((company) => {
                            return (
                                <div
                                    key={company._id}
                                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <h2 className="mb-5 text-xl font-bold text-gray-800">
                                        {company.companyName}
                                    </h2>

                                    <div className="space-y-3 text-sm">

                                        <div>
                                            <p className="text-gray-500">Registration Number</p>
                                            <p className="font-medium text-gray-800">
                                                {company.registrationNumber}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">PAN</p>
                                            <p className="font-medium text-gray-800">
                                                {company.pan}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">Email</p>
                                            <p className="break-all font-medium text-gray-800">
                                                {company.email}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">Phone</p>
                                            <p className="font-medium text-gray-800">
                                                {company.phone}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500">Address</p>
                                            <p className="font-medium text-gray-800">
                                                {company.address}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="mt-5">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${company.verificationStatus === "Verified"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {company.verificationStatus}
                                        </span>
                                    </div>

                                    <div className="mt-6 flex gap-3">


                                        <Link
                                            to={`/dashboard/edit-company-registration/${company._id}`}
                                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                                            state={company} >
                                            Edit
                                        </Link>
                                    </div>

                                </div>
                            )
                        }

                        )
                        :

                        <div className="text-3xl text-red-600"> No Company Data founds...</div>
                }

            </div>
        </div>
    );
};

