/* eslint-disable react/prop-types */
// SuccessMessageContext.js
import React, { useState, createContext } from 'react';

export const SuccessMessageContext = createContext(null);

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
