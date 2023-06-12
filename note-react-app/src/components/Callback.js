import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';
import { AlertMessageContext } from '../providers/AlertMessageContext';
//component for handling authorization code and then execute authentication
const Callback = () => {
  const navigate = useNavigate();
  const { handleAuthCallback } = useContext(AuthContext);
  const { setAlertMessage } = useContext(AlertMessageContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const codeVerifier = localStorage.getItem('code_verifier');
    if (code && codeVerifier) {
      console.log('code: ' + code);
      console.log(
        'verifier in Callback: ' + localStorage.getItem('code_verifier')
      );
      localStorage.removeItem('code_verifier');
      handleAuthCallback(code, codeVerifier)
        .then(() => {
          // Redirect to the home page or another protected route
          // force refresh the page to make interceptor configure bearer header
          window.location.replace('http://127.0.0.1:3000/notes');
          //navigate('/notes', { replace: true });
        })
        .catch((err) => {
          console.error('Error during authentication:', err);
          setAlertMessage('Authentication Error: ' + err);

          navigate('/', { replace: true }); // Redirect to the login page
        });
    } else if (error) {
      console.error('Error during authorization:', error);
      setAlertMessage('Authorization Error: ' + error);
      navigate('/', { replace: true });
    } else {
      // already authenticated
      //setAlertMessage('OAuth2 Login Error');
      navigate('/', { replace: true });
    }
  });
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Callback;
