import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, ShoppingCart, User, Activity, ShieldAlert, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { currentPage, navigateTo, basket, notifications } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close notifications dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (alert) => {
    setShowNotifications(false);
    if (alert.type === 'price-drop' || alert.type === 'back-in-stock') {
      navigateTo('medicines', alert.name, 'medicine');
    } else {
      navigateTo('tests', alert.name, 'test');
    }
  };

  return (
    <nav className="navbar">
      <a href="#" className="nav-brand" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }}>
        <div className="nav-logo-icon">L</div>
        <span>Lyf<span style={{ color: 'var(--color-primary)' }}>Nova</span></span>
      </a>

      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
          onClick={() => navigateTo('landing')}
        >
          Home
        </button>
        <button
          className={`nav-link ${currentPage === 'medicines' ? 'active' : ''}`}
          onClick={() => navigateTo('medicines')}
        >
          Medicines
        </button>
        <button
          className={`nav-link ${currentPage === 'tests' ? 'active' : ''}`}
          onClick={() => navigateTo('tests')}
        >
          Lab Tests
        </button>
        <button
          className={`nav-link ${currentPage === 'basket' ? 'active' : ''}`}
          onClick={() => navigateTo('basket')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
          Smart Basket
          {basket.length > 0 && (
            <span style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
              color: 'white',
              fontSize: '10px',
              fontWeight: '700',
              padding: '2px 6px',
              borderRadius: '999px'
            }}>
              {basket.length}
            </span>
          )}
        </button>
        <button
          className={`nav-link ${currentPage === 'analytics' ? 'active' : ''}`}
          onClick={() => navigateTo('analytics')}
        >
          Analytics
        </button>
        <button
          className={`nav-link ${currentPage === 'admin' ? 'active' : ''}`}
          onClick={() => navigateTo('admin')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          Admin
        </button>
      </div>

      <div className="nav-actions">
        {/* Theme Toggle */}
        <button className="theme-switch-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications Popover Trigger */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            className="theme-switch-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                boxShadow: '0 0 8px #ef4444'
              }}></span>
            )}
          </button>

          {showNotifications && (
            <div className="glass-panel notification-popover">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ fontWeight: '600', fontSize: '15px' }}>Price Drop Alerts</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{notifications.length} notifications</span>
              </div>
              {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No new alerts. Simulating prices...
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {notifications.map((alert) => (
                    <div
                      key={alert.id}
                      onClick={() => handleNotificationClick(alert)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--color-primary)';
                        e.currentTarget.style.background = 'rgba(16,185,129,0.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: alert.type === 'price-drop' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: alert.type === 'price-drop' ? 'var(--color-primary)' : 'var(--color-secondary)',
                          flexShrink: 0
                        }}>
                          <Activity size={12} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>{alert.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{alert.message}</div>
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>{alert.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div
                onClick={() => { setShowNotifications(false); navigateTo('dashboard'); }}
                style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              >
                View Patient Dashboard
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <button
          className="theme-switch-btn"
          onClick={() => navigateTo('profile')}
          title="User Profile"
          style={{
            border: currentPage === 'profile' ? '2px solid var(--color-primary)' : '1px solid var(--border-color)',
            overflow: 'hidden',
            padding: 0
          }}
        >
          <User size={18} style={{ color: currentPage === 'profile' ? 'var(--color-primary)' : 'inherit' }} />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
