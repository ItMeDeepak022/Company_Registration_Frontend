import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";

// Underline-style inputs (minimal, like the reference)
const inputClass =
    "w-full border-b-2 border-slate-200 bg-transparent px-1 py-2.5 text-slate-900 placeholder:text-slate-300 transition focus:border-indigo-600 focus:outline-none";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400";
const primaryButtonClass =
    "w-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-indigo-200 transition duration-200 hover:from-indigo-700 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60";

// Converts technical / API errors into a readable message (never show raw error objects)
function getErrorMessage(err) {
    if (err?.response?.data?.message) return err.response.data.message;
    if (err?.message === "Network Error") {
        return "Unable to reach the server. Please check your internet connection.";
    }
    return "Something went wrong. Please try again.";
}

// Original night-scene illustration (hand-built SVG, not a copied image)
function NightSceneIllustration() {
    return (
        <svg
            viewBox="0 0 600 700"
            className="h-full w-full"
            preserveAspectRatio="xMidYMax slice"
        >
            <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2a1458" />
                    <stop offset="55%" stopColor="#4c2a8f" />
                    <stop offset="100%" stopColor="#6d3fc0" />
                </linearGradient>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff8e7" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff8e7" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b3399" />
                    <stop offset="100%" stopColor="#452a7a" />
                </linearGradient>
                <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d2568" />
                    <stop offset="100%" stopColor="#2f1d52" />
                </linearGradient>
                <linearGradient id="doorGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffe9a8" />
                    <stop offset="100%" stopColor="#ffb44d" />
                </linearGradient>
                <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7fe0d6" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#7fe0d6" stopOpacity="0.05" />
                </linearGradient>
            </defs>

            {/* sky */}
            <rect x="0" y="0" width="600" height="700" fill="url(#sky)" />

            {/* stars */}
            {[
                [60, 60], [120, 110], [200, 50], [260, 130], [340, 70],
                [400, 40], [460, 100], [520, 60], [90, 180], [500, 180],
                [30, 260], [560, 240], [160, 90], [230, 200], [380, 150],
            ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2.5 : 1.4} fill="#fff" opacity={0.8} />
            ))}

            {/* moon */}
            <circle cx="500" cy="90" r="70" fill="url(#moonGlow)" />
            <circle cx="500" cy="90" r="30" fill="#fffaf0" />

            {/* far mountains */}
            <polygon points="0,340 100,230 220,320 320,210 420,300 520,240 600,320 600,700 0,700" fill="url(#mtn2)" />
            {/* near mountains */}
            <polygon points="0,420 140,300 260,400 360,280 480,390 600,330 600,700 0,700" fill="url(#mtn1)" />

            {/* pine trees */}
            {[[60, 430], [110, 460], [500, 420], [550, 450], [40, 480]].map(([x, y], i) => (
                <g key={i} transform={`translate(${x} ${y})`} opacity="0.85">
                    <polygon points="0,0 -18,40 18,40" fill="#241a4a" />
                    <polygon points="0,15 -22,55 22,55" fill="#241a4a" />
                </g>
            ))}

            {/* ground / reflection */}
            <rect x="0" y="560" width="600" height="140" fill="url(#ground)" />

            {/* house block */}
            <rect x="360" y="380" width="200" height="180" fill="#3a2568" rx="4" />
            <rect x="360" y="330" width="120" height="60" fill="#4a2f80" rx="4" />
            <rect x="400" y="340" width="18" height="18" fill="#ffd98a" opacity="0.9" />
            <rect x="430" y="340" width="18" height="18" fill="#ffd98a" opacity="0.6" />
            {/* solar panel */}
            <rect x="440" y="358" width="55" height="30" fill="#2a2050" stroke="#6d5bb3" strokeWidth="1" />
            <line x1="440" y1="373" x2="495" y2="373" stroke="#6d5bb3" strokeWidth="1" />
            <line x1="458" y1="358" x2="458" y2="388" stroke="#6d5bb3" strokeWidth="1" />
            <line x1="476" y1="358" x2="476" y2="388" stroke="#6d5bb3" strokeWidth="1" />

            {/* open door with light beam */}
            <polygon points="250,560 250,330 320,330 340,560" fill="url(#doorGlow)" opacity="0.9" />
            <rect x="250" y="330" width="70" height="230" fill="#241a4a" opacity="0.15" />
            <rect x="320" y="330" width="40" height="230" fill="#6d3fc0" opacity="0.35" />

            {/* steps */}
            <rect x="240" y="560" width="110" height="16" fill="#4a2f80" />
            <rect x="230" y="576" width="130" height="16" fill="#3a2568" />
            <rect x="215" y="592" width="160" height="18" fill="#2f1d52" />

            {/* bushes */}
            <circle cx="180" cy="600" r="34" fill="#3a2568" />
            <circle cx="150" cy="615" r="26" fill="#4a2f80" />
            <circle cx="410" cy="605" r="30" fill="#3a2568" />
        </svg>
    );
}

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);

    const navigate = useNavigate();

    const toggleMode = () => setIsLogin((prev) => !prev);

    const submitLogin = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        setLoading(true);
        try {
            const res = await api.post("/user-auth/login", data);
            const finalRes = res.data;

            if (finalRes.status) {
                localStorage.setItem("token", finalRes.token);
                toast.success(finalRes.message || "Logged in successfully");
                e.target.reset();
                setTimeout(() => navigate("/dashboard"), 500);
            } else {
                // A failed login must show an error, never a success toast
                toast.error(finalRes.message || "Invalid email or password");
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            // Loading state always resets, even on failure/exception
            setLoading(false);
        }
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        setRegisterLoading(true);
        try {
            const res = await api.post("/user-auth/register", data);
            const finalRes = res.data;

            if (finalRes.status) {
                toast.success(finalRes.message);
                e.target.reset();
                setIsLogin(true);
            } else {
                toast.error(finalRes.message || "Registration failed");
            }
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setRegisterLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 sm:py-10">
            <style>{`
                @keyframes formSwitch {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-form-switch {
                    animation: formSwitch 0.35s ease-out;
                }
            `}</style>
            <ToastContainer position="top-left" />

            <div className="relative w-full max-w-5xl overflow-hidden rounded-[10px] sm:rounded-[2.5rem] bg-white shadow-2xl shadow-slate-300/60 transition-[height] duration-300">
                <div className="grid md:grid-cols-2">
                    {/* Left: form panel */}
                    <div className="relative z-10 p-8 sm:p-12 lg:p-14">
                        <div className="mb-10 flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-orange-400" />
                            <span className="text-lg font-bold tracking-tight text-slate-800">
                                VerifyFlow
                            </span>
                        </div>

                        <div key={isLogin ? "login" : "register"} className="animate-form-switch">
                        <p className="text-sm font-semibold text-slate-400">
                            {isLogin ? "Welcome to" : "Get started with"}
                        </p>
                        <h1 className="mb-8 text-4xl font-extrabold text-indigo-900">
                            VerifyFlow
                        </h1>

                        {isLogin ? (
                            <form onSubmit={submitLogin} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className={labelClass}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        name="email"
                                        placeholder="name@company.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className={labelClass}>
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        required
                                        type="password"
                                        placeholder="••••••••"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="pt-2">
                                    <button type="submit" disabled={loading} className={primaryButtonClass}>
                                        {loading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Signing in...
                                            </span>
                                        ) : (
                                            "Login"
                                        )}
                                    </button>
                                </div>

                                {/* TODO: wire up forgot-password flow before enabling this link */}
                                <p className="text-xs font-medium text-slate-300 cursor-not-allowed">
                                    Forgot password? (coming soon)
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={submitRegister} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={labelClass}>
                                        Full name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="reg-email" className={labelClass}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="reg-email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="reg-password" className={labelClass}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="reg-password"
                                        name="password"
                                        required
                                        minLength={6}
                                        placeholder="At least 6 characters"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={registerLoading}
                                        className={primaryButtonClass}
                                    >
                                        {registerLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                                                Creating account...
                                            </span>
                                        ) : (
                                            "Register"
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                        </div>

                        <p className="mt-10 text-sm text-slate-500">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <span
                                onClick={toggleMode}
                                className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700"
                            >
                                {isLogin ? "Sign up" : "Sign in"}
                            </span>
                        </p>
                    </div>

                    {/* Right: illustrated panel */}
                    <div
                        className="relative hidden md:block"
                        style={{ borderTopLeftRadius: "220px", borderBottomLeftRadius: "220px" }}
                    >
                        <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ borderTopLeftRadius: "220px", borderBottomLeftRadius: "220px" }}
                        >
                            <NightSceneIllustration />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
