import {
  getLocalAccessToken,
  setLocalAccessToken,
  getLocalRefreshToken,
  setLocalRefreshToken,
  getLocalIdToken,
  setLocalIdToken,
  refreshAccessToken,
} from '../services/tokenService';
import React, { useState, useEffect } from 'react';

export default function Test() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { newAccessToken, newRefreshToken, newIdToken } =
          await refreshAccessToken(
            localStorage.getItem('refresh_token')
            //refreshToken
          );
        setLocalAccessToken(newAccessToken);
        setLocalRefreshToken(newRefreshToken);
        setLocalIdToken(newIdToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setIdToken(newIdToken);
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    };

    fetchAccessToken();
  }, []);
  //setToken(newAccessToken);
  return (
    <div>
      <h1>Testing refresh token</h1>
      {accessToken ? (
        <p>Access token: {accessToken}</p>
      ) : (
        <p>Loading access token...</p>
      )}
      {refreshToken ? (
        <p>Refresh token: {refreshToken}</p>
      ) : (
        <p>Loading refresh token...</p>
      )}
      {idToken ? <p>ID token: {idToken}</p> : <p>Loading ID token...</p>}
    </div>
  );
}
