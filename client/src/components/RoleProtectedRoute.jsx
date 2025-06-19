import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default RoleProtectedRoute;
