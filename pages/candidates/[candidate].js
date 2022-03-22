import { useRouter, withRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { MapPin } from "react-feather";
import ActionBase from "../../base/Action.base";
import SecondaryButton from "../../base/SecondaryButton.base";
import TertiaryButton from "../../base/TertiaryButton.base";
import Card from "../../components/Card.components";
import Header from "../../components/Header.components";
import { useCandidate } from "../../contexts/CandidateContext";
import { useTranslation } from "../../contexts/LocalizeContext";
import Page from "../../layouts/page.layout";
import ScrollContainer from "react-indiana-drag-scroll";
import useWindowWidth from "../../views/event-calendar/base/useWindowWidth";
import Section from "../../layouts/section.layout";
import Comments from "../../views/candidate/Comments.view";
import File from "../../views/candidate/File.view";
import Skills from "../../views/candidate/Skills.view";
import Summary from "../../views/candidate/Summary.view";
import Tests from "../../views/candidate/Tests.view";
import Loader from "../../components/loader/Loader";
import apiConnection from "../api/api-connection";
import View from "../../base/View.base";

function Tab({ title, onClick, selected, style = {} }) {
  return (
    <div
      className={`calendar-tab ${selected ? "calendar-tab--active" : ""}`}
      style={style}
      onClick={onClick}
    >
      <span>{title}</span>
    </div>
  );
}

function Candidate({ router: { query } }) {
  const { CANDIDATES } = useTranslation();
  const { getOne } = useCandidate();
  const router = useRouter();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const windowwidth = useWindowWidth();
  const [activeKey, setActiveKey] = useState("1");
  const [candidate, setCandidate] = useState({});
  const renderView = useMemo(() => {
    switch (activeKey) {
      case "1":
        return <Summary candidate={candidate} />;
      case "2":
        return <Skills candidate={candidate} />;
      case "3":
        return <File candidate={candidate} />;
      // case "4":
      //   return <Tests candidate={candidate} />;
      // case "5":
      //   return <Comments candidate={candidate} />;

      default:
        return null;
    }
  }, [activeKey, candidate]);

  useEffect(() => {
    getOne(query.candidate)
      .then((data) => {
        apiConnection
          .get(`/vacancy/all?email=${data.email}`)
          .then(({ data }) => setVacancies(data))
          .catch((err) => {
            console.error(err);
          });
        setLoading(false);
        setCandidate(data);
      })
      .catch((err) => console.error(err));
  }, [query.candidate]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <Section>
      <Header withBackbutton title={CANDIDATES.HEADER} />
      <div className="candidate-grid">
        <div style={{ minWidth: 300 }} className="employer-branding-grid-c">
          <Page>
            <div className="candidates__profile">
              <div className="candidates__profile-top">
                <img
                  className="candidates__profile-top__image"
                  src={candidate?.image || "/assets/svg/avatar.svg"}
                />
                <h4 className="candidates__profile-top__name">
                  {candidate?.personalData?.firstName}{" "}
                  {candidate?.personalData?.lastName}
                </h4>
                <h6 className="candidates__profile-top__position">
                  {candidate?.position}
                </h6>
                {candidate?.location ? (
                  <span className="candidates__profile-top__location">
                    <MapPin
                      style={{
                        color: "#868EB7",
                        height: 12,
                        transform: "translateY(-2px)",
                      }}
                    />{" "}
                    {candidate?.location || "-"}
                  </span>
                ) : null}
              </div>
              <a href={candidate?.resume}>
                <TertiaryButton>{CANDIDATES.VACANCIES.RESUME}</TertiaryButton>
              </a>
            </div>
          </Page>
          <Card textStyle={{ fontSize: 16 }} title={CANDIDATES.VACANCIES.TITLE}>
            <div className="candidates__positions">
              {/* {candidate?.vacancies?.map((i) => {
                return (
                  <div key={i}>
                    <div>
                      <h5>{i?.title}</h5>
                      <span>{i?.step}</span>
                    </div>
                  </div>
                );
              })} */}
              {vacancies.map((i, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: index === vacancies.length - 1 ? 0 : 10,
                    }}
                  >
                    <span>{i.title}</span>
                    <View
                      onClick={() => {
                        // http://localhost:3000/vacancies/621c0142415aa600104a31da/621c0234415aa600104a31db?title=Fullstack+developer&id=621c0234415aa600104a31db&status=open
                        router.push(
                          `/vacancies/${i.folderId}/${i._id}?title=${i.title}&id=${i._id}&status=open`
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
        <div className="employer-branding-grid-c">
          <div className="calendar-container">
            {windowwidth > 800 ? (
              <div className="calendar-container-t" style={{ marginTop: -8 }}>
                <Tab
                  title={CANDIDATES.TABS.SUMMARY}
                  selected={activeKey === "1"}
                  onClick={() => setActiveKey("1")}
                />
                <Tab
                  title={CANDIDATES.TABS.SKILLS}
                  selected={activeKey === "2"}
                  onClick={() => setActiveKey("2")}
                />
                <Tab
                  title={CANDIDATES.TABS.FILE}
                  selected={activeKey === "3"}
                  onClick={() => setActiveKey("3")}
                />
                {/* <Tab
                  title={CANDIDATES.TABS.TESTS}
                  selected={activeKey === "4"}
                  onClick={() => setActiveKey("4")}
                />
                <Tab
                  title={CANDIDATES.TABS.COMMENTS}
                  selected={activeKey === "5"}
                  onClick={() => setActiveKey("5")}
                /> */}
              </div>
            ) : (
              <ScrollContainer>
                <div
                  className="calendar-container-t"
                  style={{ maxWidth: `${windowwidth - 70}px` }}
                >
                  <Tab
                    title={CANDIDATES.TABS.SUMMARY}
                    selected={activeKey === "1"}
                    onClick={() => setActiveKey("1")}
                  />
                  <Tab
                    title={CANDIDATES.TABS.SKILLS}
                    selected={activeKey === "2"}
                    onClick={() => setActiveKey("2")}
                  />
                  <Tab
                    title={CANDIDATES.TABS.TESTS}
                    selected={activeKey === "3"}
                    onClick={() => setActiveKey("3")}
                  />
                  {/* <Tab
                    title={CANDIDATES.TABS.TESTS}
                    selected={activeKey === "4"}
                    onClick={() => setActiveKey("4")}
                  />
                  <Tab
                    title={CANDIDATES.TABS.COMMENTS}
                    selected={activeKey === "5"}
                    onClick={() => setActiveKey("5")}
                  /> */}
                </div>
              </ScrollContainer>
            )}
            <Page style={{ zIndex: 9, minWidth: 700 }}>{renderView}</Page>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default withRouter(Candidate);
