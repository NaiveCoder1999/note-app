//import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import * as Constants from '../constants/config';
import { updateNote } from '../services/updateNote';
import { createNote } from '../services/createNote';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import NoteForm from './NoteForm.jsx';

import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [noteData, setNoteData] = useState({
    id: '-1',
    noteName: '',
    userName: '',
    description: '',
  }); //json object
  //const [title, setTitle] = useState(''); //string
  //const [description, setDescription] = useState(''); //string of initial note
  const [preview, setPreview] = useState(''); //string of html data
  const [text, setText] = useState(''); //string of testing independent editor component
  const { noteId } = useParams(); //noteId: "id"
  const navigate = useNavigate();
  const handleNoteInfo = useCallback(async (noteId) => {
    fetchNoteData(Constants.USER, noteId);
  }, []);

  async function fetchNoteData(userName, id) {
    //get note json object
    let noteEntity = await getSingleNote(userName, id); //axios response type
    console.log(noteEntity);
    let noteData = noteEntity.data;
    setNoteData(noteData); //set a json data
    //setTitle(noteData.noteName);
    //setDescription(noteData.description);
  }

  //function to handle update and handle create
  function handleSubmit(values) {
    //console.log(values);
    const { id, noteName, userName, description } = values;
    let noteid = noteId;
    let username = userName;
    let noteTitle = noteName;
    let noteDescription = description;

    if (noteid === `-1`) {
      // add function
      //string compare
      let note = {
        noteName: noteTitle,
        userName: Constants.USER,
        description: noteDescription,
      };

      createNote(Constants.USER, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    } else {
      let note = {
        //update function
        id: noteId,
        noteName: noteTitle,
        userName: username,
        description: noteDescription,
      };

      updateNote(username, noteId, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // by passing empty array at the end, this will always return the same function, compatible with removeEventListener
  const keyDownHandler = useCallback((keyEvent) => {
    //if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    if (keyEvent.keyCode === 13 && keyEvent.target.nodeName === 'INPUT') {
      keyEvent.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (noteId === `-1`) {
      return;
    }

    handleNoteInfo(noteId);

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleNoteInfo, keyDownHandler, noteId]);

  //TODO formik
  return (
    <div className="container">
      <h3>Note Details</h3>
      {/* <div>{noteData.id}</div>
      <div>{noteData.noteName}</div>
      <div>{noteData.description}</div> */}
      <p></p>
      <div className="container">
        <NoteForm
          initialValues={noteData}
          onSubmit={handleSubmit}
          //update the note description realtime, child to parent
          // onNoteChange={(value) => setPreview(value)}
        />
      </div>
      {/* <div className="ProseMirror"> {parse(preview)} </div> */}
    </div>
  );
}
