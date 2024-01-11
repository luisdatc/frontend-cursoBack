import React, { createContext, useState } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [isLogeado, setIsLogeado] = useState(false);

  return (
    <LogContext.Provider value={{ isLogeado, setIsLogeado }}>
      {children}
    </LogContext.Provider>
  );
};