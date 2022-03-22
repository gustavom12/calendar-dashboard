import { withRouter } from "next/router";
import React, { useRef } from "react";
import { MoreVertical } from "react-feather";
import Header from "../../../components/Header.components";
import Page from "../../../layouts/page.layout";
import Section from "../../../layouts/section.layout";
import dynamic from "next/dynamic";
import { Dropdown } from "antd";
import DropdownItem from "../../../base/DropdownItem.base";
import { useTranslation } from "../../../contexts/LocalizeContext";
import ShareVacancyModal from "../../../modals/vacancies/ShareVacancy.modal";
import ShowVacancyModal from "../../../modals/vacancies/ShowVacancy.modal";
import DeleteVacancyModal from "../../../modals/vacancies/DeleteVacancy.modal";

const DynamicKanban = dynamic(
  () => import("../../../components/Kanban.components"),
  { ssr: false }
);

function Funnel({ router: { query } }) {
  const {
    VACANCIES: { DROPDOWN },
  } = useTranslation();
  const shareRef = useRef();
  const showRef = useRef();
  const deleteRef = useRef();

  return (
    <Section>
      <ShareVacancyModal ref={shareRef} />
      <ShowVacancyModal ref={showRef} />
      <DeleteVacancyModal ref={deleteRef} />
      <Header withBackbutton title={query?.title}>
        <div style={{ cursor: "pointer" }}>
          <Dropdown
            trigger={["click"]}
            overlay={
              <div className="hiring-overlay hiring-overlay-shadow">
                <DropdownItem
                  onClick={() =>
                    shareRef.current.open({
                      ...query,
                      title: query.title,
                      _id: query.id,
                      folder: "",
                      status: query.status,
                    })
                  }
                >
                  {DROPDOWN.SHARE}
                </DropdownItem>
                <DropdownItem>{DROPDOWN.EDIT}</DropdownItem>
                {/* <DropdownItem>{DROPDOWN.LOAD_TEMPLATE}</DropdownItem> */}
                <DropdownItem onClick={() => showRef.current.open()}>
                  {DROPDOWN.PUBLISH}
                </DropdownItem>
                {/* <DropdownItem>{DROPDOWN.INVITE}</DropdownItem> */}
                <DropdownItem onClick={() => deleteRef.current.open()} isDelete>
                  {DROPDOWN.DELETE}
                </DropdownItem>
              </div>
            }
          >
            <MoreVertical />
          </Dropdown>
        </div>
      </Header>
      <Page style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
        <div className="kanban-holder">
          <DynamicKanban />
        </div>
      </Page>
    </Section>
  );
}

export default withRouter(Funnel);
