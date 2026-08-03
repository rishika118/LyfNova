import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { User, Bell, Shield, MapPin, Eye, Lock, CheckCircle, Save, Phone, Mail, Award } from 'lucide-react';

export const ProfilePage = () => {
  const { addToast } = useApp();
  const { theme, setTheme, toggleTheme } = useTheme();

  // Settings State
  const [profile, setProfile] = useState({
    name: 'Aditi Sen',
    email: 'aditi.sen@lyfnova.com',
    phone: '+91 98765 43210',
    bloodGroup: 'O Positive',
    city: 'New Delhi, Delhi NCR',
    address: 'Flat 402, Block C, Vasant Kunj, New Delhi - 110070'
  });

  const [channels, setChannels] = useState({
    email: true,
    whatsapp: true,
    push: false,
    sms: true
  });

  const [preferredPlatforms, setPreferredPlatforms] = useState({
    '1mg': true,
    'apollo': true,
    'netmeds': false,
    'pharmeasy': true
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    addToast('Profile preferences updated successfully!', 'success');
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Patient Profile</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details, diagnostic addresses, notification triggers, and preferred pharmacy networks.</p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '24px'
      }}>
        {/* Left Side: Avatar Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              color: 'white',
              fontSize: '36px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)'
            }}>
              AS
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{profile.name}</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Member since January 2026</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
              <span className="badge badge-success" style={{ textTransform: 'none', padding: '3px 8px', fontSize: '10px' }}>
                Verified Profile
              </span>
              <span className="badge badge-info" style={{ textTransform: 'none', padding: '3px 8px', fontSize: '10px' }}>
                O+ Blood
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', textAlign: 'left', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={12} /> {profile.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={12} /> {profile.email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={12} /> {profile.city}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pricing Plan</span>
              <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>Free Tier</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>HIPAA Audit Logs</span>
              <span style={{ fontWeight: '600' }}>Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>2FA Security</span>
              <span style={{ color: 'var(--text-muted)' }}>Setup</span>
            </div>
          </div>
        </div>

        {/* Right Side: Tabular settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: Demographics Form */}
          <form className="glass-panel" onSubmit={handleSaveSettings} style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              Account Settings
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>Mobile Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>Default Delivery Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
              <Save size={14} /> Save Profile Details
            </button>
          </form>

          {/* Section 2: Themes & Channel triggers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {/* Theme & Platform settings */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>App Theme</h3>
              
              <div className="flex-between" style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Select Mode:</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '12px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="dark">Dark Theme (Standard)</option>
                  <option value="light">Light Theme</option>
                </select>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>Preferred Providers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {Object.keys(preferredPlatforms).map((platformId) => (
                  <label key={platformId} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={preferredPlatforms[platformId]}
                      onChange={() => setPreferredPlatforms({
                        ...preferredPlatforms,
                        [platformId]: !preferredPlatforms[platformId]
                      })}
                      style={{ accentColor: 'var(--color-primary)' }}
                    />
                    <span>{platformId === '1mg' ? 'Tata 1mg' : platformId === 'apollo' ? 'Apollo Pharmacy' : platformId === 'netmeds' ? 'Netmeds' : 'PharmEasy'}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>AI Price Watch Alerts</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>Where should our price crawlers dispatch immediate rate reduction messages?</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>WhatsApp Notifications</span>
                  <input
                    type="checkbox"
                    checked={channels.whatsapp}
                    onChange={() => setChannels({ ...channels, whatsapp: !channels.whatsapp })}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Email Alerts Index</span>
                  <input
                    type="checkbox"
                    checked={channels.email}
                    onChange={() => setChannels({ ...channels, email: !channels.email })}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Pill Reminder SMS</span>
                  <input
                    type="checkbox"
                    checked={channels.sms}
                    onChange={() => setChannels({ ...channels, sms: !channels.sms })}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                </label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Mobile Push Notifications</span>
                  <input
                    type="checkbox"
                    checked={channels.push}
                    onChange={() => setChannels({ ...channels, push: !channels.push })}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
