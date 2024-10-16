// components/RedirectIfLoggedIn.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RedirectIfLoggedIn = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // If user is logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfLoggedIn;
