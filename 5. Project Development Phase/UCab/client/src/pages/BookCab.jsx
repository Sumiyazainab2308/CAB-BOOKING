import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, MapPin, Calendar, Clock, DollarSign, Coffee, Heart, Tag, CheckCircle, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const BookCab = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, showToast } = useAuth();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [bookingDate, setBookingDate] = useState(() => {
        const now = new Date();
        return now.toISOString().slice(0, 16); // format for datetime-local
    });
    const [distanceKm, setDistanceKm] = useState(15); // default 15km
    const [refreshmentsOrdered, setRefreshmentsOrdered] = useState(false);
    const [donationMade, setDonationMade] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/cars/${id}`);
                setCar(res.data);
            } catch (err) {
                console.error("Failed to fetch car details:", err.message);
                setError("Selected car not found or invalid ID.");
            } finally {
                setLoading(false);
            }
        };

        fetchCarDetails();
    }, [id]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <Car size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#f59e0b' }} />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Loading cab specifications...</div>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="card-static" style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px', margin: '2rem auto' }}>
                <AlertCircle size={44} color="#ef4444" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Cab Not Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>The cab you requested does not exist or has been removed from inventory.</p>
                <Link to="/cabs" className="btn btn-primary">Return to Available Cabs</Link>
            </div>
        );
    }

    // Fare calculation
    const baseFare = car.baseFare || 50;
    const pricePerKm = car.pricePerKm || 12;
    const distanceCost = distanceKm * pricePerKm;
    const rawFare = baseFare + distanceCost;
    const refreshmentCost = refreshmentsOrdered ? 50 : 0;
    const donationCost = donationMade ? 20 : 0;
    
    let discountAmount = 0;
    if (couponApplied) {
        if (discountCode.toUpperCase() === 'UCAB20') {
            discountAmount = Math.round(rawFare * 0.20);
        } else if (discountCode.toUpperCase() === 'WELCOME10') {
            discountAmount = Math.round(rawFare * 0.10);
        }
    }

    const totalFare = Math.max(10, Math.round(rawFare + refreshmentCost + donationCost - discountAmount));
    const estimatedMinutes = Math.max(10, Math.round(distanceKm * 2.5));

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const code = discountCode.trim().toUpperCase();
        if (code === 'UCAB20' || code === 'WELCOME10') {
            setCouponApplied(true);
            showToast(`Coupon "${code}" applied successfully! 🏷️`, 'success');
        } else {
            setCouponApplied(false);
            showToast('Invalid promo code. Try "UCAB20" for 20% off!', 'error');
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!pickupLocation || !dropLocation || !bookingDate || !distanceKm) {
            setError('Please complete all required location and timing details');
            return;
        }

        setSubmitting(true);
        try {
            const formattedDate = new Date(bookingDate).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });

            await axios.post('http://localhost:8000/api/bookings', {
                carId: car._id,
                pickupLocation,
                dropLocation,
                bookingDate: formattedDate,
                distanceKm: Number(distanceKm),
                refreshmentsOrdered,
                donationMade,
                discountCode: couponApplied ? discountCode.toUpperCase() : '',
                paymentMethod: user?.savedPaymentMethod || 'Automatic Saved Card (Visa •••• 4242)'
            });

            showToast('Ride booked successfully! Driver assigned. 🚕', 'success');
            navigate('/mybookings');
        } catch (err) {
            setError(err.response?.data?.message || 'Booking submission failed.');
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Link to="/cabs" className="btn btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                    ← Back to Fleet
                </Link>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Confirm Your Ride Details</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
                {/* Left Form Panel */}
                <div className="card" style={{ padding: '2.2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={22} style={{ color: '#f59e0b' }} /> Trip Locations & Timing
                    </h3>

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

                    <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group">
                            <label className="form-label">Pickup Location</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#16a34a' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '38px' }}
                                    placeholder="e.g. Indira Gandhi International Airport Terminal 3"
                                    value={pickupLocation}
                                    onChange={(e) => setPickupLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Drop-off Destination</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#ef4444' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '38px' }}
                                    placeholder="e.g. Cyber Hub, DLF Phase 2, Gurgaon"
                                    value={dropLocation}
                                    onChange={(e) => setDropLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid-2" style={{ gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label">Booking Date & Time</label>
                                <input
                                    type="datetime-local"
                                    className="form-input"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Trip Distance (in KM)</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="500"
                                    className="form-input"
                                    value={distanceKm}
                                    onChange={(e) => setDistanceKm(Math.max(1, Number(e.target.value)))}
                                    required
                                />
                            </div>
                        </div>

                        {/* Distance Preset Shortcuts */}
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[5, 12, 25, 45, 80].map((preset) => (
                                <button
                                    key={preset}
                                    type="button"
                                    onClick={() => setDistanceKm(preset)}
                                    style={{
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                        backgroundColor: distanceKm === preset ? '#f59e0b' : 'var(--bg-secondary)',
                                        color: distanceKm === preset ? '#fff' : 'var(--text-secondary)',
                                        border: '1px solid var(--border-color)'
                                    }}
                                >
                                    {preset} km
                                </button>
                            ))}
                        </div>

                        {/* In-Ride Extras Section */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                            <label className="form-label" style={{ marginBottom: '0.8rem', display: 'block' }}>In-Ride Comfort & Extras</label>
                            
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.8rem 1rem',
                                backgroundColor: refreshmentsOrdered ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${refreshmentsOrdered ? '#f59e0b' : 'var(--border-color)'}`,
                                cursor: 'pointer',
                                marginBottom: '0.8rem',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <Coffee size={20} style={{ color: '#f59e0b' }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Chilled Refreshments Pack</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mineral water bottle, energy bar & wet wipes</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <span style={{ fontWeight: 700 }}>+₹50</span>
                                    <input
                                        type="checkbox"
                                        checked={refreshmentsOrdered}
                                        onChange={(e) => setRefreshmentsOrdered(e.target.checked)}
                                        style={{ width: '18px', height: '18px', accentColor: '#f59e0b' }}
                                    />
                                </div>
                            </label>

                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.8rem 1rem',
                                backgroundColor: donationMade ? 'rgba(22, 163, 74, 0.1)' : 'var(--bg-secondary)',
                                borderRadius: 'var(--radius-md)',
                                border: `1px solid ${donationMade ? '#16a34a' : 'var(--border-color)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <Heart size={20} style={{ color: '#16a34a' }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Support Child Education NGO</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>100% goes directly to our partner school funds</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <span style={{ fontWeight: 700, color: '#16a34a' }}>+₹20</span>
                                    <input
                                        type="checkbox"
                                        checked={donationMade}
                                        onChange={(e) => setDonationMade(e.target.checked)}
                                        style={{ width: '18px', height: '18px', accentColor: '#16a34a' }}
                                    />
                                </div>
                            </label>
                        </div>

                        {/* Promo Coupon Input */}
                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                            <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Promo / Discount Coupon</label>
                            <div style={{ display: 'flex', gap: '0.6rem' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <Tag size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        className="form-input"
                                        style={{ paddingLeft: '38px', textTransform: 'uppercase' }}
                                        placeholder="Enter promo code (e.g. UCAB20)"
                                        value={discountCode}
                                        onChange={(e) => { setDiscountCode(e.target.value); setCouponApplied(false); }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleApplyCoupon}
                                    className="btn btn-secondary"
                                    style={{ padding: '0.75rem 1.2rem', fontSize: '0.88rem' }}
                                >
                                    Apply
                                </button>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                                Tip: Use <strong style={{ color: '#f59e0b' }}>UCab20</strong> for 20% discount on fare!
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}
                            disabled={submitting}
                        >
                            {submitting ? 'Dispatching Cab...' : `Confirm & Book Ride (₹${totalFare})`} <ArrowRight size={20} />
                        </button>
                    </form>
                </div>

                {/* Right Fare Summary Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '90px' }}>
                    <div className="card-static" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Selected Cab Summary</h3>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <img
                                src={car.image}
                                alt={car.name}
                                style={{ width: '100px', height: '68px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <div>
                                <h4 style={{ fontWeight: 800, fontSize: '1.15rem' }}>{car.name}</h4>
                                <span className="badge badge-accepted" style={{ marginTop: '0.3rem' }}>{car.cabType} Category</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '0.8rem' }}>
                            <span>Base Fare</span>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{baseFare}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <span>Distance Fare ({distanceKm} km × ₹{pricePerKm})</span>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{distanceCost}</span>
                        </div>

                        {refreshmentsOrdered && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a' }}>
                                <span>+ Refreshments Pack</span>
                                <span style={{ fontWeight: 700 }}>₹50</span>
                            </div>
                        )}

                        {donationMade && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#16a34a' }}>
                                <span>+ Charity Donation</span>
                                <span style={{ fontWeight: 700 }}>₹20</span>
                            </div>
                        )}

                        {couponApplied && discountAmount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#d97706', fontWeight: 600 }}>
                                <span>- Promo Discount ({discountCode.toUpperCase()})</span>
                                <span>-₹{discountAmount}</span>
                            </div>
                        )}

                        <div style={{
                            borderTop: '2px dashed var(--border-color)',
                            paddingTop: '1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Estimated Fare</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b' }}>₹{totalFare}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Est. Trip Time</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <Clock size={16} color="#f59e0b" /> ~{estimatedMinutes} mins
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Automatic Payment Info */}
                    <div className="card-static" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                            <ShieldCheck size={20} color="#16a34a" /> Auto-Pay Protected
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Your ride fare will be automatically deducted from your saved payment method (<strong style={{ color: 'var(--text-primary)' }}>{user?.savedPaymentMethod || 'Visa •••• 4242'}</strong>) upon trip completion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCab;
