import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, Lock, Mail, Shield, ArrowRight, Sparkles } from 'lucide-react';

const Login = () => {
    const [tab, setTab] = useState('user'); // 'user' or 'admin'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginUser, loginAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);
        try {
            const endpoint = tab === 'admin' 
                ? 'http://localhost:8000/api/admin/login'
                : 'http://localhost:8000/api/users/login';

            const res = await axios.post(endpoint, { email, password });

            if (tab === 'admin') {
                loginAdmin(res.data, res.data.token);
                navigate('/ahome');
            } else {
                loginUser(res.data, res.data.token);
                navigate('/uhome');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password. Try our 1-click demo login below!');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoUserLogin = async () => {
        setLoading(true);
        setError('');
        try {
            // Check if demo user exists, if not register instantly and login
            try {
                const res = await axios.post('http://localhost:8000/api/users/login', {
                    email: 'pravanshu@ucab.com',
                    password: 'password123'
                });
                loginUser(res.data, res.data.token);
                navigate('/uhome');
            } catch {
                const reg = await axios.post('http://localhost:8000/api/users/register', {
                    name: 'Pravanshu Sharma',
                    email: 'pravanshu@ucab.com',
                    password: 'password123',
                    phone: '+91 98765 43210'
                });
                loginUser(reg.data, reg.data.token);
                navigate('/uhome');
            }
        } catch (err) {
            setError('Could not initialize demo user. Ensure backend server is running on port 8000.');
            setLoading(false);
        }
    };

    const handleDemoAdminLogin = async () => {
        setLoading(true);
        setError('');
        try {
            try {
                const res = await axios.post('http://localhost:8000/api/admin/login', {
                    email: 'admin@ucab.com',
                    password: 'adminpassword'
                });
                loginAdmin(res.data, res.data.token);
                navigate('/ahome');
            } catch {
                const reg = await axios.post('http://localhost:8000/api/admin/register', {
                    name: 'Super Admin',
                    email: 'admin@ucab.com',
                    password: 'adminpassword'
                });
                loginAdmin(reg.data, reg.data.token);
                navigate('/ahome');
            }
        } catch (err) {
            setError('Could not initialize demo admin. Ensure backend server is running on port 8000.');
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
            padding: '1rem'
        }}>
            <div className="card" style={{
                maxWidth: '440px',
                width: '100%',
                padding: '2.5rem',
                borderTop: '5px solid #f59e0b',
                boxShadow: 'var(--shadow-xl)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        padding: '0.65rem',
                        borderRadius: '14px',
                        marginBottom: '0.8rem'
                    }}>
                        {tab === 'admin' ? <Shield size={32} /> : <Car size={32} />}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                        {tab === 'admin' ? 'Admin Portal Login' : 'Welcome Back'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {tab === 'admin'
                            ? 'Manage fleet, monitoring bookings and view revenue.'
                            : 'Sign in to book cabs, check live fares, and manage rides.'}
                    </p>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    backgroundColor: 'var(--bg-secondary)',
                    padding: '0.3rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem'
                }}>
                    <button
                        type="button"
                        onClick={() => { setTab('user'); setError(''); }}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            backgroundColor: tab === 'user' ? 'var(--bg-card)' : 'transparent',
                            color: tab === 'user' ? '#f59e0b' : 'var(--text-secondary)',
                            boxShadow: tab === 'user' ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        User Login
                    </button>
                    <button
                        type="button"
                        onClick={() => { setTab('admin'); setError(''); }}
                        style={{
                            padding: '0.6rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            backgroundColor: tab === 'admin' ? 'var(--bg-card)' : 'transparent',
                            color: tab === 'admin' ? '#f59e0b' : 'var(--text-secondary)',
                            boxShadow: tab === 'admin' ? 'var(--shadow-sm)' : 'none',
                            transition: 'all 0.2s'
                        }}
                    >
                        Admin Portal
                    </button>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        padding: '0.8rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.88rem',
                        marginBottom: '1.25rem',
                        border: '1px solid #f87171'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder={tab === 'admin' ? 'admin@ucab.com' : 'pravanshu@ucab.com'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : `Login as ${tab === 'admin' ? 'Admin' : 'User'}`} <ArrowRight size={18} />
                    </button>
                </form>

                {/* 1-Click Demo Login Section */}
                <div style={{ marginTop: '1.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                        <Sparkles size={14} color="#f59e0b" /> Instant 1-Click Test Credentials
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <button
                            type="button"
                            onClick={handleDemoUserLogin}
                            className="btn btn-secondary"
                            style={{ flex: 1, fontSize: '0.82rem', padding: '0.6rem' }}
                            disabled={loading}
                        >
                            Demo User Login
                        </button>
                        <button
                            type="button"
                            onClick={handleDemoAdminLogin}
                            className="btn btn-secondary"
                            style={{ flex: 1, fontSize: '0.82rem', padding: '0.6rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            disabled={loading}
                        >
                            Demo Admin Login
                        </button>
                    </div>
                </div>

                {tab === 'user' && (
                    <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Don't have an account yet?{' '}
                        <Link to="/register" style={{ color: '#f59e0b', fontWeight: 700 }}>
                            Sign up here
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
