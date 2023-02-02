import React from 'react';
import { getAllCourses } from '../services/getAllCourses';
import NoteList from './NoteList';

const INSTRUCTOR = 'coder';

export default async function AxiosInvokeTest() {
  try {
    const response = await getAllCourses(INSTRUCTOR);
    console.log(response);
  } catch (error) {
    console.log(error);
  }  
}
