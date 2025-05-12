// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // save where they were trying to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
