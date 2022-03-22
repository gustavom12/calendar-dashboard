import React from "react";

export default function SecondaryButton({ children, onClick, style }) {
  return (
    <button onClick={onClick} className="fichap-secondary-button" style={style}>
      {children}
    </button>
  );
}
