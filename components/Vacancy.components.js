import { Dropdown } from "antd";
import React from "react";
import { MoreVertical, Eye, Share } from "react-feather";
import DropdownItem from "../base/DropdownItem.base";
import { useTranslation } from "../contexts/LocalizeContext";

export default function Vacancy({
  state,
  title,
  shortDescription,
  candidates,
  _id,
  _key,
  onClick,
  onShare,
  onDiscard,
  onShow,
  onEdit,
  onDelete,
  onReOpen,
}) {
  const {
    VACANCIES: { CANDIDATES, DROPDOWN },
  } = useTranslation();
  return (
    <div
      key={_key}
      className="vacancy-container"
      onClick={(e) => {
        let className = e.target.className + "";
        console.log(className);
        !className.includes("hiring-overlay") && onClick();
      }}
    >
      <div className="vacancy-t">
        <h3 className="vacancy-t-l">{title}</h3>
        <div className="hiring-overlay">
          <Dropdown
            trigger={["hover"]}
            overlay={
              <div className="hiring-overlay hiring-overlay-shadow">
                {state === "ACTIVE" ? (
                  <DropdownItem onClick={onShare}>
                    {DROPDOWN.SHARE}
                  </DropdownItem>
                ) : null}
                {state === "ACTIVE" ? (
                  <DropdownItem onClick={onShow}>{DROPDOWN.SHOW}</DropdownItem>
                ) : null}

                {state === "ACTIVE" ? null : (
                  <DropdownItem onClick={onReOpen}>
                    {DROPDOWN.REOPEN}
                  </DropdownItem>
                )}

                <DropdownItem onClick={onEdit}>{DROPDOWN.EDIT}</DropdownItem>

                {state === "ACTIVE" ? (
                  <DropdownItem onClick={onDiscard} isDelete>
                    {DROPDOWN.CLOSE}
                  </DropdownItem>
                ) : (
                  <DropdownItem onClick={onDelete} isDelete>
                    {DROPDOWN.DELETE}
                  </DropdownItem>
                )}
              </div>
            }
          >
            <MoreVertical
              style={{ color: "#CAD7E6" }}
              className="hiring-overlay vacancy-t-r"
            />
          </Dropdown>
        </div>
      </div>
      <p className="vacancy-d">{shortDescription}</p>
      <div className="vacancy-b">
        <span
          className="vacancy-b-l"
          style={{ color: state === "ACTIVE" ? "#00A0FF" : "#FF4847" }}
        >
          {candidates} {CANDIDATES}
        </span>
        <div className="vacancy-b-r">
          <Eye style={{ height: 16, color: "#CAD7E6" }} />
          <Share style={{ height: 16, color: "#CAD7E6" }} />
        </div>
      </div>
    </div>
  );
}
