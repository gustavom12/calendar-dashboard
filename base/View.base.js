import React from "react";
import { Eye } from "react-feather";

export default function View({ onClick }) {
  return (
    <button onClick={onClick} className="view-button">
      <Eye style={{ color: "#695EE8" }} />
    </button>
  );
}
