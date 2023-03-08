// import logo from './logo.svg';
import './styles/App.css';
import AxiosInvokeTest from './components/AxiosInvokeTest';
import React from 'react';
import NoteList from './components/NoteList';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NoteInfo from './components/NoteInfo';

function App() {
  return (
    <>
      <div className="container">
        <h1> Note User Application</h1>
      </div>

      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/notes/:noteId" element={<NoteInfo />} />
      </Routes>
    </>
  );
}

export default App;
