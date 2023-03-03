import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import * as Constants from '../constants/config';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';

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
const NoteForm = ({ id, title, description, onSubmit, onNoteChange }) => {
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={{ id, title, description }}
      onSubmit={onSubmit}
    >
      {(
        //props' methods
        { values, setFieldValue, dirty, isSubmitting, handleSubmit } //handleSubmit is Formil API
      ) => (
        <Form onSubmit={handleSubmit} className="Tiptap">
          <ErrorMessage
            name="title"
            component="div"
            className="alert alert-danger"
            role="alert"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="alert alert-danger"
            role="alert"
          />
          <fieldset className="form-group">
            <label htmlFor="id">ID</label>
            <Field id="id" className="form-control" name="id" disabled />
          </fieldset>
          <p></p>
          <fieldset className="form-group">
            <label htmlFor="title">Title</label>
            <Field id="title" className="form-control" name="title" />
          </fieldset>
          <p></p>
          <fieldset className="form-group">
            <label htmlFor="description">Description</label>
            <div className="Tiptap">
              <Tiptap
                initialValues={values.description}
                onChange={(value) => {
                  setFieldValue('description', value); //set formik internal values
                }}
                getHTML={onNoteChange} //set description as get HTML
              />
            </div>
          </fieldset>
          <p></p>

          <button
            className="btn btn-success"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <p>formik values {JSON.stringify(values.description)}</p>
        </Form>
      )}
    </Formik>
  );
};

NoteForm.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  onNoteChange: PropTypes.func,
};

export default NoteForm;
