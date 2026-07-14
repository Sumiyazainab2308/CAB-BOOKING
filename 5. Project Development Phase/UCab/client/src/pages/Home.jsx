import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, MapPin, Star, ArrowRight, Heart, Coffee, CheckCircle, Smartphone } from 'lucide-react';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, rgba(245, 158, 11, 0.15) 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: '4rem 2.5rem',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'rgba(245, 158, 11, 0.2)',
                            color: '#f59e0b',
                            padding: '0.4rem 1rem',
                            borderRadius: '999px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            width: 'fit-content'
                        }}>
                            <Star size={16} fill="#f59e0b" /> #1 MERN Stack Cab Booking Platform
                        </div>

                        <h1 style={{
                            fontSize: '3.2rem',
                            fontWeight: 800,
                            lineHeight: '1.15',
                            letterSpacing: '-0.03em',
                            color: 'var(--text-primary)'
                        }}>
                            Your Ride, <span style={{
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>Your Way.</span>
                        </h1>

                        <p style={{
                            fontSize: '1.15rem',
                            color: 'var(--text-secondary)',
                            maxWidth: '540px',
                            lineHeight: '1.6'
                        }}>
                            Reliable, fast, and comfortable city travel. Choose your cab, track in real-time with GPS, and enjoy stress-free automatic payments. Whether you're rushing to the airport or exploring downtown, UCab has your back.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                            <Link to="/cabs" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
                                <Car size={20} /> Explore Available Cabs
                            </Link>
                            <Link to="/register" className="btn btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
                                Create Free Account <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <CheckCircle size={16} color="#16a34a" /> Instant Booking
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <CheckCircle size={16} color="#16a34a" /> Transparent Fares
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <CheckCircle size={16} color="#16a34a" /> Live Driver Tracking
                            </div>
                        </div>
                    </div>

                    {/* Hero Illustration */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }} className="animate-float">
                        <div style={{
                            position: 'absolute',
                            width: '320px',
                            height: '320px',
                            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
                            borderRadius: '50%',
                            zIndex: 1
                        }} />
                        <img
                            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=700&q=80"
                            alt="Premium Cab"
                            style={{
                                width: '100%',
                                maxWidth: '480px',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                zIndex: 2,
                                border: '4px solid rgba(255, 255, 255, 0.4)'
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Cab Types Preview */}
            <section>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Our Cab Fleet</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>Pick the perfect vehicle category tailored to your budget and group size.</p>
                </div>

                <div className="grid-4">
                    {[
                        { title: 'Mini', desc: 'Compact & affordable daily rides for up to 4 passengers.', price: '₹40 base + ₹10/km', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Sedan', desc: 'Spacious comfort with extra legroom & boot space for luggage.', price: '₹50 base + ₹12/km', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=500&q=80' },
                        { title: 'SUV', desc: 'Premium 6-seater family SUV tailored for long trips or groups.', price: '₹80 base + ₹18/km', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80' },
                        { title: 'Luxury', desc: 'Experience first-class travel with top-tier executive sedans.', price: '₹150 base + ₹35/km', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80' }
                    ].map((cab, idx) => (
                        <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                            <img src={cab.img} alt={cab.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{cab.title}</h3>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '0.3rem 0.6rem', borderRadius: '6px' }}>{cab.price}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>{cab.desc}</p>
                            <Link to="/cabs" className="btn btn-secondary" style={{ width: '100%' }}>Book {cab.title}</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why UCab / Story Highlight */}
            <section style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '3.5rem 2.5rem',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                    <div>
                        <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                            Real User Story
                        </div>
                        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.2rem' }}>
                            When Sarah Needed to Reach the Airport Urgently...
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            "I woke up late for my international flight and panicked. I opened <strong style={{ color: 'var(--text-primary)' }}>UCab</strong> on my phone, selected a nearby Sedan cab, and watched my driver Vikram arrive in literally 4 minutes! I ordered chilled refreshments right during the ride and even made a ₹20 donation to charity with a single tap. Arrived right on time and stress-free."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" alt="Sarah" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Sarah Jenkins</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Verified Frequent Flyer & UCab Member</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: '1.25rem' }}>
                        <div className="card-static" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <Clock size={28} color="#f59e0b" />
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Lightning Arrival</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Our smart matching algorithm assigns the closest available driver within seconds.</p>
                        </div>
                        <div className="card-static" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <Coffee size={28} color="#f59e0b" />
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>In-Ride Refreshments</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Add snacks and beverages right when booking for a refreshing journey.</p>
                        </div>
                        <div className="card-static" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <Heart size={28} color="#f59e0b" />
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Social Impact</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Opt in to donate a small token to local charity programs directly via your fare.</p>
                        </div>
                        <div className="card-static" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <Smartphone size={28} color="#f59e0b" />
                            <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Instant Electronic Receipts</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Download official tax-ready PDF receipts with QR codes anytime from your dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
