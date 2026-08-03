import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { adminLogs, platforms, medicines, labTests } from '../data/mockData';
import { Activity, RefreshCw, AlertTriangle, ShieldCheck, Database, Play, CheckCircle } from 'lucide-react';

export const AdminDashboard = () => {
  const { triggerPriceUpdateSimulation, addToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('sync'); // 'sync' or 'audit'
  const [syncingPlatform, setSyncingPlatform] = useState(null);

  const handleManualSync = (platformName) => {
    setSyncingPlatform(platformName);
    addToast(`Triggering manual catalog crawl for ${platformName}...`, 'info');
    setTimeout(() => {
      setSyncingPlatform(null);
      addToast(`Sync complete! Audited 1,420 price nodes on ${platformName}.`, 'success');
    }, 2000);
  };

  const mockUsers = [
    { name: 'Aditi Sen', email: 'aditi.sen@lyfnova.com', plan: 'Free Tier', basketItems: 4, alerts: 3, lastActive: '12 min ago' },
    { name: 'Rohan Mehta', email: 'rohan.mehta@gmail.com', plan: 'Premium Shield', basketItems: 2, alerts: 8, lastActive: '2 hours ago' },
    { name: 'Karan Malhotra', email: 'karan.m@yahoo.com', plan: 'Free Tier', basketItems: 0, alerts: 1, lastActive: '1 day ago' }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Admin header */}
      <div className="flex-between" style={{ marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="heading-display" style={{ fontSize: '32px', marginBottom: '8px' }}>Developer Console</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Trigger real-time crawling models, verify active scraping pipelines, and audit user logs.</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            triggerPriceUpdateSimulation();
          }}
          style={{ gap: '8px' }}
        >
          <Play size={16} /> Simulate Live Price Fluctuations
        </button>
      </div>

      {/* Sub tabs */}
      <div className="tab-group">
        <button
          className={`tab-btn ${activeSubTab === 'sync' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('sync')}
        >
          Aggregator Sync Console
        </button>
        <button
          className={`tab-btn ${activeSubTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('audit')}
        >
          User & System Audit Logs
        </button>
      </div>

      {/* Tab Contents */}
      {activeSubTab === 'sync' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Platforms sync table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} style={{ color: 'var(--color-primary)' }} /> Partner Scraping Pipeline Status
            </h3>

            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Platform Name</th>
                    <th>Type</th>
                    <th>Scraper Health</th>
                    <th>Last Catalog Sync</th>
                    <th>Crawler Load</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(platforms).map((p, idx) => {
                    const isSyncing = syncingPlatform === p.name;
                    
                    return (
                      <tr key={idx}>
                        <td style={{ fontWeight: '600' }}>{p.name}</td>
                        <td>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            {idx < 5 ? 'E-Pharmacy' : 'Diagnostic Lab'}
                          </span>
                        </td>
                        <td>
                          <span className="badge badge-success" style={{ gap: '4px', textTransform: 'none' }}>
                            <ShieldCheck size={10} /> Active
                          </span>
                        </td>
                        <td>{isSyncing ? 'Syncing now...' : '12 min ago'}</td>
                        <td>{idx % 2 === 0 ? '0.2 ms latency' : '0.4 ms latency'}</td>
                        <td>
                          <button
                            onClick={() => handleManualSync(p.name)}
                            disabled={isSyncing}
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '4px 10px',
                              fontSize: '11px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <RefreshCw size={10} className={isSyncing ? 'skeleton' : ''} /> {isSyncing ? 'Syncing...' : 'Force Sync'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick catalog summaries */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Scraped Drug List Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Unique SKUs indexed</span>
                  <strong style={{ color: 'var(--text-primary)' }}>52,482</strong>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Mapped substitute molecules</span>
                  <strong style={{ color: 'var(--text-primary)' }}>3,480</strong>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Price fluctuation nodes</span>
                  <strong style={{ color: 'var(--text-primary)' }}>12,890 / day</strong>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Diagnostic Packages Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Tracked health profiles</span>
                  <strong style={{ color: 'var(--text-primary)' }}>482</strong>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Total parameter mappings</span>
                  <strong style={{ color: 'var(--text-primary)' }}>24,902</strong>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Accredited Labs online</span>
                  <strong style={{ color: 'var(--text-primary)' }}>12 networks</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* User management simulation table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px' }}>Active Simulator Patient Sessions</h3>
            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email Address</th>
                    <th>Pricing Tier</th>
                    <th>Active Basket</th>
                    <th>Active Alerts</th>
                    <th>Last Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600' }}>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.plan === 'Premium Shield' ? 'badge-success' : 'badge-secondary'}`} style={{ textTransform: 'none' }}>
                          {user.plan}
                        </span>
                      </td>
                      <td>{user.basketItems} items</td>
                      <td>{user.alerts} alerts watch</td>
                      <td>{user.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System logs */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} style={{ color: 'var(--color-secondary)' }} /> Crawling Pipeline Audit Trail
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontFamily: 'monospace',
              fontSize: '12px',
              background: 'rgba(0,0,0,0.2)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {adminLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', gap: '16px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>[{log.timestamp}]</span>
                  <span style={{ color: 'var(--color-primary)' }}>INF</span>
                  <span style={{ flex: 1, color: 'var(--text-primary)' }}>{log.event}</span>
                  <span style={{ color: 'var(--color-secondary)' }}>{log.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDashboard;
