import React from "react";

export default function Button({ children, onClick, style, loading }) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      style={style}
      className="fichap-button"
    >
      {children}
    </button>
  );
}
