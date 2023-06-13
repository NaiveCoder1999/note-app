import PropTypes from 'prop-types';
import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import Tiptap from './Tiptap.jsx';
import '../styles/TiptapStyles.scss';

// Creating schema
//name must be in correspodence with formik id and name
const validationSchema = Yup.object().shape({
  noteName: Yup.string()
    .required('Note title is required')
    .min(5, 'Enter at least 5 Characters in title'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Enter at least 10 Characters in Description'),
});

//function to handle update and handle create
//creating formik
//enableReinitialize={true} is vital
const NoteForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)} //passing handleSubmit of upper noteInfo -> noteForm
    >
      {(
        //props' methods
        { values, setFieldValue, isSubmitting, handleSubmit } //handleSubmit is Formil API
      ) => (
        <Form onSubmit={handleSubmit} className="Tiptap">
          <ErrorMessage
            name="noteName"
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
          {initialValues.id !== '-1' && (
            <fieldset className="form-group">
              <label htmlFor="id">ID</label>
              <Field id="id" className="form-control" name="id" disabled />
            </fieldset>
          )}
          {initialValues.id === '-1' && (
            <fieldset className="form-group">
              <Field
                type="hidden"
                id="id"
                className="form-control"
                name="id"
                disabled
              />
            </fieldset>
          )}
          <p></p>
          <fieldset className="form-group">
            <label htmlFor="noteName">Title</label>
            <Field id="noteName" className="form-control" name="noteName" />
          </fieldset>
          <p></p>
          <fieldset className="form-group">
            <label htmlFor="description">Description</label>
            <div className="Tiptap">
              <Tiptap
                initialContent={values.description}
                // pass function props from NoteForm to Tiptap component as onChange handler
                onChange={(value) => {
                  setFieldValue('description', value); //set formik internal values from Tiptap
                }}
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
          {/* <p>formik values {JSON.stringify(values.description)}</p> */}
        </Form>
      )}
    </Formik>
  );
};

NoteForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default NoteForm;
