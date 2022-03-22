import axios from "axios";
import { notification } from "antd";
// import env from "@beam-australia/react-env";

// export const API = env("API_BASE_URL");

const apiConnection = axios.create({
  // baseURL: "http://localhost"
  baseURL: "https://api.fichap.com",
  // baseURL: env("API_BASE_URL"),
  // baseURL: process.env.REACT_APP_API_BASE_URL,
});

apiConnection.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");
  req.headers.Authorization = `Bearer ${accessToken}`;
  req.headers.AccessToken = accessToken;
  return req;
});

apiConnection.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status || 403 === error.response.status) {
      if (typeof window != undefined) {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
    } else {
      return Promise.reject(error);
    }
  }
);

function request(
  method,
  url,
  params = {},
  body = null,
  headers = null,
  options = {}
) {
  const reqParams = {
    method,
    responseType: "json",
    headers: headers || {
      Accept: "application/json",
    },
    ...options,
  };

  const parsedParams = Object.keys(params)
    .map((p) => `${p}=${params[p]}`)
    .join("&");

  if (method !== "get" && method !== "head" && body !== null) {
    if (!reqParams.headers["Content-Type"]) {
      reqParams.headers["Content-Type"] = "application/json";
    }
    reqParams.data = body;
  }

  reqParams.url = parsedParams ? `${url}?${parsedParams}` : url;

  return new Promise(async (resolve, reject) => {
    apiConnection(reqParams)
      .then((result) => {
        return resolve(result ? result.data : null);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export function get(url, query, headers = null, options = {}) {
  return request("get", url, query, {}, headers, options);
}

export function post(url, query, body = {}, headers = null, options = {}) {
  return request("post", url, query, body, headers, options);
}

export function patch(url, query, body = {}, headers = null, options = {}) {
  return request("patch", url, query, body, headers, options);
}

export function del(url, query, body = {}, headers = null, options = {}) {
  return request("delete", url, {}, body, headers, options);
}

export function uploadFile(method, url, formData, config = {}) {
  return new Promise(async (resolve, reject) => {
    apiConnection[method](url, formData, config)
      .then((res) => resolve(res))
      .catch((err) => {
        if (err && !err.data?.err?.status)
          notification.error({
            message: "La imagen seleccionada no puede pesar más de 1mb",
          });
        reject(err);
      });
  });
}

export function download(method, url) {
  return new Promise(async (resolve, reject) => {
    apiConnection[method](url, {
      responseType: "blob",
    })
      .then((result) => {
        return resolve(result ? result.data : null);
      })
      .catch((e) => {
        return reject(e);
      });
  });
}

export default apiConnection;
