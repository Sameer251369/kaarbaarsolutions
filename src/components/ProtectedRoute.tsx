import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): React.ReactNode {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          border: '3px solid rgba(255,107,44,0.2)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin-slow 0.8s linear infinite',
        }} />
        <span style={{ fontFamily: 'DM Sans', color: 'rgba(240,240,250,0.4)', fontSize: '0.9rem' }}>Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
