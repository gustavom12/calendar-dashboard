import { Select } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { useNotificationData } from "../../contexts/NotificationContext";
import apiConnection from "../../pages/api/api-connection";

const NewInstance = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { success, error } = useNotificationData();
  const {
    VACANCIES,
    NOTIFICATIONS: { INSTANCES },
  } = useTranslation();

  const [state, setState] = useState({
    title: "",
    vacancyId: "",
    type: "ANY",
    cb: () => {},
  });

  useImperativeHandle(ref, () => ({
    open(vacancyId, cb) {
      setState((prev) => ({
        ...prev,
        vacancyId,
        cb,
      }));
      setVisible(true);
    },
  }));

  const handleSubmit = () => {
    apiConnection
      .post("/vacancy/column", {
        title: state.title,
        vacancyId: state.vacancyId,
        type: "ANY",
      })
      .then(({ data }) => {
        success(INSTANCES.CREATE.SUCCESS);
        state.cb({
          ...data,
          cards: [],
          admins: [],
        });
        setVisible(false);
      })
      .catch((err) => {
        console.log(err);
        error(INSTANCES.CREATE.ERROR);
      });
  };

  return (
    <Modal
      title={VACANCIES.NEW_INSTANCE.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <Input
          style={{ width: "100%" }}
          onChange={(v) =>
            setState((prev) => ({
              ...prev,
              title: v,
            }))
          }
          withLabel={VACANCIES.NEW_INSTANCE.LABEL}
        />

        <Input
          style={{ width: "100%" }}
          withLabel={VACANCIES.NEW_INSTANCE.TYPE}
        >
          <Select style={{ width: "100%" }}>
            <Select.Option value="ANY">Libre</Select.Option>
            <Select.Option value="INTERVIEW">Entrevista</Select.Option>
            <Select.Option value="TEST">Prueba técnica</Select.Option>
          </Select>
        </Input>

        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.NEW_INSTANCE.CREATE}
          leftValue={VACANCIES.NEW_INSTANCE.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default NewInstance;
