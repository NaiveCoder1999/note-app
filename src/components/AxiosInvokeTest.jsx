import React from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import NoteList from './NoteList';

const INSTRUCTOR = Constants.USER;

export default function AxiosInvokeTest() {
  const response = deleteNote(INSTRUCTOR, 10001)
    .then(console.log(response.data))
    .catch(console.log(error));
}
