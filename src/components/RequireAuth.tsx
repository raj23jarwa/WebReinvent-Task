import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth: React.FC = () => {
  const token = localStorage.getItem('token'); // Assuming token is used for authentication

  // If there is no token, redirect to the sign-in page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, render the child components (Dashboard page)
  return <Outlet />;
};

export default RequireAuth;
