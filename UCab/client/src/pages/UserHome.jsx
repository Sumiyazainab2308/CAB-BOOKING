import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, MapPin, Navigation, Clock, ShieldCheck, ArrowRight, History, Star, Phone, Sparkles } from 'lucide-react';

const UserHome = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/bookings/user');
                setBookings(res.data);
            } catch (err) {
                console.error('Failed to load user dashboard bookings:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, []);

    // Find any active ride (Started, Accepted, or Pending)
    const activeRide = bookings.find(b => ['Started', 'Accepted', 'Pending'].includes(b.status));
    const recentCompleted = bookings.filter(b => b.status === 'Completed').slice(0, 3);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Welcome Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                color: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fbbf24', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                        <Sparkles size={16} /> User Dashboard
                    </div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
                        Welcome back, {user?.name || 'Rider'}! 👋
                    </h1>
                    <p style={{ color: '#cbd5e1', fontSize: '1.05rem' }}>
                        Where are we going today? Book verified cabs instantly with guaranteed transparent fares.
                    </p>
                </div>

                <Link
                    to="/cabs"
                    className="btn btn-primary"
                    style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)' }}
                >
                    <Car size={20} /> Book a Cab Now <ArrowRight size={18} />
                </Link>
            </div>

            {/* Live GPS Ride Tracking Card (If Active Ride Exists) */}
            {activeRide && (
                <div className="card" style={{ borderLeft: '6px solid #16a34a', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.5rem', borderRadius: '50%' }}>
                                <Navigation size={22} className="animate-float" />
                            </div>
                            <div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a', textTransform: 'uppercase' }}>Live GPS Ride Tracking</span>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Active Ride #{activeRide._id.slice(-6).toUpperCase()}</h3>
                            </div>
                        </div>
                        <span className={`badge badge-${activeRide.status.toLowerCase()}`}>
                            Status: {activeRide.status}
                        </span>
                    </div>

                    {/* Progress Bar Simulation */}
                    <div style={{ margin: '1.2rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                            <span>Driver Dispatched</span>
                            <span>En Route</span>
                            <span>Destination</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-secondary)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                                width: activeRide.status === 'Pending' ? '25%' : activeRide.status === 'Accepted' ? '60%' : '90%',
                                height: '100%',
                                background: 'linear-gradient(90deg, #f59e0b, #16a34a)',
                                transition: 'width 0.5s ease'
                            }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem', backgroundColor: 'var(--bg-secondary)', padding: '1.2rem', borderRadius: 'var(--radius-md)', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            {activeRide.car && (
                                <img src={activeRide.car.image} alt="cab" style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                            )}
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{activeRide.car?.name || 'Assigned Cab'}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plate: <strong style={{ color: 'var(--text-primary)' }}>{activeRide.car?.plateNumber || 'DL 01 AB 1234'}</strong></div>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Assigned Driver</div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                {activeRide.driverAssigned?.name || 'Vikram Sharma'} <span style={{ fontSize: '0.8rem', color: '#f59e0b' }}>★ {activeRide.driverAssigned?.rating || 4.8}</span>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <Phone size={12} /> {activeRide.driverAssigned?.phone || '+91 98765 43210'}
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Arrival</div>
                            <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <Clock size={18} /> ~{activeRide.estimatedTimeMinutes || 12} Mins away
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{activeRide.distanceKm} km trip • Total ₹{activeRide.totalFare}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Actions Grid */}
            <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.2rem' }}>Quick Shortcuts</h3>
                <div className="grid-3">
                    <Link to="/cabs" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                        <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.9rem', borderRadius: '14px' }}>
                            <Car size={26} />
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Book a Ride</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Explore Mini, Sedan, SUV & Luxury options</p>
                        </div>
                    </Link>

                    <Link to="/mybookings" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                        <div style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '0.9rem', borderRadius: '14px' }}>
                            <History size={26} />
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>My Bookings ({bookings.length})</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Track status, cancel rides & view tax receipts</p>
                        </div>
                    </Link>

                    <Link to="/profile" className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                        <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '0.9rem', borderRadius: '14px' }}>
                            <ShieldCheck size={26} />
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Profile & Payment</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Manage photo, phone & saved auto-pay cards</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Completed Rides */}
            <div className="card-static">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Recent Rides Overview</h3>
                    <Link to="/mybookings" style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading rides...</div>
                ) : bookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <Car size={42} style={{ color: 'var(--text-muted)', margin: '0 auto 0.8rem' }} />
                        <h4 style={{ fontWeight: 700, marginBottom: '0.4rem' }}>No Rides Booked Yet</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>Ready to travel? Choose from our verified fleet of cabs right now.</p>
                        <Link to="/cabs" className="btn btn-primary">Book Your First Cab</Link>
                    </div>
                ) : (
                    <div className="table-container" style={{ boxShadow: 'none', border: 'none' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cab Details</th>
                                    <th>Route (Pickup → Drop)</th>
                                    <th>Date</th>
                                    <th>Total Fare</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.slice(0, 5).map((b) => (
                                    <tr key={b._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                {b.car && <img src={b.car.image} alt={b.car.name} style={{ width: '48px', height: '34px', objectFit: 'cover', borderRadius: '4px' }} />}
                                                <div>
                                                    <div style={{ fontWeight: 700 }}>{b.car?.name || 'Cab'}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{b.car?.plateNumber}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{b.pickupLocation}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>→ {b.dropLocation} ({b.distanceKm} km)</div>
                                        </td>
                                        <td style={{ fontSize: '0.85rem' }}>{b.bookingDate}</td>
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

export default UserHome;
