import React, { createContext, useContext, useEffect, useState } from "react";
import apiConnection from "../pages/api/api-connection";
import { useTranslation } from "./LocalizeContext";
import { useNotificationData } from "./NotificationContext";

const CompanyContext = createContext({
  get: () => {},
  state: {},
  setState: (v) => {},
});

export const CompanyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const {
    NOTIFICATIONS: { COMPANY },
  } = useTranslation();
  const { success, error } = useNotificationData();
  const [state, setState] = useState({
    name: "",
    color: "#695ee8",
    aboutUs: "",
    whatWeDo: "",
    media: {
      instagram: "",
      twitter: "",
      linkedin: "",
      medium: "",
      facebook: "",
      youtube: "",
      behance: "",
      telegram: "",
    },
    benefits: [],
    quotes: [],
    locations: [],
    images: {
      logo: "",
      portrait: "",
      banner: "",
      section1: [],
      section2: [],
      section3: [],
    },
  });

  const addQuote = () => {
    setState((prev) => ({
      ...prev,
      quotes: [
        ...prev.quotes,
        {
          name: "",
          position: "",
          quote: "",
          picture: "",
        },
      ],
    }));
  };

  const addLocation = () => {
    setState((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          name: "",
          location: "",
        },
      ],
    }));
  };

  const updateState = (key, value) =>
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));

  const updateMediaState = (key, value) =>
    setState((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [key]: value,
      },
    }));

  const updateImagesState = (key, value) =>
    setState((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [key]: value,
      },
    }));

  const handleSubmit = () => {
    // console.log(state);
    try {
      apiConnection
        .patch("/companies/hiring/branding", state)
        .then(({ data }) => {
          success(COMPANY.PUBLISH.SUCCESS);
        })
        .catch((err) => {
          console.error(err);
          error(COMPANY.PUBLISH.ERROR);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const get = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .get("/companies/hiring/branding")
        .then(({ data }) => {
          setState({
            name: data.name || "",
            color: data.color || "#695ee8",
            aboutUs: data.aboutUs || "",
            whatWeDo: data.whatWeDo || "",
            media: {
              instagram: data.media.instagram || "",
              twitter: data.media.twitter || "",
              linkedin: data.media.linkedin || "",
              medium: data.media.medium || "",
              facebook: data.media.facebook || "",
              youtube: data.media.youtube || "",
              behance: data.media.behance || "",
              telegram: data.media.telegram || "",
            },
            benefits: data?.benefits || [],
            quotes: data.quotes || [],
            locations: data?.locations || [],
            images: {
              logo: data?.logo || "",
              portrait: data.portrait || "",
              banner: data.banner || "",
              section1: data.section1 || [],
              section2: data.section2 || [],
              section3: data.section3 || [],
            },
          });
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          resolve();
        });
    });
  };

  const context = {
    get,
    state,
    setState,
    addQuote,
    addLocation,
    updateState,
    updateImagesState,
    handleSubmit,
    updateMediaState,
  };

  return (
    <CompanyContext.Provider value={context}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
