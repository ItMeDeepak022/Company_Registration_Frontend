import React, { useState } from "react";
import api from "../services/api";

import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";



export default function CompanyRegistration() {

    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);

    const submitRegister = async (e) => {
        e.preventDefault();

        setLoader(true);

        try {
            const form = e.currentTarget;

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log("Sending:", data);

            const res = await api.post("/create-profile", data);

            console.log("API SUCCESS:", res.data);

            if (res.data.status === true) {

                toast.success(res.data.message);

                form.reset();

                // loader off
                setLoader(false);

                // navigate after toast
                setTimeout(() => {
                    navigate("/dashboard/companies");
                }, 1000);

                return;
            }

            toast.error(res.data.message);
            setLoader(false);

        } catch (error) {

            console.log("API ERROR:", error);
            console.log("BACKEND:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );

            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen m-2 py-15 sm:py-18 sm:px-6 lg:px-10">
            <ToastContainer />
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        Company Registration
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Register your company by providing the required information.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={submitRegister}
                    className="space-y-5"
                >

                    {/* Company Name */}
                    <div>
                        <label
                            htmlFor="companyName"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Company Name
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            placeholder="TechNova Innovations Pvt Ltd"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label
                            htmlFor="registrationNumber"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Registration Number
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="registrationNumber"
                            name="registrationNumber"
                            
                            type="text"
                            required
                            placeholder="U72900KA2026PTC123456"
                            className="w-full upper rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* PAN */}
                    <div>
                        <label
                            htmlFor="pan"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            PAN
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="pan"
                            name="pan"
                            type="text"
                            required
                            maxLength="10"
                            placeholder="AABCT1234K"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="contact@technova.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Phone
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            maxLength="10"
                            pattern="[0-9]{10}"
                            placeholder="9123456789"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Address
                            <span className="text-red-500">*</span>
                        </label>

                        <textarea
                            id="address"
                            name="address"
                            required
                            rows="4"
                            placeholder="2nd Floor, Manyata Tech Park, Nagawara, Bengaluru, Karnataka - 560045"
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength="6"
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                            <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            minLength="6"
                            placeholder="Confirm password"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loader}
                        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loader ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>

                                Registering...
                            </span>
                        ) : (
                            "Register"
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}