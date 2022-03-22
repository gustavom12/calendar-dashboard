import React, { useEffect, useState } from "react";
import { FormattedMessage } from "../translate/fake_react_intl";
import { Button } from "antd";
import { EventCalendar } from "../../../entities/eventCalendar";
import User from "../../../entities/user";

const CalendarConnection = () => {
  const EventCalendarClass = new EventCalendar();
  const UserClass = new User();
  const [isConnected, setIsConnected] = useState(false);
  const [UserId, setUserId] = useState(false);
  const checkIsConnected = () => {
    UserClass.currentAccount().then((res) => {
      setUserId(res._id);
      EventCalendarClass.userIsConnectedWithCalendar(res._id)
        .then((data) => {
          setIsConnected(data);
        })
        .catch(console.log);
    });
  };
  useEffect(() => {
    checkIsConnected();
  }, []);

  const disconnect = () => {
    EventCalendarClass.deleteUserGoogleToken(UserId)
      .then(() => {
        setIsConnected(false);
      })
      .catch(console.log);
  };

  const connect = (typeOfConnection = "google") => {
    if (typeOfConnection === "google") {
      EventCalendarClass.connectWithGoogleCalendarURL()
        .then((data) => {
          window.open(
            data,
            "mywindow",
            "menubar=1,resizable=1,width=400,height=600,top=300,left=300"
          );
          const interval = setInterval(() => {
            if (isConnected) return clearInterval(interval);
            checkIsConnected();
          }, 2500);
        })
        .catch(console.log);
    }
  };
  return (
    <div className="CalendarConnection">
      <h5 className="d-none connectiontitle">
        {" "}
        <FormattedMessage id="Select calendar" />{" "}
      </h5>
      <div className="card">
        <div className="titlecard d-flex">
          <img
            style={{ width: 20, marginRight: 8 }}
            src="/assets/google.svg"
            alt=""
          />
          <span>Google</span>
        </div>
        <div className="subcard">
          <span>
            <img
              src="/assets/calendargoogle.svg"
              alt=""
              style={{ marginRight: 8 }}
            />
            <FormattedMessage id="Calendario de Google" />{" "}
          </span>
          {!isConnected ? (
            <Button
              onClick={() => connect()}
              className="btn-violet-important"
              style={{
                height: 36,
                width: 136,
              }}
            >
              <FormattedMessage id="Connect" />
            </Button>
          ) : (
            <Button
              onClick={disconnect}
              className="btn-violet-inverted-important"
              style={{
                height: 36,
                width: 136,
              }}
            >
              <FormattedMessage id="Disconnect" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarConnection;
