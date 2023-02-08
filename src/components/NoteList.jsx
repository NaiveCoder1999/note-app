import React, { useState, useEffect } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export

export default function NoteList() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState(null);

  //async method
  // async function refreshNotes() {
  //   try {
  //     const response = await getAllCourses(Constants.USER);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  function refreshNotes() {
    return getAllNotes(Constants.USER);
  }

  // useEffect(() => {
  //   const responseData = refreshNotes(); //invalid, no value
  //   console.log(responseData.data);
  //   setCourses(responseData.data);
  // }, []);

  useEffect(() => {
    //use Immediately Invoked Function Expression(IIFE)
    (async () => {
      let res = await refreshNotes();
      console.log(res);
      setCourses(res.data); //change promise to list
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
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.courseName}</td>
                <td>{course.description}</td>
                <td>Delete</td>
                <td>Update</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div className="row">
        <button className="btn btn-success">Add</button>
      </div>
    </div>
  );
}
