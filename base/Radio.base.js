import React from "react";

export default function Radio({ color = "#968EEF" }) {
  return (
    <div
      style={{
        borderColor: color,
        width: 13,
        height: 13,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 13,
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <div
        style={{ backgroundColor: color, height: 7, width: 7, borderRadius: 7 }}
      />
    </div>
  );
}
