import React from "react";

export default function Box({ children, title }) {
  return (
    <div className="box__container">
      <div className="box__container-t">
        <h3>{title}</h3>
      </div>
      <div className="box__container-body">{children}</div>
    </div>
  );
}
