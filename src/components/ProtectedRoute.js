import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Auth'; // Assuming you have the auth context in the auth.js file

const ProtectedRoute = ({ component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? component : <Navigate to="/" replace />;
};

export default ProtectedRoute;