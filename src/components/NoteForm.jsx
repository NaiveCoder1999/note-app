import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import * as Constants from '../constants/config';
import { getAllNotes } from '../services/getAllNotes'; //non-default export
import { deleteNote } from '../services/deleteNote';
import { useFormik, Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams } from 'react-router-dom';
import { getSingleNote } from '../services/getSingleNote';
import { generateHTML } from '@tiptap/html';

import parser from 'html-react-parser';
import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';


//TODO refer kuroko
// Creating schema
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Note title is required')
    .min(5, 'Enter at least 5 Characters in title'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Enter at least 10 Characters in Description'),
});

//creating formik
//user is CONSTANT
//enableReinitialize={true} is vital
const NoteForm = ({ id, title, description, onSubmit }) => {
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{ id, title, description }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => ( //handleSubmit is Formil API
        <Form onSubmit={handleSubmit}>
          <label htmlFor="id">ID</label>
          <Field id="id" name="id" disabled />

          <label htmlFor="title">Title</label>
          <Field id="title" name="title" />

          <label htmlFor="description">Description</label>
          <div className="Tiptap">
            <Tiptap
              initialValues={values.description}
              onChange={(value) => setFieldValue('description', value)} //set description as get HTML
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

NoteForm.propTypes = {
  user: PropTypes.any,
  id: PropTypes.any,
  description: PropTypes.any,
  title: PropTypes.any,
  onSubmit: PropTypes.any,
};

export default NoteForm;
