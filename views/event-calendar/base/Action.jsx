import React from "react";
import { Tooltip, Popconfirm } from "antd";
// import downloadBlue from "../assets/svg/downloadBlue.svg";
import { FormattedMessage } from "../translate/fake_react_intl";

const customColors = ["#fff"];

const Action = ({
  type,
  handleClick,
  handleCancel,
  className = "",
  styles = {},
  popClassName,
}) => {
  switch (type) {
    case "view":
      return (
        <div
          role="presentation"
          onClick={handleClick}
          className={`action__container ${className}`}
          style={styles}
        >
          <Tooltip
            color={customColors}
            placement="top"
            title={<FormattedMessage id="actionView" />}
          >
            <img
              src="/assets/svg/view.svg"
              alt="view"
              style={{ pointerEvents: "none" }}
            />
          </Tooltip>
        </div>
      );

    case "delete":
      return (
        <div
          role="presentation"
          className={`action__container ${className}`}
          style={styles}
        >
          <Popconfirm
            title={<FormattedMessage id="AreYouSure" />}
            okText={<FormattedMessage id="Delete" />}
            className={popClassName}
            onCancel={handleCancel}
            onConfirm={handleClick}
            cancelText={<FormattedMessage id="Cancel" />}
          >
            <Tooltip
              color={customColors}
              placement="right"
              // title={<FormattedMessage id="Delete" />}
              className="ml-3"
            >
              <img src="/assets/svg/delete.svg" alt="delete" />
            </Tooltip>
          </Popconfirm>
        </div>
      );

    case "deletepop":
      return (
        <div
          role="presentation"
          onClick={handleClick}
          className={`action__container ${className}`}
          style={styles}
        >
          <Tooltip
            placement="top"
            color={customColors}
            title={<FormattedMessage id="Delete" />}
          >
            <img src="/assets/svg/delete.svg" alt="delete" />
          </Tooltip>
        </div>
      );

    case "edit":
      return (
        <div
          role="presentation"
          onClick={handleClick}
          className={`action__container ${className}`}
          style={styles}
        >
          <Tooltip
            placement="top"
            color={customColors}
            title={<FormattedMessage id="Edit" />}
          >
            <img
              src="/assets/svg/edit.svg"
              alt="edit"
              style={{ pointerEvents: "none" }}
            />
          </Tooltip>
        </div>
      );
    case "download":
      return (
        <div
          role="presentation"
          onClick={handleClick}
          className={`action__container ${className}`}
          style={styles}
        >
          <Tooltip
            placement="top"
            color={customColors}
            title={<FormattedMessage id="Download" />}
          >
            <img
              src="assets/svg/downloadBlue.svg"
              alt="edit"
              style={{ pointerEvents: "none" }}
            />
          </Tooltip>
        </div>
      );

    default:
      return null;
  }
};

export default Action;
