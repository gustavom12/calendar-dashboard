import React from "react";
import { ChevronRight } from "react-feather";
import { useTranslation } from "../contexts/LocalizeContext";

export default function Input({
  withLabel,
  placeholder,
  onChange = (v) => {},
  style = {},
  children,
  type = "text",
  value,
  disabled,
}) {
  const { GLOBAL } = useTranslation();
  return (
    <div className="input-container" style={style}>
      {withLabel && (
        <div className="input-t">
          <ChevronRight
            className="input-i"
            style={{ color: "#695EE8", height: 15 }}
          />
          <label className="input-label">{withLabel}</label>
        </div>
      )}
      {children ? (
        children
      ) : (
        <input
          disabled={disabled}
          value={value}
          type={type}
          className="input-b"
          placeholder={placeholder || GLOBAL.PLACEHOLDER}
          onChange={(v) => onChange(v.target.value)}
        />
      )}
    </div>
  );
}
