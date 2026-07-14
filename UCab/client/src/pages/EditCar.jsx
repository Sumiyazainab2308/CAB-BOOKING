import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, Hash, Image, ArrowRight } from 'lucide-react';

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useAuth();

    const [name, setName] = useState('');
    const [cabType, setCabType] = useState('Sedan');
    const [pricePerKm, setPricePerKm] = useState(12);
    const [baseFare, setBaseFare] = useState(50);
    const [seats, setSeats] = useState(4);
    const [plateNumber, setPlateNumber] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCab = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/cars/${id}`);
                const car = res.data;
                setName(car.name);
                setCabType(car.cabType);
                setPricePerKm(car.pricePerKm);
                setBaseFare(car.baseFare);
                setSeats(car.seats);
                setPlateNumber(car.plateNumber);
                setImage(car.image);
            } catch (err) {
                console.error("Failed to fetch cab for edit:", err.message);
                setError("Could not load vehicle details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCab();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setSaving(true);
        try {
            await axios.put(`http://localhost:8000/api/cars/${id}`, {
                name,
                cabType,
                pricePerKm: Number(pricePerKm),
                baseFare: Number(baseFare),
                seats: Number(seats),
                plateNumber: plateNumber.toUpperCase(),
                image
            });

            showToast(`Cab "${name}" updated successfully! 🚖`, 'success');
            navigate('/admin/cabs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update cab.');
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <Car size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Loading cab specifications...</div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Link to="/admin/cabs" className="btn btn-secondary" style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}>
                    ← Back to Fleet
                </Link>
                <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Edit Cab Specifications</h1>
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
                                    value={plateNumber}
                                    onChange={(e) => setPlateNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Cab Category</label>
                        <select
                            className="form-input"
                            value={cabType}
                            onChange={(e) => setCabType(e.target.value)}
                        >
                            {['Mini', 'Sedan', 'SUV', 'Luxury'].map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
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
                        <label className="form-label">Image URL</label>
                        <div style={{ position: 'relative' }}>
                            <Image size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="url"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                        <img
                            src={image}
                            alt="preview"
                            style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Visual Preview</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                Check how this cab image will appear across user booking screens.
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-danger"
                        style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                        disabled={saving}
                    >
                        {saving ? 'Updating Specifications...' : 'Save & Update Cab Details'} <ArrowRight size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCar;
