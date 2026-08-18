import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";
const readOnlyClass =
    "w-full rounded-lg border border-slate-200 bg-gray-100 px-4 py-3 text-sm text-slate-500 cursor-not-allowed";
const labelClass = "mb-2 block text-sm font-medium text-slate-700";

export default function EditCompanyRegistration() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

         

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        setLoader(true)
        try {
            const res = await api.put(`/update-profile/${state._id}`, data);

            console.log(res.data);

            if (res.data.status) {
                if (res.data.status) {
                    toast.success(res.data.message)
                    setLoader(false)
                    setTimeout(() => {
                        navigate("/dashboard/companies")
                    }, 1000);
                }
                else {
                    toast.error(res.data.message)
                    setLoader(false)
                }


            }


        } catch (error) {
            toast.error(
                error.response?.data?.message || "Company update failed. Please try again."
            );
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
            <ToastContainer />
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">

                <h1 className="mb-8 text-2xl font-bold text-gray-800 sm:text-3xl">
                    Edit Company Registration
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Company Name — full width */}
                    <div>
                        <label className={labelClass}>
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="companyName"
                            type="text"
                            required
                            defaultValue={state?.companyName || ""}
                            className={inputClass}
                        />
                    </div>

                    {/* Registration Number + PAN — read-only, side by side */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Registration Number</label>
                            <input
                                name="registrationNumber"
                                type="text"
                                readOnly
                                defaultValue={state?.registrationNumber || ""}
                                className={readOnlyClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>PAN</label>
                            <input
                                name="pan"
                                type="text"
                                readOnly
                                defaultValue={state?.pan || ""}
                                className={readOnlyClass}
                            />
                        </div>
                    </div>

                    {/* Email + Phone — side by side */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                defaultValue={state?.email || ""}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                required
                                pattern="[0-9]{10}"
                                maxLength="10"
                                defaultValue={state?.phone || ""}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Address — full width */}
                    <div>
                        <label className={labelClass}>
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            rows="4"
                            required
                            defaultValue={state?.address || ""}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* New Password + Confirm — side by side, optional */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>New Password</label>
                            <input
                                name="password"
                                type="password"
                                minLength="6"
                                required
                                placeholder="Leave blank to keep current password"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                minLength="6"
                                placeholder="Confirm new password"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <button
                        type="submit"
                        disabled={loader}
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loader ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                Updating...
                            </span>
                        ) : (
                            "Update Company"
                        )}
                    </button>

                </form>

            </div>
        </div>
    );
}
