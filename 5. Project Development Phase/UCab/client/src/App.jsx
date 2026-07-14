import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedUserRoute from './components/ProtectedUserRoute';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// User Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserHome from './pages/UserHome';
import CabListing from './pages/CabListing';
import BookCab from './pages/BookCab';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminHome from './pages/AdminHome';
import AdminCars from './pages/AdminCars';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import AdminBookings from './pages/AdminBookings';
import AdminUsers from './pages/AdminUsers';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <main style={{
                        maxWidth: '1280px',
                        width: '100%',
                        margin: '0 auto',
                        padding: '2.5rem 1.5rem',
                        flex: 1
                    }}>
                        <Routes>
                            {/* Public / Landing Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/alogin" element={<AdminLogin />} />
                            <Route path="/aregister" element={<AdminRegister />} />
                            <Route path="/cabs" element={<CabListing />} />

                            {/* Protected User Routes */}
                            <Route path="/uhome" element={
                                <ProtectedUserRoute>
                                    <UserHome />
                                </ProtectedUserRoute>
                            } />
                            <Route path="/bookcab/:id" element={
                                <ProtectedUserRoute>
                                    <BookCab />
                                </ProtectedUserRoute>
                            } />
                            <Route path="/mybookings" element={
                                <ProtectedUserRoute>
                                    <MyBookings />
                                </ProtectedUserRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedUserRoute>
                                    <Profile />
                                </ProtectedUserRoute>
                            } />

                            {/* Protected Admin Routes */}
                            <Route path="/ahome" element={
                                <ProtectedAdminRoute>
                                    <AdminHome />
                                </ProtectedAdminRoute>
                            } />
                            <Route path="/admin/cabs" element={
                                <ProtectedAdminRoute>
                                    <AdminCars />
                                </ProtectedAdminRoute>
                            } />
                            <Route path="/admin/cabs/add" element={
                                <ProtectedAdminRoute>
                                    <AddCar />
                                </ProtectedAdminRoute>
                            } />
                            <Route path="/admin/cabs/edit/:id" element={
                                <ProtectedAdminRoute>
                                    <EditCar />
                                </ProtectedAdminRoute>
                            } />
                            <Route path="/admin/bookings" element={
                                <ProtectedAdminRoute>
                                    <AdminBookings />
                                </ProtectedAdminRoute>
                            } />
                            <Route path="/admin/users" element={
                                <ProtectedAdminRoute>
                                    <AdminUsers />
                                </ProtectedAdminRoute>
                            } />

                            {/* Fallback Route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
