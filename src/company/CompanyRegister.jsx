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
        <div className="min-h-screen">
            <ToastContainer />

            <div className="mx-auto  w-full max-w-6xl pt-0 sm:pb-20 pb-15">

                 

                {/* Form Container */}
                <div className="m-2 sm:rounded-xl border bg-white border-slate-200">

                    <div className=" border-b border-slate-200 px-5 py-5 sm:px-7">
                        <h2 className="text-base font-semibold text-slate-900">
                            Company Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Fields marked with <span className="text-red-500">*</span> are required.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={submitRegister}
                        className="p-5 sm:p-7"
                    >

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Company Name */}
                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Company Name
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    required
                                    placeholder="TechNova Innovations Pvt Ltd"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Registration Number */}
                            <div>
                                <label
                                    htmlFor="registrationNumber"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Registration Number
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="registrationNumber"
                                    name="registrationNumber"
                                    type="text"
                                    required
                                    placeholder="U72900KA2026PTC123456"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* PAN */}
                            <div>
                                <label
                                    htmlFor="pan"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    PAN
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="pan"
                                    name="pan"
                                    type="text"
                                    required
                                    maxLength="10"
                                    placeholder="AABCT1234K"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Email
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="contact@technova.com"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Phone
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    maxLength="10"
                                    pattern="[0-9]{10}"
                                    placeholder="9123456789"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Address
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    rows="4"
                                    placeholder="2nd Floor, Manyata Tech Park, Nagawara, Bengaluru, Karnataka - 560045"
                                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Password
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength="6"
                                    placeholder="Enter password"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Confirm Password
                                    <span className="ml-1 text-red-500">*</span>
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    minLength="6"
                                    placeholder="Confirm password"
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                        </div>

                        {/* Submit Section */}
                        <div className="w-[50%] mt-7 border-t border-slate-200 pt-6">
                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loader ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Registering...
                                    </span>
                                ) : (
                                    "Register Company"
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}