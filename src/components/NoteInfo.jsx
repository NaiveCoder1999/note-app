import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import * as Constants from '../constants/config';
import { updateNote } from '../services/updateNote';
import { createNote } from '../services/createNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';
import NoteForm from './NoteForm.jsx';

import parser from 'html-react-parser';
import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [title, setTitle] = useState(''); //string
  const [description, setDescription] = useState(''); //string of initial note
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

  //function to handle update and handle create
  //TODO
  let navigate = useNavigate();
  function handleSubmit() {
    let username = Constants.USER;

    let note = {
      id: noteId,
      noteName: title,
      userName: username,
      description: preview,
    };

    navigate(`/notes/${noteId}`);

    if (noteId === -1) {
      createNote(username, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    } else {
      updateNote(username, noteId, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    }

    //console.log(values);
  }
  //TODO refer kuroko

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
          onNoteChange={setPreview} //update the note description realtime
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
