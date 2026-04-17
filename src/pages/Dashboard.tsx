import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const CARDS = [
  { icon: '📊', label: 'Projects', value: '0', sub: 'Active projects', link: '#', cta: 'View All →' },
  { icon: '💰', label: 'Billing', value: 'Free', sub: 'Current plan', link: '#', cta: 'Upgrade →' },
  { icon: '🛟', label: 'Support', value: '24/7', sub: 'Always available', link: '/contact', cta: 'Get Help →' },
  { icon: '📈', label: 'Analytics', value: '0', sub: 'Page views', link: '#', cta: 'View Stats →' },
];

const QUICK_ACTIONS = [
  { icon: '📋', label: 'Browse Services', to: '/services', color: '#6C3CE1' },
  { icon: '📞', label: 'Contact Support', to: '/contact', color: '#FF6B2C' },
  { icon: '⚙️', label: 'Account Settings', to: '#', color: '#4FC3F7' },
  { icon: '📚', label: 'Documentation', to: '#', color: '#34D399' },
];

function Dashboard(): React.ReactNode {
  const { user } = useAuth();

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>
      {/* HEADER */}
      <section style={{
        padding: '60px 80px 50px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(108,60,225,0.1), transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <div>
            <img 
              src="/ChatGPT Image Apr 15, 2026, 06_53_10 PM.png" 
              alt="KaarBaar Logo" 
              style={{ height: '50px', width: 'auto', marginBottom: '16px' }}
            />
            <div className="section-label" style={{ marginBottom: '12px' }}>✦ Dashboard</div>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', marginBottom: '6px' }}>
              Welcome back, <span className="gradient-text">{user?.firstName}</span> 👋
            </h1>
            <p style={{ fontFamily: 'DM Sans', color: 'rgba(240,240,250,0.5)', fontSize: '0.95rem' }}>
              Your KaarBaar Solutions control center
            </p>
          </div>
          <div style={{
            width: '64px', height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), #6C3CE1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '1.6rem',
            color: 'white',
            boxShadow: '0 0 30px rgba(255,107,44,0.3)',
          }}>
            {user?.firstName?.[0]?.toUpperCase()}
          </div>
        </div>
      </section>

      <div style={{ padding: '50px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        {/* ACCOUNT INFO */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '32px', opacity: 0, animation: 'fadeInUp 0.5s 0.1s forwards' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--primary)' }}>◆</span> Account Overview
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              ['Name', `${user?.firstName} ${user?.lastName}`],
              ['Email', user?.email || '—'],
              ...(user?.phone ? [['Phone', user.phone]] : []),
              ...(user?.company ? [['Company', user.company]] : []),
              ['Member Since', new Date(user?.registeredAt || '').toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontFamily: 'DM Sans', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,240,250,0.35)', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {CARDS.map((c, i) => (
            <div key={c.label} className="glass-card" style={{
              padding: '28px',
              opacity: 0,
              animation: `fadeInUp 0.5s ${0.12 * i + 0.2}s forwards`,
              borderTop: '2px solid rgba(255,107,44,0.25)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{c.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'rgba(240,240,250,0.7)', marginBottom: '4px' }}>{c.label}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--primary)', marginBottom: '4px' }}>{c.value}</div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '0.78rem', color: 'rgba(240,240,250,0.4)', marginBottom: '14px' }}>{c.sub}</div>
              <Link to={c.link} style={{ color: 'var(--primary)', fontSize: '0.8rem', fontFamily: 'Syne, sans-serif', fontWeight: 600, textDecoration: 'none' }}>{c.cta}</Link>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="glass-card" style={{ padding: '32px', marginBottom: '32px', opacity: 0, animation: 'fadeInUp 0.5s 0.5s forwards' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--primary)' }}>◆</span> Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {QUICK_ACTIONS.map(a => (
              <Link key={a.label} to={a.to} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '24px 16px',
                background: `${a.color}10`,
                border: `1px solid ${a.color}25`,
                borderRadius: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: a.color,
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `${a.color}18`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${a.color}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = `${a.color}10`;
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '1.8rem' }}>{a.icon}</span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.82rem', textAlign: 'center' }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* RECOMMENDED */}
        <div className="glass-card" style={{ padding: '32px', opacity: 0, animation: 'fadeInUp 0.5s 0.6s forwards' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--primary)' }}>◆</span> Recommended for You
            </h2>
            <Link to="/services" style={{ fontFamily: 'DM Sans', fontSize: '0.82rem', color: 'var(--primary)', textDecoration: 'none' }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { icon: '🚀', title: 'Digital Marketing Boost', desc: 'Data-driven campaigns to reach more customers.', color: '#FF6B2C' },
              { icon: '🎨', title: 'Brand Identity Package', desc: 'Professional branding that makes you unforgettable.', color: '#A78BFA' },
              { icon: '💻', title: 'Website Development', desc: 'Custom websites that convert visitors to clients.', color: '#4FC3F7' },
            ].map(r => (
              <div key={r.title} style={{ padding: '20px', background: `${r.color}08`, border: `1px solid ${r.color}15`, borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{r.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: r.color }}>{r.title}</div>
                <div style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: 'rgba(240,240,250,0.5)', lineHeight: 1.5 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
