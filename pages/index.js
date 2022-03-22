import Checkbox from "antd/lib/checkbox/Checkbox";
import { useEffect, useState } from "react";
import Button from "../base/Button.base";
import Input from "../base/Input.base";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "../contexts/LocalizeContext";
import { Router } from "next/router";

export default function Login() {
  const {
    AUTH: { LOGIN },
  } = useTranslation();

  const { login } = useAuth();

  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  useEffect(() => {
    if (window?.location?.href?.includes("?code")) {
      location.href = `/calendar/connection?${
        window?.location?.href.split("?")[1]
      }`;
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form.user, form.password);
  };

  return (
    <main className="login-container">
      <div className="login-container-t">
        <img src="/assets/green-logo.svg" />
        <a target="_blank" rel="noopener noreferrer" href={LOGIN.ACCOUNT.LINK}>
          <span>
            {LOGIN.ACCOUNT.NOT}
            <span>{LOGIN.ACCOUNT.START_TODAY}</span>
          </span>
        </a>
      </div>
      <div className="login-container-b">
        <h1>{LOGIN.WELCOME}</h1>
        <form onSubmit={handleSubmit} className="login-container-b__form">
          <h2>{LOGIN.FORM.TITLE}</h2>
          <Input
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                user: v,
              }))
            }
            placeholder={LOGIN.FORM.EMAIL}
          />
          <Input
            style={{ marginTop: 15, marginBottom: 25 }}
            type="password"
            onChange={(v) =>
              setForm((prev) => ({
                ...prev,
                password: v,
              }))
            }
            placeholder={LOGIN.FORM.PASSWORD}
          />
          <span style={{ marginLeft: 0 }}>
            <Checkbox />
            <span style={{ marginLeft: 5 }}>{LOGIN.FORM.REMEMBER}</span>
          </span>
          <Button onClick={handleSubmit}>{LOGIN.FORM.LOG_IN}</Button>
          <div className="login-container-b__form-b">
            <a>{LOGIN.FORM.FORGET.PASSWORD}</a>
            <a>{LOGIN.FORM.FORGET.USER}</a>
          </div>
        </form>
      </div>
    </main>
  );
}
