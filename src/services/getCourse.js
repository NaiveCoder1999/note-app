import { useEffect, useState } from 'react';
import myAxios from './axios';
import * as Constants from '../constants/config';

// TODO
export async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
