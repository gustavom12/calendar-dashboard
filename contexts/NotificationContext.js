import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext({
  success: (message) => {},
  error: (message) => {},
});

export const NotificationProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);
  const success = (message = "") => {
    setIsError(false);
    setMessage(message);
  };
  const error = (message = "") => {
    setIsError(true);
    setMessage(message);
  };
  const context = {
    success,
    error,
    isError,
    setIsError,
    message,
    setMessage,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationData = () => useContext(NotificationContext);
