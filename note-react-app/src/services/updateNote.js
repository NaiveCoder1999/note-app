import myAxios from './axios';

export function updateNote(name, id, note) {
  return myAxios({
    url: name + '/notes' + '/' + id,
    method: 'put',
    data: note,
  });
}
