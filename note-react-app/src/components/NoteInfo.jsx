//import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { getSingleNote, createNote, updateNote } from '../services/noteService';
import { useParams, useNavigate } from 'react-router-dom';
import NoteForm from './NoteForm.jsx';
//import method of context
import { AlertMessageContext } from '../providers/AlertMessageContext';
import { useAuth } from '../providers/AuthContext';
import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [noteData, setNoteData] = useState({
    id: '-1',
    noteName: '',
    userName: '',
    description: '',
  }); //json object
  const { alertMessage, setAlertMessage } = useContext(AlertMessageContext);
  const { loginUserName } = useAuth();
  const { noteId } = useParams(); //noteId: "id"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNoteInfo = useCallback(
    async (noteId) => {
      fetchNoteData(loginUserName, noteId);
    },
    [loginUserName]
  );

  async function fetchNoteData(userName, id) {
    try {
      if (id === `-1`) {
        let noteData = {
          id: '-1',
          noteName: '',
          userName: '',
          description: '',
        };
        setNoteData(noteData); //set a json data
        setError(null);
      } else if (
        userName !== null &&
        userName !== undefined &&
        id !== null &&
        id !== undefined
      ) {
        //get note json object
        let noteEntity = await getSingleNote(userName, id);
        console.log(noteEntity);
        setNoteData(noteEntity.data); //set a json data
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetch note data:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  //function to handle update and handle create
  function handleSubmit(values) {
    //console.log(values);
    const { id, noteName, userName, description } = values;
    let noteid = noteId;
    let noteUsername = userName;
    let noteTitle = noteName;
    let noteDescription = description;

    if (noteid === `-1`) {
      //create a new note with current user
      // add function
      let note = {
        noteName: noteTitle,
        userName: loginUserName,
        description: noteDescription,
      };

      createNote(loginUserName, note)
        .then((res) => {
          console.log('res', res);
          setAlertMessage('Note created successfully');
          navigate('/notes');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let note = {
        //update function
        id: noteId,
        noteName: noteTitle,
        userName: noteUsername,
        description: noteDescription,
      };

      updateNote(noteUsername, noteId, note)
        .then((res) => {
          console.log('res', res);
          setAlertMessage('Note ' + noteId + ' updated successfully');
          navigate('/notes');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // by passing empty array at the end, this will always return the same function,
  // compatible with removeEventListener
  const keyDownHandler = useCallback((keyEvent) => {
    //if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    if (keyEvent.keyCode === 13 && keyEvent.target.nodeName === 'INPUT') {
      keyEvent.preventDefault();
    }
  }, []);

  useEffect(() => {
    handleNoteInfo(noteId);

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleNoteInfo, keyDownHandler, noteId]);

  if (loading) {
    return (
      <div className="container">
        <div className="container col-md-12">
          <h2>Note is loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="container col-md-12">
          <h5>Problem fetching the note - {error}</h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h3>Note Details</h3>
        <p></p>
        <div className="container">
          <NoteForm initialValues={noteData} onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
