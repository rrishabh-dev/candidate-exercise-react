import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const authKey = localStorage.getItem('loggedIn');

  return authKey ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoutes;
