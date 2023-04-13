import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../base/Input.base";
import TitleGenerator from "../../views/event-calendar/base/TitleGenerator";
import Button from "../../base/Button.base";
import { useEffect } from "react";
import apiConnection from "../api/api-connection";
import NotificationGenerator from "../../views/event-calendar/base/NotificationGenerator";
import { intl } from "../../views/event-calendar/translate/fake_react_intl";

const Settings = () => {
  const { company, setCompany } = useAuth();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(company?.config || {});
  useEffect(() => {
    setConfig(company?.config || {});
  }, [company]);

  const submit = async () => {
    try {
      setLoading(true);
      const { data } = await apiConnection.patch(`/company/${company._id}`, {
        ...company,
        config,
      });
      console.log({ data });
      NotificationGenerator("Actualizado con éxito", intl, false);
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // const config = company.config;
  return (
    <div className="eventCalendar">
      <div style={{ padding: 30 }} className="TypeofEvent card">
        <div className="Settings">
          <div className="grid-50-50">
            <div>
              <TitleGenerator id="Nombre" />
              <Input value={company.name} disabled required />
            </div>
            <div>
              <TitleGenerator id="Color de fondo" />
              <Input
                value={config.bgColor}
                onChange={(v) => setConfig({ ...config, bgColor: v })}
              />
            </div>
          </div>
          <div className="grid-50-50 mt-5">
            <div>
              <TitleGenerator id="Color principal" />
              <Input
                value={config.mainColor}
                onChange={(v) => setConfig({ ...config, mainColor: v })}
              />
            </div>
            <div>
              <TitleGenerator id="Color secundario" />
              <Input
                value={config.secondary}
                onChange={(v) => setConfig({ ...config, secondary: v })}
              />
            </div>
          </div>
          <div className="grid-50-50 mt-5">
            <div>
              <TitleGenerator id="Color principal de texto" />
              <Input
                value={config.textDefaultColor}
                onChange={(v) => setConfig({ ...config, textDefaultColor: v })}
              />
            </div>
            <div>
              <TitleGenerator id="Color secundario de texto" />
              <Input
                value={config.secondaryText}
                onChange={(v) => setConfig({ ...config, secondaryText: v })}
              />
            </div>
          </div>
          <div className="grid-50-50 mt-5">
            <div>
              <TitleGenerator id="Color de fondo secundario" />
              <Input
                value={config.secondaryBgColor}
                onChange={(v) => setConfig({ ...config, secondaryBgColor: v })}
              />
            </div>
            <div>
              <TitleGenerator id="Color de texto de títulos" />
              <Input
                value={config.titleColor}
                onChange={(v) => setConfig({ ...config, titleColor: v })}
              />
            </div>
          </div>
          <div className="mt-5">
            <TitleGenerator id="Estilos personalizados" />
            <textarea
              className="w-100 mt-2"
              style={{ minHeight: 300 }}
              onChange={(v) => {
                setConfig({ ...config, customStyles: v.target.value });
              }}
            />
          </div>
          <div className="mt-5 d-flex justify-content-end">
            <Button loading={loading} onClick={submit} className="mt-3">
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
