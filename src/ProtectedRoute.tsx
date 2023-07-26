import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute:React.FC<any> = ({ children }) => {
    const user = localStorage.getItem('token');
    if (!user) {
      return <Navigate to="/login" replace />;
    } else if(user) {
      return children;
    } 
};

export default ProtectedRoute;
