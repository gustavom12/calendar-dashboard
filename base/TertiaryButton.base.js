import React from "react";

export default function TertiaryButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} className="fichap-tertiary-button" style={style}>
      {children}
    </button>
  );
}
