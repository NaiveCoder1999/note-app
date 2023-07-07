import React, { useState, useEffect, useCallback, useContext } from 'react';
//import method of context
import { AlertMessageContext } from '../providers/AlertMessageContext';
import { useAuth } from '../providers/AuthContext';
import { getAllNotes, deleteNote } from '../services/noteService'; //non-default export
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Pagination, PageItem, Form } from 'react-bootstrap';

//for syntax highlight of code snippet
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/Searchbox.css';
export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]); //filtered notes for searchbox
  const [currentNotes, setCurrentNotes] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [notesPerPage] = useState(5); // control pagination number
  const [searchTerm, setSearchTerm] = useState(''); //searchbox's input text

  //create and update success message
  const { alertMessage, setAlertMessage } = useContext(AlertMessageContext);
  const [selectedNote, setSelectedNote] = useState(null); //passed item object to control modal
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [isPreviewModalOpen, togglePreviewModal] = useState(false);
  const { loginUserName } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const handleAlertMessage = useCallback(async () => {
    if (alertMessage) {
      setTimeout(() => {
        setAlertMessage(null);
      }, 5000);
    }
  }, [alertMessage, setAlertMessage]);

  async function getNotesList(userName) {
    try {
      if (userName !== null && userName !== undefined) {
        let response = await getAllNotes(userName); //axios response type
        //console.log(response);
        setNotes(response.data); //change promise to list}
        setFilteredNotes(response.data); // prerfill the searchbox data
        setError(null);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error load note list:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const handleNotesList = useCallback(async () => {
    getNotesList(loginUserName);
  }, [loginUserName]);

  //this.props.navigation("/courses/-1")
  function handleAdd() {
    navigate(`/notes/-1`);
  }

  function handleUpdate(noteId) {
    console.log('update ' + noteId);
    navigate(`/notes/${noteId}`);
  }

  function handleDelete(userName, noteId) {
    deleteNote(userName, noteId)
      .then((res) => {
        //IMPORTANT
        const del = notes.filter((note) => note.id !== noteId);
        setNotes(del);
        console.log('res', res);
        //setDeleteAlertMessage('Note ' + noteId + ' deleted successfully');
        setAlertMessage('Note ' + noteId + ' deleted successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handlePreviewModal = (item) => {
    setSelectedNote(item);
    togglePreviewModal(true);
  };

  const handleDeleteModal = (item) => {
    setSelectedNote(item);
    toggleDeleteModal(true);
  };

  // Parse the HTML content from the TiptapEditor into React components with syntax highlighting
  const handleRenderContent = (htmlString) => {
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

  // update status of notes and alert messages
  useEffect(() => {
    handleNotesList();
    //handle and set filter notes list after search
    handleAlertMessage();
    // auto refresh is managed by AuthContext
  }, [handleNotesList, handleAlertMessage]);

  // update status of search box's filtered notes
  useEffect(() => {
    // Filter notes based on searchTerm
    const filterNotes = () => {
      const filtered = notes.filter(
        (note) =>
          note.noteName.toLowerCase().includes(searchTerm) ||
          note.description.toLowerCase().includes(searchTerm)
      );
      setFilteredNotes(filtered);
    };

    filterNotes();
  }, [searchTerm, notes]);

  // pagination refresh
  useEffect(() => {
    const updateCurrentNotes = () => {
      const indexOfLastNote = currentPageNumber * notesPerPage;
      const indexOfFirstNote = indexOfLastNote - notesPerPage;
      const currentNotesOnPage = filteredNotes.slice(
        indexOfFirstNote,
        indexOfLastNote
      );
      setCurrentNotes(currentNotesOnPage);
    };
    updateCurrentNotes();
  }, [filteredNotes, currentPageNumber, notesPerPage]);

  // define pagination items
  let paginationItems = [];
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  paginationItems.push(
    <Pagination.First
      key={-4}
      onClick={() => setCurrentPageNumber(1)}
      disabled={currentPageNumber === 1}
    />
  );
  paginationItems.push(
    <Pagination.Prev
      key={-3}
      onClick={() =>
        setCurrentPageNumber((CurrentPageNumer) =>
          Math.max(CurrentPageNumer - 1, 1)
        )
      }
      disabled={currentPageNumber === 1}
    />
  );
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPageNumber}
        onClick={() => setCurrentPageNumber(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  paginationItems.push(
    <Pagination.Next
      key={-2}
      onClick={() =>
        setCurrentPageNumber((currentPageNumber) =>
          Math.min(currentPageNumber + 1, totalPages)
        )
      }
      disabled={currentPageNumber === totalPages}
    />
  );
  paginationItems.push(
    <Pagination.Last
      key={-1}
      onClick={() => setCurrentPageNumber(totalPages)}
      disabled={currentPageNumber === totalPages}
    />
  );

  if (loading) {
    return (
      <div className="container">
        <div className="container col-md-12">
          <h2>Notes loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="container col-md-12">
          <h5>Problem fetching the notes - {error}</h5>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* React fragment */}
      <div className="container">
        {alertMessage && (
          <div className="alert alert-success">{alertMessage}</div>
        )}
        <div className="container">
          <h3>All Notes</h3>
          <div className="search-container">
            <Form.Control
              type="search"
              // className="form-control me-3 text-bg"
              placeholder="Search by Title or Content.."
              value={searchTerm}
              onChange={(e) => {
                const lowerCaseSearchTerm = e.target.value.toLowerCase(); //set search term to lower case for searching
                setSearchTerm(lowerCaseSearchTerm); // ensures that the pagination resets to the first page when a new search is performed
                setCurrentPageNumber(1);
              }}
              aria-label="Search"
              style={{
                width: '19rem',
                background: '#F0F0F0',
                border: 'none',
                padding: '0.5rem',
              }}
            />
          </div>
        </div>

        {/* {loading && (
          <div className="container col-md-12">
            <h5>Notes loading...</h5>
          </div>
        )}

        {error && (
          <div className="container col-md-12">
            <h5>Problem fetching the notes - ${error}</h5>
          </div>
        )} */}

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
              {currentNotes.map((note) => (
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
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-success" onClick={() => handleAdd()}>
              Add
            </button>
            {currentNotes.length > 0 && (
              <Pagination>{paginationItems}</Pagination>
            )}
          </div>
        </div>

        <div>
          {selectedNote && (
            <Modal
              centered
              size="xl"
              // fullscreen={'md-down'}
              show={isPreviewModalOpen && selectedNote !== null}
              scrollable={true}
              onHide={() => {
                togglePreviewModal(false);
                setSelectedNote(null);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>{selectedNote.noteName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {handleRenderContent(selectedNote.description)}
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
        </div>

        <div>
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
                      handleDelete(loginUserName, selectedNote.id);
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
        </div>
      </div>
    </>
  );
}
