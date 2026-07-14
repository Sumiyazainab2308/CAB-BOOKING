import React from 'react';
import { X, Printer, Car, ShieldCheck, QrCode, MapPin, Calendar, CreditCard } from 'lucide-react';

const ReceiptModal = ({ booking, onClose }) => {
    if (!booking) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            animation: 'fadeIn 0.25s ease-out forwards'
        }}>
            <div className="card" style={{
                maxWidth: '520px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                borderTop: '6px solid #f59e0b',
                padding: '2rem'
            }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.4rem',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <X size={20} />
                </button>

                {/* Receipt Header */}
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '1.25rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fef3c7',
                        color: '#d97706',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        marginBottom: '0.6rem'
                    }}>
                        <Car size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>UCab Official Ride Receipt</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Booking ID: #{booking._id.slice(-8).toUpperCase()}</p>
                    <div style={{ display: 'inline-block', marginTop: '0.5rem' }}>
                        <span className={`badge badge-${booking.status ? booking.status.toLowerCase() : 'pending'}`}>
                            {booking.status}
                        </span>
                    </div>
                </div>

                {/* Ride Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <MapPin size={18} style={{ color: '#16a34a', marginTop: '3px' }} />
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Pickup Location</div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{booking.pickupLocation}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <MapPin size={18} style={{ color: '#ef4444', marginTop: '3px' }} />
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Drop-off Location</div>
                            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{booking.dropLocation}</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={16} style={{ color: '#f59e0b' }} />
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{booking.bookingDate}</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CreditCard size={16} style={{ color: '#f59e0b' }} />
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Payment</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{booking.paymentMethod?.split('(')[0] || 'Card'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cab Details */}
                {booking.car && (
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.9rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <img
                            src={booking.car.image}
                            alt={booking.car.name}
                            style={{ width: '64px', height: '44px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{booking.car.name} ({booking.car.cabType})</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Plate: <strong style={{ color: 'var(--text-primary)' }}>{booking.car.plateNumber}</strong></div>
                        </div>
                    </div>
                )}

                {/* Fare Breakdown */}
                <div style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 0', marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Fare Summary</div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <span>Distance Traveled ({booking.distanceKm} km)</span>
                        <span>₹{(booking.distanceKm * (booking.car?.pricePerKm || 12)) + (booking.car?.baseFare || 50)}</span>
                    </div>

                    {booking.refreshmentsOrdered && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#16a34a' }}>
                            <span>+ In-ride Refreshments</span>
                            <span>₹50</span>
                        </div>
                    )}

                    {booking.donationMade && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#16a34a' }}>
                            <span>+ NGO Charity Donation</span>
                            <span>₹20</span>
                        </div>
                    )}

                    {booking.discountAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#d97706', fontWeight: 600 }}>
                            <span>- Coupon Discount ({booking.discountCode || 'PROMO'})</span>
                            <span>-₹{booking.discountAmount}</span>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.8rem',
                        paddingTop: '0.8rem',
                        borderTop: '1px dashed var(--border-color)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#f59e0b'
                    }}>
                        <span>Total Paid</span>
                        <span>₹{booking.totalFare}</span>
                    </div>
                </div>

                {/* Footer Notes & QR Simulation */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <ShieldCheck size={20} style={{ color: '#16a34a' }} />
                        <span>Electronically verified & auto-paid via saved payment method.</span>
                    </div>
                    <div style={{ backgroundColor: '#fff', padding: '0.35rem', borderRadius: '6px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center' }}>
                        <QrCode size={36} color="#0f172a" />
                    </div>
                </div>

                {/* Print Button */}
                <button
                    onClick={handlePrint}
                    className="btn btn-primary"
                    style={{ width: '100%', gap: '0.5rem' }}
                >
                    <Printer size={18} /> Print / Save PDF Receipt
                </button>
            </div>
        </div>
    );
};

export default ReceiptModal;
