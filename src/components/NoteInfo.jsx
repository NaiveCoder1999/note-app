import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Constants from '../constants/config';
import { updateNote } from '../services/updateNote';
import { createNote } from '../services/createNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';
import NoteForm from './NoteForm.jsx';

import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [noteData, setNoteData] = useState({
    id: '',
    noteName: '',
    description: '',
  }); //json
  const [title, setTitle] = useState(''); //string
  const [description, setDescription] = useState(''); //string of initial note
  const [preview, setPreview] = useState(''); //string of html data
  //const [text, setText] = useState(''); //string of json data
  const { noteId } = useParams(); //noteId: "id"

  const handleNoteInfo = useCallback(async () => {
    getNoteInfo(Constants.USER, noteId);
  }, [noteId]);
  
  async function getNoteInfo(userName, id) {
    //get note json object
    let noteEntity = await getSingleNote(userName, id); //axios response type
    console.log(noteEntity);
    let noteData = noteEntity.data;
    setNoteData(noteData); //set a json data
    setTitle(noteData.noteName);
    setDescription(noteData.description);
  }

  //function to handle update and handle create
  let navigate = useNavigate();
  function handleSubmit() {
    let username = Constants.USER;

    if (noteId === `-1`) {
      //string compare
      let note = {
        noteName: title,
        userName: username,
        description: preview,
      };

      createNote(username, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    } else {
      let note = {
        id: noteId,
        noteName: title,
        userName: username,
        description: preview,
      };

      updateNote(username, noteId, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    }
    //console.log(values);
  }

  useEffect(() => {
    if (noteId === `-1`) {
      return;
    }

    handleNoteInfo();
  }, [handleNoteInfo, noteId]);

  //TODO formik
  return (
    <div className="container">
      <h3>Note Details</h3>
      {/* <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div> */}
      <div>{noteData.id}</div>
      <div>{noteData.noteName}</div>
      <div>{noteData.description}</div>
      <p></p>
      <div className="container">
        <NoteForm
          id={noteId}
          title={title}
          description={description}
          // id={noteData.id}
          // title={noteData.noteName}
          // description={noteData.description}
          onSubmit={handleSubmit}
          onNoteChange={setPreview} //update the note description realtime
        />
      </div>

      {/* <p>For Testing:</p>
      <div className="Tiptap">
        <Tiptap
          initialValues={description}
          onChange={setPreview} //onchange function to pass HTML description to Note info component
          getHTML={setPlacehoder}
        />
      </div> */}
      {/*
      <div>HTML render: {preview} </div>
      <div className="ProseMirror"> {parser(preview)} </div>
      <button className="btn btn-success">Save</button> */}
    </div>
  );
}
