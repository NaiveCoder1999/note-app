// import logo from './logo.svg';
import './styles/App.css';
import React from 'react';
import NoteList from './components/NoteList';
import NoteInfo from './components/NoteInfo';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Logout from './components/Logout';
import Callback from './components/Callback';
import Test from './components/Test';

import { SuccessAlertMessageProvider } from './providers/SuccessAlertMessageContext';
import { AuthProvider } from './providers/AuthContext';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <AuthProvider>
        <SuccessAlertMessageProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/test" element={<Test />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/:noteId" element={<NoteInfo />} />
          </Routes>
        </SuccessAlertMessageProvider>
      </AuthProvider>
    </>
  );
}

export default App;
