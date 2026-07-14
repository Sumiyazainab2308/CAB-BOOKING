import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CalendarCheck, MapPin, User, Car, DollarSign, CheckCircle, RefreshCw, Filter } from 'lucide-react';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const { showToast } = useAuth();

    const fetchAllBookings = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8000/api/bookings/admin');
            setBookings(res.data);
        } catch (err) {
            console.error("Failed to load system bookings:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/bookings/${bookingId}`, { status: newStatus });
            showToast(`Ride #${bookingId.slice(-6).toUpperCase()} status updated to ${newStatus}`, 'success');
            
            // update state directly for instant feedback
            setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus } : b));
        } catch (err) {
            showToast(err.response?.data?.message || 'Status update failed.', 'error');
        }
    };

    const statusOptions = ['Pending', 'Accepted', 'Started', 'Completed', 'Cancelled'];
    const filteredBookings = statusFilter === 'All' ? bookings : bookings.filter(b => b.status === statusFilter);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <CalendarCheck size={16} /> Trip Dispatch & Management
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>System Bookings ({bookings.length})</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Monitor all active and historical trips across the UCab platform.</p>
                </div>

                {/* Filter & Refresh */}
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                    <select
                        className="form-input"
                        style={{ width: '180px', fontSize: '0.9rem' }}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">Filter Status: All</option>
                        {statusOptions.map(st => (
                            <option key={st} value={st}>{st}</option>
                        ))}
                    </select>

                    <button
                        onClick={fetchAllBookings}
                        className="btn btn-secondary"
                        style={{ padding: '0.65rem 1rem' }}
                        title="Refresh list"
                    >
                        <RefreshCw size={16} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <RefreshCw size={36} className="animate-float" style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Loading system trip logs...</div>
                </div>
            ) : filteredBookings.length === 0 ? (
                <div className="card-static" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                    <CalendarCheck size={44} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>No bookings match this filter</h3>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Booking ID & Date</th>
                                <th>Rider</th>
                                <th>Assigned Cab</th>
                                <th>Route Info</th>
                                <th>Fare</th>
                                <th>Current Status / Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((b) => (
                                <tr key={b._id}>
                                    <td>
                                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>#{b._id.slice(-8).toUpperCase()}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.bookingDate}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700 }}>{b.user?.name || 'User'}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.user?.email}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            {b.car && <img src={b.car.image} alt="cab" style={{ width: '48px', height: '34px', objectFit: 'cover', borderRadius: '4px' }} />}
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{b.car?.name || 'Cab'}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.car?.plateNumber}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{b.pickupLocation}</div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>→ {b.dropLocation} ({b.distanceKm} km)</div>
                                    </td>
                                    <td style={{ fontWeight: 800, color: '#f59e0b' }}>₹{b.totalFare}</td>
                                    <td>
                                        <select
                                            className="form-input"
                                            style={{
                                                padding: '0.4rem 0.8rem',
                                                fontSize: '0.85rem',
                                                fontWeight: 700,
                                                backgroundColor: b.status === 'Completed' ? '#ede9fe' : b.status === 'Started' ? '#dcfce7' : b.status === 'Accepted' ? '#e0f2fe' : b.status === 'Cancelled' ? '#fee2e2' : '#fef3c7',
                                                color: b.status === 'Completed' ? '#7c3aed' : b.status === 'Started' ? '#16a34a' : b.status === 'Accepted' ? '#0284c7' : b.status === 'Cancelled' ? '#b91c1c' : '#d97706',
                                                border: '1px solid transparent',
                                                borderRadius: '6px'
                                            }}
                                            value={b.status}
                                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                        >
                                            {statusOptions.map((st) => (
                                                <option key={st} value={st} style={{ backgroundColor: '#fff', color: '#000' }}>{st}</option>
                                            ))}
                                        </select>
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

export default AdminBookings;
