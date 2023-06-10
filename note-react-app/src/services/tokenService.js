import axios from 'axios';

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
    //console.log(response.data);
    return { accessToken, refreshToken, idToken };
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    throw error;
  }
};

// post method with params of refresh token to exchange new access token
export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TOKEN_ENDPOINT,
      {},
      {
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        },
      }
    );

    //const { access_token: newAccessToken } = response.data;
    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;
    const newIdToken = response.data.id_token;
    return { newAccessToken, newRefreshToken, newIdToken };
  } catch (error) {
    console.error('Error refershing access token:', error);
    throw error;
  }
};

export const introspectAccessToken = async (accessToken) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_INTROSPECT_ENDPOINT,
      {
        token: accessToken,
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
    return response.data;
  } catch (error) {
    console.error('Error introspect for access token:', error);
    throw error;
  }
};

export function getLocalAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
}

export function setLocalAccessToken(newAccessToken) {
  localStorage.setItem('access_token', newAccessToken);
}
export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  return refreshToken;
}

export function setLocalRefreshToken(newRefreshToken) {
  localStorage.setItem('refresh_token', newRefreshToken);
}

export function getLocalIDToken() {
  const idToken = localStorage.getItem('id_token');
  return idToken;
}

export function setLocalIdToken(newIdToken) {
  localStorage.setItem('id_token', newIdToken);
}

export function removeLocalAccessToken() {
  localStorage.removeItem('access_token');
}

export function removeLocalRefreshToken() {
  localStorage.removeItem('refresh_token');
}

export function removeLocalIdToken() {
  localStorage.removeItem('id_token');
}

export function setLocalTokens(
  newAccessToken,
  newLocalRefreshToken,
  newIdToken
) {
  setLocalAccessToken(newAccessToken);
  setLocalRefreshToken(newLocalRefreshToken);
  setLocalIdToken(newIdToken);
}

export function removeLocalTokens() {
  removeLocalAccessToken();
  removeLocalRefreshToken();
  removeLocalIdToken();
}
