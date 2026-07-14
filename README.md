# 🚖 UCab — Modern Full-Stack MERN Cab Booking Application

[![MERN Stack](https://img.shields.io/badge/Stack-MERN%20(MongoDB%2C%20Express%2C%20React%2C%20Node)-f59e0b?style=for-the-badge)](https://github.com/Sumiyazainab2308/CAB-BOOKING)
[![License: MIT](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](./LICENSE)
[![Zero-Config Engine](https://img.shields.io/badge/Database-MongoDB%20%7C%20JSON%20Fallback-3b82f6?style=for-the-badge)](#database-dual-engine-architecture)

**UCab** is a simple, modern, and production-ready cab booking application designed to make travel reliable, stress-free, and delightful. Built on the **MERN** technology stack (**MongoDB, Express.js, React.js, Node.js**), UCab provides frictionless ride booking, real-time GPS tracking, automated billing, and a powerful dual-engine backend architecture.

---

## 📁 Repository Structure (AI-ML & Gen-AI Track Template Compliant)

This repository strictly follows the **[AI-ML-and-GEN-AI-Track-Project-Template](https://github.com/Ravi-teja-777/AI-ML-and-GEN-AI-Track-Project-Template)** structure across all 8 project phases:

```text
CAB-BOOKING/
├── 1. Brainstorming & Ideation/        # Problem statement, empathy map & prioritization
├── 2. Requirement Analysis/            # DFD, customer journey, & tech stack specification
├── 3. Project Design Phase/            # Architecture diagrams, API specs, & UI/UX flow
├── 4. Project Planning Phase/          # Sprint timeline, task allocation, & milestones
├── 5. Project Development Phase/       # Full MERN Source Code (client + server) + Layout
│   ├── UCab/                           # Complete React Frontend & Node/Express Backend
│   └── Implementation_and_Code_Layout.md
├── 6.Project Testing/                  # Unit, API, performance, & integration test reports
├── 7.Project Documentation/            # Executive summary & user manual
├── 8.Project Demonstration/            # Demo script, walkthrough & future roadmap
├── UCab/                               # Root quick-access copy of source code
└── README.md                           # Main project overview
```

---

## 🌟 Key Features

### 🧑‍💼 For Riders (User Portal)
* **Instant Trip Booking:** Select pickup/drop-off points, ride dates, and pick from 4 distinct cab categories: **Mini (`₹10/km`)**, **Sedan (`₹12/km`)**, **SUV (`₹18/km`)**, and **Luxury (`₹35/km`)**.
* **Smart Fare & Time Estimation:** Real-time distance calculation with dynamic fare breakdown and estimated arrival/duration.
* **Special Ride Perks:**
  * **🏷️ Promo Codes:** Apply `UCAB20` (20% off) or `WELCOME10` (10% off).
  * **🍟 In-Ride Refreshments Package:** Order chilled water and snacks (`+₹50`).
  * **💖 Road Safety Charity Donation:** Optional round-up contribution (`+₹20`) to driver welfare.
* **Real-Time Dispatch Tracking:** Live interactive status tracker (`Accepted` → `Started` → `Completed`) showing assigned driver credentials (`Vikram Sharma - 4.9 ★`) and simulated GPS route progress.
* **Digital Receipts & QR Invoices:** Download corporate thermal tax invoices with embedded QR verification codes directly from trip history.

### 🛡️ For Dispatchers (Admin Executive Portal)
* **Live System Analytics:** Real-time KPI dashboard tracking total rides, active riders, operational fleet inventory, and cumulative revenue (`₹`).
* **Fleet Management (CRUD):** Add, edit, or remove cab inventory with custom number plates (`DL 01 AB 1234`), capacities, and instant availability toggles (`Available` / `Busy`).
* **Trip Dispatch Manager:** Update active ride statuses across the platform with instant synchronization across user devices.
* **Rider Directory:** Monitor registered users, contact info, and saved payment profiles.

---

## ⚡ Quick Start & Setup Guide

UCab comes equipped with a **Zero-Config Dual-Engine Database Architecture**. Whether you have MongoDB running locally OR not, the application starts immediately without configuration bottlenecks.

### 1. Start the Backend API (Port 8000)
```bash
cd UCab/server
npm install
npm start
```
*Note: If MongoDB is connected on `mongodb://localhost:27017/ucab`, data is stored in MongoDB. Otherwise, the server automatically switches to an in-memory & file-backed JSON engine (`server/db/data.json`).*

### 2. Start the Frontend Web App (Port 5173/5174)
```bash
cd UCab/client
npm install
npm run dev
```

### 3. Quick Demo Credentials (Pre-Seeded)
* **Demo Rider Account:** `pravanshu@ucab.com` / `password123` *(Or click "⚡ One-Click Demo Rider Login")*
* **Demo Super Admin Account:** `admin@ucab.com` / `adminpassword` *(Or click "🛡️ One-Click Super Admin Login")*

---

## 🛠️ Technology Stack
* **Frontend:** React 18, Vite, React Router DOM, Axios, Lucide React Icons, Custom Vanilla CSS Design System (`index.css`).
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), Bcrypt, Multer (Image Uploads), Cors.
* **Database:** MongoDB (via Mongoose ORM) + Automatic JSON File Persistence Engine (`store.js`).
