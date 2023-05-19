import axios from 'axios';
import * as Constants from '../constants/config';
// post request to get access token, refresh token, and id token
export const exchangeCodeForAccessToken = async (code, codeVerifier) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TOKEN_ENDPOINT,
      {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        code_verifier: codeVerifier,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
      },
      {
        headers: {
          // Automatic serialization of form data
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      id_token: idToken,
    } = response.data;
    // localStorage.setItem('access_token', accessToken);
    // localStorage.setItem('refresh_token', refreshToken);
    // localStorage.setItem('id_token', idToken);
    console.log(response.data); //TODO removed when finished
    return { accessToken, refreshToken, idToken };
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    throw error;
  }
};

// post method with params to exchange new access token
export const refreshAccessToken = async (refreshCode) => {};
