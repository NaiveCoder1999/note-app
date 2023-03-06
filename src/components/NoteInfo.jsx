import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import * as Constants from '../constants/config';
import { updateNote } from '../services/updateNote';
import { createNote } from '../services/createNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';
import NoteForm from './NoteForm.jsx';
import Tiptap from './Tiptap.jsx';
import parse from 'html-react-parser';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import '../styles/TiptapStyles.scss';

export default function NoteInfo() {
  const [noteData, setNoteData] = useState({
    id: '-1',
    noteName: '',
    userName: '',
    description: '',
  }); //json object
  //const [title, setTitle] = useState(''); //string
  //const [description, setDescription] = useState(''); //string of initial note
  const [preview, setPreview] = useState(''); //string of html data
  const [text, setText] = useState(''); //string of testing independent editor component
  const { noteId } = useParams(); //noteId: "id"
  const navigate = useNavigate();
  const handleNoteInfo = useCallback(async (noteId) => {
    fetchNoteData(Constants.USER, noteId);
  }, []);

  async function fetchNoteData(userName, id) {
    //get note json object
    let noteEntity = await getSingleNote(userName, id); //axios response type
    console.log(noteEntity);
    let noteData = noteEntity.data;
    setNoteData(noteData); //set a json data
    //setTitle(noteData.noteName);
    //setDescription(noteData.description);
  }

  //function to handle update and handle create
  function handleSubmit(values) {
    //console.log(values);
    const { id, noteName, userName, description } = values;
    let noteid = noteId;
    let username = userName;
    let noteTitle = noteName;
    let noteDescription = description;

    if (noteid === `-1`) {
      // add function
      //string compare
      let note = {
        noteName: noteTitle,
        userName: Constants.USER,
        description: noteDescription,
      };

      createNote(Constants.USER, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    } else {
      let note = {
        //update function
        id: noteId,
        noteName: noteTitle,
        userName: username,
        description: noteDescription,
      };

      updateNote(username, noteId, note)
        .then(() => navigate('/notes'))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // by passing empty array at the end, this will always return the same function, compatible with removeEventListener
  const keyDownHandler = useCallback((keyEvent) => {
    //if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    if (keyEvent.keyCode === 13 && keyEvent.target.nodeName === 'INPUT') {
      keyEvent.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (noteId === `-1`) {
      return;
    }

    handleNoteInfo(noteId);

    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [handleNoteInfo, keyDownHandler, noteId]);

  // Parse the HTML content from the TiptapEditor into React components with syntax highlighting
  const renderContent = (htmlData) => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlData, 'text/html');
    const codeTags = html.getElementsByTagName('code');

    const snippets = Array.from(codeTags).map((codeTag, index) => {
      const language = codeTag.getAttribute('data-language');
      const code = codeTag.innerHTML;
      const snippetIndex = html.innerHTML.indexOf(codeTag.outerHTML);
      return { type: 'code', content: { language, code }, index: snippetIndex };
    });

    const nonCodeTags = html.querySelectorAll(':not(code)');

    const nonCodeSnippets = Array.from(nonCodeTags).map((tag, index) => {
      const snippetIndex = html.innerHTML.indexOf(tag.outerHTML);
      return { type: 'nonCode', content: tag.outerHTML, index: snippetIndex };
    });

    const allSnippets = [...snippets, ...nonCodeSnippets].sort(
      (a, b) => a.index - b.index
    );

    return allSnippets.map((snippet, index) => {
      if (snippet.type === 'code') {
        const { language, code } = snippet.content;
        return (
          <SyntaxHighlighter key={index} language={language} style={vs}>
            {code}
          </SyntaxHighlighter>
        );
      } else {
        const { content } = snippet;
        return parse(content);
      }
    });
  };
  //TODO formik
  return (
    <div className="container">
      <h3>Note Details</h3>
      <div>{noteData.id}</div>
      <div>{noteData.noteName}</div>
      <div>{noteData.description}</div>
      <p></p>
      <div className="container">
        <NoteForm
          initialValues={noteData}
          onSubmit={handleSubmit}
          onNoteChange={(value) => setPreview(value)} //update the note description realtime, child to parent
        />
      </div>

      {/* <p>For Testing:</p>
      <div className="Tiptap">
        <Tiptap
          initialContent={noteData.description}
          onChange={setPreview} //onchange function to pass HTML description to Note info component
          getHTML={setText}
        />
      </div> */}

      {/* <div>HTML render: {preview} </div> */}
      <div className="ProseMirror"> {parse(preview)} </div>
    </div>
  );
}
