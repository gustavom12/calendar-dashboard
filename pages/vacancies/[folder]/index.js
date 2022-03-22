import { useRouter, withRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../base/Button.base";
import Header from "../../../components/Header.components";
import { useTranslation } from "../../../contexts/LocalizeContext";
import Page from "../../../layouts/page.layout";
import Section from "../../../layouts/section.layout";
import { Tabs } from "antd";
import Vacancy from "../../../components/Vacancy.components";
import DeleteVacancyModal from "../../../modals/vacancies/DeleteVacancy.modal";
import ShareVacancyModal from "../../../modals/vacancies/ShareVacancy.modal";
import ShowVacancyModal from "../../../modals/vacancies/ShowVacancy.modal";
import { useVacancy } from "../../../contexts/VacancyContext";
import CloseVacancy from "../../../modals/vacancies/CloseVacancy.modal";
import ReOpenVacancy from "../../../modals/vacancies/ReOpenVacancy.modal";

const { TabPane } = Tabs;

function Folder({ router: { query } }) {
  const { push } = useRouter();
  const [key, setKey] = useState("1");
  const deleteRef = useRef();
  const showRef = useRef();
  const closeRef = useRef();
  const shareRef = useRef();
  const openRef = useRef();
  const { vacancies, get } = useVacancy();
  const [list, setList] = useState({
    active: [],
    closed: [],
  });
  const {
    VACANCIES: { FOLDER },
  } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query.id) {
      get(query.id)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [query]);

  useEffect(() => {
    const arr = [...vacancies];

    const active = arr.filter(
      (i) => i.folderId === query.id && i.state === "ACTIVE"
    );

    const closed = arr.filter(
      (i) => i.folderId === query.id && i.state === "CLOSED"
    );

    console.log(closed);

    setList({
      active,
      closed,
    });
    // }
  }, [vacancies]);

  return (
    <Section>
      <DeleteVacancyModal ref={deleteRef} />
      <ShareVacancyModal ref={shareRef} />
      <ShowVacancyModal ref={showRef} />
      <CloseVacancy ref={closeRef} />
      <ReOpenVacancy ref={openRef} />
      <Header withBackbutton title={query.title}>
        <Button
          onClick={() => {
            push({
              pathname: `/vacancies/new`,
              query: {
                id: query.id,
                title: query.title,
              },
            });
          }}
        >
          {FOLDER.HEADER_BUTTON}
        </Button>
      </Header>
      <Page style={{ paddingTop: 10 }}>
        <Tabs defaultActiveKey="1" activeKey={key} onChange={setKey}>
          <TabPane tab={FOLDER.TABS.ACTIVE} key="1" style={{ minHeight: 300 }}>
            <div className="folder-grid">
              {list.active.map((i) => (
                <Vacancy
                  {...i}
                  key={i}
                  _key={i}
                  onShow={() => showRef.current.open(i)}
                  onDelete={() => deleteRef.current.open(i)}
                  onDiscard={() => closeRef.current.open(i)}
                  onShare={() =>
                    shareRef.current.open({
                      ...i,
                      folder: query.id,
                      status: "open",
                    })
                  }
                  onEdit={() =>
                    push({
                      pathname: `/vacancies/edit`,
                      query: {
                        title: i.title,
                        id: i._id,
                        status: "open",
                      },
                    })
                  }
                  onClick={() =>
                    push({
                      pathname: `/vacancies/${query.id}/${i._id}`,
                      query: {
                        title: i.title,
                        id: i._id,
                        status: "open",
                      },
                    })
                  }
                />
              ))}
            </div>
          </TabPane>
          <TabPane tab={FOLDER.TABS.ENDED} key="2">
            <div className="folder-grid" style={{ minHeight: 300 }}>
              {list.closed.map((i) => (
                <Vacancy
                  {...i}
                  key={i}
                  _key={i}
                  onReOpen={() => openRef.current.open(i)}
                  onShow={() => showRef.current.open(i)}
                  onDelete={() => deleteRef.current.open(i)}
                  onShare={() =>
                    shareRef.current.open({
                      ...i,
                      folder: query.id,
                      status: "closed",
                    })
                  }
                  onEdit={() =>
                    push({
                      pathname: `/vacancies/edit`,
                      query: {
                        title: i.title,
                        id: i._id,
                        status: "closed",
                      },
                    })
                  }
                  onClick={() =>
                    push({
                      pathname: `/vacancies/${query.id}/${i._id}`,
                      query: {
                        title: i.title,
                        id: i._id,
                        status: "closed",
                      },
                    })
                  }
                />
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Page>
    </Section>
  );
}

export default withRouter(Folder);
