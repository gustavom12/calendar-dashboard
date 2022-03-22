import { Switch } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Button from "../../base/Button.base";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const ShareVacancy = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { CANDIDATES } = useTranslation();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  const handleSubmit = () => {};

  return (
    <Modal title={""} visible={visible} onCancel={() => setVisible(false)}>
      <div className="">
        <img src="/assets/svg/check.svg" alt="check" />
        <div>
          <h2>{CANDIDATES.MODAL.TITLE}</h2>
          <h3>{CANDIDATES.MODAL.DESCRIPTION}</h3>
        </div>
        <div>
          <div>
            <span>{CANDIDATES.MODAL.SHOW}</span>
            <Switch />
          </div>
          <div>
            <span>{CANDIDATES.MODAL.SHOW}</span>
            <Switch />
          </div>
          <div>
            <span>{CANDIDATES.MODAL.LINK}</span>
          </div>
        </div>
        <Button>{CANDIDATES.MODAL.PUBLISH}</Button>
      </div>
    </Modal>
  );
});

export default ShareVacancy;
