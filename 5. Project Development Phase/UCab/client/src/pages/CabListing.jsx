import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Car, Search, Filter, Users, DollarSign, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

const CabListing = () => {
    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'price-asc', 'price-desc'

    useEffect(() => {
        const fetchCabs = async () => {
            setLoading(true);
            try {
                let url = `http://localhost:8000/api/cars?type=${selectedType}&sort=${sortOrder}`;
                if (searchTerm) {
                    url += `&search=${encodeURIComponent(searchTerm)}`;
                }
                const res = await axios.get(url);
                setCabs(res.data);
            } catch (err) {
                console.error("Failed to fetch available cabs:", err.message);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchCabs();
        }, 200);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedType, sortOrder]);

    const cabTypes = ['All', 'Mini', 'Sedan', 'SUV', 'Luxury'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header & Filter Controls */}
            <div className="card-static" style={{
                background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
                padding: '2rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem', marginBottom: '1.5rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                            <Sparkles size={16} /> 24/7 Verified Fleet
                        </div>
                        <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Available Cabs</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Choose your preferred cab category. All vehicles are sanitized, GPS-tracked, and ready to go.
                        </p>
                    </div>

                    {/* Search & Sort Row */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '260px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '38px', paddingRight: '12px', fontSize: '0.9rem' }}
                                placeholder="Search by car name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            className="form-input"
                            style={{ width: '200px', fontSize: '0.9rem' }}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="default">Sort by: Recommended</option>
                            <option value="price-asc">Fare: Low to High</option>
                            <option value="price-desc">Fare: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Cab Type Filter Pills */}
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem' }}>
                    {cabTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            style={{
                                padding: '0.55rem 1.3rem',
                                borderRadius: '999px',
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                backgroundColor: selectedType === type ? '#f59e0b' : 'var(--bg-card)',
                                color: selectedType === type ? '#ffffff' : 'var(--text-secondary)',
                                border: `1px solid ${selectedType === type ? '#f59e0b' : 'var(--border-color)'}`,
                                transition: 'all 0.2s',
                                boxShadow: selectedType === type ? '0 4px 10px rgba(245, 158, 11, 0.3)' : 'none'
                            }}
                        >
                            {type === 'All' ? '🚖 All Fleet' : `${type}`}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cabs Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <Car size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#f59e0b' }} />
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Scanning nearby active cabs...</div>
                </div>
            ) : cabs.length === 0 ? (
                <div className="card-static" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                    <AlertCircle size={44} style={{ color: '#ef4444', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Cabs Match Your Criteria</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                        We couldn't find any available cabs matching your search term or selected cab category right now.
                    </p>
                    <button
                        onClick={() => { setSearchTerm(''); setSelectedType('All'); setSortOrder('default'); }}
                        className="btn btn-primary"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="grid-3">
                    {cabs.map((cab) => (
                        <div key={cab._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                            {/* Cab Image */}
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', height: '180px' }}>
                                <img
                                    src={cab.image}
                                    alt={cab.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <span style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    backgroundColor: '#0f172a',
                                    color: '#fff',
                                    padding: '0.35rem 0.75rem',
                                    borderRadius: '6px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase'
                                }}>
                                    {cab.cabType}
                                </span>
                                <span style={{
                                    position: 'absolute',
                                    bottom: '12px',
                                    left: '12px',
                                    backgroundColor: cab.isAvailable ? 'rgba(22, 163, 74, 0.9)' : 'rgba(239, 68, 68, 0.9)',
                                    color: '#fff',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '999px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem'
                                }}>
                                    {cab.isAvailable ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                                    {cab.isAvailable ? 'Available Now' : 'Currently Busy'}
                                </span>
                            </div>

                            {/* Cab Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{cab.name}</h3>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Users size={16} color="#f59e0b" /> {cab.seats} Seats
                                    </div>
                                    <div>|</div>
                                    <div>Plate: <strong style={{ color: 'var(--text-primary)' }}>{cab.plateNumber}</strong></div>
                                </div>

                                {/* Pricing Breakdown */}
                                <div style={{
                                    backgroundColor: 'var(--bg-secondary)',
                                    padding: '0.8rem 1rem',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: 'auto'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Base Fare</div>
                                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>₹{cab.baseFare}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Per KM</div>
                                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f59e0b' }}>₹{cab.pricePerKm}/km</div>
                                    </div>
                                </div>
                            </div>

                            {/* Book Action */}
                            {cab.isAvailable ? (
                                <Link
                                    to={`/bookcab/${cab._id}`}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '0.85rem', justifyContent: 'space-between' }}
                                >
                                    <span>Select & Book Cab</span>
                                    <ArrowRight size={18} />
                                </Link>
                            ) : (
                                <button
                                    className="btn btn-secondary"
                                    style={{ width: '100%', padding: '0.85rem', opacity: 0.6 }}
                                    disabled
                                >
                                    Cab Currently Unavailable
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CabListing;
