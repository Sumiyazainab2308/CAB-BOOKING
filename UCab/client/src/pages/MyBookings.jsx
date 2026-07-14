import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ReceiptModal from '../components/ReceiptModal';
import { Car, MapPin, Calendar, Clock, DollarSign, FileText, XCircle, Navigation, Phone, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState(null);
    const { showToast } = useAuth();

    const fetchMyBookings = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8000/api/bookings/user');
            setBookings(res.data);
        } catch (err) {
            console.error("Failed to load user bookings:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this ride request?")) return;

        try {
            await axios.put(`http://localhost:8000/api/bookings/${bookingId}`, { status: 'Cancelled' });
            showToast('Ride request cancelled successfully.', 'info');
            fetchMyBookings();
        } catch (err) {
            showToast(err.response?.data?.message || 'Could not cancel booking.', 'error');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <Sparkles size={16} /> History & Status
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>My Bookings & Receipts</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Track real-time ride status, view driver details, and generate tax-ready PDF receipts.
                    </p>
                </div>

                <Link to="/cabs" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                    + Book Another Cab
                </Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <Car size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#f59e0b' }} />
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Loading your ride logs...</div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="card-static" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                    <Car size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Ride History Yet</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto' }}>
                        You haven't booked any cabs with UCab yet. Explore our fleet and book your first ride today!
                    </p>
                    <Link to="/cabs" className="btn btn-primary">Browse Available Cabs</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {bookings.map((booking) => (
                        <div key={booking._id} className="card" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.25rem',
                            borderLeft: `5px solid ${
                                booking.status === 'Completed' ? '#7c3aed' :
                                booking.status === 'Started' ? '#16a34a' :
                                booking.status === 'Accepted' ? '#0284c7' :
                                booking.status === 'Cancelled' ? '#ef4444' : '#f59e0b'
                            }`
                        }}>
                            {/* Top row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        ID #{booking._id.slice(-8).toUpperCase()}
                                    </span>
                                    <span className={`badge badge-${booking.status.toLowerCase()}`}>
                                        ● {booking.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <Calendar size={16} style={{ color: '#f59e0b' }} /> {booking.bookingDate}
                                </div>
                            </div>

                            {/* Middle Route & Cab Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    {booking.car && (
                                        <img src={booking.car.image} alt={booking.car.name} style={{ width: '100px', height: '68px', objectFit: 'cover', borderRadius: '8px' }} />
                                    )}
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{booking.car?.name || 'Cab'}</h3>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            Type: <strong style={{ color: 'var(--text-primary)' }}>{booking.car?.cabType}</strong> • Plate: <strong style={{ color: 'var(--text-primary)' }}>{booking.car?.plateNumber}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.92rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <MapPin size={16} style={{ color: '#16a34a', marginTop: '3px' }} />
                                        <div><strong>Pickup:</strong> {booking.pickupLocation}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <MapPin size={16} style={{ color: '#ef4444', marginTop: '3px' }} />
                                        <div><strong>Drop-off:</strong> {booking.dropLocation} ({booking.distanceKm} km)</div>
                                    </div>
                                </div>

                                {/* Driver & Fare details */}
                                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Driver Assigned</div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{booking.driverAssigned?.name || 'Vikram Sharma'}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                            <Phone size={12} /> {booking.driverAssigned?.phone || '+91 98765 43210'}
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Fare</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>₹{booking.totalFare}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Active Ride GPS simulation if applicable */}
                            {['Pending', 'Accepted', 'Started'].includes(booking.status) && (
                                <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(245, 158, 11, 0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                                        <Navigation size={18} style={{ color: '#f59e0b' }} />
                                        <span>Tracking Live: Driver is en route (~{booking.estimatedTimeMinutes || 12} mins arrival)</span>
                                    </div>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Auto-refreshing GPS</span>
                                </div>
                            )}

                            {/* Action Buttons Footer */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap' }}>
                                {/* Receipt button available for all bookings */}
                                <button
                                    onClick={() => setSelectedBookingForReceipt(booking)}
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
                                >
                                    <FileText size={16} /> View / Download Receipt
                                </button>

                                {/* Cancel button only if status is Pending or Accepted */}
                                {['Pending', 'Accepted'].includes(booking.status) && (
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.4rem' }}
                                    >
                                        <XCircle size={16} /> Cancel Ride Request
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Receipt Modal */}
            {selectedBookingForReceipt && (
                <ReceiptModal
                    booking={selectedBookingForReceipt}
                    onClose={() => setSelectedBookingForReceipt(null)}
                />
            )}
        </div>
    );
};

export default MyBookings;
