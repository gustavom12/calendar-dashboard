import React, { useState, useEffect } from "react";
import { Tabs, Table } from "antd";
import { FormattedMessage } from "../translate/fake_react_intl";
import moment from "moment";
import Action from "../base/Action";
import User from "../../../entities/user";
import { EventCalendar } from "../../../entities/eventCalendar";
import NotData from "../notData";
import EditModal from "./editModal";

const SavedEvents = ({ timezone }) => {
  const [filter, setFilter] = useState("next");
  const userClass = new User();
  const [editModal, setEditModal] = useState(null);
  const eventCalendarClass = new EventCalendar();
  const [savedevents, setSavedEvents] = useState([]);

  const getData = () => {
    userClass.currentAccount().then((res) => {
      eventCalendarClass
        .getAdminSavedEvent(res._id)
        .then((data) => setSavedEvents(data))
        .catch(console.log);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      icon: "icon",
      title: (
        <a
          style={{
            fontWeight: "bolder",
            width: "100%",
            display: "block",
            textAlign: "left",
          }}
        >
          <FormattedMessage id="Date" />
        </a>
      ),
      // className: 'column-title text-center',
      dataIndex: "start",
      key: "start",
      render: (start) => <div className="text-left">{start.split("T")[0]}</div>,
      // sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      icon: "icon",
      title: (
        <a
          style={{
            fontWeight: "bolder",
            width: "100%",
            display: "block",
            textAlign: "left",
          }}
        >
          <FormattedMessage id="Horario" />
        </a>
      ),
      // className: 'column-title text-center',
      dataIndex: "duration",
      key: "duration",
      render: (start, record) => (
        <div className="text-left">
          {moment(record?.start)
            // .add(timezone, "minutes")
            .format("HH:mm")}{" "}
          -{" "}
          {moment(record?.start)
            .add(record?.duration, "minutes")
            // .add(timezone, "minutes")
            .format("HH:mm")}
        </div>
      ),
      // sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      icon: "icon",
      title: (
        <a
          style={{
            fontWeight: "bolder",
            width: "100%",
            display: "block",
            textAlign: "left",
          }}
        >
          <FormattedMessage id="Inviteds" />
        </a>
      ),
      // className: 'column-title text-center',
      dataIndex: "fullName",
      key: "fullName",
      width: 180,
      render: (_, record) => (
        <div className="text-left table-text-one-row" title={record?.clients.map((v, i) => v.name).join(" - ")}>
          {record?.clients.map((v, i) => (v.name)).join(" - ")}
        </div>
      ),
    },
    {
      icon: "icon",
      title: (
        <a
          style={{
            fontWeight: "bolder",
            width: "100%",
            display: "block",
            textAlign: "left",
          }}
        >
          <FormattedMessage id="Tipo de evento" />
        </a>
      ),
      // className: 'column-title text-center',
      dataIndex: "title",
      key: "title",
      render: (title) => <div className="text-left">{title}</div>,
      // sorter: (a, b) => a.lastname.localeCompare(b.lastname),
    },
    {
      className: "column-title text-center",
      dataIndex: "Actions",
      title: <FormattedMessage id="Actions" />,
      key: "action",
      image: "image",
      fixed: "right",
      render: (i, record) => (
        <div className="d-flex justify-content-center">
          <Action
            type="edit"
            className="ml-3"
            handleClick={() => {
              setEditModal(record);
            }}
          />
          <Action
            type="delete"
            className="ml-3"
            handleClick={() => {
              eventCalendarClass
                .deleteAdminSavedEvent(record._id)
                .then(() => {
                  setSavedEvents((val) =>
                    val.filter((v) => v._id !== record._id)
                  );
                })
                .catch(console.log);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="SavedEvents p-4">
      <Tabs activeKey={filter} onChange={(v) => setFilter(v)}>
        <Tabs.TabPane
          tab={
            <span
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.6667 2.05591H2.33333C1.59695 2.05591 1 2.65286 1 3.38924V12.7226C1 13.459 1.59695 14.0559 2.33333 14.0559H11.6667C12.403 14.0559 13 13.459 13 12.7226V3.38924C13 2.65286 12.403 2.05591 11.6667 2.05591Z"
                  stroke={filter === "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.41176"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.66602 0.722168V3.38883"
                  stroke={filter === "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.41176"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.33398 0.722168V3.38883"
                  stroke={filter === "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.41176"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6.05566H13"
                  stroke={filter === "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.41176"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  marginLeft: "8px",
                  marginTop: 3,
                  color: filter === "next" ? "#3424e9" : "#595c97",
                }}
              >
                <FormattedMessage id="Próximos" />
              </span>
            </span>
          }
          key="next"
        >
          {savedevents?.filter((a) => moment(a.start).isSameOrAfter(moment()))
            ?.length ? (
            <Table
              columns={columns}
              dataSource={savedevents
                ?.filter((a) => moment(a.start).isSameOrAfter(moment()))
                .sort((a, b) => new Date(b.start) - new Date(a.start))}
              scroll={{ x: "max-content" }}
              style={{
                minHeight:
                  savedevents
                    ?.filter((a) => moment(a.start).isSameOrAfter(moment()))
                    .sort((a, b) => new Date(b.start) - new Date(a.start))
                    .length && 500,
              }}
              pagination={{
                total: savedevents?.length || 0,
                range: [1, savedevents?.length],
                showTotal: (total, range) => (
                  <div className="results">
                    <FormattedMessage id="showingResultsShowing" />
                    <span>{range[0]} </span>
                    <FormattedMessage id="showingResultsTo" />
                    <span>{range[1]} </span>
                    <FormattedMessage id="showingResultsOf" />
                    <span>{total} </span>
                    <FormattedMessage id="showingResultsRecords" />
                  </div>
                ),
                defaultPageSize: 10,
                defaultCurrent: 1,
                hideOnSinglePage: true,
                showSizeChanger: false,
              }}
            />
          ) : (
            <NotData
              title="Aún no hay eventos"
              description="Compartir enlaces del tipo de evento con los eventos programados"
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 14.75C11.7279 14.75 14.75 11.7279 14.75 8C14.75 4.27208 11.7279 1.25 8 1.25C4.27208 1.25 1.25 4.27208 1.25 8C1.25 11.7279 4.27208 14.75 8 14.75Z"
                  stroke={filter !== "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 3.94995V7.99995L10.7 9.34995"
                  stroke={filter !== "next" ? "#3424e9" : "#595c97"}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                style={{
                  marginLeft: "8px",
                  marginTop: 0,
                  color: filter !== "next" ? "#3424e9" : "#868EB7",
                }}
              >
                <FormattedMessage id="Pasados" />
              </span>
            </span>
          }
          key="prev"
        >
          {savedevents?.filter((a) => moment(a.start).isBefore(moment()))
            ?.length ? (
            <Table
              columns={columns}
              dataSource={savedevents
                ?.filter((a) => moment(a.start).isBefore(moment()))
                .sort((a, b) => new Date(b.start) - new Date(a.start))}
              scroll={{ x: "max-content" }}
              pagination={{
                total: savedevents?.length || 0,
                range: [1, savedevents?.length],
                showTotal: (total, range) => (
                  <div className="results">
                    <FormattedMessage id="showingResultsShowing" />
                    <span>{range[0]} </span>
                    <FormattedMessage id="showingResultsTo" />
                    <span>{range[1]} </span>
                    <FormattedMessage id="showingResultsOf" />
                    <span>{total} </span>
                    <FormattedMessage id="showingResultsRecords" />
                  </div>
                ),
                defaultPageSize: 10,
                defaultCurrent: 1,
                hideOnSinglePage: true,
                showSizeChanger: false,
              }}
            />
          ) : (
            <NotData
              title="Aún no hay eventos"
              description="Compartir enlaces del tipo de evento con los eventos programados"
            />
          )}
        </Tabs.TabPane>
      </Tabs>
      <EditModal
        getData={getData}
        editModal={editModal}
        setEditModal={setEditModal}
      />
    </div>
  );
};

export default SavedEvents;
