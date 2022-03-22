/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal, Button } from "antd";
import { FormattedMessage } from "../../translate/fake_react_intl";
import TitleGenerator from "../../base/TitleGenerator";
import { EventCalendar } from "../../../../entities/eventCalendar";
import FromTo from "./fromTos/fromToDay";
import { toMiliseconds } from "../../helpers/momentHelpers";

function ConfigModal({
  configModal,
  setConfigModal,
  daysConfig,
  setDaysConfig,
  timezone,
  configId,
  parseConfig,
}) {
  const [NotRealDaysConfig, setNotRealDaysConfig] = useState(daysConfig);
  useEffect(() => {
    setNotRealDaysConfig(daysConfig);
  }, [daysConfig]);
  const EventCalendarClass = new EventCalendar();

  const onSubmit = () => {
    // console.log({NotRealDaysConfig})
    const arr = parseConfig(NotRealDaysConfig, timezone, true);
    EventCalendarClass.createUpdateAvailability({
      adminId: configId.userId,
      _id: configId.configId,
      config: arr,
    });
    setDaysConfig(
      Object.values(NotRealDaysConfig).map((el) =>
        el.active && el.default ? { ...el, default: false } : el
      )
    );
    setConfigModal(false);
  };
  return (
    <Modal
      style={{ width: 400 }}
      visible={configModal}
      onCancel={() => setConfigModal(false)}
      footer={null}
      className="configModalCont createeventypemodal"
      width={400}
      title={
        <h5 className="mb-0 mt-1 ">
          <strong>
            <FormattedMessage id="Configurate availability" />
          </strong>
        </h5>
      }
    >
      <div className="body">
        <div className="fw-bold">
          <TitleGenerator id="Configurate your weekly available hours" />
        </div>
      </div>
      <div className="days d-flex">
        {Object.entries(NotRealDaysConfig)?.map((day, i) => (
          <div
            className={"day  " + (day[1].active ? "active" : "")}
            key={i}
            onClick={() => {
              setNotRealDaysConfig({
                ...NotRealDaysConfig,
                [i]: {
                  ...NotRealDaysConfig[i],
                  active: !NotRealDaysConfig[i].active,
                },
              });
            }}
          >
            <FormattedMessage id={`weekday${i}`} />
          </div>
        ))}
      </div>
      <div className="fromtos">
        {Object.entries(NotRealDaysConfig)?.map(
          (day, i) =>
            day[1].active && (
              <div
                className={"fromto " + (day[1].active ? "active" : "")}
                key={i}
              >
                <FromTo
                  daysConfig={NotRealDaysConfig}
                  setDaysConfig={setNotRealDaysConfig}
                  day={day[1]}
                  i={i}
                />
              </div>
            )
        )}
      </div>
      <Button
        onClick={onSubmit}
        className="w-100 btn-purple"
        style={{ marginTop: 30 }}
      >
        <FormattedMessage id="Save" />
      </Button>
    </Modal>
  );
}
export default ConfigModal;
