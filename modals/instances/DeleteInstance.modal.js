import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { useNotificationData } from "../../contexts/NotificationContext";

const DeleteInstance = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  const [state, setState] = useState({
    cb: () => {},
    id: "",
  });
  useImperativeHandle(ref, () => ({
    open(id, cb) {
      const arr = [];
      setState({
        id,
        cb,
      });
      setVisible(true);
    },
  }));

  const handleSubmit = () => {
    state.cb(state.id);
    setVisible(false);
  };

  return (
    <Modal
      title={VACANCIES.DELETE_INSTANCE.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <p style={{ margin: 0 }}>{VACANCIES.DELETE_INSTANCE.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.DELETE_INSTANCE.DELETE}
          leftValue={VACANCIES.DELETE_INSTANCE.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default DeleteInstance;
