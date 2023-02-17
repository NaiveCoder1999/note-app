import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { useNavigate } from 'react-router-dom';
export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  let navigate = useNavigate();
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

  function handleUpdate(id) {
    console.log('update ' + id);
    navigate(`/notes/${id}`);
  }

  useEffect(() => {
    // empty bracket it indicates the function will only run once when the component will load initially
    getNotesData(Constants.USER);
  }, []);

  return (
    <div className="container">
      <h3>All Notes</h3>
      {alertMessage && (
        <div className="alert alert-success">{alertMessage.message}</div>
      )}
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Notes</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>{note.id}</td>
                <td>{note.noteName}</td>
                <td>{note.description}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleUpdate(note.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(Constants.USER, note.id)} //must add bracket before function name
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        <button className="btn btn-success">Add</button>
      </div>
    </div>
  );
}
