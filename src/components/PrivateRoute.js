// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    // If the user is authenticated, render the children
    children
  ) : (
    // If not authenticated, redirect to the login page
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
