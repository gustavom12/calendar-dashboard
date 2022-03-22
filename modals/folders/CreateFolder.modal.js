import React, { forwardRef, useImperativeHandle, useState } from "react";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useFolder } from "../../contexts/FolderContext";
import { useTranslation } from "../../contexts/LocalizeContext";

const CreateFolder = forwardRef((props, ref) => {
  const INITIAL_STATE = { name: "", color: "#695ee8" };

  const { createOne } = useFolder();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const { VACANCIES } = useTranslation();
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
      setState(INITIAL_STATE);
    },
  }));
  const handleSubmit = () => {
    createOne(state.name, state.color)
      .then(() => setVisible(false))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Modal
      title={VACANCIES.ADD_FOLDER.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <Input
          value={state.name}
          onChange={(name) =>
            setState((prev) => ({
              ...prev,
              name,
            }))
          }
          withLabel={VACANCIES.ADD_FOLDER.NAME}
        />
        <Input
          style={{ marginTop: 25 }}
          type="color"
          value={state.color}
          onChange={(color) =>
            setState((prev) => ({
              ...prev,
              color,
            }))
          }
          withLabel={VACANCIES.ADD_FOLDER.COLOR}
        />
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.ADD_FOLDER.CREATE}
          leftValue={VACANCIES.ADD_FOLDER.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default CreateFolder;
