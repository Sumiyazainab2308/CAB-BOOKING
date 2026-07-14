# Phase 7: Project Documentation — Executable Files & Quick-Start Guide

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Team Member / Solo Developer:** Shaik Sumiya Zainab  

---

## 1. System Prerequisites
Before executing the **UCab** application, ensure that the target evaluation machine has the following software installed:
* **Node.js:** v18.0.0 or higher (`v20.x` recommended). Verify via terminal: `node -v`
* **NPM Package Manager:** v9.0.0 or higher. Verify via terminal: `npm -v`
* **MongoDB (Optional):** Local `mongod` daemon on port `27017` OR cloud Atlas connection string.  
  *(Note: Thanks to our built-in **Zero-Config Storage Engine**, if MongoDB is not installed, the server will automatically seed and save data locally to `server/db/data.json` without any installation errors or crashes).*

---

## 2. Directory Structure of Executable Source Code
The runnable source code is provided inside two accessible locations in this repository:
1. `5. Project Development Phase/UCab/`
2. Root directory `/UCab/`

---

## 3. Step-by-Step Execution Commands

### Step 1: Start the Backend REST API Server (Port 8000)
Open a terminal window and execute:

```bash
# 1. Navigate to the backend server folder
cd UCab/server

# 2. Install required Node modules (Express, Mongoose, JWT, Bcrypt, Multer)
npm install

# 3. Launch the API Server
npm start
```

**Expected Console Output:**
```text
> ucab-backend@1.0.0 start
> node server.js

------------------------------------------------------------------
⚠️ MongoDB local engine not found on port 27017 (or connected successfully)
✨ Automatic Zero-Config MERN Fallback Activated:
✨ All Mongoose Schemas & API endpoints will transparently persist data to server/db/data.json!
------------------------------------------------------------------
Server running on port 8000 🚀
Seeded/loaded 6 cars from automatic JSON persistence store.
```

---

### Step 2: Start the React + Vite Frontend Web App (Port 5173 / 5174)
Open a **second terminal window** and execute:

```bash
# 1. Navigate to the frontend client folder
cd UCab/client

# 2. Install React, Vite, Router, and Icon packages
npm install

# 3. Launch the Vite Development Server
npm run dev
```

**Expected Console Output:**
```text
  VITE v5.4.1  ready in 632 ms

  ➜  Local:   http://localhost:5173/   (or http://localhost:5174/)
  ➜  Network: use --host to expose
```

---

## 4. Pre-Loaded Evaluation Demo Accounts
To test all user and admin workflows immediately without going through manual registration forms, use our built-in 1-Click Demo accounts:

* **Demo Rider Account:**  
  * **Email:** `sumiya@ucab.com` | **Password:** `password123`  
  * *(Action: Click the button labelled **"⚡ One-Click Demo Rider Login"** on `/login`)*
* **Demo Super Admin Account:**  
  * **Email:** `admin@ucab.com` | **Password:** `adminpassword`  
  * *(Action: Click the button labelled **"🛡️ One-Click Super Admin Login"** on `/admin/login`)*
