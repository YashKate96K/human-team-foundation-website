import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy auth/role check (replace with real logic)
const getUserRole = () => localStorage.getItem('role');

const PrivateRoute = ({ role, children }) => {
  const userRole = getUserRole();
  if (!userRole) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
