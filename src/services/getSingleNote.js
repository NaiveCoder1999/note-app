import myAxios from './axios';

//async on get method
export async function getSingleNote(name, id) {
  return myAxios({
    url: name + '/notes' + '/' + id,
    method: 'get',
  });
}
