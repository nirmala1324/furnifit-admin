import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../server/utilities/auth';


const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  ); 
};

export default ProtectedRoute;