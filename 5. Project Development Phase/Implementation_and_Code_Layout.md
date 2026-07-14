# Phase 5: Project Development Phase — Implementation & Code Layout

## 1. Source Code Location
The complete, fully functioning **UCab MERN Application** is located directly inside this folder (`5. Project Development Phase/UCab/`) as well as in the root repository directory (`/UCab/`) for convenient execution.

---

## 2. Code Layout & Directory Architecture

```text
5. Project Development Phase/UCab/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Favicons and SVG brand icons
│   ├── src/
│   │   ├── assets/             # High-res graphics & UI illustrations
│   │   ├── components/         # Reusable structural widgets:
│   │   │   ├── Navbar.jsx              # Navigation with dynamic status/logout
│   │   │   ├── Footer.jsx              # Footer links and support details
│   │   │   ├── ReceiptModal.jsx        # Corporate PDF thermal invoice with QR code
│   │   │   └── ProtectedRoutes.jsx     # Route gating by role (Rider vs Admin)
│   │   ├── context/            # AuthContext.jsx — Session, toasts & user state
│   │   ├── pages/              # 11 distinct view screens:
│   │   │   ├── Home.jsx                # Landing page with booking widget
│   │   │   ├── CabListing.jsx          # Filterable vehicle inventory
│   │   │   ├── BookCab.jsx             # Checkout, distance, promos & perks
│   │   │   ├── UserHome.jsx            # Live GPS progress tracking bar
│   │   │   ├── MyBookings.jsx          # Trip log with receipt downloads
│   │   │   ├── Profile.jsx             # Profile update & saved card settings
│   │   │   ├── AdminHome.jsx           # Executive KPI statistics dashboard
│   │   │   ├── AdminCars.jsx           # Fleet inventory management
│   │   │   ├── AddCar.jsx / EditCar    # CRUD cab management
│   │   │   └── AdminBookings.jsx       # Dispatch control monitor
│   │   └── index.css           # Vanilla CSS design tokens & animations
│   ├── package.json
│   └── vite.config.js
└── server/                     # Express.js + Node.js Backend API
    ├── controllers/            # Controller logic for all models
    ├── db/                     # Dual database adapter (`config.js`, `store.js`)
    ├── middleware/             # JWT protect and Multer image upload
    ├── models/                 # Mongoose schemas (`User`, `Admin`, `Car`, `Booking`)
    ├── routes/                 # Express API routers (`/api/cars`, `/api/bookings`, etc.)
    ├── package.json
    └── server.js               # API initialization & zero-config fleet seeder
```

---

## 3. Key Design Decisions & Code Highlights

### 3.1 Transparent Zero-Config Persistence Engine (`server/db/store.js`)
To guarantee that reviewers can test the application without installing or configuring local MongoDB engines, our backend checks `global.isMongoConnected`. If MongoDB is offline, all database operations (`find()`, `findById()`, `create()`, `findByIdAndUpdate()`) transparently fall back to atomic file operations on `server/db/data.json`:

```javascript
// Example from carController.js demonstrating dual-engine fallback:
exports.getAllCars = async (req, res) => {
    try {
        if (global.isMongoConnected) {
            const cars = await Car.find().sort({ createdAt: -1 });
            return res.json(cars);
        } else {
            const store = loadData();
            return res.json(store.cars || []);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```
