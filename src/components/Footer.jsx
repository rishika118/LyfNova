import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Shield, Info, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast(`Successfully subscribed ${email} to price alert news!`, 'success');
    setEmail('');
  };

  return (
    <footer style={{
      background: 'rgba(6, 9, 19, 0.4)',
      borderTop: '1px solid var(--border-color)',
      padding: '64px 40px 32px 40px',
      marginTop: '120px',
      position: 'relative',
      zIndex: '10'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        marginBottom: '48px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
            <div className="nav-logo-icon" style={{ width: '28px', height: '28px' }}>L</div>
            <span>Lyf<span style={{ color: 'var(--color-primary)' }}>Nova</span></span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6' }}>
            LyfNova is an AI-powered Healthcare Affordability Intelligence platform. Compare medicine and lab test prices across multiple digital healthcare providers in India.
          </p>
        </div>

        {/* Explore Links */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('medicines'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Medicine Search</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('tests'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Lab Diagnostic Tests</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('basket'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Smart Basket Optimizer</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('analytics'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Savings Analytics</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Patient Dashboard</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('profile'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Settings & Reminders</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('admin'); }} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>Developer Console</a></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Price Watch</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '12px', lineHeight: '1.5' }}>
            Subscribe to our weekly price index reports and get alert notifications on medicine cost fluctuations.
          </p>
          <form onSubmit={handleSubscribe} className="input-wrapper" style={{ display: 'flex', gap: '6px' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patient@lyfnova.com"
              style={{
                flex: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                padding: '8px 12px',
                fontSize: '12px',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px' }}>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <span>© 2026 LyfNova Healthcare Inc. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Shield size={12} /> HIPAA Compliant</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Info size={12} /> Indian Drug Index Authorized</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
