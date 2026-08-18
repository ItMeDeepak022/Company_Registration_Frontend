import React, { useState } from "react";
import api from "../services/api";

import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Building2 } from "lucide-react";



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
        <div className="min-h-screen ">
            <ToastContainer />

            <div className=" max-w-full sm:flex flex-row-reverse ">

                {/* Notice / Guidance card */}
                <div className="sm:block hidden m-2 mb-5 w-full max-w-[500px] h-[500px] bg-white">
                    <div className="flex flex-col gap-3 p-4 sm:gap-5 sm:p-5">

                        {/* Icon */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm sm:h-12 sm:w-12">
                            <Building2 className="h-5 w-5" />
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">

                            {/* Header */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                                    Company Registration Guide
                                </h3>

                                <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                                    Verification Ready
                                </span>
                            </div>

                            {/* Description */}
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Please complete the form with your official company details.
                                Accurate information helps speed up verification and prevents
                                delays in approval.
                            </p>

                            {/* Checklist */}
                            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

                                {/* Required Documents */}
                                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                        Required documents
                                    </p>

                                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                                        <li>PAN card</li>
                                        <li>Registration certificate</li>
                                        <li>Business address proof</li>
                                        <li>Authorized contact details</li>
                                    </ul>
                                </div>

                                {/* Before Submit */}
                                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                        Before you submit
                                    </p>

                                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                                        <li>Use official company name</li>
                                        <li>Enter valid email and phone</li>
                                        <li>Match registration number</li>
                                        <li>Keep password at least 6 chars</li>
                                    </ul>
                                </div>

                                {/* Checklist */}
                                <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                        Form checklist
                                    </p>

                                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
                                        <li>Company name and address</li>
                                        <li>Registration and PAN details</li>
                                        <li>Contact information</li>
                                        <li>Secure login password</li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="flex-1 m-2 sm:rounded-xl border bg-white border-slate-200 sm:pb-0 mb-15">

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
                        <div className="sm:w[80%] w-[100%] mt-7 border-t border-slate-200 pt-6">
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