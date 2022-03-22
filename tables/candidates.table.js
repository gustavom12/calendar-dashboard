import React from "react";
import ActionBase from "../base/Action.base";

const renderTable = (locale, push, deleteOne) => {
  return [
    {
      name: "",
      dataIntex: "image",
      key: "image",
      width: 80,
      render: (text, record) => (
        <img src={record.image || "/assets/svg/avatar.svg"} />
      ),
    },
    {
      name: "name",
      title: locale.NAME,
      dataIntex: "name",
      key: "name",
      render: (text, record) => <span>{record.personalData.firstName}</span>,
    },
    {
      name: locale.LAST_NAME,
      title: locale.LAST_NAME,
      dataIntex: "lastName",
      key: "lastName",
      render: (text, record) => <span>{record.personalData.lastName}</span>,
    },
    {
      title: locale.POSITION,
      name: locale.POSITION,
      dataIntex: "position",
      key: "position",
      render: (text, record) => <span>{record.position}</span>,
    },
    {
      title: locale.LOCATION,
      name: locale.LOCATION,
      dataIntex: "location",
      key: "location",
      render: (text, record) => <span>{record.location || "-"}</span>,
    },
    {
      title: (
        <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {locale.ACTIONS}
        </span>
      ),
      name: locale.ACTIONS,
      dataIntex: "actions",
      key: "actions",
      render: (text, record) => (
        <span style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <ActionBase
            type="view"
            handleClick={() => {
              push(`/candidates/${record._id}`);
            }}
          />
          {/* <ActionBase type="edit" handleClick={() => {}} /> */}
          <ActionBase
            type="delete"
            handleClick={() => {
              deleteOne(record._id);
            }}
          />
        </span>
      ),
    },
  ];
};

export default renderTable;
