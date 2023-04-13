/* eslint-disable import/no-named-as-default-member */
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiConnection, { get } from "./api-connection";

const useFetch = (url = "", body = null, callback) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const refetch = (endpoint = "", body = null, concat = true, request) => {
    if (!body)
      get(endpoint || url, { cancelToken: request?.token })
        .then((response) => {
          if (response?.data) {
            if (!concat || !data.length) setData(response.data);
            else if (data.length) setData((v) => [...v, ...response.data]);
            if (callback) callback(response);
          } else {
            if (!concat || !data.length) setData(response);
            else if (data.length) setData((v) => [...v, ...response]);
            if (callback) callback(response);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          if (callback) callback(err);
        })
        .finally(() => setLoading(false));
    else
      apiConnection
        .post(url, body)
        .then((response) => {
          if (response?.length) setData(response);
          else {
            if (data?.length && concat)
              setData((v) => [...v, ...response.data]);
            else if (response?.data?.data) setData(response.data?.data);
            else setData(response.data);
          }
          if (callback) {
            if (response?.data?.data) callback(response.data?.data);
            else callback(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          if (callback) callback(err);
        })
        .finally(() => setLoading(false));
  };

  useEffect(() => {
    const request = axios.CancelToken.source();
    refetch(url, body, false, request);
    return () => {
      request.cancel();
    };
  }, []);

  return { loading, setLoading, data, setData, error, refetch };
};

export const useReFetch = (
  {
    url = "",
    reset = false,
    method = "post",
    default: _default = null,
    body = null,
    callback,
    onLoadedData,
    defaultLoading = false,
    verificate,
    dataIndex,
  },
  watch
) => {
  const [loading, setLoading] = useState(defaultLoading);
  const [data, setData] = useState(_default);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState();

  const refetch = (options = {}) => {
    const { reset: _reset, body: newBody, requestToken } = options;
    if (verificate && !verificate()) return;
    setLoading(true);
    apiConnection[method](url, { ...body, ...newBody } || {}, {
      cancelToken: requestToken,
    })
      .then(({ data: response }) => {
        if (onLoadedData) return onLoadedData(response);
        if (!data?.length || reset || _reset) setData(response);
        else setData((v) => [...v, ...response]);
        if (callback) callback(response);
      })
      .catch((err) => {
        console.log({ err });
        setError(err);
        if (callback) callback(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (watch) {
      if (request) request.cancel();
      const newRequest = axios.CancelToken.source();
      setRequest(newRequest);
      refetch({ requestToken: newRequest?.token });
    }
    return () => {
      if (request) request.cancel();
    };
  }, watch);

  return { loading, setLoading, data, setData, error, refetch };
};

export default useFetch;
