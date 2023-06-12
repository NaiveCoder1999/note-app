/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateCodeVerifier, generateCodeChallenge } from '../services/pkce';
import {
  exchangeCodeForAccessToken,
  introspectAccessToken,
  getLocalAccessToken,
  setLocalAccessToken,
  getLocalRefreshToken,
  setLocalRefreshToken,
  getLocalIdToken,
  setLocalIdToken,
  refreshAccessToken,
  removeLocalAccessToken,
  removeLocalTokens,
  setLocalTokens,
} from '../services/tokenService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIDToken] = useState(null);
  const [loginUserName, setLoginUserName] = useState(null);
  const [isLoading, setLoading] = useState(true); //TODO

  useEffect(() => {
    // check if token is still valid; isLoading is true
    const checkAuthenticationStatus = async () => {
      const storedAccessToken = getLocalAccessToken();
      const storedRefreshToken = getLocalRefreshToken();
      const storedIDToken = getLocalIdToken();
      try {
        // default value of isAuthenticated is false
        if (storedAccessToken) {
          const introspectData = await introspectAccessToken(storedAccessToken);
          const isTokenActive = introspectData.active;
          console.log('isTokenActive', isTokenActive); // TODO to delete

          if (!isTokenActive) {
            // when token is expired
            // TODO refresh token
            const { newAccessToken, newRefreshToken, newIdToken } =
              await refreshAccessToken(storedRefreshToken);
            setIsAuthenticated(true);
            setLocalAccessToken(newAccessToken);
            setLocalRefreshToken(newRefreshToken);
            setLocalIdToken(newIdToken);
            setAccessToken(newAccessToken);
            setRefreshToken(newRefreshToken);
            setIDToken(newIdToken);

            window.location.reload();
          } else if (isTokenActive) {
            // token is valid
            setIsAuthenticated(true);
            setAccessToken(storedAccessToken);
            setIDToken(storedIDToken);
            setLoginUserName(introspectData.sub); //extract userName from introspection response
            if (storedRefreshToken) setRefreshToken(storedRefreshToken);
            if (storedIDToken) setIDToken(storedIDToken);
          }
        } else {
          // no access token stored in local storage, auth status is false
          setIsAuthenticated(false);
          setLoginUserName(null);
          removeLocalAccessToken(); // To avoid trigger checkAuthenticationStatus() infinitely
          // window.location.reload(); // would trap into infinite refresh loop
        }
      } catch (error) {
        console.error('Error introspect for access token:', error);
        setIsAuthenticated(false);
        setLoginUserName(null);
        removeLocalAccessToken(); // To avoid trigger checkAuthenticationStatus() infinitely
      } finally {
        setLoading(false);
      }
    };
    // Call the validation function everytime the component is mounted
    checkAuthenticationStatus();
    // Set up the interval to check the logged-in status
    const intervalId = setInterval(checkAuthenticationStatus, 600000); // 300 seconds
    // const intervalId = setInterval(checkAuthenticationStatus, 3000); // TODO to change
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    const idToken = getLocalIdToken();
    const logoutUrl = new URL(process.env.REACT_APP_END_SESSION_ENDPOINT);
    logoutUrl.searchParams.append('id_token_hint', idToken);
    logoutUrl.searchParams.append(
      'post_logout_redirect_uri',
      process.env.REACT_APP_POST_LOGOUT_URI
    );
    logoutUrl.searchParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
    //Go to openid end session logout page
    const logoutString = decodeURIComponent(logoutUrl.href);
    setLocalAccessToken(null); // To avoid trigger checkAuthenticationStatus()
    setIsAuthenticated(false);
    setLoginUserName(null);
    window.location.href = logoutString; //external link
    // console.log(logoutString);
  };

  const handleExpiredToken = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    setIDToken(null);
    setLoginUserName(null);
    removeLocalTokens();
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
          setLocalTokens(remoteAccessToken, remoteRefreshToken, remoteIdToken);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
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
