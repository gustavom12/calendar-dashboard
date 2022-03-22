import React from "react";
import { useTranslation } from "../../contexts/LocalizeContext";
import { Table } from "antd";
import moment from "moment";
import ProgressBar from "../../base/progressBar";

const VacanciesTable = ({ activeVacancies }) => {
  const { DASHBOARD } = useTranslation();
  const columns = [
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.VACANCIE}{" "}
        </span>
      ),
      dataIndex: "title",
      key: "title",
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.CANDIDATES}{" "}
        </span>
      ),
      dataIndex: "candidates",
      key: "candidates",
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.PUBLICATION}{" "}
        </span>
      ),
      dataIndex: "started",
      key: "started",
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.EXPIRES}{" "}
        </span>
      ),
      dataIndex: "expires",
      key: "expires",
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.DAYS_ACTIVE}{" "}
        </span>
      ),
      dataIndex: "activedays",
      key: "activedays",
      render: (_, record) => (
        <span>
          {" "}
          {Math.abs(
            moment(record.started, "DD/MM/yyyy").diff(moment(), "days")
          )}{" "}
        </span>
      ),
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.DAYS_EXPIRED}{" "}
        </span>
      ),
      dataIndex: "expiresdays",
      key: "expiresdays",
      render: (_, record) => (
        <span>
          {" "}
          {moment(record.expires, "DD/MM/yyyy").diff(moment(), "days") > 0
            ? moment(record.expires, "DD/MM/yyyy").diff(moment(), "days")
            : 0}{" "}
        </span>
      ),
    },
    {
      icon: "icon",
      title: (
        <span style={{ color: "#A1ACC2", fontSize: 14, fontWeight: 400 }}>
          {" "}
          {DASHBOARD.COLUMNS.STATE}{" "}
        </span>
      ),
      dataIndex: "expiresdays",
      key: "expiresdays",
      render: (_, record) => (
        <span>
          <ProgressBar start={record.started} end={record.expires} />
          {/* {moment(record.expires, "DD/MM/yyyy").diff(moment(), "days") > 0
            ? moment(record.expires, "DD/MM/yyyy").diff(moment(), "days")
            : 0}{" "} */}
        </span>
      ),
    },
  ];
  return (
    <div className="VacanciesTable card_group">
      <h5 className="title"> {DASHBOARD.TABLE} </h5>
      <div className="cardBody">
        <div className="scrollable">
          <Table
            columns={columns}
            dataSource={activeVacancies}
            scroll={{ x: "fit-content" }}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default VacanciesTable;
