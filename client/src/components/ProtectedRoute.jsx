import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children (protected component) if logged in
};

export default ProtectedRoute;
