import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import {
  FormattedMessage,
  translate,
} from "../../../translate/fake_react_intl";
import TitleGenerator from "../../../base/TitleGenerator";
import { EventCalendar } from "../../../../../entities/eventCalendar";
import FromTo from "../fromTos/fromToDay";
import apiConnection from "../../../../../pages/api/api-connection";
import { parseConfig } from "../../../helpers/parseConfig";
import { useAuth } from "../../../../../contexts/AuthContext";

function UpdateDay({
  daysConfig,
  selectedDay,
  selectedDayModal,
  setSelectedDayModal,
  timezone,
}) {
  const { user } = useAuth();
  const [singleDay, setSingleDay] = useState({
    updated: false,
    default: true,
    active: false,
    day: 0,
    config: [
      {
        fromFormat: "12:00",
        toFormat: "12:00",
      },
    ],
  });

  useEffect(() => {
    if (daysConfig) {
      Object.entries(daysConfig)?.map(([key, day], i) => {
        if (day.day === selectedDay.weekday()) {
          setSingleDay(day);
          console.log({ day, selectedDayModal });
        }
      });
    }
    if (selectedDayModal && selectedDayModal !== true) {
      setSingleDay(selectedDayModal);
    }
  }, [daysConfig, selectedDay]);
  const onSubmit = async () => {
    try {
      if (singleDay.updated) {
        console.log({ singleDay, selectedDay, selectedDayModal });
        const arr = parseConfig(singleDay, timezone, true, singleDay.day);
        const response = await apiConnection.post(
          `/users/adminConfig/single-day`,
          { adminId: user._id, config: arr, date: selectedDay.toDate() }
        );
        console.log({ arr, response });
      }
      setSelectedDayModal(false);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Modal
      style={{ width: 400 }}
      visible={selectedDayModal}
      onCancel={() => setSelectedDayModal(false)}
      footer={null}
      className="configModalCont createeventypemodal"
      width={400}
      title={
        <h5 className="mb-0 mt-1 ">
          <strong>
            Configura tu disponibilidad del día{" "}
            {translate(selectedDay?.format("dddd"))}{" "}
            {selectedDay?.format("DD-MM-YYYY") || ""}
          </strong>
        </h5>
      }
    >
      <div className="body">
        <div className="fw-bold">
          {selectedDayModal === true ? (
            <TitleGenerator id="Estos horarios solo afectarán el día seleccionado" />
          ) : (
            <TitleGenerator id="Estos horarios no forman parte de la plantilla, solo afectan el día seleccionado" />
          )}
        </div>
      </div>
      <div className="fromtos mt-4">
        {singleDay.day === selectedDay.weekday() && (
          <div className={"fromto" + (singleDay.active ? "active" : "")}>
            {singleDay.config?.length && singleDay.default !== true ? (
              <FromTo
                daysConfig={{ [selectedDay.weekday()]: singleDay }}
                setDaysConfig={setSingleDay}
                isSingleDay
                day={singleDay}
                i={selectedDay.weekday()}
              />
            ) : (
              <div>
                {" "}
                <p>
                  {" "}
                  No tienes turnos en este día.{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setSingleDay((val) => {
                        return {
                          ...val,
                          updated: true,
                          default: false,
                          config: [
                            {
                              fromFormat: "09:00",
                              toFormat: "12:00",
                            },
                          ],
                        };
                      });
                    }}
                  >
                    AGREGAR TURNO
                  </a>{" "}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Button
        onClick={onSubmit}
        className="w-100 btn-purple mt-5"
        style={{ marginTop: 30 }}
      >
        <FormattedMessage id="Save" />
      </Button>
    </Modal>
  );
}
export default UpdateDay;
