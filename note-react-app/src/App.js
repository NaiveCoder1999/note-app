// import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import NoteList from './components/NoteList';
import NoteInfo from './components/NoteInfo';
import { SuccessAlertMessageProvider } from './providers/SuccessAlertMessageContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <SuccessAlertMessageProvider>
        <div className="container">
          <h1> Note User Application</h1>
        </div>

        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteInfo />} />
        </Routes>
      </SuccessAlertMessageProvider>
    </>
  );
}

export default App;
