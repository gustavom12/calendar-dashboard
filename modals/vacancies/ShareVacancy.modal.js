import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Link } from "react-feather";
import ImageButton from "../../base/ImageButton.base";
import Input from "../../base/Input.base";
import ButtonRow from "../../components/ButtonRow.components";
import Modal from "../../components/Modal.components";
import { useTranslation } from "../../contexts/LocalizeContext";

const ShareVacancy = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { VACANCIES } = useTranslation();
  const [link, setLink] = useState("");
  useImperativeHandle(ref, () => ({
    open({ title, _id, folder, status }) {
      setLink(
        // `http://www.fichap.com/vacancies/${folder}/${_id}?title=${title}&id=${_id}&status=${status}`
        `https://hiring-dev.fichap.com/apply/${_id}`
      );
      setVisible(true);
    },
  }));
  const handleSubmit = () => {};
  return (
    <Modal
      title={VACANCIES.SHARE_VACANCY.TITLE}
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <div>
        <div>
          <span>{VACANCIES.SHARE_VACANCY.MEDIA}</span>
        </div>
        <div className="share-vacancy__link">
          <Input disabled={true} value={link} />
          <ImageButton style={{ marginTop: 5 }}>
            <Link />
          </ImageButton>
        </div>
      </div>
    </Modal>
  );
});

export default ShareVacancy;
