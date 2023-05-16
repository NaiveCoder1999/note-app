import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import { useAuth } from '../providers/AuthContext';
// import * as Constants from '../constants/config';

const HomePage = () => {
  const { handleLogin } = useAuth();
  const handleLoginClick = () => {
    handleLogin();
    //console.log('Login button clicked');
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Welcome to the Note Taking App</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
