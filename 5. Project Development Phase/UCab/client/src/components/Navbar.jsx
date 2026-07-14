import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Sun, Moon, LogOut, User, Shield, Compass, History, LayoutDashboard, Users, CalendarCheck } from 'lucide-react';

const Navbar = () => {
    const { user, admin, role, logout, theme, toggleTheme } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            boxShadow: 'var(--shadow-sm)'
        }}>
            <nav style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0.9rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {/* Brand Logo */}
                <Link to={role === 'admin' ? '/ahome' : role === 'user' ? '/uhome' : '/'} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: 'var(--text-primary)'
                }}>
                    <div style={{
                        backgroundColor: '#f59e0b',
                        color: '#fff',
                        padding: '0.45rem',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(245, 158, 11, 0.3)'
                    }}>
                        <Car size={24} />
                    </div>
                    <span>U<span style={{ color: '#f59e0b' }}>cab</span></span>
                    {role === 'admin' && (
                        <span style={{
                            fontSize: '0.65rem',
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            letterSpacing: '0.05em'
                        }}>ADMIN</span>
                    )}
                </Link>

                {/* Navigation Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {role === 'user' && (
                        <>
                            <NavLink to="/uhome" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'color 0.2s'
                            })}>
                                <Compass size={18} /> Dashboard
                            </NavLink>
                            <NavLink to="/cabs" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'color 0.2s'
                            })}>
                                <Car size={18} /> Book Cabs
                            </NavLink>
                            <NavLink to="/mybookings" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                transition: 'color 0.2s'
                            })}>
                                <History size={18} /> My Bookings
                            </NavLink>
                        </>
                    )}

                    {role === 'admin' && (
                        <>
                            <NavLink to="/ahome" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            })}>
                                <LayoutDashboard size={18} /> Dashboard
                            </NavLink>
                            <NavLink to="/admin/cabs" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            })}>
                                <Car size={18} /> Cabs
                            </NavLink>
                            <NavLink to="/admin/bookings" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            })}>
                                <CalendarCheck size={18} /> All Bookings
                            </NavLink>
                            <NavLink to="/admin/users" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            })}>
                                <Users size={18} /> Users
                            </NavLink>
                        </>
                    )}

                    {!role && (
                        <>
                            <NavLink to="/login" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)'
                            })}>
                                User Login
                            </NavLink>
                            <NavLink to="/alogin" style={({ isActive }) => ({
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? '#f59e0b' : 'var(--text-secondary)'
                            })}>
                                Admin Portal
                            </NavLink>
                        </>
                    )}

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={toggleTheme}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--border-color)'
                        }}
                        title="Toggle Dark Mode"
                    >
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#f59e0b' }} />}
                    </button>

                    {/* User Profile / Logout */}
                    {role && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            {role === 'user' && (
                                <Link to="/profile" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.35rem 0.8rem',
                                    borderRadius: '999px',
                                    backgroundColor: 'var(--bg-secondary)',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    <User size={16} style={{ color: '#f59e0b' }} />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name?.split(' ')[0] || 'Profile'}</span>
                                </Link>
                            )}
                            {role === 'admin' && (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.35rem 0.8rem',
                                    borderRadius: '999px',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    fontWeight: 700,
                                    fontSize: '0.85rem'
                                }}>
                                    <Shield size={16} />
                                    <span>{admin?.name || 'Admin'}</span>
                                </div>
                            )}
                            <button
                                onClick={handleLogout}
                                className="btn btn-secondary"
                                style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem', gap: '0.3rem' }}
                                title="Logout"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
