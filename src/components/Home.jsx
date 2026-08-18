import React, { useEffect, useState, useMemo } from "react";
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
    (company) => company.verificationStatus?.toLowerCase() === "pending"
  ).length;

  const verifiedCompanies = companies.filter(
    (company) => company.verificationStatus?.toLowerCase() === "verified"
  ).length;

  const todayRegistrations = companies.filter((company) => {
    if (!company.createdAt) return false;
    return (
      new Date(company.createdAt).toDateString() === new Date().toDateString()
    );
  }).length;

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

  // ================= DYNAMIC GRAPH DATA FROM API =================

  const companyData = useMemo(() => {
    const now = new Date();
    const months = [];
    
    // Generate the last 6 months in chronological order
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        month: d.toLocaleString("en-US", { month: "short" }),
        year: d.getFullYear(),
        monthIndex: d.getMonth(),
        registered: 0,
        verified: 0,
      });
    }

    companies.forEach((company) => {
      // 1. Registered count by month
      if (company.createdAt) {
        const regDate = new Date(company.createdAt);
        if (!isNaN(regDate.getTime())) {
          const match = months.find(
            (m) =>
              m.monthIndex === regDate.getMonth() &&
              m.year === regDate.getFullYear()
          );
          if (match) {
            match.registered += 1;
          }
        }
      }

      // 2. Verified count by month
      const isVerified =
        company.verificationStatus?.toLowerCase() === "verified";
      if (isVerified) {
        const verDate = company.verificationDate
          ? new Date(company.verificationDate)
          : company.createdAt
          ? new Date(company.createdAt)
          : null;

        if (verDate && !isNaN(verDate.getTime())) {
          const match = months.find(
            (m) =>
              m.monthIndex === verDate.getMonth() &&
              m.year === verDate.getFullYear()
          );
          if (match) {
            match.verified += 1;
          }
        }
      }
    });

    return months.map(({ month, registered, verified }) => ({
      month,
      registered,
      verified,
    }));
  }, [companies]);

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
                  stroke="#f1f5f9"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 12px -1px rgb(0 0 0 / 0.08)",
                  }}
                />

                {/* REGISTERED */}
                <Line
                  type="monotone"
                  dataKey="registered"
                  name="Registered"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2563eb" }}
                  activeDot={{ r: 6 }}
                />

                {/* VERIFIED */}
                <Line
                  type="monotone"
                  dataKey="verified"
                  name="Verified"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#16a34a" }}
                  activeDot={{ r: 6 }}
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