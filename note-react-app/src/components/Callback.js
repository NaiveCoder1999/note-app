import React, { useEffect, useContext } from 'react';
// import { useNavigate, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthContext';

//component for handling authorization code and then execute authentication
const Callback = () => {
  //const history = useHistory();
  const navigate = useNavigate();
  const { handleAuthCallback } = useContext(AuthContext);

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
      handleAuthCallback(code, codeVerifier) //TODO
        .then(() => {
          //   history.push('/'); // Redirect to the home page or another protected route
          // navigate('/notes');
        })
        .catch((err) => {
          console.error('Error during authentication:', err);
          //history.push('/login'); // Redirect to the login page on error
          //navigate('/', { replace: true });
        });
    } else if (error) {
      console.error('Error during authorization:', error);
      //history.push('/login'); // Redirect to the login page on error
      //navigate('/', { replace: true });
    } else {
      //history.push('/'); // Redirect to the home page if no code or error is present
      //navigate('/', { replace: true });
    }
    // }, [handleAuthCallback, navigate]);
  });
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Callback;
