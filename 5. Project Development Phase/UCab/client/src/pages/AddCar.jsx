import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, DollarSign, Users, Hash, Image, CheckCircle, ArrowRight } from 'lucide-react';

const AddCar = () => {
    const navigate = useNavigate();
    const { showToast } = useAuth();

    const [name, setName] = useState('');
    const [cabType, setCabType] = useState('Sedan');
    const [pricePerKm, setPricePerKm] = useState(12);
    const [baseFare, setBaseFare] = useState(50);
    const [seats, setSeats] = useState(4);
    const [plateNumber, setPlateNumber] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const presetImages = {
        Mini: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
        Sedan: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
        SUV: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
        Luxury: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80'
    };

    const handleTypeChange = (type) => {
        setCabType(type);
        if (!image || Object.values(presetImages).includes(image)) {
            setImage(presetImages[type]);
        }
        if (type === 'Mini') { setBaseFare(40); setPricePerKm(10); setSeats(4); }
        else if (type === 'Sedan') { setBaseFare(50); setPricePerKm(12); setSeats(4); }
        else if (type === 'SUV') { setBaseFare(80); setPricePerKm(18); setSeats(6); }
        else if (type === 'Luxury') { setBaseFare(150); setPricePerKm(35); setSeats(4); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !plateNumber) {
            setError('Please enter both car model name and registration plate number');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:8000/api/cars', {
                name,
                cabType,
                pricePerKm: Number(pricePerKm),
                baseFare: Number(baseFare),
                seats: Number(seats),
                plateNumber: plateNumber.toUpperCase(),
                image: image || presetImages[cabType]
            });

            showToast(`Cab "${name}" added to fleet inventory! 🚖`, 'success');
            navigate('/admin/cabs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add cab to fleet.');
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Link to="/admin/cabs" className="btn btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                    ← Back to Fleet
                </Link>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Add New Cab to Fleet</h1>
            </div>

            <div className="card" style={{ padding: '2.5rem', borderTop: '5px solid #ef4444' }}>
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Vehicle Model / Name</label>
                            <div style={{ position: 'relative' }}>
                                <Car size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '38px' }}
                                    placeholder="e.g. Toyota Innova Crysta"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Registration Plate Number</label>
                            <div style={{ position: 'relative' }}>
                                <Hash size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '38px', textTransform: 'uppercase' }}
                                    placeholder="e.g. DL 01 AB 9876"
                                    value={plateNumber}
                                    onChange={(e) => setPlateNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Cab Category (Auto-sets standard fares & images)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' }}>
                            {['Mini', 'Sedan', 'SUV', 'Luxury'].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handleTypeChange(type)}
                                    style={{
                                        padding: '0.8rem',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        backgroundColor: cabType === type ? '#ef4444' : 'var(--bg-secondary)',
                                        color: cabType === type ? '#ffffff' : 'var(--text-secondary)',
                                        border: `1px solid ${cabType === type ? '#ef4444' : 'var(--border-color)'}`,
                                        transition: 'all 0.2s',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid-3">
                        <div className="form-group">
                            <label className="form-label">Base Fare (₹)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={baseFare}
                                onChange={(e) => setBaseFare(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Rate per KM (₹)</label>
                            <input
                                type="number"
                                className="form-input"
                                value={pricePerKm}
                                onChange={(e) => setPricePerKm(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Seating Capacity</label>
                            <input
                                type="number"
                                className="form-input"
                                value={seats}
                                onChange={(e) => setSeats(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Image URL (Optional - default high-res stock provided)</label>
                        <div style={{ position: 'relative' }}>
                            <Image size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="url"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder="https://images.unsplash.com/..."
                                value={image || presetImages[cabType]}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Image preview */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <img
                            src={image || presetImages[cabType]}
                            alt="preview"
                            style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Visual Preview</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                This high-res photo will be displayed to users in the cab selection screen.
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-danger"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Adding to Fleet...' : 'Save & Register Cab'} <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
