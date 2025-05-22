import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

interface ProtectedRouteProps {
  reverse?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ reverse = false }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!reverse && !user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (reverse && user) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};
