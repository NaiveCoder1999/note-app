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

import { AlertMessageProvider } from './providers/AlertMessageContext';
import { AuthProvider } from './providers/AuthContext';
import { ProtectedRoute } from './providers/ProtectedRoute';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <AuthProvider>
        <AlertMessageProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/callback" element={<Callback />} />
            {/* <Route path="/test" element={<Test />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/:noteId" element={<NoteInfo />} /> */}
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <NoteList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:noteId"
              element={
                <ProtectedRoute>
                  <NoteInfo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AlertMessageProvider>
      </AuthProvider>
    </>
  );
}

export default App;
