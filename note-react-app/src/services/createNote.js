import { useEffect, useState } from 'react';
import myAxios from './axios';

export function createNote(name, note) {

  return myAxios({
    url: name + '/notes',
    method: 'post',
    data: note,
  });
}
