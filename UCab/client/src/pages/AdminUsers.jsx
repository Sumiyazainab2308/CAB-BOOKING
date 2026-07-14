import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, Trash2, Mail, Phone, Calendar, Search, ShieldAlert } from 'lucide-react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast } = useAuth();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8000/api/users');
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to load users:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user account? All associated bookings will be unlinked.")) return;

        try {
            await axios.delete(`http://localhost:8000/api/users/${userId}`);
            showToast('User account deleted.', 'info');
            fetchUsers();
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to delete user.', 'error');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <Users size={16} /> Rider Directory
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Registered Users ({users.length})</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>View rider profiles, email addresses, phone contacts, and account status.</p>
                </div>

                <div style={{ position: 'relative', width: '280px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '38px', fontSize: '0.9rem' }}
                        placeholder="Search users by name/email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <Users size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Loading registered users...</div>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="card-static" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                    <ShieldAlert size={44} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>No matching users found</h3>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Avatar & Name</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Saved Payment</th>
                                <th>Joined Date</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((u) => (
                                <tr key={u._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <img
                                                src={u.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'}
                                                alt={u.name}
                                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                                            />
                                            <strong style={{ fontSize: '0.95rem' }}>{u.name}</strong>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <Mail size={14} /> {u.email}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <Phone size={14} /> {u.phone || 'N/A'}
                                        </div>
                                    </td>
                                    <td style={{ fontSize: '0.85rem' }}>
                                        {u.savedPaymentMethod?.split('(')[0] || 'Card Saved'}
                                    </td>
                                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active Member'}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDeleteUser(u._id)}
                                            className="btn btn-danger"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', gap: '0.3rem' }}
                                            title="Delete User"
                                        >
                                            <Trash2 size={15} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
