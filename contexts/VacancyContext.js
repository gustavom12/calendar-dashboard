import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import apiConnection from "../pages/api/api-connection";
import { useTranslation } from "./LocalizeContext";
import { useNotificationData } from "./NotificationContext";

const VacancyContext = createContext({
  get: () => {},
  getOne: (id) => {},
  vacancies: [],
  loading: true,
  createOne: (folderId, payload) => {},
  updateOne: (id, payload) => {},
  deleteOne: (id, folderId) => {},
  getClosed: (folderId) => {},
  getActive: (folderId) => {},
  closeVacancy: (id, folderId) => {},
  reOpenVacancy: (id, folderId) => {},
  publish: (id, folderId) => {},
});

export const VacancyProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotificationData();
  const {
    NOTIFICATIONS: { VACANCIES },
  } = useTranslation();

  const get = (folderId) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .post(`/vacancy/getFiltered?folderId=${folderId}`)
        .then(({ data }) => {
          setVacancies(data);
          setLoading(false);
          resolve();
        })
        .catch(() => {
          setLoading(false);
          reject();
        });
    });
  };

  const getClosed = (folderId) => {
    return new Promise((resolve, reject) => {
      const arr = [...vacancies].filter((i) => {
        i.folderId === folderId && i.state === "CLOSED";
      });
      resolve(arr);
    });
  };

  const getActive = (folderId) => {
    return new Promise((resolve, reject) => {
      const arr = [...vacancies].filter(
        (i) => i.folderId === folderId && i.state === "ACTIVE"
      );
      resolve(arr);
    });
  };

  const getOne = (id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .get(`/vacancy?id=${id}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          setLoading(false);
          error(VACANCIES.CREATE.ERROR);
          console.error(err);
          reject(err);
        });
    });
  };

  const createOne = (folderId, payload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .post("/vacancy", payload)
        .then(({ data }) => {
          console.log(data);
          setVacancies((prev) => [...prev, data]);
          setLoading(false);
          success(VACANCIES.CREATE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          error(VACANCIES.CREATE.ERROR);
          console.error(err);
        });
    });
  };

  const updateOne = (id, payload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      const arr = [...vacancies].map((i) => {
        if (i._id === id) {
          return {
            ...i,
            ...payload,
          };
        }
        return i;
      });

      setVacancies(arr);
      setLoading(false);
      resolve();
    });
  };

  const deleteOne = (id, folderId) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .delete(`/vacancy?folderId=${folderId}&&id=${id}`)
        .then(() => {
          const arr = [...vacancies].filter(
            (i) => i._id != id && i.folderId === folderId
          );
          setVacancies(arr);
          setLoading(false);
          success(VACANCIES.DELETE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          error(VACANCIES.DELETE.ERROR);
          setLoading(false);
          console.error(err);
        });
    });
  };

  const closeVacancy = (id, folderId) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .patch(`/vacancy/close?folderId=${folderId}&&id=${id}`)
        .then(() => {
          const arr = [...vacancies].map((i) => {
            if (i._id === id && i.folderId === folderId) {
              return {
                ...i,
                state: "CLOSED",
              };
            }
            return i;
          });
          setVacancies(arr);
          setLoading(false);
          success(VACANCIES.CLOSE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          error(VACANCIES.CLOSE.ERROR);
          reject();
        });
    });
  };

  const publish = (id, folderId, show) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .patch(`/vacancy/show?folderId=${folderId}&&id=${id}`, { show })
        .then(() => {
          const arr = [...vacancies].map((i) => {
            if (i._id === id && i.folderId === folderId) {
              return {
                ...i,
                show: show,
              };
            }
            return i;
          });
          setVacancies(arr);
          setLoading(false);
          success(VACANCIES.PUBLISH.SUCCESS);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          error(VACANCIES.PUBLISH.ERROR);
          reject();
        });
    });
  };

  const reOpenVacancy = (id, folderId) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .patch(`/vacancy/open?folderId=${folderId}&&id=${id}`)
        .then(() => {
          const arr = [...vacancies].map((i) => {
            if (i._id === id && i.folderId === folderId) {
              return {
                ...i,
                state: "ACTIVE",
              };
            }
            return i;
          });
          setVacancies(arr);
          setLoading(false);
          success(VACANCIES.REOPEN.SUCCESS);
          resolve();
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          success(VACANCIES.REOPEN.ERROR);
          reject();
        });
    });
  };

  const context = {
    get,
    loading,
    vacancies,
    createOne,
    updateOne,
    deleteOne,
    getClosed,
    getActive,
    closeVacancy,
    publish,
    getOne,
    reOpenVacancy,
  };

  return (
    <VacancyContext.Provider value={context}>
      {children}
    </VacancyContext.Provider>
  );
};

export const useVacancy = () => useContext(VacancyContext);
