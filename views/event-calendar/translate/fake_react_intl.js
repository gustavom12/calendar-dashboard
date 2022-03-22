import React from "react";
import es from "./es";
import en from "./en";
import pt from "./pt";
import { useTranslation } from "../../../contexts/LocalizeContext";

const languages = { es, en, pt };

// export const translate = (id) =>
export const translate = (id, selectedLanguage = "es") =>
  languages[selectedLanguage][id] || (typeof id === "string" && id) || "asd";

export const intl = {
  formatMessage: ({ id, selectedLocale = "es" }) =>
    languages[selectedLocale][id] || id,
};

export const FormattedMessage = ({ id }) => {
  const { selectedLocale } = useTranslation();
  return <> {translate(id, selectedLocale)} </>;
};
