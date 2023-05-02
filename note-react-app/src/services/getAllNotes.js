import myAxios from './axios';

//async on get method
export async function getAllNotes(name) {
  return myAxios({
    url: name + '/notes',
    method: 'get',
  });
}
