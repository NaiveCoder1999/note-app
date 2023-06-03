// import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import { useAuth } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
// import * as Constants from '../constants/config';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, handleLogin } = useAuth();
  const handleLoginClick = () => {
    console.log('Login button clicked');
    handleLogin();
    // const timer = setTimeout(() => {
    //   handleLogin();
    // }, 2500);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        {!isAuthenticated && (
          <div className="col-md-12">
            <h2>Welcome to the Note Taking App</h2>
          </div>
        )}
        {isAuthenticated && (
          <div className="col-md-12">
            <h2>Welcome Back!</h2>
            <h4>User Placehoder TODO</h4>
          </div>
        )}
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          {!isAuthenticated && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
          {isAuthenticated && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/notes')}
            >
              Notes
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
