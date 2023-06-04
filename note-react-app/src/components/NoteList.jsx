import React, { useState, useEffect, useCallback, useContext } from 'react';
import * as Constants from '../constants/config';
//import method of context
import { SuccessAlertMessageContext } from '../providers/SuccessAlertMessageContext';

import { getAllNotes, deleteNote } from '../services/noteService'; //non-default export
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

//for syntax highlight of code snippet
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  // const [deleteAlertMessage, setDeleteAlertMessage] = useState(''); //delete message alert
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [isPreviewModalOpen, togglePreviewModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null); //passed item object to control modal
  //create and update success message
  const { successAlertMessage, setSuccessAlertMessage } = useContext(
    SuccessAlertMessageContext
  );
  const handlePreviewModal = (item) => {
    setSelectedNote(item);
    togglePreviewModal(true);
  };

  const handleDeleteModal = (item) => {
    setSelectedNote(item);
    toggleDeleteModal(true);
  };

  const handleNotesList = useCallback(async () => {
    getNotesList(Constants.USER);
  }, []);

  const handleAlertMessage = useCallback(async () => {
    if (successAlertMessage) {
      setTimeout(() => {
        setSuccessAlertMessage(null);
      }, 5000);
    }
  }, [successAlertMessage, setSuccessAlertMessage]);

  async function getNotesList(userName) {
    // var res = await refreshNotes();
    let response = await getAllNotes(userName); //axios response type
    console.log(response);
    let tableData = response.data;
    setNotes(tableData); //change promise to list
  }

  function handleDelete(userName, noteId) {
    deleteNote(userName, noteId)
      .then((res) => {
        //IMPORTANT
        const del = notes.filter((note) => note.id !== noteId);
        setNotes(del);
        console.log('res', res);
        //setDeleteAlertMessage('Note ' + noteId + ' deleted successfully');
        setSuccessAlertMessage('Note ' + noteId + ' deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let navigate = useNavigate();
  function handleUpdate(noteId) {
    console.log('update ' + noteId);
    navigate(`/notes/${noteId}`);
  }

  //this.props.navigation("/courses/-1")
  function handleAdd() {
    navigate(`/notes/-1`);
  }

  useEffect(() => {
    // use empty depend array ->
    //fuction will only run once when the component will load initially
    handleNotesList();
    handleAlertMessage();
  }, [handleNotesList, handleAlertMessage]);

  // Parse the HTML content from the TiptapEditor into React components with syntax highlighting
  const renderContent = (htmlString) => {
    const parser = new DOMParser();
    // parse the HTML string into a DOM tree
    const html = parser.parseFromString(htmlString, 'text/html');
    // find all the <code> tagged strings in the DOM tree
    const codeTags = html.getElementsByTagName('code');
    if (codeTags.length === 0) {
      // If there are no code snippets,
      // render the entire string as a single non-code snippet
      return parse(htmlString);
    } else {
      const snippets = [];
      let lastIndex = -1; // location of last character of string already processed
      // allocate each snippet a unique index property, independent
      let codeSnippetIndex = 0;
      let snippetIndex = 0; // global index number for each snippet (code + non-code)
      //pre-process the <language-xxx> tag to <xxx> tag inside <code> tags for syntax rendering
      for (let i = 0; i < codeTags.length; i++) {
        const codeTag = codeTags[i];
        const classAttr = codeTag.getAttribute('class');
        const language =
          classAttr && classAttr.startsWith('language-')
            ? classAttr.replace('language-', '')
            : 'text';
        //notes content which is inside the <code> tag
        const code = codeTag.innerHTML;
        // find starting index of each code snippet by string.indexOf(searchvalue, startIndex)
        const codeSnippetStartIdx = htmlString.indexOf(
          codeTag.outerHTML,
          lastIndex + 1
        );
        // used to find the ending index of each code snippet
        // codeTag.outerHTML.length is the length of string contains two <code> tag
        const codeSnippetEndIdx =
          codeSnippetStartIdx + codeTag.outerHTML.length;
        //new <code> start index is greater than processed string's last index
        //so there is non-code snippet
        if (codeSnippetStartIdx > lastIndex) {
          snippets.push({
            type: 'nonCode',
            content: htmlString.substring(lastIndex + 1, codeSnippetStartIdx),
            index: snippetIndex++,
            codeIndex: -1,
          });
        }
        snippets.push({
          type: 'code',
          content: { language, code },
          index: snippetIndex++,
          codeIndex: codeSnippetIndex++,
        });
        //point to last last character in the code snippet,
        // not the character immediately after it
        lastIndex = codeSnippetEndIdx - 1;
      }
      // checks if we've reached the end of the input HTML string
      // it means there are no more <code> tags to process, only remains non-code string
      if (lastIndex < htmlString.length - 1) {
        snippets.push({
          type: 'nonCode',
          content: htmlString.substring(lastIndex + 1),
          index: snippetIndex++,
          codeIndex: -1,
        });
      }
      return snippets.map((snippet, index) => {
        if (snippet.type === 'code') {
          const { language, code } = snippet.content;
          return (
            <div key={snippet.index}>
              <SyntaxHighlighter
                // key={snippet.codeIndex}
                language={language}
                style={oneDark}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          );
        } else {
          return <div key={snippet.index}>{parse(snippet.content)}</div>;
        }
      });
    }
  };

  return (
    <>
      <div className="container">
        <h3>All Notes</h3>
        {successAlertMessage && (
          <div className="alert alert-success">{successAlertMessage}</div>
        )}

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.noteName}</td>
                  {/* <td>{note.description}</td> */}
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handlePreviewModal(note);
                        //console.log(note.id);
                      }}
                    >
                      Preview
                    </button>
                  </td>
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
                      onClick={() => handleDeleteModal(note)} //must add bracket before function name
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {selectedNote && (
              <Modal
                centered
                size="xl"
                // fullscreen={'md-down'}
                show={isPreviewModalOpen && selectedNote !== null}
                onHide={() => {
                  togglePreviewModal(false);
                  setSelectedNote(null);
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{selectedNote.noteName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {renderContent(selectedNote.description)}
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      togglePreviewModal(false);
                      setSelectedNote(null);
                    }}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}

            {selectedNote && (
              <div className="position-static d-block p-4 py-md-5">
                <Modal
                  centered
                  show={isDeleteModalOpen}
                  onHide={() => {
                    toggleDeleteModal(false);
                    setSelectedNote(null);
                  }}
                  contentClassName="rounded-4 shadow"
                >
                  <Modal.Header closeButton className="border-bottom-0">
                    <Modal.Title>
                      <h3>Delete Confirmation</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="py-0">
                    <p>Do you really want to delete this note?</p>
                    <p>This process cannot be undone.</p>
                  </Modal.Body>

                  <Modal.Footer className="flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleDelete(Constants.USER, selectedNote.id);
                        toggleDeleteModal(false);
                        setSelectedNote(null);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        toggleDeleteModal(false);
                        setSelectedNote(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            )}
          </table>
        </div>
        <div className="container">
          <button className="btn btn-success" onClick={() => handleAdd()}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}
