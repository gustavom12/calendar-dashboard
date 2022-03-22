import React from "react";
import Page from "../layouts/page.layout";

export default function Card({
  title,
  withHeader,
  children,
  topClassName = "",
  topStyle = {},
  bodyStyle = {},
  textStyle = {},
  bodyClassName = "",
}) {
  return (
    <Page full>
      <div className="card-container">
        <div style={topStyle} className={`card-t ${topClassName}`}>
          <h3 style={textStyle}>{title}</h3>
          {withHeader}
        </div>
        <div style={bodyStyle} className={`card-b ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </Page>
  );
}
