import { Switch } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-feather";
import ImageButton from "../../base/ImageButton.base";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";
import { useVacancy } from "../../contexts/VacancyContext";

const ShowVacancy = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  const { publish } = useVacancy();
  const [vacancy, setVacancy] = useState({
    show: false,
  });
  useImperativeHandle(ref, () => ({
    open(vacancy) {
      console.log(vacancy);
      setVacancy(vacancy);
      setVisible(true);
    },
  }));
  const handleSubmit = () => {
    publish(vacancy._id, vacancy.folderId, vacancy.show)
      .then(() => setVisible(false))
      .catch((err) => console.error(err));
  };
  return (
    <Modal
      title={VACANCIES.SHOW_VACANCY.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <div className="show-vacancy__description">
          <span>{VACANCIES.SHOW_VACANCY.DESCRIPTION}</span>
          <Switch
            checked={vacancy.show}
            onChange={(show) =>
              setVacancy((prev) => ({
                ...prev,
                show,
              }))
            }
          />
        </div>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.SHOW_VACANCY.APPLY}
          leftValue={VACANCIES.SHOW_VACANCY.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default ShowVacancy;
