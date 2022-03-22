import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import apiConnection from "../pages/api/api-connection";
import { useTranslation } from "./LocalizeContext";
import { useNotificationData } from "./NotificationContext";

const FolderContext = createContext({
  get: () => {},
  folders: [],
  loading: true,
  createOne: (name, color) => {},
  updateOne: (id, payload) => {},
  deleteOne: (id) => {},
});

export const FolderProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { success, error } = useNotificationData();
  const {
    NOTIFICATIONS: { FOLDERS },
  } = useTranslation();

  const get = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // setFolders([]);
      apiConnection
        .post("/vacancy/folder/getFiltered")
        .then(({ data }) => {
          setFolders(data);
          setLoading(false);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          resolve();
        });
    });
  };

  const createOne = (title, color) => {
    return new Promise((resolve, reject) => {
      //luego de volver la info se agrega el id
      setLoading(true);
      apiConnection
        .post("/vacancy/folder", { color, title })
        .then(({ data }) => {
          setFolders((prev) => [...prev, data]);
          setLoading(false);
          success(FOLDERS.CREATE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          success(FOLDERS.CREATE.ERROR);
          setLoading(false);
          reject(err);
        });
    });
  };

  const updateOne = (id, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .patch(`/vacancy/folder/${payload._id}`, {
          _id: payload._id,
          color: payload.color,
          title: payload.title,
        })
        .then(() => {
          const arr = [...folders].map((i) => {
            if (i._id === id) {
              return {
                ...i,
                ...payload,
              };
            }
            return i;
          });
          setFolders(arr);
          setLoading(false);
          success(FOLDERS.UPDATE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          success(FOLDERS.UPDATE.ERROR);
          reject(err);
        });
    });
  };

  const deleteOne = (id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      apiConnection
        .delete(`/vacancy/folder/${id}`)
        .then(() => {
          const arr = [...folders].filter((i) => i._id != id);
          setFolders(arr);
          setLoading(false);
          success(FOLDERS.DELETE.SUCCESS);
          resolve();
        })
        .catch((err) => {
          setLoading(false);
          success(FOLDERS.DELETE.ERROR);
          reject(err);
        });
    });
  };

  const context = {
    get,
    createOne,
    updateOne,
    deleteOne,
    folders,
    loading,
  };

  return (
    <FolderContext.Provider value={context}>{children}</FolderContext.Provider>
  );
};

export const useFolder = () => useContext(FolderContext);
