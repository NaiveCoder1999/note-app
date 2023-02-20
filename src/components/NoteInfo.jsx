import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';

export default function NoteInfo() {
  const [description, setDescription] = useState(null); //string
  let { noteId } = useParams(); //userId: "id"

  async function getNoteInfo(userName) {
    //get id and description object
    //TODO
    // var res = await refreshNotes();

    let tableEntity = await getAllNotes(userName); //axios response type
    console.log(tableEntity);
    let tableData = tableEntity.data;
  }

  function handleUpdate(id) {
    console.log('update ' + id);
    navigate(`/notes/${id}`);
  }

  useEffect(() => {
    console.log(noteId); //test for passing note id
    // empty bracket it indicates the function will only run once when the component will load initially
    //getNotesData(Constants.USER);
  }, [noteId]);

  return (
    <div className="container">
      <h3>Note Details</h3>
    </div>
  );
}
