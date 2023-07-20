// PrivateRoute.js
import React from 'react';
import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; 

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? children : <Navigate to="/login" replace />} // Sử dụng Navigate thay cho Redirect
    />
  );
};

export default PrivateRoute;
