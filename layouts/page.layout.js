import React from "react";

export default function Page({ children, full, style = {}, className }) {
  return (
    <div
      className={"page-container " + className}
      style={full ? { padding: 0, ...style } : { ...style }}
    >
      {children}
    </div>
  );
}
