import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Bell, Heart, Plus, AlertCircle, Sparkles, TrendingDown, ArrowRight, Activity, Calendar, Play, CheckCircle } from 'lucide-react';
import { medicines, labTests } from '../data/mockData';

export const UserDashboard = () => {
  const {
    navigateTo,
    favorites,
    toggleFavorite,
    reminders,
    toggleReminder,
    addReminder,
    removeReminder,
    notifications,
    addToast
  } = useApp();

  const [remMedName, setRemMedName] = useState('');
  const [remTime, setRemTime] = useState('09:00');
  const [remDosage, setRemDosage] = useState('1 Tablet');
  const [remFreq, setRemFreq] = useState('Daily');

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!remMedName) {
      addToast('Please enter a medicine name', 'warning');
      return;
    }
    // format time AM/PM
    const timeArr = remTime.split(':');
    let hours = parseInt(timeArr[0]);
    const minutes = timeArr[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

    addReminder(remMedName, strTime, remFreq, remDosage);
    setRemMedName('');
  };

  const favoriteMedicinesList = medicines.filter(m => favorites.includes(m.id));
  const favoriteTestsList = labTests.filter(t => favorites.includes(t.id));

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Welcome banner */}
      <div className="glass-panel" style={{
        padding: '32px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.08) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-success" style={{ marginBottom: '8px' }}>Patient Dashboard</span>
            <h1 className="heading-display" style={{ fontSize: '28px', marginBottom: '6px' }}>Welcome Back, Aditi</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Your health pricing profile is optimized. Last index sync completed 12 minutes ago.
            </p>
          </div>
          <button
            onClick={() => navigateTo('basket')}
            className="btn btn-primary"
            style={{ gap: '8px' }}
          >
            <Sparkles size={16} /> Optimize Active Basket
          </button>
        </div>
      </div>

      {/* Main Grid: Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '24px'
      }}>
        {/* Left Column: Reminders and Favorites */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Reminders section */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: 'var(--color-primary)' }} /> Medicine Refill & Pill Reminders
            </h3>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: rem.active ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.002)',
                    opacity: rem.active ? 1 : 0.6
                  }}
                >
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: rem.active ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{rem.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {rem.dosage} • {rem.freq} at <strong style={{ color: 'var(--text-primary)' }}>{rem.time}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className="btn btn-sm"
                      style={{
                        background: rem.active ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                        borderColor: rem.active ? 'var(--color-primary)' : 'var(--border-color)',
                        color: rem.active ? 'var(--color-primary)' : 'var(--text-muted)',
                        padding: '4px 10px',
                        fontSize: '11px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {rem.active ? 'Active' : 'Disabled'}
                    </button>
                    <button
                      onClick={() => removeReminder(rem.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Pill */}
            <form onSubmit={handleAddReminder} style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '20px'
            }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: '600' }}>Schedule New Reminder</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Medicine Name (e.g. Calpol)..."
                  value={remMedName}
                  onChange={(e) => setRemMedName(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '150px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
                <input
                  type="time"
                  value={remTime}
                  onChange={(e) => setRemTime(e.target.value)}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Add Alert
                </button>
              </div>
            </form>
          </div>

          {/* Favorites List */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} style={{ color: '#ef4444' }} /> Saved Medicines & Diagnostics
            </h3>

            {favoriteMedicinesList.length === 0 && favoriteTestsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '16px', color: 'var(--text-muted)', fontSize: '13px' }}>
                No favorited items yet. Click the heart icon on any card to save.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {favoriteMedicinesList.map((med) => (
                  <div
                    key={med.id}
                    className="flex-between"
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', marginRight: '6px' }}>Medicine</span>
                      <strong style={{ fontSize: '13px' }}>{med.name}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('medicines', med.name)}>
                        Compare
                      </button>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => toggleFavorite(med.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {favoriteTestsList.map((test) => (
                  <div
                    key={test.id}
                    className="flex-between"
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255,255,255,0.01)'
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--color-secondary)', fontWeight: '600', textTransform: 'uppercase', marginRight: '6px' }}>Lab Test</span>
                      <strong style={{ fontSize: '13px' }}>{test.name}</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => navigateTo('tests', test.name)}>
                        Compare
                      </button>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => toggleFavorite(test.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Price Drop Live Watch & Quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Live Alerts Feed */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} style={{ color: 'var(--color-secondary)' }} /> Price Watch & Stock Notifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifications.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: alert.type === 'price-drop' ? 'rgba(16,185,129,0.1)' : 'rgba(59,130,246,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: alert.type === 'price-drop' ? 'var(--color-primary)' : 'var(--color-secondary)',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Activity size={10} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{alert.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>{alert.message}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>{alert.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Diagnostics booking */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Quick Health Audits</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                onClick={() => navigateTo('tests', 'Complete Blood Count')}
                className="glass-panel"
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>CBC (Fever Panel)</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scan 5 provider diagnostics</div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
              </div>

              <div
                onClick={() => navigateTo('tests', 'Lipid Profile')}
                className="glass-panel"
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>Lipid Cardiopanel</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Scan 5 provider diagnostics</div>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--color-secondary)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
