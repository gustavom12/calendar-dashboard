import React, { createContext, useContext, useState } from "react";
import es from "../locales/es-ES";

const LocalizeContext = createContext({
  ...es,
  setSelectedLocale: (locale) => {},
});

const locales = {
  es: es,
  en: es,
  pt: es,
};

export const LocalizeProvider = ({ children }) => {
  const [selectedLocale, setSelectedLocale] = useState("es");

  const context = {
    ...locales[selectedLocale],
    setSelectedLocale,
    selectedLocale
  };

  return (
    <LocalizeContext.Provider value={context}>
      {children}
    </LocalizeContext.Provider>
  );
};

export const useTranslation = () => useContext(LocalizeContext);
