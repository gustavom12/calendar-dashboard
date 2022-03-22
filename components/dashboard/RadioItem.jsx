import React from "react";

/**
 * Color Radio item
 * @param {string} hex hex color
 */
const RadioItem = ({ hex, className = "" }) => (
  <div
    className={className}
    style={{
      minWidth: "16px",
      width: "16px",
      height: "16px",
      borderRadius: "28px",
      border: `1px solid ${hex}`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "none",
      padding: "0 !important",
    }}
  >
    <div
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "8px",
        backgroundColor: `${hex}`,
      }}
    />
  </div>
);

export default RadioItem;
