import React, { useState, useEffect, useMemo } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';
import Bold from '@tiptap/extension-bold';
// import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import parser from 'html-react-parser';
import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [title, setTitle] = useState(''); //string
  const [description, setDescription] = useState(''); //string of note
  const [preview, setPreview] = useState(''); //string of html data
  const [text, setText] = useState(''); //string of json data
  const { noteId } = useParams(); //noteId: "id"

  async function getNoteInfo(userName, id) {
    //get note json object
    let noteEntity = await getSingleNote(userName, id); //axios response type
    //console.log(noteEntity);
    let noteData = noteEntity.data;
    setTitle(noteData.noteName);
    setDescription(noteData.description);
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
  //TODO
  function handleSubmit() {
    let username = Constants.USER;

    let course = {
      id: noteId,
      noteName: preview,
      userName: username,
      description: description,
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

  // const noteJson = text;
  // const output = useMemo(() => {
  //   return generateHTML(noteJson, [
  //     Document,
  //     Paragraph,
  //     Text,
  //     Bold,
  //     // other extensions …
  //   ]);
  // }, [noteJson]);

  return (
    <div className="container">
      <h3>Note Details</h3>
      <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div>

      <div className="Tiptap">
        <Tiptap
          initialValue={description}
          getPreview={setPreview}
          getText={setText}
        />
        <p></p>
        <button className="btn btn-success">Save</button>
      </div>
      <div className="ProseMirror"> {parser(preview)} </div>

      <div>{preview} </div>
      <p></p>
      <div>{text} </div>
    </div>
  );
}
