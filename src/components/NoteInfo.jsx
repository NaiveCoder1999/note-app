import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function NoteInfo() {
  const [notes, setNotes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  //TODO update function
  async function getNotesData(userName) {
    // var res = await refreshNotes();
    let tableEntity = await getAllNotes(userName); //axios response type
    console.log(tableEntity);
    let tableData = tableEntity.data;
    setNotes(tableData); //change promise to list
  }

  function handleDelete(userName, id) {
    deleteNote(userName, id)
      .then((res) => {
        //IMPORTANT
        const del = notes.filter((note) => note.id !== id);
        setNotes(del);
        console.log('res', res);
        setAlertMessage({
          message: `Delete note ${id} successful`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdate() {}

  useEffect(() => {
    // empty bracket it indicates the function will only run once when the component will load initially
    getNotesData(Constants.USER);
  }, []);

  return (
    <div className="container">
      <h3>Note Details</h3>
    </div>
  );
}
