import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";

const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";
const readOnlyClass =
    "w-full rounded-lg border border-slate-200 bg-gray-100 px-4 py-3 text-sm text-slate-500 cursor-not-allowed";
const labelClass = "mb-2 block text-sm font-medium text-slate-700";

export default function EditCompanyRegistration() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [fetching, setFetching] = useState(!state);
    const [company, setCompany] = useState(state || null);

    // Form inputs state
    const [companyName, setCompanyName] = useState(state?.companyName || "");
    const [phone, setPhone] = useState(state?.phone || "");
    const [address, setAddress] = useState(state?.address || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        // If state is not provided (e.g., page refresh or direct URL), fetch company by id
        if (!state && id) {
            setFetching(true);
            api.get("/get-profile")
                .then((res) => {
                    const companies = res.data?.data || [];
                    const found = companies.find((c) => c._id === id);
                    if (found) {
                        setCompany(found);
                        setCompanyName(found.companyName || "");
                        setPhone(found.phone || "");
                        setAddress(found.address || "");
                    } else {
                        toast.error("Company not found");
                    }
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || "Failed to load company details");
                })
                .finally(() => setFetching(false));
        }
    }, [id, state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const targetId = company?._id || id;
        if (!targetId) {
            toast.error("Invalid company ID");
            return;
        }

        // Phone validation
        if (phone && phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        // Password validation if user entered something
        if (password || confirmPassword) {
            if (!password || !confirmPassword) {
                toast.error("Both password and confirm password are required to update password");
                return;
            }
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters");
                return;
            }
            if (password !== confirmPassword) {
                toast.error("Password and confirm password do not match");
                return;
            }
        }

        const payload = {
            companyName,
            phone,
            address,
        };

        if (password && confirmPassword) {
            payload.password = password;
            payload.confirmPassword = confirmPassword;
        }

        setLoader(true);
        try {
            const res = await api.put(`/update-profile/${targetId}`, payload);

            if (res.data.status) {
                toast.success(res.data.message || "Company updated successfully");
                setTimeout(() => {
                    navigate("/dashboard/companies");
                }, 1000);
            } else {
                toast.error(res.data.message || "Company update failed");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Company update failed. Please try again."
            );
        } finally {
            setLoader(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full px-4 pt-8 pb-28 sm:px-10 sm:pt-10 sm:pb-32">
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
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
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
                                value={company?.registrationNumber || ""}
                                className={readOnlyClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>PAN</label>
                            <input
                                name="pan"
                                type="text"
                                readOnly
                                value={company?.pan || ""}
                                className={readOnlyClass}
                            />
                        </div>
                    </div>

                    {/* Email + Phone — side by side */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Email (Read-only)</label>
                            <input
                                name="email"
                                type="email"
                                readOnly
                                value={company?.email || ""}
                                className={readOnlyClass}
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
                                maxLength={10}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
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
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    {/* New Password + Confirm — side by side, optional */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>New Password (Optional)</label>
                            <input
                                name="password"
                                type="password"
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current password"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
