import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyToken() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/", { replace: true });
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/auth/verify-token`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.status) {
                    navigate("/dashboard", { replace: true });
                } else {
                    localStorage.removeItem("token");
                    navigate("/", { replace: true });
                }
            } catch (error) {
                console.log("Token verification error:", error);

                localStorage.removeItem("token");
                navigate("/", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [navigate]);

    if (true) {
        return (
            <div className="flex min-h-screen  bg-[#000000e3]  items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                <p className="ml-3 text-gray-600">
                    Verifying token...
                </p>
            </div>
        );
    }

    return null;
};

