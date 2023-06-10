/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loginUserName, accessToken } = useAuth();
  console.log('isAuthenticated:', isAuthenticated);
  console.log('loginUserName:', loginUserName);
  // console.log('accessToken:', accessToken);
  if (!isAuthenticated) {
    // Redirect to the HomePage
    return <Navigate to="/" replace />;
  }
  return children;
};
