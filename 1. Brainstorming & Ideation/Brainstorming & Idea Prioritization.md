# Phase 1: Brainstorming & Ideation — Idea Prioritization Matrix

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Team Member / Solo Developer:** Shaik Sumiya Zainab  

---

## 1. Idea Brainstorming Session Summary
During the initial conceptualization of **UCab**, over 15 distinct features and architectural ideas were brainstormed to create a competitive full-stack cab booking platform. Since this project was engineered completely from scratch by a single developer, strict prioritization frameworks (Impact vs. Feasibility / MoSCoW Method) were applied to ensure timely, high-quality delivery without compromising on user delight or system reliability.

---

## 2. MoSCoW Prioritization Framework

### Must Have (Core MVP & Evaluation Essentials)
* **JWT Authentication & Role Gating:** Secure token-based access separating standard riders from executive administrators (`protect` and `adminOnly` middleware).
* **Multi-Category Fleet Discovery:** Visual cab listing across 4 vehicle classes (**Mini**, **Sedan**, **SUV**, **Luxury**) with real-time sorting.
* **Deterministic Fare Calculator:** Automatic route distance (`km`) and price calculation (`Base Fare + Distance * Price/KM`).
* **Zero-Config Dual-Engine Storage:** Automatic failover between Mongoose ORM and `data.json` atomic file storage to guarantee 100% demo success across all evaluation machines.

### Should Have (User Delight & Differentiators)
* **Interactive Live GPS Tracking Bar:** Visual step-by-step progress tracker indicating driver assignment, cab arrival, transit, and ride completion.
* **Promo Code Discount Engine:** Live validation for codes `UCAB20` (20% discount) and `WELCOME10` (10% discount).
* **In-Ride Refreshments Package (`+₹50`):** Option to order chilled drinking water and snacks upon booking.
* **Road Safety Charity Contribution (`+₹20`):** Optional checkout donation to driver welfare funds.

### Could Have (Added Polish & Documentation)
* **Corporate Tax Invoice Modal (`ReceiptModal.jsx`):** Printable thermal/corporate invoice with embedded QR code verification.
* **1-Click Demo Login Buttons:** Instant demo account login for both riders and super admins to streamline evaluation testing.

### Won't Have (Deferred for Phase 2 Scalability)
* **Live Bi-Directional WebSocket Streaming:** Replaced with simulated high-fidelity state tracking for Phase 1.
* **Third-Party Payment Gateway Webhooks (Stripe/Razorpay):** Replaced with automated saved payment simulation.

---

## 3. Impact vs. Feasibility Evaluation Matrix

| Proposed Feature | User / Business Impact | Solo Dev Implementation Effort | Priority Action |
| :--- | :--- | :--- | :--- |
| **Tabbed JWT Authentication & Bcrypt Hashing** | High | Medium (3 days) | **Executed (Core)** |
| **Zero-Config Mongoose + JSON Fallback Engine** | High | High (2 days) | **Executed (Core)** |
| **Dynamic Fare & Distance Estimation Engine** | High | Medium (2 days) | **Executed (Core)** |
| **Multi-Class Cab Inventory (CRUD Admin)** | High | Medium (2 days) | **Executed (Core)** |
| **Promo Code Validation & Perks Add-ons** | Medium | Low (1 day) | **Executed (Differentiator)** |
| **Live Dispatch Status Bar (`UserHome.jsx`)** | High | Medium (2 days) | **Executed (Core)** |
| **Printable PDF Corporate Invoice + QR Code** | Medium | Low (1 day) | **Executed (Polish)** |
