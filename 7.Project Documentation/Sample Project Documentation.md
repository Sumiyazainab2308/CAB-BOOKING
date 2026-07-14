# Phase 7: Project Documentation — Exhaustive User Manual & API Reference

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Team Member / Solo Developer:** Shaik Sumiya Zainab  

---

## 1. System Operating Manual

### 1.1 For Urban Commuters (Riders)
1. **Navigating the Homepage (`/home`):** The landing page welcomes riders with a vibrant hero section and an instant booking search widget. Enter your desired pickup point, drop-off location, and trip date, then click **Find Available Cabs**.
2. **Filtering Fleet Inventory (`/cabs`):** Browse through all available vehicles categorized by **Mini (`₹10/km`)**, **Sedan (`₹12/km`)**, **SUV (`₹18/km`)**, and **Luxury (`₹35/km`)**. Use the top filter tabs or sort by price (`Low to High`) to find a cab that fits your budget.
3. **Customizing the Ride (`/book/:id`):** 
   * **Distance Estimator:** The system automatically calculates your trip distance (`km`) and estimated travel time (`minutes`).
   * **Promo Discounts:** Type `UCAB20` into the discount box and click **Apply** to deduct exactly 20% from your fare.
   * **Add-On Perks:** Check **In-Ride Chilled Water & Snacks Package (+₹50)** or **Road Safety Driver Welfare Donation (+₹20)**. Notice how the total fare updates instantly.
   * **Payment Selector:** Choose **Automatic Saved Card (`Visa •••• 4242`)** or **UPI Instant Checkout**, then click **Confirm & Book Cab**.
4. **Live Dispatch Tracking (`/home-user`):** Watch the interactive progress bar advance across 4 stages (`Booking Accepted` → `Driver Assigned` → `Cab in Transit` → `Completed`). Inspect your assigned driver details (`Vikram Sharma - 4.9 ★`, phone number, and registration plate `DL 01 AB 1234`).
5. **Downloading Corporate Receipts (`/bookings`):** Visit your trip log, locate any completed ride, and click **Invoice** (`ReceiptModal.jsx`). Print or download your formal thermal tax invoice with embedded **QR Verification Code**.

---

### 1.2 For Dispatch Administrators (`/admin/*`)
1. **Executive Login (`/admin/login`):** Click **"🛡️ One-Click Super Admin Login"** to bypass manual typing during evaluation.
2. **Monitoring Analytics KPIs (`/admin`):** Inspect top-level cards showing Gross Revenue (`₹`), Total Bookings, Active Users, and Operational Fleet Count.
3. **Managing Fleet Inventory (`/admin/cars`):** View all active cabs. Click **Add New Cab (`/admin/add-car`)** to create a new vehicle profile by entering model name, category, pricing, and attaching a high-res vehicle image. Click **Edit (`/admin/edit-car/:id`)** to update rates or toggle vehicle operational availability between `Available` (`Green Badge`) and `Busy` (`Red Badge`).
4. **Dispatching & Updating Trips (`/admin/bookings`):** Monitor incoming platform bookings in real time. Select any trip and change its status dropdown from `Accepted` to `Started` or `Completed` to update the rider's tracking screen instantly.

---

## 2. Comprehensive REST API Reference Guide

### 2.1 Authentication & User Endpoints (`/api/users`)
* **`POST /api/users/register`**  
  * **Payload:** `{ name: "John Doe", email: "john@ucab.com", password: "secretpassword", phone: "9876543210" }`  
  * **Response (`201 Created`):** `{ _id: "user_1", name: "John Doe", email: "john@ucab.com", token: "eyJhbGciOi..." }`
* **`POST /api/users/login`**  
  * **Payload:** `{ email: "sumiya@ucab.com", password: "password123" }`  
  * **Response (`200 OK`):** `{ _id: "user_p", name: "Shaik Sumiya Zainab", email: "sumiya@ucab.com", token: "eyJhbG..." }`

### 2.2 Fleet Catalog Endpoints (`/api/cars`)
* **`GET /api/cars`**  
  * **Access:** Public  
  * **Response (`200 OK`):** Array of car objects `[ { _id: "car_1", name: "Maruti Suzuki Swift Dzire", cabType: "Sedan", pricePerKm: 12, baseFare: 50, isAvailable: true, image: "https://..." }, ... ]`
* **`POST /api/cars`**  
  * **Access:** Protected (`Bearer Token + Admin Role`)  
  * **Payload:** Multipart/form-data or JSON `{ name, cabType, pricePerKm, baseFare, seats, plateNumber, image }`  
  * **Response (`201 Created`):** Created car object.

### 2.3 Trip Booking Endpoints (`/api/bookings`)
* **`POST /api/bookings`**  
  * **Access:** Protected User (`Bearer Token`)  
  * **Payload:** `{ car: "car_1", pickupLocation: "Connaught Place", dropLocation: "Terminal 3", bookingDate: "2026-07-15", distanceKm: 18, totalFare: 266, refreshmentsOrdered: true, donationMade: false, discountCode: "UCAB20" }`  
  * **Response (`201 Created`):** Trip object with `driverAssigned` details.
* **`GET /api/bookings/user`**  
  * **Access:** Protected User (`Bearer Token`)  
  * **Response (`200 OK`):** Chronological array of personal trip records.
* **`PUT /api/bookings/:id`**  
  * **Access:** Protected Admin (`Bearer Token + Admin Role`)  
  * **Payload:** `{ status: "Started" }` (or `Completed`, `Cancelled`)  
  * **Response (`200 OK`):** Updated booking object.

### 2.4 Executive Admin Endpoints (`/api/admin`)
* **`POST /api/admin/login`**  
  * **Payload:** `{ email: "admin@ucab.com", password: "adminpassword" }`  
  * **Response (`200 OK`):** `{ _id: "adm_1", name: "Super Admin", email: "admin@ucab.com", role: "admin", token: "..." }`
* **`GET /api/admin/stats`**  
  * **Access:** Protected Admin (`Bearer Token + Admin Role`)  
  * **Response (`200 OK`):** `{ totalCars: 6, totalBookings: 3, totalUsers: 2, totalRevenue: 850 }`
