import React, { useState } from "react";
import { Tabs } from "antd";
import { useTranslation } from "../contexts/LocalizeContext";

const { TabPane } = Tabs;

export default function EventsView() {
  const [key, setKey] = useState("1");
  const {
    CALENDAR: { EVENTS },
  } = useTranslation();
  return (
    <div>
      <Tabs defaultActiveKey="1" activeKey={key} onChange={setKey}>
        <TabPane tab={EVENTS.TABS.FOLLOWING} key="1"></TabPane>
        <TabPane tab={EVENTS.TABS.PENDING} key="2"></TabPane>
        <TabPane tab={EVENTS.TABS.PAST} key="3"></TabPane>
      </Tabs>
    </div>
  );
}
