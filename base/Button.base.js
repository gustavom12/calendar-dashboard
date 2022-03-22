import React from "react";

export default function Button({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={style} className="fichap-button">
      {children}
    </button>
  );
}
