import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { updateNote } from '../services/updateNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';
import NoteForm from './NoteForm.jsx';

import parser from 'html-react-parser';
import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';

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
        return error;
      });
  } else {
    CourseDataService.updateCourse(username, id, course)
      .then(() => this.props.navigation('/courses'))
      .catch((error) => {
        return error;
      });
  }

  console.log(values);
}
//TODO refer kuroko

export default function NoteInfo() {
  const [title, setTitle] = useState(''); //string
  const [description, setDescription] = useState(''); //string of note
  const [preview, setPreview] = useState(''); //string of html data
  //const [text, setText] = useState(''); //string of json data
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

    getNoteInfo(Constants.USER, noteId);
  });

  //TODO formik
  return (
    <div className="container">
      <h3>Note Details</h3>
      {/* <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div> */}
      <p></p>
      <div className="container">
        <NoteForm
          id={noteId}
          title={title}
          description={description}
          onSubmit={handleSubmit}
        />
      </div>

      {/* <div className="Tiptap">
        <Tiptap
          initialValues={description}
          onChange={setPreview} //onchange function to pass HTML description to Note info component
        />
      </div>
      <div>HTML render: {preview} </div>
      <div className="ProseMirror"> {parser(preview)} </div>
      <button className="btn btn-success">Save</button> */}
    </div>
  );
}
