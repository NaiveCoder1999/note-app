import { useEffect, useState } from 'react';
import myAxios from './axios';
import * as Constants from '../constants/config';

export function deleteNote(name, id) {
  return myAxios({
    url: name + '/courses' + '/' + id,
    method: 'delete',
  });
}
