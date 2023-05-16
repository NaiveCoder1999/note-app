/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useHistory, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { generateCodeVerifier, generateCodeChallenge } from '../services/pkce';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIDToken] = useState(null);
  //const history = useHistory();
  const navigate = useNavigate();
  //const tokenEndpoint;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    const storedIDToken = localStorage.getItem('id_token');
    if (storedAccessToken) {
      setIsAuthenticated(true);
      setAccessToken(storedAccessToken);
      setIDToken(storedIDToken);
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
      }
    }
  }, []);

  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    sessionStorage.setItem('code_verifier', codeVerifier);

    const authUrl = new URL(process.env.REACT_APP_AUTHZ_ENDPOINT);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', process.env.REACT_APP_CLIENT_ID);
    authUrl.searchParams.append('scope', 'openid+read+write');
    authUrl.searchParams.append(
      'redirect_uri',
      process.env.REACT_APP_REDIRECT_URI
    );
    authUrl.searchParams.append('code_challenge', codeChallenge);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    //Go to auithz login while preserving session history.
    const loginString = decodeURIComponent(authUrl.href);
    window.location.href = loginString; //external link with CORS enabled
    // console.log(loginString);
    // console.log('------');
    //console.log(authUrl.searchParams.toString());
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    setIDToken(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
  };

  // post request to get access token, refresh token, and id token
  // TODO modified to pkce version, tokenEndpoint TODO
  const exchangeCodeForAccessToken = async (code, codeVerifier) => {
    try {
      const response = await axios.post(process.env.REACT_APP_TOKEN_ENDPOINT, {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      });

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id_token: idToken,
      } = response.data;
      // TODO set localStorage or hooks?
      // localStorage.setItem('access_token', accessToken);
      // localStorage.setItem('refresh_token', refreshToken);
      // localStorage.setItem('id_token', idToken);
      return { accessToken, refreshToken, idToken };
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
      throw error;
    }
  };

  // triggered on auth callback of Callback component
  // to save tokens for access, refresh and id info
  const handleAuthCallback = async (code) => {
    const codeVerifier = sessionStorage.getItem('code_verifier');
    sessionStorage.removeItem('code_verifier');

    if (codeVerifier) {
      const { accessToken, refreshToken, idToken } =
        await exchangeCodeForAccessToken(code, codeVerifier);
      //const token = await exchangeCodeForAccessToken(code, codeVerifier);
      setIsAuthenticated(true);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIDToken(idToken);
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('id_token', idToken);
      //history.push('/');
      navigate('/'); // TODO Redirect to the home page or another protected route
    } else {
      console.error('Missing code verifier');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        idToken,
        handleLogin,
        handleLogout,
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
