import { useEffect, useState } from 'react';
import myAxios from './axios';
import * as Constants from '../constants/config';

export function getAllNotes(name) {
  return myAxios({
    url: name + '/notes',
    method: 'get',
  });
}
