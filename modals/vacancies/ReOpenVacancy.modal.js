import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { useVacancy } from "../../contexts/VacancyContext";

const ReOpenVacancy = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { reOpenVacancy } = useVacancy();
  const { VACANCIES } = useTranslation();
  const [vacancy, setVacancy] = useState({});

  useImperativeHandle(ref, () => ({
    open(vacancy) {
      setVacancy(vacancy);
      setVisible(true);
    },
  }));
  const handleSubmit = () => {
    console.log(vacancy);
    reOpenVacancy(vacancy._id, vacancy.folderId)
      .then(() => {
        setVisible(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={VACANCIES.RE_OPEN_VACANCY.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <p style={{ margin: 0 }}>{VACANCIES.RE_OPEN_VACANCY.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.RE_OPEN_VACANCY.REOPEN}
          leftValue={VACANCIES.RE_OPEN_VACANCY.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default ReOpenVacancy;
