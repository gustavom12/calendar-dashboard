import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import apiConnection from "../pages/api/api-connection";
import { useTranslation } from "./LocalizeContext";
import { useNotificationData } from "./NotificationContext";

const CandidateContext = createContext({
  candidates: [],
  loading: true,
  get: () => {},
  deleteOne: (id) => {},
  getOne: (id) => {},
});

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotificationData();
  const {
    NOTIFICATIONS: { CANDIDATES },
  } = useTranslation();

  const getOne = (id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // const candidate = [...candidates].find((i) => i._id === id);
      apiConnection
        .get(`/users/candidates?candidateId=${id}`)
        .then(({ data }) => {
          setLoading(false);
          resolve(data);
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          reject(err);
        });
    });
  };

  const get = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      //
      apiConnection
        .post(`/users/candidates/getFiltered`, {
          skip: 0,
          limit: 100,
        })
        .then(({ data }) => {
          setCandidates(data);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
      setLoading(false);
    });
  };

  const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .delete(`/users/candidates?candidateId=${id}`)
        .then(() => {
          const arr = [...candidates].filter((i) => i._id != id);
          setCandidates(arr);
          setLoading(false);
          success(CANDIDATES.DELETE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          error(CANDIDATES.DELETE.ERROR);
        });
    });
  };

  const context = {
    candidates,
    loading,
    get,
    getOne,
    deleteOne,
  };

  return (
    <CandidateContext.Provider value={context}>
      {children}
    </CandidateContext.Provider>
  );
};

export const useCandidate = () => useContext(CandidateContext);
