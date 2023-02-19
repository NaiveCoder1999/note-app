import { useEffect, useState } from 'react';
import myAxios from './axios';
import * as Constants from '../constants/config';

// TODO
export async function getSingleNote(name, id) {
  return myAxios({
    url: name + '/notes' + '/' + id,
    method: 'get',
  });
}
