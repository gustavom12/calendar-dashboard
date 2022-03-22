import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const DiscardCandidate = forwardRef((props, ref) => {
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
      title={VACANCIES.DISCARD_CANDIDATE.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <p style={{ margin: 0 }}>{VACANCIES.DISCARD_CANDIDATE.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.DISCARD_CANDIDATE.DISCARD}
          leftValue={VACANCIES.DISCARD_CANDIDATE.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default DiscardCandidate;
