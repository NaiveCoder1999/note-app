/* eslint-disable react/prop-types */
// SuccessAlertMessageContext.js
import React, { useState, createContext } from 'react';

export const SuccessAlertMessageContext = createContext(null);

export const SuccessAlertMessageProvider = ({ children }) => {
  const [successAlertMessage, setSuccessAlertMessage] = useState(''); //store message in context globally

  return (
    <SuccessAlertMessageContext.Provider
      value={{ successAlertMessage, setSuccessAlertMessage }}
    >
      {children}
    </SuccessAlertMessageContext.Provider>
  );
};
