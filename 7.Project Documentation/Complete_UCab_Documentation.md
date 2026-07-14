# Phase 7: Complete UCab Project Documentation

## 1. Executive Summary
**UCab** is an end-to-end full-stack web application designed for urban mobility. Developed using the **MERN** stack, it provides users with an intuitive ride booking platform with live tracking while granting dispatchers granular control over active fleet assets and revenue metrics.

---

## 2. System Architecture & Dual Engine
UCab employs an advanced backend engine (`server/db/config.js` & `server/db/store.js`) that automatically switches between two modes:
1. **Mongoose ORM Mode:** When a live MongoDB database (`mongodb://localhost:27017/ucab` or Atlas URI) is detected, all operations execute via high-performance Mongoose schemas.
2. **Atomic JSON Fallback Mode:** When MongoDB is offline, the system catches connection failures and transparently reads and writes to `server/db/data.json` with zero data loss or API disruption.

---

## 3. User Guide & Walkthrough

### 3.1 Booking a Ride (User Flow)
1. **Login:** Navigate to `/login` and select **One-Click Demo Rider Login**.
2. **Find Cabs:** Click **Explore Cabs** or use the homepage quick-book widget.
3. **Customize Ride:** Select your destination distance, apply promo discount `UCAB20`, check the box for **In-Ride Chilled Water & Snacks Package (+₹50)**, and choose **Automatic Saved Card**.
4. **Confirm & Track:** Click **Confirm & Book Cab**. You will be redirected to your live GPS tracker (`/home-user`) showing your driver details (`Vikram Sharma`) and route status.
5. **Download Receipt:** Visit **My Bookings (`/bookings`)** and click **Invoice** to view and print your corporate PDF receipt with QR verification code.

### 3.2 Managing Fleet & Dispatch (Admin Flow)
1. **Executive Login:** Navigate to `/admin/login` and click **One-Click Super Admin Login**.
2. **Analytics Overview:** Review gross revenue, total completed rides, and fleet capacity at `/admin`.
3. **Dispatch Rides:** Visit **Dispatch Bookings (`/admin/bookings`)** and update trip statuses (`Accepted` → `Started` → `Completed`) to inform riders in real time.
4. **Fleet CRUD:** Visit **Fleet Management (`/admin/cars`)** to add new luxury vehicles or update existing cab availability toggles.
