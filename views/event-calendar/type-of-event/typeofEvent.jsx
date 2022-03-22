/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { Button, Dropdown, Menu } from "antd";
import { FormattedMessage, intl } from "../translate/fake_react_intl";
import NotificationGenerator from "../base/NotificationGenerator";
import Userc from "../../../entities/user";
import { EventCalendar } from "../../../entities/eventCalendar";
import CreateEditModal from "./create-edit-modal/createEditModal";
import NotData from "../notData";

function TypeofEvent() {
  const [createEditModal, setCreateEditModal] = useState(null);
  const [User, setUser] = useState("");
  const [typeOfEvents, setTypeOfEvents] = useState([]);
  const UserClass = new Userc();
  const EventCalendarClass = new EventCalendar();
  const url = "http://localhost:8080/";
  useEffect(() => {
    UserClass.currentAccount().then((res) => {
      setUser(res);
      EventCalendarClass.getEventTypes(res._id)
        .then((data) => setTypeOfEvents(data))
        .catch(console.log);
    });
  }, []);

  return (
    <div className="TypeofEvent">
      <div className="top justify-content-between d-flex w-100">
        <h5>
          <strong>
            <FormattedMessage id="Events" />
          </strong>
        </h5>
        <Button className="btn-purple" onClick={() => setCreateEditModal(true)}>
          <FormattedMessage id="Create" />
        </Button>
      </div>
      {typeOfEvents.length ? (
        <div className="eventstypes d-flex">
          {typeOfEvents?.map((eventType, i) => (
            <div className="eventType" key={i}>
              <div className="typetop">
                <div className="d-flex justify-content-between mb-2">
                  <span>
                    {eventType?.type?.type_enum === "meet" && (
                      <img src="/assets/meet.svg" alt="" />
                    )}
                    {eventType?.type?.type_enum === "face_to_face" && (
                      <img height={16} width={15} src="/assets/facetoface.svg" alt="" />
                    )}
                  </span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <>
                          <Menu.Item
                            onClick={() => setCreateEditModal(eventType)}
                            className="border-bottom"
                            key="0"
                          >
                            <div className="d-flex px-3">
                              <img
                                src="/assets/edit.svg"
                                style={{ marginRight: 10 }}
                                alt=""
                              />
                              <FormattedMessage id="Edit" />
                            </div>
                          </Menu.Item>
                          {/* <Menu.Divider /> */}
                          <Menu.Item
                            onClick={() => {
                              EventCalendarClass.createEventType({
                                ...eventType,
                                title: `${eventType.title} 1`,
                                _id: undefined,
                              })
                                .then((res) => {
                                  setTypeOfEvents((val) => [...val, res]);
                                })
                                .catch(() => {});
                            }}
                            className="border-bottom"
                            key="1"
                          >
                            <div className="d-flex px-3">
                              <img
                                src="/assets/copygray.svg"
                                alt=""
                                style={{ marginRight: 10 }}
                              />
                              <FormattedMessage id="Clone" />
                            </div>
                          </Menu.Item>
                          {/* <Menu.Divider /> */}
                          <Menu.Item
                            className="border-bottom"
                            key="3"
                            onClick={() => {
                              EventCalendarClass.deleteEventType(eventType._id)
                                .then(() => {
                                  setTypeOfEvents((val) =>
                                    val.filter((a) => a._id !== eventType._id)
                                  );
                                })
                                .catch(() => {});
                            }}
                          >
                            <div className="d-flex px-3">
                              <img
                                src="/assets/delete.svg"
                                alt=""
                                style={{ marginRight: 10 }}
                              />
                              <FormattedMessage id="Delete" />
                            </div>
                          </Menu.Item>
                        </>
                      </Menu>
                    }
                    trigger={["click"]}
                  >
                    <span className="cursor-pointer">
                      <img style={{ marginRight: 4 }} src="/assets/config.svg" alt="" />
                      <img src="/assets/arrowdown.svg" alt="" />
                    </span>
                  </Dropdown>
                </div>
                <span style={{ color: "#262D42", fontWeight: 600 }}>
                  {eventType?.title}
                </span>
                <div style={{ color: "#A1ACC2", marginTop: 5 }}>
                  <FormattedMessage id="Duration" />: {eventType.duration} min
                </div>
                <a
                  href={`${url}/adm/${User._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple"
                  style={{ marginTop: 5 }}
                >
                  <FormattedMessage id="Ver la página de reservas" />
                </a>
              </div>
              <div className="bottom d-flex justify-content-between">
                <a
                  className="text-purple cursor-pointer"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(`${url}/adm/${User._id}`)
                      .then(() => {
                        NotificationGenerator(
                          "Copiado en el portapapeles",
                          intl,
                          false
                        );
                      });
                  }}
                >
                  <img src="/assets/copy.svg" style={{ marginRight: 10 }} alt="" />
                  <FormattedMessage id="Copiar enlace" />
                </a>
                {/* <Button className="btn-purple-border">
                  <FormattedMessage id="Share" />
                </Button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotData
          title="Aún no hay tipos de eventos"
          // description="Compartir enlaces del tipo de evento con los eventos programados"
        />
      )}
      <CreateEditModal
        setTypeOfEvents={setTypeOfEvents}
        typeOfEvents={typeOfEvents}
        createEditModal={createEditModal}
        setCreateEditModal={setCreateEditModal}
        User={User}
      />
    </div>
  );
}
export default TypeofEvent;
