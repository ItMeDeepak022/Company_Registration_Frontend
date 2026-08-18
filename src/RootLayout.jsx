import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ProtectedLayout from './ProtectedLayout'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import CompanyRegistration from './company/CompanyRegister'
import EditCompanyRegistration from './company/Edit'
import AllCompanies from './allcompany/Allcompany'
import CompanyVerification from './company-varification/Verification'
import Profile from './profile/Profile'

export default function RootLayout() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route path="/" element={<Login />} />

                {/* Protected Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    }
                >
                    {/* /dashboard */}
                    <Route index element={<Home />} />

                    {/* /dashboard/company-registration */}
                    <Route
                        path="company-registration"
                        element={<CompanyRegistration />}
                    />

                    {/* /dashboard/edit-company-registration */}
                    <Route
                        path="edit-company-registration/:id"
                        element={<EditCompanyRegistration />}
                    />

                    {/* /dashboard/company-verification */}
                    <Route
                        path="company-verification"
                        element={<CompanyVerification />}
                    />

                    {/* /dashboard/companies */}
                    <Route
                        path="companies"
                        element={<AllCompanies />}
                    />

                    {/* /dashboard/profile */}
                    <Route
                        path="profile"
                        element={<Profile />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
