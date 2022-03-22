import { Select } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const TransferCandidate = forwardRef((props, ref) => {
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
      title={VACANCIES.TRANSFER_CANDIDATE.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <Input
          style={{ width: "100%" }}
          withLabel={VACANCIES.TRANSFER_CANDIDATE.VACANCY}
        >
          <Select
            style={{ width: "100%" }}
            mode="multipla"
            showSearch
            placeholder={GLOBAL.PLACEHOLDER}
          />
        </Input>
        <Input
          style={{ width: "100%" }}
          withLabel={VACANCIES.TRANSFER_CANDIDATE.INSTANCE}
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
          rightValue={VACANCIES.TRANSFER_CANDIDATE.SEND}
          leftValue={VACANCIES.TRANSFER_CANDIDATE.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default TransferCandidate;
