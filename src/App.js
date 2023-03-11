// import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import NoteList from './components/NoteList';
import NoteInfo from './components/NoteInfo';
import { SuccessMessageProvider } from './providers/SuccessMessageContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      <SuccessMessageProvider>
        <div className="container">
          <h1> Note User Application</h1>
        </div>

        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteInfo />} />
        </Routes>
      </SuccessMessageProvider>
    </>
  );
}

export default App;
