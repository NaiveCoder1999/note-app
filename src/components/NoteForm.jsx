import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo } from 'react';
import * as Constants from '../constants/config';

import { Formik, Form, Field, ErrorMessage } from 'formik';

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
      {(
        { values, setFieldValue, handleSubmit } //handleSubmit is Formil API
      ) => (
        <Form onSubmit={handleSubmit} className="Tiptap">
          <ErrorMessage
            name="description"
            component="div"
            className="alert alert-warning"
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
                onChange={(value) => setFieldValue('description', value)} //set description as get HTML
              />
            </div>
          </fieldset>
          <p></p>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
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
