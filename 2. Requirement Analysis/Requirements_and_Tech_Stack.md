# Phase 2: Requirement Analysis & Technology Stack Specification

## 1. Functional Requirements

### 1.1 Rider Module (User Portal)
1. **User Registration & Authentication:** Users must be able to register using email/password or use instant 1-click demo login.
2. **Trip Booking Flow:** Users must be able to input pickup location, drop-off location, distance (`km`), and booking date.
3. **Vehicle Selection:** Users must be able to select from `Mini`, `Sedan`, `SUV`, or `Luxury` options with base fares and per-KM rates clearly shown.
4. **Perks & Discounts:** Users must be able to apply promo codes (`UCAB20`, `WELCOME10`), order in-ride refreshments (`+₹50`), and add a charity contribution (`+₹20`).
5. **Real-Time Tracking & History:** Users must be able to view their assigned driver details and track live dispatch status (`Accepted`, `Started`, `Completed`).
6. **Digital Receipts:** Users must be able to download corporate invoices with QR codes.

### 1.2 Dispatch Module (Admin Portal)
1. **Analytics Dashboard:** Display total trips, registered riders, fleet count, and total gross revenue.
2. **Cab Inventory Management (CRUD):** Admins must be able to create, read, update, and delete vehicle profiles including registration plates (`DL 01 AB 1234`) and availability status.
3. **Booking Dispatch Control:** Admins must be able to update ride status across all active bookings.
4. **User Management:** Admins must be able to view and manage registered rider accounts.

---

## 2. Non-Functional Requirements
1. **High Availability & Zero-Config Demo:** The backend must include a dual-engine architecture (`Mongoose` + `JSON Fallback`) ensuring 100% uptime even on isolated local test machines without MongoDB installed.
2. **Responsive Design:** The UI must be fully responsive across mobile phones, tablets, and desktop workstations using CSS flexbox/grid.
3. **Security:** Passwords must be hashed using `bcrypt` and REST API routes protected via `jsonwebtoken` Bearer tokens.

---

## 3. Detailed Technology Stack

| Layer | Technologies Used | Purpose |
| :--- | :--- | :--- |
| **Presentation (Frontend)** | React.js 18, Vite, React Router DOM v6 | Fast single-page application rendering and seamless client-side navigation |
| **Styling & Aesthetics** | Vanilla CSS 3 (`index.css`), Lucide Icons | Custom design tokens, glassmorphism cards, gradients, and responsive grids |
| **Application Server (Backend)** | Node.js v20+, Express.js v4 | RESTful API server handling business logic, authentication, and dispatch |
| **Security & Middleware** | JWT, Bcrypt, CORS, Multer | Token validation, password hashing, and multipart/form-data image uploads |
| **Data Persistence** | Mongoose ORM + `store.js` JSON Engine | Dual-mode persistence engine seamlessly supporting real and offline database operations |
