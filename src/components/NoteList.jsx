import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(null);

  function refreshNotes() {
    return getAllNotes(Constants.USER);
  }

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
                  <button
                    data-testid="updateButton"
                    className="btn btn-success"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    data-testid="deleteButton"
                    className="btn btn-warning"
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
