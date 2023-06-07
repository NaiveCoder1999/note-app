/* eslint-disable react/prop-types */
// AlertMessageContext.js
import React, { useState, createContext } from 'react';

export const AlertMessageContext = createContext(null);

export const AlertMessageProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState(null); //store message in context globally

  return (
    <AlertMessageContext.Provider value={{ alertMessage, setAlertMessage }}>
      {children}
    </AlertMessageContext.Provider>
  );
};
