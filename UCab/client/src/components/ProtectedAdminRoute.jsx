import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { token, role, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Verifying admin permissions...</div>
            </div>
        );
    }

    if (!token || role !== 'admin') {
        return <Navigate to="/alogin" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
