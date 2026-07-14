import React from 'react';
import { Car, Heart, Shield, Award, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            padding: '3rem 1.5rem 1.5rem',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '2.5rem',
                marginBottom: '2.5rem'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem' }}>
                        <div style={{ backgroundColor: '#f59e0b', color: '#fff', padding: '0.45rem', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                            <Car size={22} />
                        </div>
                        <span>U<span style={{ color: '#f59e0b' }}>cab</span></span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                        Your reliable, fast, and comfortable travel partner. Book rides instantly with transparent pricing and real-time live GPS tracking.
                    </p>
                </div>

                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>Why Choose UCab?</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} color="#f59e0b" /> 100% Verified Drivers & Vehicles</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Award size={16} color="#f59e0b" /> Best Fare Estimates & Zero Hidden Costs</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={16} color="#f59e0b" /> In-ride Refreshments & Donation Options</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>24/7 Support</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        Got an urgent travel question or ride inquiry?
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 700 }}>
                        <Phone size={18} /> 1-800-UCAB-NOW (+1 800 822 2669)
                    </div>
                </div>
            </div>

            <div style={{
                maxWidth: '1280px',
                margin: '0 auto',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
            }}>
                <div>&copy; {new Date().getFullYear()} UCab Booking App (MERN Stack Architecture). All rights reserved.</div>
                <div>Built for fast, comfortable, and reliable city travel.</div>
            </div>
        </footer>
    );
};

export default Footer;
