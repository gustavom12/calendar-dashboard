import React, { useState } from "react";
import { X } from "react-feather";
import Input from "../../../base/Input.base";
import TextArea from "../../../base/TextArea.base";
import { useTranslation } from "../../../contexts/LocalizeContext";
import Page from "../../../layouts/page.layout";

export default function ExperienceTab({ candidate, disabled = true }) {
  const {
    CANDIDATES: {
      FILE: { EXPERIENCE },
    },
  } = useTranslation();
  const [experiences, setExperiences] = useState([]);

  return (
    <div>
      <div style={{ marginTop: -20 }}>
        {experiences.map((i, index) => {
          return (
            <Page key={index} style={{ padding: 20, paddingTop: 10 }}>
              <div
                style={{
                  position: "relative",
                  top: 20,
                  width: "100%",
                  // background: "#FF0000",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <button
                  style={{ borderStyle: "none", background: "none" }}
                  onClick={() => {}}
                >
                  <X />
                </button>
              </div>
              <div className="grid-50-50" style={{ marginTop: 20 }}>
                <div className="grid-column">
                  <Input withLabel={"Empresa"} placeholder={"Empresa"} />
                  <Input withLabel={"Puesto"} placeholder={"Puesto"} />
                </div>
                <div className="grid-column">
                  <Input
                    withLabel={"Contacto de referencia"}
                    placeholder={"Contacto de referencia"}
                  />
                  <Input
                    withLabel={"Descripción del rol"}
                    placeholder={"Descripción del rol"}
                  />
                </div>
              </div>
            </Page>
          );
        })}
      </div>
      <button
        className="branding-add"
        style={{ marginTop: 30 }}
        onClick={() => {
          setExperiences((prev) => [...prev, {}]);
        }}
      >
        {EXPERIENCE.ADD}
      </button>
    </div>
  );
}
