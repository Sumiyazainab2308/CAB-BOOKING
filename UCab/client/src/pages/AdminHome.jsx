import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Shield, Users, Car, CalendarCheck, DollarSign, ArrowRight, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const AdminHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/admin/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to load admin stats:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminStats();
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <Shield size={42} className="animate-float" style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Aggregating system analytics & revenue metrics...</div>
            </div>
        );
    }

    if (!stats) return <div style={{ textAlign: 'center', padding: '3rem' }}>Failed to load dashboard data.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Header Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#fff',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                borderTop: '5px solid #ef4444'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        <Shield size={16} /> Admin Control Center
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>UCab System Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Live operational metrics, revenue tracking, and fleet management.</p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to="/admin/cabs/add" className="btn btn-primary" style={{ padding: '0.8rem 1.4rem' }}>
                        + Add New Cab
                    </Link>
                    <Link to="/admin/bookings" className="btn btn-secondary" style={{ padding: '0.8rem 1.4rem' }}>
                        Manage Bookings
                    </Link>
                </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid-4">
                <div className="card" style={{ borderTop: '4px solid #16a34a', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '14px' }}>
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Revenue</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>₹{stats.totalRevenue.toLocaleString()}</div>
                        <div style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <TrendingUp size={12} /> Live cumulative earnings
                        </div>
                    </div>
                </div>

                <div className="card" style={{ borderTop: '4px solid #0284c7', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '1rem', borderRadius: '14px' }}>
                        <CalendarCheck size={28} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Bookings</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.totalBookings}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Across all user trips</div>
                    </div>
                </div>

                <div className="card" style={{ borderTop: '4px solid #f59e0b', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '1rem', borderRadius: '14px' }}>
                        <Car size={28} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fleet Size</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.totalCars}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Mini, Sedan, SUV, Luxury</div>
                    </div>
                </div>

                <div className="card" style={{ borderTop: '4px solid #7c3aed', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ backgroundColor: '#ede9fe', color: '#7c3aed', padding: '1rem', borderRadius: '14px' }}>
                        <Users size={28} />
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Users</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats.totalUsers}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Registered riders</div>
                    </div>
                </div>
            </div>

            {/* Distribution Charts & Status Summary */}
            <div className="grid-2">
                {/* Status Breakdown */}
                <div className="card-static">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.2rem' }}>Ride Status Breakdown</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        {Object.entries(stats.statusCounts).map(([statusName, count]) => {
                            const total = stats.totalBookings || 1;
                            const percentage = Math.round((count / total) * 100);
                            return (
                                <div key={statusName}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                                        <span>{statusName}</span>
                                        <span>{count} ({percentage}%)</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            backgroundColor: statusName === 'Completed' ? '#7c3aed' : statusName === 'Started' ? '#16a34a' : statusName === 'Accepted' ? '#0284c7' : statusName === 'Cancelled' ? '#ef4444' : '#f59e0b',
                                            transition: 'width 0.4s'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cab Type Distribution */}
                <div className="card-static">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.2rem' }}>Fleet Category Distribution</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                        {Object.entries(stats.cabTypeStats).map(([cabType, count]) => {
                            const total = stats.totalCars || 1;
                            const percentage = Math.round((count / total) * 100);
                            return (
                                <div key={cabType}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                                        <span>{cabType} Category</span>
                                        <span>{count} cabs ({percentage}%)</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '999px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #f59e0b, #d97706)',
                                            transition: 'width 0.4s'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="card-static">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Recent Booking Activity</h3>
                    <Link to="/admin/bookings" style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        View All Bookings <ArrowRight size={16} />
                    </Link>
                </div>

                {stats.recentBookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No bookings recorded yet.</div>
                ) : (
                    <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Rider Info</th>
                                    <th>Cab Details</th>
                                    <th>Route (Pickup → Drop)</th>
                                    <th>Fare</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentBookings.map((b) => (
                                    <tr key={b._id}>
                                        <td>
                                            <div style={{ fontWeight: 700 }}>{b.user?.name || 'User'}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.user?.email}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{b.car?.name || 'Cab'}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.car?.plateNumber}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.pickupLocation}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>→ {b.dropLocation} ({b.distanceKm} km)</div>
                                        </td>
                                        <td style={{ fontWeight: 800, color: '#f59e0b' }}>₹{b.totalFare}</td>
                                        <td>
                                            <span className={`badge badge-${b.status.toLowerCase()}`}>{b.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHome;
