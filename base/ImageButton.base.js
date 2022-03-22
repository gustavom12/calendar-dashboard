import React from "react";
import styles from "../styles/base/button.module.scss";

export default function ImageButton({ onClick, children, style }) {
  return (
    <button style={style} className={styles["image-button"]} onClick={onClick}>
      {children}
    </button>
  );
}
