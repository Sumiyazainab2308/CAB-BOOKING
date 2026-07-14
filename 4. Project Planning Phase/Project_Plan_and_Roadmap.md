# Phase 4: Project Planning & Development Roadmap

## 1. Project Milestones & Sprints

```mermaid
gantt
    title UCab Full-Stack Development Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Core Foundation
    Requirements & UI Wireframing      :done,    des1, 2026-07-01, 3d
    Backend REST API & JWT Auth        :done,    des2, 2026-07-04, 4d
    section Phase 2: Rider Experience
    Vehicle Categorization & Filters   :done,    des3, 2026-07-08, 3d
    Booking Flow & Fare Calculation    :done,    des4, 2026-07-11, 3d
    section Phase 3: Dispatch & Resilience
    Admin KPI & Fleet Management (CRUD):done,    des5, 2026-07-14, 2d
    Zero-Config Fallback Storage Engine:done,    des6, 2026-07-14, 1d
```

---

## 2. Work Breakdown Structure (WBS)

### 2.1 Frontend Engineering (React + Vite)
* **Design System (`index.css`):** Glassmorphism cards, CSS variables, vibrant status colors, and responsive grid patterns.
* **Core Components:** `Navbar.jsx`, `Footer.jsx`, `ProtectedUserRoute.jsx`, `ProtectedAdminRoute.jsx`, and `ReceiptModal.jsx`.
* **State Management (`AuthContext.jsx`):** Persistent JWT handling in `localStorage` alongside floating toast notification triggers.

### 2.2 Backend Engineering (Node.js + Express.js)
* **Security Layer (`authMiddleware.js`):** Intercept and decode Bearer tokens for both User and Admin routes.
* **Controllers:** `carController.js`, `userController.js`, `bookingController.js`, and `adminController.js`.
* **Resilience Engine (`config.js` & `store.js`):** Automatic local JSON storage system that guarantees application availability even if the local MongoDB daemon is stopped.
