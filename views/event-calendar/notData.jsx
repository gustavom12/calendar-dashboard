import React from "react";
import { FormattedMessage } from "./translate/fake_react_intl";


const NotData = ({ title, description }) => {
  return (
    <div
      className="notData flex-column"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "120px",
      }}
    >
      <img style={{ width: 100 }} src={"/assets/notdata.svg"} alt="" />
      <h5
        className="mt-4"
        style={{ color: "#7D7D7D", fontWeight: 600, fontSize: 20 }}
      >
        <strong>
          <FormattedMessage id={title} />
        </strong>
      </h5>
      {description && (
        <h5
          className="mt-3"
          style={{ color: "#7D7D7D", fontWeight: 500, fontSize: 16 }}
        >
          <FormattedMessage id={description || " "} />
        </h5>
      )}
    </div>
  );
};

export default NotData;
