import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';

export default function NoteInfo() {
  const [title, setTitle] = useState(null); //string
  const [description, setDescription] = useState(null); //string
  const { noteId } = useParams(); //noteId: "id"

  // TODO
  // Creating schema
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Description is required')
      .min(5, 'Enter at least 5 Characters in Description'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Enter at least 10 Characters in Description'),
  });

  async function getNoteInfo(userName, id) {
    //get note json object
    let noteEntity = await getSingleNote(userName, id); //axios response type
    //console.log(noteEntity);
    let noteData = noteEntity.data;
    setTitle(noteData.noteName);
    setDescription(noteData.description);
  }

  //TODO
  function handleSubmit(values) {
    let username = INSTRUCTOR;

    let course = {
      id: noteId,
      description: values.description,
      targetDate: values.targetDate,
    };

    if (this.state.id === -1) {
      CourseDataService.createCourse(username, course)
        .then(() => this.props.navigation('/courses'))
        .catch((error) => {
          //TODO better handle errors https://axios-http.com/docs/handling_errors
          return error;
        });
    } else {
      CourseDataService.updateCourse(username, id, course)
        .then(() => this.props.navigation('/courses'))
        .catch((error) => {
          //TODO better handle errors https://axios-http.com/docs/handling_errors
          return error;
        });
    }

    console.log(values);
  }

  function handleUpdate(id) {
    console.log('update ' + id);
    navigate(`/notes/${id}`);
  }

  useEffect(() => {
    if (noteId === `-1`) {
      return;
    }
    //console.log(noteId); //test for passing note id
    getNoteInfo(Constants.USER, noteId);
  });

  //TODO refer kuroko
  function validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = 'Enter a Description';
    } else if (values.description.length < 5) {
      errors.description = 'Enter at least 5 Characters in Description';
    }

    return errors;
  }

  return (
    <div className="container">
      <h3>Note Details</h3>
      <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div>
      <div className="App">
        <Tiptap />
      </div>
    </div>
  );
}
