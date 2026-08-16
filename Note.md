# Frontend Tasks

## 1. Company Registration

* [ ] Company Name
* [ ] Company Registration Number
* [ ] PAN
* [ ] Email
* [ ] Phone Number
* [ ] Address
* [ ] Password
* [ ] Confirm Password
* [ ] Required-field validation
* [ ] Email validation
* [ ] Password validation
* [ ] Password confirmation
* [ ] Loading state
* [ ] Success/Error notification
* [ ] Redirect to Login after successful registration

## 2. Login & Authentication

* [ ] Email
* [ ] Password
* [ ] JWT-based authentication
* [ ] Loading state
* [ ] Error handling
* [ ] Redirect authenticated user to Dashboard
* [ ] Protected Dashboard routes
* [ ] Redirect unauthenticated users to Login

## 3. Dashboard

* [ ] Company Name
* [ ] Registration Number
* [ ] PAN
* [ ] Email
* [ ] Phone
* [ ] Registration Date
* [ ] Verification Status
* [ ] Pending status
* [ ] Verified status
* [ ] Rejected status
* [ ] Verify Company button

## 4. Company Verification

* [ ] Send company information to backend
* [ ] Show verification loading state
* [ ] Display verification result
* [ ] Successful verification
* [ ] Failed verification
* [ ] Invalid company details
* [ ] Third-party API failure
* [ ] Third-party API timeout
* [ ] Company already verified

## 5. UI / UX

* [ ] Clean professional UI
* [ ] Responsive design
* [ ] Mobile-friendly design
* [ ] Consistent typography
* [ ] Consistent spacing
* [ ] Professional forms
* [ ] Clear buttons and actions
* [ ] Loading states
* [ ] Success/Error states
* [ ] Empty states
* [ ] Disabled states
* [ ] Proper navigation
* [ ] No browser `alert()` for normal messages
* [ ] No unnecessary animations

## 6. Deployment

* [ ] Deploy frontend on Vercel or Render
* [ ] Configure environment variables
* [ ] Verify deployed application is accessible and functional



# Company Registration & Verification System

## Project Overview

A full-stack web application developed for secure company registration, profile management, authentication, and company verification. The system is built using React.js, Node.js, Express.js, and MongoDB, with JWT-based authentication and third-party/mock verification API integration.

## Frontend Features

- Company Registration — Allows users to register their company by submitting required details such as company name, registration number, PAN, email, phone, address, and password.

- Authentication — Provides a secure login system using JWT authentication to verify registered users.

- Protected Routes — Restricts access to authenticated pages and redirects unauthenticated users to the login page.

- Dashboard — Provides a centralized interface where users can access company-related features and view important information.

- Company Profile — Displays the logged-in user's basic information along with their registered company details and verification status.

- All Companies — Displays registered companies in a responsive card-based layout with relevant company information.

- Edit Company — Allows users to update permitted company information such as company name, phone number, address, and password.

- Company Verification — Allows users to submit their company details for verification through the verification API.

- Verification Result — Displays the current verification status and result, including Pending, Verified, and Rejected states.

- Responsive Interface — Provides a responsive and user-friendly interface that works across mobile, tablet, and desktop devices.

- Application States — Provides loading indicators, success messages, error handling, disabled states, and empty states for better user experience.

## Backend Features

- RESTful API Architecture — Provides structured API endpoints for authentication, company registration, profile management, and company verification.

- JWT Authentication — Uses JSON Web Tokens to securely authenticate users and authorize protected API requests.

- Protected APIs — Uses authentication middleware to ensure that company-related operations can only be accessed by authenticated users.

- Company Registration — Handles company registration, validates required fields, prevents duplicate company registration details, and stores company information in MongoDB.

- Company Profile Management — Provides APIs to retrieve and update the logged-in user's registered company information.

- Password Security — Uses bcrypt to securely hash passwords before storing them in the database.

- Company Verification — Processes company verification requests and updates the company's verification status, result, and verification date.

- Third-Party/Mock API Integration — Communicates with an external or mock verification service to validate company registration details.

- MongoDB Integration — Stores user, company, authentication, and verification-related information using MongoDB.

- Input Validation — Validates required fields, password confirmation, company registration details, and other incoming API data.

- Error Handling — Handles validation errors, duplicate records, authentication errors, API failures, and other server-side exceptions with appropriate HTTP responses.