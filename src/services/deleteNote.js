import myAxios from './axios';

export function deleteNote(name, id) {
  return myAxios({
    url: name + '/notes' + '/' + id,
    method: 'delete',
  });
}
