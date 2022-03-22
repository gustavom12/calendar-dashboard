import React from "react";
import ActionBase from "../base/Action.base";

const renderTable = (locale, push, deleteOne) => {
  return [
    {
      name: locale.TEST,
      title: locale.TEST,
      dataIntex: "test",
      key: "test",
      render: (text, record) => <span>{record.test}</span>,
    },
    {
      name: locale.VACANCY,
      title: locale.VACANCY,
      dataIntex: "vacancy",
      key: "vacancy",
      render: (text, record) => <span>{record.vacancy}</span>,
    },
    {
      title: locale.DATE,
      name: locale.DATE,
      dataIntex: "date",
      key: "date",
      render: (text, record) => <span>{record.date}</span>,
    },
    {
      title: locale.RESULT,
      name: locale.RESULT,
      dataIntex: "result",
      key: "result",
      render: (text, record) => <span>{record.result}</span>,
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
              // push(`/candidates/${record._id}`);
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
