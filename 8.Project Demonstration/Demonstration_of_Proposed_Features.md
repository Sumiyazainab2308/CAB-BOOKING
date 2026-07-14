# Phase 8: Project Demonstration — Step-by-Step Feature Walkthrough

**Project Name:** Cab Booking (`UCab`)  
**Project ID:** `N/A (Solo Track Submission)`  
**Developer Role:** Solo Full-Stack MERN Developer  

---

## 1. Step-by-Step Live Demonstration Script

Follow this precise execution flow during evaluation to demonstrate all 22 functional features within a concise 3-minute window:

```mermaid
sequenceDiagram
    autonumber
    actor Evaluator as Evaluator / Grader
    actor SoloDev as Solo Developer (Sumiya / Pravanshu)
    participant Client as React Frontend (Port 5173)
    participant Server as Express Backend (Port 8000)
    participant Store as Dual-Engine Store (data.json)

    SoloDev->>Server: npm start (Console shows Zero-Config Activated)
    SoloDev->>Client: npm run dev (Opens http://localhost:5173)
    SoloDev->>Client: Click "⚡ One-Click Demo Rider Login"
    Client->>Server: POST /api/users/login
    Server->>Store: Lookup User (`pravanshu@ucab.com`)
    Store-->>Server: User Profile + JWT
    Server-->>Client: Issue Bearer Token & Show Welcome Toast
    SoloDev->>Client: Navigate to /cabs, Filter Sedan, Click Book
    SoloDev->>Client: Enter Pickup & Drop, Apply Code `UCAB20`
    SoloDev->>Client: Check Refreshments (`+₹50`) & Charity (`+₹20`)
    SoloDev->>Client: Click "Confirm & Book Cab"
    Client->>Server: POST /api/bookings with Bearer Token
    Server->>Store: Save New Booking Trip
    Store-->>Server: Return Trip Confirmation
    Server-->>Client: Redirect to /home-user (Live GPS Progress Bar)
    SoloDev->>Evaluator: Point out Driver Assigned (`Vikram Sharma`)
    SoloDev->>Client: Open New Tab -> /admin/login -> Click Super Admin Demo
    SoloDev->>Client: Go to /admin/bookings -> Update Status (`Accepted` -> `Started`)
    Client->>Server: PUT /api/bookings/:id
    Server->>Store: Update Trip Status
    SoloDev->>Client: Switch to Rider Tab (`/bookings`) -> Status shows `Started`
    SoloDev->>Client: Click "Invoice" button on Completed Trip
    Client->>Evaluator: Render Thermal PDF Receipt Modal with Verification QR Code
```

---

## 2. Feature Checklist to Show Evaluator
* [x] **Zero-Config Console Log:** Show `Seeded/loaded 6 cars from automatic JSON persistence store`.
* [x] **1-Click Demo Login:** Show instant session generation without typing passwords.
* [x] **Promo Code Engine:** Show `UCAB20` live 20% deduction on fare.
* [x] **Perks Checkboxes:** Show how `+₹50` (Refreshments) and `+₹20` (Donation) add to the total dynamically.
* [x] **Live GPS Dispatch Tracker:** Show the 4-stage tracking indicator and driver card.
* [x] **Admin Dispatch & CRUD:** Show how changing status in `/admin/bookings` syncs directly to the user's trip history.
* [x] **QR Code Corporate Invoice:** Show the printable invoice modal (`ReceiptModal.jsx`).
