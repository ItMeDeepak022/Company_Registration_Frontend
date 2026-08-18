import React, { useEffect, useState } from "react";
import {
  Building2,
  Clock3,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../services/api";

// ================= SKELETON =================

const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">

        <div className="min-w-0 flex-1">
          {/* Title */}
          <div className="h-3 w-20 rounded bg-gray-200 sm:h-4 sm:w-32" />

          {/* Number */}
          <div className="mt-3 h-7 w-12 rounded bg-gray-200 sm:h-9 sm:w-16" />

          {/* Description */}
          <div className="mt-2 h-2.5 w-24 rounded bg-gray-200 sm:h-3 sm:w-40" />
        </div>

        {/* Icon */}
        <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-200 sm:h-12 sm:w-12" />

      </div>
    </div>
  );
};

// ================= HOME =================

export default function Home() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= API =================

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get("/get-profile");

        // console.log("API RESPONSE kya:", res.data)
        // Agar API direct array return karti hai
        setCompanies(
          Array.isArray(res.data)
            ? res.data
            : res.data.data || res.data.companies || []
        );
      } catch (error) {
        console.log("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // ================= COUNTS =================

  const totalCompanies = companies.length;

  const pendingCompanies = companies.filter(
    (company) => company.verificationStatus === "pending"
  ).length;

  const verifiedCompanies = companies.filter(
    (company) => company.verificationStatus === "verified"
  ).length;

  const todayRegistrations = companies.filter(
    (company) =>
      new Date(company.createdAt).toDateString() ===
      new Date().toDateString()
  ).length;

  // ================= DASHBOARD CARDS =================

  const dashboardCards = [
    {
      name: "Total Companies",
      value: totalCompanies,
      icon: Building2,
      description: "Total registered companies",
    },

    {
      name: "Pending Verification",
      value: pendingCompanies,
      icon: Clock3,
      description: "Waiting for verification",
    },

    {
      name: "Verified Companies",
      value: verifiedCompanies,
      icon: ShieldCheck,
      description: "Successfully verified",
    },

    {
      name: "Today Registered",
      value: todayRegistrations,
      icon: CalendarDays,
      description: "Registered today",
    },
  ];

  // ================= GRAPH DATA =================
  // Abhi dummy data hai.
  // Baad me API ke according dynamic kar sakte hain.

  const companyData = [
    { month: "Jan", registered: 40, verified: 30 },
    { month: "Feb", registered: 55, verified: 42 },
    { month: "Mar", registered: 70, verified: 55 },
    { month: "Apr", registered: 62, verified: 48 },
    { month: "May", registered: 90, verified: 75 },
    { month: "Jun", registered: 110, verified: 95 },
  ];

  return (
    <div className="w-full px-4 py-8 pb-20 sm:p-10">

      {/* ================= DASHBOARD CARDS ================= */}

      <div className="grid grid-cols-2 gap-5  lg:grid-cols-4">

        {
          loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            dashboardCards.map((card) => {
              const Icon = card.icon;

              // Card color
              let textColor = "text-blue-600";
              let valueColor = "text-blue-700";
              let iconBg = "bg-blue-50";

              if (card.name === "Pending Verification") {
                textColor = "text-amber-600";
                valueColor = "text-amber-700";
                iconBg = "bg-amber-50";
              }

              if (card.name === "Verified Companies") {
                textColor = "text-green-600";
                valueColor = "text-green-700";
                iconBg = "bg-green-50";
              }

              if (card.name === "Today Registered") {
                textColor = "text-purple-600";
                valueColor = "text-purple-700";
                iconBg = "bg-purple-50";
              }

              return (
                <div
                  key={card.name}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">

                    {/* LEFT */}
                    <div>
                      <p className={`text-sm font-semibold ${textColor}`}>
                        {card.name}
                      </p>

                      <h2
                        className={`mt-2 text-3xl font-bold ${valueColor}`}
                      >
                        {card.value}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        {card.description}
                      </p>
                    </div>

                    {/* ICON */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBg}`}
                    >
                      <Icon className={`h-6 w-6 ${textColor}`} />
                    </div>

                  </div>
                </div>
              );
            })
          )
        }

      </div>

      {/* ================= COMPANY GRAPH ================= */}

      <div className="mt-8 mb-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Company Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Registered and verified companies
            </p>
          </div>

           

        </div>

        {/* GRAPH */}

        {loading ? (
          <div className="h-[300px] w-full animate-pulse rounded-lg bg-gray-100 sm:h-[350px]"></div>
        ) : (
          <div className="h-[300px] w-full sm:h-[350px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={companyData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip />

                {/* REGISTERED */}

                <Line
                  type="monotone"
                  dataKey="registered"
                  name="Registered"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                {/* VERIFIED */}

                <Line
                  type="monotone"
                  dataKey="verified"
                  name="Verified"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>
            </ResponsiveContainer>

          </div>
        )}

        {/* LEGEND */}

        <div className="mt-4 flex justify-center gap-6 text-sm">

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600"></span>
            <span className="text-gray-600">
              Registered
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600"></span>
            <span className="text-gray-600">
              Verified
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}