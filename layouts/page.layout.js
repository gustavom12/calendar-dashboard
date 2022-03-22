import React from "react";

export default function Page({ children, full, style = {} }) {
  return (
    <div
      className="page-container"
      style={full ? { padding: 0, ...style } : { ...style }}
    >
      {children}
    </div>
  );
}
