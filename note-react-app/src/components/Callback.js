import React, { useEffect, useContext } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Callback = () => {
  const history = useHistory();
  const navigate = useNavigate();
  const { handleAuthCallback } = useContext(AuthContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      handleAuthCallback(code)
        .then(() => {
          //   history.push('/'); // Redirect to the home page or another protected route
          navigate(`/`);
        })
        .catch((err) => {
          console.error('Error during authentication:', err);
          //history.push('/login'); // Redirect to the login page on error
          navigate(`/login`);
        });
    } else if (error) {
      console.error('Error during authorization:', error);
      //history.push('/login'); // Redirect to the login page on error
      navigate(`/login`);
    } else {
      //history.push('/'); // Redirect to the home page if no code or error is present
      navigate(`/`);
    }
    //   }, [handleAuthCallback, history]);
  }, [handleAuthCallback, navigate]);
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  );
};

export default Callback;
