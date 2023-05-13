// import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import NoteList from './components/NoteList';
import NoteInfo from './components/NoteInfo';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

import { SuccessAlertMessageProvider } from './providers/SuccessAlertMessageContext';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <SuccessAlertMessageProvider>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<NoteList />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteInfo />} />
        </Routes>

      </SuccessAlertMessageProvider>
    </>
  );
}

export default App;
