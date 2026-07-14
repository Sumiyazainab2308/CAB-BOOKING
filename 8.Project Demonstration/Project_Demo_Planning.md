# Phase 8: Project Demonstration — Pre-Demo Planning & Readiness Checklist

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Developer Role:** Solo Full-Stack MERN Developer  

---

## 1. Pre-Demo Environmental Checklist
Before presenting to the evaluation panel or recording your project demo video, verify each item on this technical checklist:

| Verification Item | Verification Command / Action | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Node.js Environment** | `node -v` in terminal | `v18.0.0` or higher | **Ready ✅** |
| **Backend Port Availability** | Check nothing is using Port `8000` | Port 8000 free for Express server | **Ready ✅** |
| **Frontend Port Availability** | Check nothing is using Port `5173` | Port 5173/5174 free for Vite dev server | **Ready ✅** |
| **Zero-Config Storage Check** | Check if `server/db/data.json` exists | File auto-creates and seeds 6 cab records | **Ready ✅** |
| **Demo Account Credentials** | Test clicking 1-Click buttons on `/login` | Instant login with `pravanshu@ucab.com` | **Ready ✅** |

---

## 2. Contingency & Fallback Strategy

### Scenario A: University WiFi / Internet Disconnects During Demo
* **Impact:** High (External APIs or CDN fonts might fail).
* **Solo Developer Solution:** `UCab` uses local vector icons (`Lucide React`) and locally bundled packages. Furthermore, because our backend includes the **Zero-Config File Storage Engine (`store.js`)**, you can completely disconnect your laptop from the internet (`Airplane Mode`) and the application will run 100% locally on `localhost:8000` and `localhost:5173` without a single hiccup.

### Scenario B: Local MongoDB Service Stops Working on Grader PC
* **Impact:** Critical for traditional MERN apps (server crashes with `MongoNetworkError`).
* **Solo Developer Solution:** Our server explicitly catches connection timeouts (`config.js`) and prints:  
  `⚠️ MongoDB local engine not found... ✨ Automatic Zero-Config MERN Fallback Activated!`  
  The demo proceeds seamlessly using `server/db/data.json`.
