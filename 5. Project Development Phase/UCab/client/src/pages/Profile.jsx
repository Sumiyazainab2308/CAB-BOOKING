import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, CreditCard, Lock, Camera, CheckCircle, ShieldCheck, Upload } from 'lucide-react';

const Profile = () => {
    const { user, setUser, showToast } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '+1 (555) 123-4567');
    const [savedPaymentMethod, setSavedPaymentMethod] = useState(user?.savedPaymentMethod || 'Visa •••• 4242 (Automatic)');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(user?.profileImage || '');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        setUploading(true);
        try {
            const res = await axios.post('http://localhost:8000/api/users/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setProfileImage(res.data.imageUrl);
            showToast('Profile image uploaded successfully! 📸', 'success');
        } catch (err) {
            showToast(err.response?.data?.message || 'Image upload failed. Ensure image is under 5MB.', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updatePayload = {
                name,
                phone,
                savedPaymentMethod,
                profileImage
            };
            if (password) {
                updatePayload.password = password;
            }

            const res = await axios.put('http://localhost:8000/api/users/profile', updatePayload);
            setUser(res.data);
            localStorage.setItem('ucab_user_data', JSON.stringify(res.data));
            showToast('Profile and saved payment settings updated! ✨', 'success');
            setPassword('');
        } catch (err) {
            showToast(err.response?.data?.message || 'Could not update profile settings.', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Account & Profile Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details, profile avatar, and saved automatic payment methods.</p>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
                {/* Avatar section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80'}
                            alt="avatar"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f59e0b' }}
                        />
                        <label
                            htmlFor="avatar-upload"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                backgroundColor: '#f59e0b',
                                color: '#fff',
                                padding: '0.4rem',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-md)',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            title="Upload new photo"
                        >
                            <Camera size={18} />
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user?.name || 'Rider Account'}</h3>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={16} /> {user?.email}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 700, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <CheckCircle size={14} /> Verified Member • {uploading ? 'Uploading avatar...' : 'Avatar synced'}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
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
                            <label className="form-label">Email Address (Read-Only)</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="email"
                                    className="form-input"
                                    style={{ paddingLeft: '38px', backgroundColor: 'var(--bg-secondary)', opacity: 0.8 }}
                                    value={user?.email || ''}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Contact Phone Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="tel"
                                    className="form-input"
                                    style={{ paddingLeft: '38px' }}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Saved Automatic Payment Method</label>
                            <div style={{ position: 'relative' }}>
                                <CreditCard size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#f59e0b' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    style={{ paddingLeft: '38px' }}
                                    value={savedPaymentMethod}
                                    onChange={(e) => setSavedPaymentMethod(e.target.value)}
                                    placeholder="e.g. Visa •••• 4242 (Automatic)"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Change Password (Leave blank to keep current password)</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '38px' }}
                                placeholder="Enter new password to reset"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <ShieldCheck size={18} style={{ color: '#16a34a' }} /> Encrypted & secured with JWT Auth
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ padding: '0.85rem 2rem' }}
                            disabled={saving || uploading}
                        >
                            {saving ? 'Saving Changes...' : 'Save Profile Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
