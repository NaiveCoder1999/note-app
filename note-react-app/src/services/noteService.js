import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import {
  getLocalAccessToken,
  setLocalAccessToken,
  getLocalRefreshToken,
  setLocalRefreshToken,
  getLocalIdToken,
  setLocalIdToken,
  refreshAccessToken,
} from '../services/tokenService';
import { useAuth, AuthContext } from '../providers/AuthContext';
import * as Constants from '../constants/config';
import { useNavigate } from 'react-router-dom';

function refreshPage() {
  window.location.reload(true);
}

// basic axios instance for notes api
const instance = axios.create({
  baseURL: process.env.REACT_APP_NOTE_URI,
  headers: { 'Content-Type': 'application/json' },
});

//TODO interceptor for access token
const requestInterceptor = instance.interceptors.request.use(
  function (config) {
    // set access token in header before request is sent
    const token = getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
    // return Promise.reject(error.response || error.message);
  }
);

//TODO
const responseInterceptor = instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const originalConfig = error.config;
    const refreshToken = getLocalRefreshToken();
    if (error.response) {
      if (
        refreshToken &&
        error.response.status === 401 &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        // call refreshToken() request
        try {
          const { newAccessToken, newRefreshToken, newIdToken } =
            await refreshAccessToken(
              //localStorage.getItem('refresh_token')
              refreshToken
            );
          setLocalAccessToken(newAccessToken);
          setLocalRefreshToken(newRefreshToken);
          setLocalIdToken(newIdToken);

          originalConfig.headers['Authorization'] = 'Bearer ' + newAccessToken;
          //refreshPage();
          window.location.reload();
          return instance(originalConfig);
        } catch (error) {
          // Refresh token missing or expired => logout user...
          //invoke handleExpiredToken() to clear expired login status in Logout component page;
          // window.location.href = 'http://127.0.0.1:3000/logout';
          window.location.href = process.env.REACT_APP_POST_LOGOUT_URI;
          return Promise.reject(error.response.data);
        }
      }
    }
    return Promise.reject(error);
  }
);

export async function getSingleNote(name, id) {
  return instance({
    url: name + '/notes' + '/' + id,
    method: 'get',
  });
}

export async function getAllNotes(name) {
  return instance({
    url: name + '/notes',
    method: 'get',
  });
}
export function createNote(name, note) {
  return instance({
    url: name + '/notes',
    method: 'post',
    data: note,
  });
}

export function updateNote(name, id, note) {
  return instance({
    url: name + '/notes' + '/' + id,
    method: 'put',
    data: note,
  });
}

export function deleteNote(name, id) {
  return instance({
    url: name + '/notes' + '/' + id,
    method: 'delete',
  });
}
