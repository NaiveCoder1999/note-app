import React from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import NoteList from './NoteList';

const INSTRUCTOR = Constants.USER;

export default async function AxiosInvokeTest() {
  try {
    const response = await getAllNotes(INSTRUCTOR);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
