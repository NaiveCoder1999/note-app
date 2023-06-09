/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../services/pkce';
import {
  getLocalIDToken,
  exchangeCodeForAccessToken,
  introspectAccessToken,
} from '../services/tokenService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIDToken] = useState(null);
  const [loginUserName, setLoginUserName] = useState(null); //TODO extract username from introspection

  useEffect(() => {
    // check if token is still valid

    const checkAuthenticationStatus = async () => {
      const storedAccessToken = localStorage.getItem('access_token');
      const storedRefreshToken = localStorage.getItem('refresh_token');
      const storedIDToken = localStorage.getItem('id_token');
      try {
        let introspectData = null;
        let isTokenActive = false;
        // null or undefined check not working
        if (storedAccessToken) {
          introspectData = await introspectAccessToken(storedAccessToken);
          isTokenActive = introspectData.active;
          console.log('isTokenActive', isTokenActive); // TODO to delete

          // token is valid
          if (isTokenActive === true) {
            setIsAuthenticated(true);
            setAccessToken(storedAccessToken);
            setIDToken(storedIDToken);
            setLoginUserName(introspectData.sub); //extract userName from introspection response
            if (storedRefreshToken) {
              setRefreshToken(storedRefreshToken);
            }
            if (storedIDToken) {
              setIDToken(storedIDToken);
            }
          }
        } else {
          setIsAuthenticated(false);
          // already expired and redirect to post logout page
          //handleExpiredToken();
          // if (
          //   window.location.href !== 'http://127.0.0.1:3000/' &&
          //   window.location.href !== process.env.REACT_APP_POST_LOGOUT_URI
          // ) {
          //   redirectTo(process.env.REACT_APP_POST_LOGOUT_URI);
          // }
        }
      } catch (error) {
        console.error('Error introspect for access token:', error);
        setIsAuthenticated(false);
        //handleExpiredToken();
      }
    };
    // Call the function initially
    checkAuthenticationStatus();
    // Set up the interval to check the logged-in status
    const intervalId = setInterval(checkAuthenticationStatus, 300000); // 300 seconds
    // const intervalId = setInterval(checkAuthenticationStatus, 3000); // TODO to change
    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const redirectTo = (url) => {
    // check if the page is on the post logout
    const currentUrl = window.location.href;
    // console.log(currentUrl);
    if (currentUrl !== url) {
      window.location.href = url; //redirect to post logout page
    }
  };
  const handleLogin = () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    localStorage.setItem('code_verifier', codeVerifier);
    //console.log('verifier: ' + localStorage.getItem('code_verifier'));
    const authUrl = new URL(process.env.REACT_APP_AUTHZ_ENDPOINT);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
    authUrl.searchParams.append('scope', process.env.REACT_APP_OAUTH2_SCOPE);
    authUrl.searchParams.append(
      'redirect_uri',
      process.env.REACT_APP_REDIRECT_URI
    );
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    //Go to auithz login while preserving session history.
    const loginString = decodeURIComponent(authUrl.href);
    window.location.href = loginString; //external link
    //console.log(loginString);
  };

  // initiate RP logout with GET method
  const handleLogout = () => {
    const idToken = getLocalIDToken();
    const logoutUrl = new URL(process.env.REACT_APP_END_SESSION_ENDPOINT);
    logoutUrl.searchParams.append('id_token_hint', idToken);
    logoutUrl.searchParams.append(
      'post_logout_redirect_uri',
      process.env.REACT_APP_POST_LOGOUT_URI
    );
    logoutUrl.searchParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
    //Go to openid end session logout page
    const logoutString = decodeURIComponent(logoutUrl.href);
    window.location.href = logoutString; //external link
    // console.log(logoutString);
  };

  const handleExpiredToken = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    setIDToken(null);
    setLoginUserName(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
  };

  // triggered on auth callback of Callback component
  // to save tokens for access, refresh and id info
  const handleAuthCallback = async (code, codeVerifier) => {
    try {
      console.log('verifier in handleAuth: ' + codeVerifier);
      if (codeVerifier) {
        const {
          accessToken: remoteAccessToken,
          refreshToken: remoteRefreshToken,
          idToken: remoteIdToken,
        } = await exchangeCodeForAccessToken(code, codeVerifier);
        if (remoteAccessToken && remoteIdToken) {
          localStorage.setItem('access_token', remoteAccessToken);
          localStorage.setItem('refresh_token', remoteRefreshToken);
          localStorage.setItem('id_token', remoteIdToken);
          setIsAuthenticated(true); //set auth status to true
          setAccessToken(remoteAccessToken);
          setRefreshToken(remoteRefreshToken);
          setIDToken(remoteIdToken);
        } else {
          console.error('Missing access token');
        }
      } else {
        console.error('Missing code verifier');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginUserName,
        accessToken,
        refreshToken,
        idToken,
        handleLogin,
        handleLogout,
        handleExpiredToken,
        handleAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
