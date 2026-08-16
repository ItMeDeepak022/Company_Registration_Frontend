import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';


export default function Login() {

    let [show, setshow] = useState(true)
    const [loading, setLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);


    let showhide = () => {
        setshow(!show)
    }
    let navigate = useNavigate()




    const submitedData = async (e) => {
        e.preventDefault();



        // console.log(data);

        try {

            if (show) {

                const data = {
                    email: e.target.email.value,
                    password: e.target.password.value,
                };

                setLoading(true)
                const res = await api.post("/user-auth/login", data);
                const finalRes = res.data;
                if (finalRes.status) {
                    localStorage.setItem("token", finalRes.token);
                    setLoading(false)
                    toast.success(finalRes.message);
                    e.target.reset();
                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 500);

                } else {
                    toast.success(finalRes.message);
                    setLoading(false)
                }

            }

            else {

                const data = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                };


                setRegisterLoading(true)
                const res = await api.post("/user-auth/register", data);
                const finalRes = res.data;
                if (finalRes.status) {
                    setRegisterLoading(false)
                    toast.success(finalRes.message);
                    e.target.reset();
                    showhide()

                } else {
                    toast.success(finalRes.message);
                    setRegisterLoading(false)
                }

            }
        }
        catch (err) {
            toast.error(err)
        }

    }


    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-1">
            <ToastContainer />
            <div className="w-full sm:mt-0 mt-[-70px] max-w-5xl overflow-hidden rounded-2xl shadow-2xl shadow-slate-300/60 border border-slate-200 bg-white">
                <div className="grid md:grid-cols-2">
                    <div className="relative hidden md:flex flex-col justify-between bg-black  p-10 text-white">
                        <div>
                            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-3 py-2 backdrop-blur-sm">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    CR
                                </div>
                                <span className="text-sm font-medium tracking-[0.22em] uppercase text-slate-200">
                                    VerifyFlow
                                </span>
                            </div>

                            <h1 className="max-w-sm text-4xl font-bold leading-tight">
                                Secure company verification for smarter decisions.
                            </h1>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-200">
                                    ✓
                                </div>
                                <div>
                                    <p className="font-semibold">Trusted compliance checks</p>
                                    <p className="text-sm text-slate-300">Verified business records</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-200">
                                    ⚡
                                </div>
                                <div>
                                    <p className="font-semibold">Fast onboarding</p>
                                    <p className="text-sm text-slate-300">Streamlined approval process</p>
                                </div>
                            </div>
                        </div>

                    </div>


                    {
                        show ?
                            //logic logic 
                            <div className="bg-white p-8 sm:p-10 lg:p-12">
                                <div className="mb-8">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                                        Welcome back
                                    </p>
                                    <h2 className="mt-3 text-3xl font-bold text-slate-900">Login to your account</h2>
                                </div>

                                <form onSubmit={submitedData} className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                            Email address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            name='email'
                                            placeholder="name@company.com"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                                Password
                                            </label>

                                        </div>
                                        <input
                                            id="password"
                                            name='password'
                                            required
                                            type="password"
                                            placeholder="Enter your password"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>



                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Signing in...
                                            </span>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </button>

                                    <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                        Forgot password?
                                    </a>
                                </form>

                                <div className="sm:mt-8 mt-3 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-slate-200" />
                                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                        Or continue to create
                                    </span>
                                    <div className="h-px flex-1 bg-slate-200" />
                                </div>

                                <p
                                    onClick={showhide}
                                    className="sm:mt-8 mt-1 text-center cursor-pointer justify-center flex sm:flex-row sm:gap-2 flex-col text-sm text-slate-600"
                                >
                                    Don&apos;t have an account?{" "}
                                    <span className="font-semibold text-blue-600 hover:text-blue-700">
                                        Create account
                                    </span>
                                </p>
                            </div>
                            :
                            // register logic
                            <div className="w-full max-w-md bg-white  p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                                    <p className="text-gray-600">Join us today to get started</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={submitedData} className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"

                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"

                                            placeholder="you@example.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>

                                    {/* Password Input */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"

                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={registerLoading}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {registerLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Creating account...
                                            </span>
                                        ) : (
                                            "Register"
                                        )}
                                    </button>
                                </form>

                                {/* Sign In Link */}
                                <div
                                    onClick={showhide}
                                    className="text-center sm:mt-6 mt-1 cursor-pointer"
                                >
                                    <p className="text-gray-600 text-sm justify-center flex sm:flex-row gap-2 flex-col">
                                        Already have an account?{" "}
                                        <span className="text-indigo-600 hover:text-indigo-700 font-semibold">
                                            Sign In
                                        </span>
                                    </p>
                                </div>
                            </div>
                    }




                </div>
            </div>
        </div>
    )

}
