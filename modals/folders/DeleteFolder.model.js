import React, { forwardRef, useImperativeHandle, useState } from "react";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useFolder } from "../../contexts/FolderContext";
import { useTranslation } from "../../contexts/LocalizeContext";

const DeleteFolder = forwardRef((props, ref) => {
  const { deleteOne } = useFolder();
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  const [id, setId] = useState("");
  useImperativeHandle(ref, () => ({
    open({ _id }) {
      setId(_id);
      setVisible(true);
    },
  }));

  const handleSubmit = () => {
    deleteOne(id)
      .then(() => setVisible(false))
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={VACANCIES.DELETE_FOLDER.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <p style={{ margin: 0 }}>{VACANCIES.DELETE_FOLDER.DESCRIPTION}</p>
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.DELETE_FOLDER.DELETE}
          leftValue={VACANCIES.DELETE_FOLDER.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default DeleteFolder;
