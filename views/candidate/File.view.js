import React, { useState } from "react";
import { Tabs } from "antd";
import { useTranslation } from "../../contexts/LocalizeContext";
import PersonalTab from "./file/Personal.tab";
import ExperienceTab from "./file/Experience.tab";
import ContactTab from "./file/Contact.tab";
import EducationTab from "./file/Education.tab";

const { TabPane } = Tabs;

export default function File({ candidate }) {
  const [key, setKey] = useState("1");
  const {
    CANDIDATES: { FILE },
  } = useTranslation();
  return (
    <div>
      <Tabs defaultActiveKey="1" activeKey={key} onChange={setKey}>
        <TabPane tab={FILE.TABS.PERSONAL} key="1">
          <PersonalTab candidate={candidate} />
        </TabPane>
        <TabPane tab={FILE.TABS.EXPERIENCE} key="2">
          <ExperienceTab />
        </TabPane>
        <TabPane tab={FILE.TABS.CONTACT} key="3">
          <ContactTab />
        </TabPane>
        <TabPane tab={FILE.TABS.EDUCATION} key="4">
          <EducationTab />
        </TabPane>
      </Tabs>
    </div>
  );
}
