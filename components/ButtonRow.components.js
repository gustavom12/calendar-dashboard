import React from "react";
import Button from "../base/Button.base";
import SecondaryButton from "../base/SecondaryButton.base";

export default function ButtonRow({
  leftValue,
  rightValue,
  onLeftClick,
  onRightClick,
  style = {},
}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...style,
      }}
    >
      <SecondaryButton style={{ width: 168 }} onClick={onLeftClick}>
        {leftValue}
      </SecondaryButton>
      <Button style={{ width: 168 }} onClick={onRightClick}>
        {rightValue}
      </Button>
    </div>
  );
}
