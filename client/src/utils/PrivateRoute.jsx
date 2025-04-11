import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import React from 'react';

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    console.log(token)
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
