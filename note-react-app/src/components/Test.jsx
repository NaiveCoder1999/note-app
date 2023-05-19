import { refreshAccessToken } from '../services/tokenService';
import React, { useState, useEffect } from 'react';

export default function Test() {
  const [newAccessToken, setNewAccessToken] = useState('');
  //const refreshToken = localStorage.getItem('refresh_token');
  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await refreshAccessToken(
          localStorage.getItem('refresh_token')
          //refreshToken
        );
        setNewAccessToken(token);
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    };

    fetchAccessToken();
  }, []);
  //setToken(newAccessToken);
  return (
    <div>
      <h1>New Access Token</h1>
      {newAccessToken ? (
        <p>New access token: {newAccessToken}</p>
      ) : (
        <p>Loading new access token...</p>
      )}
    </div>
  );
}
