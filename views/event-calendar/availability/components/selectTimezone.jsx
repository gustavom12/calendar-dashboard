import React, { } from "react";
import {Select} from "antd"
import { timezoneData } from "./timezonedata";

function SelectTimezone({ timezone, setTimezone }) {
  return (
    <span className="selectTimezone d-flex align-items-center" style={{ marginTop: 15 }}>
      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5001 21.0833C16.7928 21.0833 21.0834 16.7927 21.0834 11.5C21.0834 6.20728 16.7928 1.91667 11.5001 1.91667C6.20735 1.91667 1.91675 6.20728 1.91675 11.5C1.91675 16.7927 6.20735 21.0833 11.5001 21.0833Z" stroke="#695ee8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1.91675 11.5H21.0834" stroke="#695ee8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.5001 1.91667C13.8971 4.54093 15.2594 7.94654 15.3334 11.5C15.2594 15.0535 13.8971 18.4591 11.5001 21.0833C9.10302 18.4591 7.74078 15.0535 7.66675 11.5C7.74078 7.94654 9.10302 4.54093 11.5001 1.91667V1.91667Z" stroke="#695ee8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Select
        className="selectorTimezone"
        style={{width: 220, border: "none"}}
        bordered={false}
        onChange={(v)=>setTimezone(v)}
        value={timezone}
      >
        {timezoneData.map((el, i)=>
        <Select.Option key={i} value={el.value}>
          {el.label}
        </Select.Option>
        )}
      </Select>
    </span>
  )
}
export default SelectTimezone
