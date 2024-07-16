// src/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
