import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function NoteInfo() {
  const [notes, setNotes] = useState([]);

  const [id, setId] = useState(0); //int
  const [description, setDescription] = useState(null); //string
  async function getNoteInfo(userName) {
    // var res = await refreshNotes();
    let tableEntity = await getAllNotes(userName); //axios response type
    console.log(tableEntity);
    let tableData = tableEntity.data;
    setNotes(tableData); //change promise to list
  }

  function handleUpdate(id) {
    console.log('update ' + id);
    navigate(`/notes/${id}`);
  }

  useEffect(() => {
    // empty bracket it indicates the function will only run once when the component will load initially
    //getNotesData(Constants.USER);
  }, []);

  return (
    <div className="container">
      <h3>Note Details</h3>
    </div>
  );
}
