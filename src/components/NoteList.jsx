import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(null);

  function refreshNotes() {
    return getAllNotes(Constants.USER);
  }

  function handleDeleteClick(id) {
    deleteNote(Constants.USER, id)
      .then((response) => {
        setMessage({
          message: `Delete note ${id} successful`,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //TODO
  const handleDelete = (index, e) => {
    setData(data.filter((item, i) => i !== index));
  };

  function handleUpdateClick() {}

  useEffect(() => {
    //use Immediately Invoked Function Expression(IIFE)
    (async () => {
      // var res = await refreshNotes();
      let tableEntity = await refreshNotes(); //axiosresponse
      console.log(tableEntity);
      setNotes(tableEntity.data); //change promise to list
    })();
  }, []);

  return (
    <div className="container">
      <h3>All Notes</h3>
      {message && <div className="alert alert-success">{message}</div>}
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
                <td>{note.courseName}</td>
                <td>{note.description}</td>
                <td>
                  <button className="btn btn-primary">Update</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    //onClick={handleDeleteClick(note.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row">
        <button className="btn btn-success">Add</button>
      </div>
    </div>
  );
}
