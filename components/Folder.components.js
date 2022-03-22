import { Dropdown } from "antd";
import React from "react";
import { MoreVertical } from "react-feather";
import DropdownItem from "../base/DropdownItem.base";
import { useTranslation } from "../contexts/LocalizeContext";

export function Folder({
  title,
  vacancies,
  color,
  _key,
  onClick,
  onEdit,
  onDelete,
}) {
  const { VACANCIES } = useTranslation();
  return (
    <div key={_key} className="folder-container">
      <div
        onClick={onClick}
        className="folder-line"
        style={{ backgroundColor: color }}
      />
      <div onClick={onClick} className="folder-body">
        <h3>{title}</h3>
        <h6>
          {vacancies} {VACANCIES.VACANCIES}
        </h6>
      </div>
      <div className="folder-dots">
        <Dropdown
          trigger={["hover"]}
          overlay={
            <div className="hiring-overlay hiring-overlay-shadow">
              <DropdownItem onClick={onEdit}>
                {VACANCIES.DROPDOWN.EDIT_FOLDER}
              </DropdownItem>
              <DropdownItem onClick={onDelete} isDelete>
                {VACANCIES.DROPDOWN.DELETE}
              </DropdownItem>
            </div>
          }
        >
          <MoreVertical />
        </Dropdown>
      </div>
    </div>
  );
}

export function AddFolder({ onClick }) {
  const { VACANCIES } = useTranslation();

  return (
    <div onClick={onClick} className="add-folder-container">
      <span>{VACANCIES.ADD_VACANCIES}</span>
    </div>
  );
}
