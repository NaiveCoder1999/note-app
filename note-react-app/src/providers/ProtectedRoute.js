/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  // console.log('isAuthenticated:', isAuthenticated);
  if (isLoading) {
    return (
      <div className="container">
        <div className="row mt-5 ">
          <div className="col-md-12">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the HomePage
    return <Navigate to="/" replace />;
  }
  return children;
};
