import { Switch } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const NotifyInstance = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));
  const handleSubmit = () => {};

  return (
    <Modal
      title={VACANCIES.NOTIFY_INSTANCE.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <div className="send-notification__switch">
          <Switch />
          <span>{VACANCIES.NOTIFY_INSTANCE.AUTO}</span>
        </div>
        <p style={{ margin: 0 }}>{VACANCIES.NOTIFY_INSTANCE.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.NOTIFY_INSTANCE.APPLY}
          leftValue={VACANCIES.NOTIFY_INSTANCE.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default NotifyInstance;
