import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import apiConnection from "../pages/api/api-connection";
import { useTranslation } from "./LocalizeContext";
import { useNotificationData } from "./NotificationContext";

const AuthContext = createContext({
  login: (user, password) => {},
  logout: () => {},
  user: {},
  session: "",
  company: {},
  setCompany: () => {},
});

export const AuthProvider = ({ children }) => {
  const { route, push } = useRouter();
  const [session, setSession] = useState("");
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const { AUTH } = useTranslation();
  const { success, error } = useNotificationData();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("userData"));
      if (user) {
        setUser(user);
        apiConnection
          .get(`/company/${user.companyId}`)
          .then(({ data }) => {
            setCompany(data);
          })
          .catch(console.log);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken") && route === "/") {
      push("/");
    }
    if (!localStorage.getItem("accessToken") && route != "/") {
      push("/");
    }
  }, [route]);

  const login = (user, password) => {
    if (user === "barbermank" && password === "Gg123123")
      apiConnection
        .post("/auth/v1/login", { user, password })
        .then(({ data }) => {
          console.log({ data });
          localStorage.setItem("accessToken", data.accessToken);
          setSession(data.accessToken);
          success(AUTH.LOGIN.RESPONSE.SUCCESS);
          apiConnection
            .get("/users/profile/get")
            .then(({ data }) => {
              setUser(data.data);
              apiConnection
                .get(`/company/${user.companyId}`)
                .then(({ data }) => {
                  setCompany(data);
                })
                .catch(console.log);
              localStorage.setItem("userData", JSON.stringify(data.data));
              push("/calendar");
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          // TODO: Mostrar error mas descriptivo, (traducir en base al response)
          error(AUTH.LOGIN.RESPONSE.COMMON_ERROR);
          console.error(err);
        });
    else {
      error("Usuario o contraseña inválida");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    push("/");
  };

  const context = { login, logout, user, session, company, setCompany };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
