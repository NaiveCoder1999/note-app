import axios from 'axios';
import * as Constants from '../constants/config';

function getLocalAccessToken() {
  const accessToken = localStorage.getItem('access_token');
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  return refreshToken;
}

function getLocalIDToken() {
  const idToken = localStorage.getItem('id_token');
  return idToken;
}

// basic axios instance for notes api
const instance = axios.create({
  //baseURL: Constants.COURSE_API_URL,
  baseURL: process.env.REACT_APP_NOTE_URI,
  headers: { 'Content-Type': 'application/json' },
});

//TODO interceptor for access token
const requestInterceptor = instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//TODO
const responseInterceptor = instance.interceptors.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        // TODO call refreshToken() request for example;
        // return a request
        return instance(originalConfig);
      }

      if (error.response.status === 403) {
        // Do something
        return Promise.reject(error.response.data);
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
