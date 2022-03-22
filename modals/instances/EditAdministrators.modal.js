import { Select, Switch } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const EditAdministrators = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES, GLOBAL } = useTranslation();
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));
  const handleSubmit = () => {};

  return (
    <Modal
      title={VACANCIES.EDIT_ADMINISTRATOR.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <Input
          style={{ width: "100%" }}
          withLabel={VACANCIES.EDIT_ADMINISTRATOR.LABEL}
        >
          <Select
            style={{ width: "100%" }}
            mode="multipla"
            showSearch
            placeholder={GLOBAL.PLACEHOLDER}
          />
        </Input>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.EDIT_ADMINISTRATOR.APPLY}
          leftValue={VACANCIES.EDIT_ADMINISTRATOR.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default EditAdministrators;
