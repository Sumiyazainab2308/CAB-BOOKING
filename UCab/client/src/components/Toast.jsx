import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = () => {
    const { toast } = useAuth();

    if (!toast) return null;

    const getToastStyle = () => {
        switch (toast.type) {
            case 'error':
                return { bg: '#fee2e2', color: '#b91c1c', border: '#ef4444', icon: <AlertCircle size={20} /> };
            case 'info':
                return { bg: '#e0f2fe', color: '#0369a1', border: '#0ea5e9', icon: <Info size={20} /> };
            default:
                return { bg: '#dcfce7', color: '#15803d', border: '#22c55e', icon: <CheckCircle2 size={20} /> };
        }
    };

    const style = getToastStyle();

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: style.bg,
            color: style.color,
            borderLeft: `4px solid ${style.border}`,
            padding: '14px 20px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'fadeIn 0.3s ease-out forwards',
            maxWidth: '400px'
        }}>
            {style.icon}
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{toast.message}</span>
        </div>
    );
};

export default Toast;
