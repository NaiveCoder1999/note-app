import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';

export default function NoteInfo() {
  const [title, setTitle] = useState(null); //string
  const [description, setDescription] = useState(null); //string
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
      // 404 not found TODO
      return;
    }
    //console.log(noteId); //test for passing note id
    getNoteInfo(Constants.USER, noteId);
  });

  return (
    <div className="container">
      <h3>Note Details</h3>
      <div>{noteId}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );
}
