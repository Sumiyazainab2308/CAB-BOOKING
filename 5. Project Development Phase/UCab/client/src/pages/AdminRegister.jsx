import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, User, Mail, Lock, ArrowRight } from 'lucide-react';

const AdminRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginAdmin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password) {
            setError('Please fill out all required fields');
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/api/admin/register', {
                name,
                email,
                password
            });

            loginAdmin(res.data, res.data.token);
            navigate('/ahome');
        } catch (err) {
            setError(err.response?.data?.message || 'Admin registration failed.');
        } finally {
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
                borderTop: '5px solid #ef4444',
                boxShadow: 'var(--shadow-xl)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '0.65rem',
                        borderRadius: '14px',
                        marginBottom: '0.8rem'
                    }}>
                        <Shield size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Create Admin Account</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Register for fleet & system management privileges.
                    </p>
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

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder="Admin Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder="admin@ucab.com"
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
                        className="btn btn-danger"
                        style={{ width: '100%', marginTop: '0.6rem', padding: '0.85rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Creating Admin...' : 'Register Admin Account'} <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Already have an admin account?{' '}
                    <Link to="/alogin" style={{ color: '#ef4444', fontWeight: 700 }}>
                        Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
