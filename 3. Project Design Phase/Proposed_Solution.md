# Phase 3: Project Design Phase — Proposed Solution Description

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Developer Role:** Solo Full-Stack MERN Developer  

---

## 1. Comprehensive Solution Overview
**UCab** is an end-to-end full-stack web platform built on the MERN stack (`MongoDB`, `Express.js`, `React.js`, `Node.js`) that transforms how urban commuters book cab rides and how fleet operators dispatch vehicles. Unlike standard ride-booking clones that merely list generic vehicles, UCab introduces a multi-tier vehicle categorization system coupled with a transparent deterministic fare calculation engine, live GPS state tracking, and a robust dual-engine persistence layer.

---

## 2. Key Pillars of the Proposed Solution

### Pillar 1: Multi-Category Fleet & Transparent Fare Calculation
Instead of a single generic cab rate, UCab categorizes its inventory into four clear vehicle classes:
* **Mini (`₹10/km`):** Affordable hatchbacks designed for short solo commutes (`Base: ₹40`, 4 seats).
* **Sedan (`₹12/km`):** Executive sedans offering extra legroom (`Base: ₹50`, 4 seats).
* **SUV (`₹18/km`):** Multi-utility vehicles for family and group travel (`Base: ₹80`, 6 seats).
* **Luxury (`₹35/km`):** High-end business-class sedans (`Base: ₹150`, 4 seats).

When a user selects their pickup and drop-off points, the frontend instantly computes the route distance (`km`) and displays the exact fare breakdown:  
`Total Fare = Base Fare + (Distance * Price Per KM) - Promo Discount + Perks`

### Pillar 2: In-Ride Customization & Social Responsibility Suite
UCab enables riders to personalize their journey prior to boarding:
* **🍟 In-Ride Refreshments Package (`+₹50`):** Automatically instructs the assigned driver to keep chilled mineral water and premium snacks ready inside the cabin.
* **💖 Road Safety & Driver Welfare Donation (`+₹20`):** Empowers riders to round up their fare, contributing directly to an emergency healthcare and accident insurance fund for drivers.

### Pillar 3: Real-Time Dispatch Tracking & Corporate Invoicing
* **Live Status Tracker (`UserHome.jsx`):** Once a booking is confirmed, the user experiences a visual 4-stage tracking indicator (`Booking Accepted` → `Driver Assigned` → `Cab in Transit` → `Ride Completed`) accompanied by complete driver credentials (`Vikram Sharma - 4.9 ★`, contact phone, and vehicle registration plate).
* **QR Corporate Receipts (`ReceiptModal.jsx`):** Commuters can visit their booking history at any time (`MyBookings.jsx`) and download formal thermal corporate invoices complete with an embedded **QR Verification Code** for seamless company tax expense reimbursement.

### Pillar 4: Executive Admin Control & Fleet CRUD
For dispatch leads and fleet owners, UCab provides a centralized command dashboard (`AdminHome.jsx`) that displays live key performance indicators (Total Gross Revenue `₹`, Total Bookings, Active Users, and Operational Fleet Count). Administrators can effortlessly add new cab inventory (`AddCar.jsx`), edit pricing and number plates (`EditCar.jsx`), toggle vehicle operational status between `Available` and `Busy`, and update trip dispatch states (`AdminBookings.jsx`) across the platform.

### Pillar 5: Zero-Config Dual-Engine Database Architecture
To guarantee that the application can be evaluated or demonstrated on any laptop or university lab workstation without external database dependencies, a self-contained persistence engine (`server/db/store.js`) was engineered. If the Express server detects that MongoDB is offline on startup, it automatically switches from Mongoose ORM queries to atomic file operations (`data.json`), ensuring zero crashes and 100% data preservation.
