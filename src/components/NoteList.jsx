import React, { useState, useEffect } from 'react';

export default function NoteList() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);

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
            <tr>
              <td scope="row">1</td>
              <td>Java</td>
              <td>Spring Boot and BootStrap</td>
              <td>Delete</td>
              <td>Update</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
