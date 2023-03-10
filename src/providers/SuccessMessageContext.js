import PropTypes from 'prop-types';
import React, { useState, createContext } from 'react';

export const SuccessMessageContext = createContext({
  successMessage: '',
  setSuccessMessage: () => {},
});

export const SuccessMessageProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState(''); //store message in context globally

  return (
    <SuccessMessageContext.Provider
      value={{ successMessage, setSuccessMessage }}
    >
      {children}
    </SuccessMessageContext.Provider>
  );
};

SuccessMessageProvider.propTypes = {
  children: PropTypes.any,
};
