// import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import Footer from './Footer';
import { useAuth } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
// import * as Constants from '../constants/config';

/**
 * This function clears the expired tokens and give users
 * a button to go back to home page.
 * This component would be invoked by axios response interceptor
 * and handleLogout function when RP-initiated logout request is finished.
 * @return {ReactNode} Returns a JSX element that displays a message that the user has logged out.
 */
const Logout = () => {
  const navigate = useNavigate();
  const { handleExpiredToken } = useAuth();
  const handleClick = () => {
    //window.location.href = 'http://127.0.0.1:3000';
    navigate('/', { replace: true });
  };
  useEffect(() => {
    // clean the login status when logout page is loaded
    handleExpiredToken();
  });
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>You have logout!</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Home
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Logout;
