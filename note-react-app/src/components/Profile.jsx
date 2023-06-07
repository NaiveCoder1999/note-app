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

export default function Profile() {
  useEffect(() => {}, []);
  //setToken(newAccessToken);
  return (
    <div>
      <h1>Profile of user</h1>
    </div>
  );
}
