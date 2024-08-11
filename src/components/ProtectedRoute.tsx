// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const ProtectedRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  // If the user is authenticated, render the child routes (outlet)
  // Otherwise, redirect to the sign-in page
  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
