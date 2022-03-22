import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useFolder } from "../../contexts/FolderContext";
import { useTranslation } from "../../contexts/LocalizeContext";

const EditFolder = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { updateOne } = useFolder();
  const [state, setState] = useState({
    title: "",
    color: "",
  });

  const { VACANCIES } = useTranslation();
  useImperativeHandle(ref, () => ({
    open(payload) {
      setState((prev) => ({
        ...prev,
        ...payload,
      }));
      setVisible(true);
    },
  }));
  const handleSubmit = () => {
    updateOne(state._id, state)
      .then(() => setVisible(false))
      .catch((err) => console.error(err));
  };

  return (
    <Modal
      title={VACANCIES.EDIT_FOLDER.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <Input
          onChange={(title) => setState((prev) => ({ ...prev, title }))}
          value={state.title}
          withLabel={VACANCIES.EDIT_FOLDER.NAME}
        />
        <Input
          onChange={(color) => setState((prev) => ({ ...prev, color }))}
          value={state.color}
          style={{ marginTop: 25 }}
          type="color"
          withLabel={VACANCIES.EDIT_FOLDER.COLOR}
        />
        <ButtonRow
          onLeftClick={() => setVisible(false)}
          onRightClick={handleSubmit}
          style={{ marginTop: 36 }}
          rightValue={VACANCIES.EDIT_FOLDER.UPDATE}
          leftValue={VACANCIES.EDIT_FOLDER.CANCEL}
        />
      </div>
    </Modal>
  );
});

export default EditFolder;
