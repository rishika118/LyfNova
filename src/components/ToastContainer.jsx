import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let toastBg = 'rgba(15, 23, 42, 0.95)';
        let toastBorder = 'rgba(255, 255, 255, 0.1)';
        let toastIcon = <Info size={16} style={{ color: 'var(--color-secondary)' }} />;

        if (toast.type === 'success') {
          toastBg = 'rgba(6, 40, 25, 0.95)';
          toastBorder = '1px solid rgba(16, 185, 129, 0.25)';
          toastIcon = <CheckCircle size={16} style={{ color: 'var(--color-primary)' }} />;
        } else if (toast.type === 'warning') {
          toastBg = 'rgba(45, 28, 5, 0.95)';
          toastBorder = '1px solid rgba(245, 158, 11, 0.25)';
          toastIcon = <AlertTriangle size={16} style={{ color: '#f59e0b' }} />;
        } else if (toast.type === 'error') {
          toastBg = 'rgba(40, 6, 6, 0.95)';
          toastBorder = '1px solid rgba(239, 68, 68, 0.25)';
          toastIcon = <AlertCircle size={16} style={{ color: '#ef4444' }} />;
        }

        return (
          <div
            key={toast.id}
            className="toast"
            style={{
              background: toastBg,
              border: toastBorder,
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)'
            }}
          >
            {toastIcon}
            <span style={{ fontSize: '13px', color: '#f8fafc' }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
export default ToastContainer;
