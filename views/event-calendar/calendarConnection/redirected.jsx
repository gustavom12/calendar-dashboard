import React, { useEffect } from "react";
// import Loader from 'components/fichap-admin/layout/Loader'
import { EventCalendar } from "../../../entities/eventCalendar";
import User from "../../../entities/user";

const GoogleCalendarConectionRedirect = () => {
  const EventCalendarClass = new EventCalendar();
  const UserClass = new User();

  useEffect(() => {
    // console.log(query, query.get('code'))
    console.log(window?.location?.href?.includes("?code"));
    if (window?.location?.href?.includes("?code")) {
      const token = window?.location?.href?.split("?code=")[1].split("&")[0];
      console.log(window?.location?.href?.split("?code=")[1].split("&")[0]);
      UserClass.currentAccount()
        .then((res) => {
          EventCalendarClass.saveToken(res._id, token)
            .then((res) => {
              window.close();
              console.log({ res });
            })
            .catch((err) => {
              console.log({ err });
            });
        })
        .catch(console.log);
    }
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      className="GoogleCalendarConectionRedirect flex-center-important"
    >
      {/* <Loader /> */}
      <span>loading...</span>
    </div>
  );
};

export default GoogleCalendarConectionRedirect;
