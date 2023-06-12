import React, { useState, useEffect } from 'react';
import {
  getLocalRefreshToken,
  refreshAccessToken,
  setLocalTokens,
} from '../services/tokenService';

export default function Test() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const { newAccessToken, newRefreshToken, newIdToken } =
          await refreshAccessToken(getLocalRefreshToken());
        setLocalTokens(newAccessToken, newRefreshToken, newIdToken);
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
