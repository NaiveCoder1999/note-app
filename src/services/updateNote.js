import { useEffect, useState } from 'react';
import myAxios from './axios';
import * as Constants from '../constants/config';

// TODO
export async function updateNote(name, id, course) {
  //TODO
  return myAxios({
    url: name + '/notes',
    method: 'post',
  });
}
