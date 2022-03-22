import React from "react";

export default function DropdownItem({ children, onClick, isDelete = false }) {
  return (
    <button
      onClick={onClick}
      className={`hiring-overlay ${
        isDelete ? "hiring-overlay-button--delete" : "hiring-overlay-button"
      }`}
    >
      {children}
    </button>
  );
}
