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
import Tiptap from './Tiptap.jsx';

import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [noteData, setNoteData] = useState({
    id: '',
    noteName: '',
    userName: '',
    description: '',
  }); //json object
  //const [title, setTitle] = useState(''); //string
  //const [description, setDescription] = useState(''); //string of initial note
  const [preview, setPreview] = useState(''); //string of html data
  //const [text, setText] = useState(''); //string of testing independent editor component
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

  async function handleSubmit(values) {
    console.log(values);
    const { id, noteName, userName, description } = values;
    let username = Constants.USER;
    let noteTitle = noteName;
    let noteDeescription = description;

    if (noteId === `-1`) {
      // add function
      //string compare
      let note = {
        noteName: noteTitle,
        userName: username,
        description: noteDeescription,
      };

      createNote(username, note)
        .then(console.log(res.data))
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
        description: noteDeescription,
      };

      updateNote(username, noteId, note)
        .then(console.log(res.data))
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    }
  }
  // function handleSubmit() {
  //   let username = Constants.USER;

  //   if (noteId === `-1`) {
  //     //string compare
  //     let note = {
  //       noteName: title,
  //       userName: username,
  //       description: preview,
  //     };

  //     createNote(username, note)
  //       .then(() => navigate('/notes'))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     let note = {
  //       id: noteId,
  //       noteName: title,
  //       userName: username,
  //       description: preview,
  //     };

  //     updateNote(username, noteId, note)
  //       .then(() => navigate('/notes'))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  //   //console.log(values);
  // }

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
      {/* <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div> */}
      <div>{noteData.id}</div>
      <div>{noteData.noteName}</div>
      <div>{noteData.description}</div>
      <p></p>
      <div className="container">
        <NoteForm
          // id={noteId}
          // title={title}
          // description={description}
          initialValues={noteData}
          onSubmit={handleSubmit}
          onNoteChange={setPreview} //update the note description realtime, child to parent
        />
      </div>

      {/* <p>For Testing:</p>
      <div className="Tiptap">
        <Tiptap
          initialContent={description}
          onChange={setPreview} //onchange function to pass HTML description to Note info component
          getHTML={setText}
        />
      </div> */}
      {/*
      <div>HTML render: {preview} </div>
      <div className="ProseMirror"> {parser(preview)} </div>
      <button className="btn btn-success">Save</button> */}
    </div>
  );
}
