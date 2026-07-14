import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Car, Plus, Edit, Trash2, CheckCircle, AlertCircle, Users, DollarSign } from 'lucide-react';

const AdminCars = () => {
    const [cabs, setCabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useAuth();

    const fetchFleet = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:8000/api/cars');
            setCabs(res.data);
        } catch (err) {
            console.error("Failed to fetch fleet:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFleet();
    }, []);

    const handleDeleteCab = async (carId) => {
        if (!window.confirm("Are you sure you want to remove this cab from active fleet inventory?")) return;

        try {
            await axios.delete(`http://localhost:8000/api/cars/${carId}`);
            showToast('Cab removed from inventory.', 'info');
            fetchFleet();
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to delete cab.', 'error');
        }
    };

    const handleToggleAvailability = async (cab) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/cars/${cab._id}`, {
                isAvailable: !cab.isAvailable
            });
            showToast(`${cab.name} availability updated to ${!cab.isAvailable ? 'Available' : 'Busy'}`, 'success');
            setCabs(prev => prev.map(c => c._id === cab._id ? res.data : c));
        } catch (err) {
            showToast('Failed to update availability.', 'error');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#ef4444', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <Car size={16} /> Fleet Inventory Management
                    </div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Cab Inventory ({cabs.length})</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Add new cabs, modify rates, check number plates, and toggle operational status.</p>
                </div>

                <Link to="/admin/cabs/add" className="btn btn-primary" style={{ padding: '0.85rem 1.6rem', gap: '0.5rem' }}>
                    <Plus size={18} /> Add New Cab to Fleet
                </Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <Car size={40} className="animate-float" style={{ margin: '0 auto 1rem', color: '#ef4444' }} />
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Loading fleet specifications...</div>
                </div>
            ) : cabs.length === 0 ? (
                <div className="card-static" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
                    <Car size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Cabs Registered in Fleet</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Start building your cab inventory by adding Mini, Sedan, SUV, or Luxury vehicles.</p>
                    <Link to="/admin/cabs/add" className="btn btn-primary">+ Add Your First Cab</Link>
                </div>
            ) : (
                <div className="grid-3">
                    {cabs.map((cab) => (
                        <div key={cab._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                            {/* Image */}
                            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)', height: '170px' }}>
                                <img src={cab.image} alt={cab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#0f172a', color: '#fff', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {cab.cabType}
                                </span>
                            </div>

                            {/* Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{cab.name}</h3>
                                    <button
                                        onClick={() => handleToggleAvailability(cab)}
                                        style={{
                                            padding: '0.3rem 0.7rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            backgroundColor: cab.isAvailable ? '#dcfce7' : '#fee2e2',
                                            color: cab.isAvailable ? '#16a34a' : '#b91c1c',
                                            border: 'none',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem'
                                        }}
                                        title="Click to toggle availability"
                                    >
                                        {cab.isAvailable ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                        {cab.isAvailable ? 'Available' : 'Busy'}
                                    </button>
                                </div>

                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Plate: <strong style={{ color: 'var(--text-primary)' }}>{cab.plateNumber}</strong></span>
                                    <span>{cab.seats} Seater</span>
                                </div>

                                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Base Fare</div>
                                        <div style={{ fontWeight: 800 }}>₹{cab.baseFare}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Per KM</div>
                                        <div style={{ fontWeight: 800, color: '#f59e0b' }}>₹{cab.pricePerKm}/km</div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                                <Link
                                    to={`/admin/cabs/edit/${cab._id}`}
                                    className="btn btn-secondary"
                                    style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem', justifyContent: 'center' }}
                                >
                                    <Edit size={16} /> Edit Details
                                </Link>
                                <button
                                    onClick={() => handleDeleteCab(cab._id)}
                                    className="btn btn-danger"
                                    style={{ padding: '0.6rem', borderRadius: '8px' }}
                                    title="Delete Cab"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminCars;
