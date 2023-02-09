import React from 'react';
import AxiosInvokeTest from './AxiosInvokeTest';
import NoteList from './NoteList';

export default function UserApp() {
  return (
    <>
      <h1> Note User Application</h1>
      {/* <AxiosInvokeTest /> */}
      <div>
        <NoteList />
      </div>
    </>
  );
}
