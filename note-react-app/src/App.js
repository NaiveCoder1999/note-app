// import logo from './logo.svg';
import './styles/App.css';
import React, { Suspense, lazy } from 'react';
import NoteList from './components/NoteList';
import NoteInfo from './components/NoteInfo';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Logout from './components/Logout';
import Callback from './components/Callback';
// import Test from './components/Test';
import Loading from './components/Loading';

import { AlertMessageProvider } from './providers/AlertMessageContext';
import { AuthProvider } from './providers/AuthContext';
import { ProtectedRoute } from './providers/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
// import Footer from './components/Footer';
import Profile from './components/Profile';

// lazy loading feature
// const NoteList = React.lazy(() => import('./components/NoteList'));
// const NoteInfo = React.lazy(() => import('./components/NoteInfo'));

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
            {/* <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <Test />
                </ProtectedRoute>
              }
            /> */}
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
                  {/* <Suspense fallback={<Loading />}>
                    <NoteList />
                  </Suspense> */}
                  <NoteList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes/:noteId"
              element={
                <ProtectedRoute>
                  {/* <Suspense fallback={<Loading />}>
                    <NoteInfo />
                  </Suspense> */}
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
