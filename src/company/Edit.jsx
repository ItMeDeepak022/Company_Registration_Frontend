import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function EditCompanyRegistration() {

    const { state } = useLocation();
    const navigate = useNavigate();

    console.log("Company:", state);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log("Update Data:", data);

        try {

            const res = await api.put(
                `/update-profile/${state._id}`,
                data
            );

            console.log("Update Response:", res.data);

            if (res.data.status) {

                toast.success(res.data.message);

                navigate("/dashboard/companies");

            } else {

                toast.error(res.data.message);

            }

        } catch (error) {

            console.log(
                "Update Error:",
                error.response?.data || error
            );

            alert(
                error.response?.data?.message ||
                "Company update failed"
            );
        }
    };

    return (
        <div className="min-h-screen m-2 py-15 sm:px-6 lg:px-10">
            <ToastContainer />
            <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">

                <h1 className="mb-8 text-2xl font-bold text-gray-800 sm:text-3xl">
                    Edit Company Registration
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Company Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Company Name
                        </label>

                        <input
                            name="companyName"
                            type="text"
                            required
                            defaultValue={state?.companyName || ""}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Registration Number
                        </label>

                        <input
                            name="registrationNumber"
                            type="text"
                            readOnly
                            defaultValue={state?.registrationNumber || ""}
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />
                    </div>

                    {/* PAN */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            PAN
                        </label>

                        <input
                            name="pan"
                            type="text"
                            readOnly
                            defaultValue={state?.pan || ""}
                            className="w-full rounded-lg border bg-gray-100 px-4 py-3"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Email
                        </label>

                        <input
                            name="email"
                            type="email"
                            required
                            defaultValue={state?.email || ""}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Phone
                        </label>

                        <input
                            name="phone"
                            type="tel"
                            required
                            defaultValue={state?.phone || ""}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Address
                        </label>

                        <textarea
                            name="address"
                            rows="4"
                            required
                            defaultValue={state?.address || ""}
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            New Password
                        </label>

                        <input
                            name="password"
                            type="password"
                            minLength="6"
                            placeholder="Enter new password"
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Confirm Password
                        </label>

                        <input
                            name="confirmPassword"
                            type="password"
                            minLength="6"
                            placeholder="Confirm new password"
                            className="w-full rounded-lg border px-4 py-3"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Update Company
                    </button>

                </form>

            </div>

        </div>
    );
};

