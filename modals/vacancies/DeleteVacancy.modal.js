import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { useVacancy } from "../../contexts/VacancyContext";

const DeleteVacancy = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  const { deleteOne } = useVacancy();
  const [vacancy, setVacancy] = useState({});

  useImperativeHandle(ref, () => ({
    open(vacancy) {
      setVacancy(vacancy);
      setVisible(true);
    },
  }));
  const handleSubmit = () => {
    deleteOne(vacancy._id, vacancy.folderId)
      .then(() => setVisible(false))
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={VACANCIES.DELETE_VACANCY.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <p style={{ margin: 0 }}>{VACANCIES.DELETE_VACANCY.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.DELETE_VACANCY.DELETE}
          leftValue={VACANCIES.DELETE_VACANCY.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default DeleteVacancy;
