import React from "react";
import { Modal as AModal } from "antd";

export default function Modal({
  title,
  maxWidth = 400,
  children,
  visible,
  onCancel,
}) {
  return (
    <AModal
      style={{ maxWidth }}
      footer={false}
      onCancel={onCancel}
      title={title}
      visible={visible}
    >
      {children}
    </AModal>
  );
}
