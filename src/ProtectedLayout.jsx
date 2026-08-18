import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./services/api";

export default function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsValid(false);
                return;
            }

            try {
                const res = await api.get("/user-auth/verifytoken", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.status) {
                    setIsValid(true);
                } else {
                    localStorage.removeItem("token");
                    setIsValid(false);
                }
            } catch (error) {
                console.log("Verify error:", error.response?.data || error);
                localStorage.removeItem("token");
                setIsValid(false);
            }
        };

        verifyToken();
    }, []);

    if (isValid === null) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-100">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return isValid ? children : <Navigate to="/" replace />;
}
