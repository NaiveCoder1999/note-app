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
    //console.log(response.data); //TODO removed when finished
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
    console.log('new access token: ' + newAccessToken);
    console.log('new refresh token: ' + newRefreshToken);
    console.log('new id token: ' + newIdToken);
    return { newAccessToken, newRefreshToken, newIdToken };
  } catch (error) {
    console.error('Error refershing access token:', error);
    throw error;
  }
};

// // sync method of exchanging new access token with refresh token
// export const refreshAccessToken = (refreshToken) => {
//   axios
//     .post(
//       process.env.REACT_APP_TOKEN_ENDPOINT,
//       {},
//       {
//         params: {
//           grant_type: 'refresh_token',
//           refresh_token: refreshToken,
//           client_id: process.env.REACT_APP_CLIENT_ID,
//           client_secret: process.env.REACT_APP_CLIENT_SECRET,
//         },
//       }
//     )
//     .then((response) => {
//       const {
//         access_token: accessToken,
//         refresh_token: refreshToken,
//         id_token: idToken,
//       } = response.data;
//       console.log(response.data); //TODO removed when finished
//       console.log('new access token: ' + accessToken);
//       return { accessToken, refreshToken, idToken };
//     })
//     .catch((error) => {
//       console.error('Error refershing access token:', error);
//       throw error;
//     });
// };
