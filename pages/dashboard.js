import React, { useEffect } from "react";
import DashboardCard from "../components/dashboard/DashboardCard.components.jsx";
import AplicantsGraph from "../components/dashboard/aplicantsGraph.jsx";
import Header from "../components/Header.components";
import {
  DashboardProvider,
  useDashboardContext,
} from "../contexts/DashboardContext";
import { useTranslation } from "../contexts/LocalizeContext";
import Section from "../layouts/section.layout";
import VacanciesTable from "../components/dashboard/VacanciesTable.jsx";
import PrincipalAreas from "../components/dashboard/MainAreas.jsx";
import ActiveVacanciesState from "../components/dashboard/activeVacanciesState";
import InterviewsActivities from "../components/dashboard/interviewsActivities.jsx";
import CandidatesLocations from "../components/dashboard/CandidatesLocations.jsx";
import CandidatesMap from "../components/dashboard/CandidatesMap.jsx";

function Dashboard() {
  const { DASHBOARD } = useTranslation();
  const {
    cards,
    receivedApplicantsGraph,
    activeVacancies,
    activeVacanciesState,
    mainAreas,
    interviewsActivities,
    candidatesLocations
  } = useDashboardContext();
  return (
    <Section>
      <Header title={DASHBOARD.HEADER} />
      <div className="dashboard_grid-30-70">
        <div className="cards">
          <DashboardCard
            color="#695EE8"
            value={cards.openVacancies.value}
            diff={cards.openVacancies.diff}
            title={DASHBOARD.CARDS.OPEN_VACANCIES}
          />
          <DashboardCard
            color="#39E489"
            value={cards.activeCandidates.value}
            diff={cards.activeCandidates.diff}
            title={DASHBOARD.CARDS.ACTIVE_APLICANTS}
          />
          <DashboardCard
            color="#00A0FF"
            value={cards.candidatesPerVacancie.value}
            diff={cards.candidatesPerVacancie.diff}
            title={DASHBOARD.CARDS.APLICANTS_PER_VACANCIE}
          />
          <DashboardCard
            color="#A1ACC2"
            value={cards.dailyRecruitment.value}
            diff={cards.dailyRecruitment.diff}
            title={DASHBOARD.CARDS.RECUIMENT_AVERAGE}
          />
        </div>
        <div>
          <AplicantsGraph
            thisYear={receivedApplicantsGraph.thisYear}
            lastYear={receivedApplicantsGraph.lastYear}
            diff={receivedApplicantsGraph.diff}
          />
        </div>
      </div>
      <VacanciesTable activeVacancies={activeVacancies} />
      <div className="dashboard_grid-30-70">
        <CandidatesLocations candidatesLocations={candidatesLocations} />
        <CandidatesMap candidatesLocations={candidatesLocations} />
      </div>
      <div className="dashboard_grid-30-70">
        <PrincipalAreas mainAreas={mainAreas} />
        <div className="ml-gap">
          <ActiveVacanciesState activeVacanciesState={activeVacanciesState} />
          <InterviewsActivities interviewsActivities={interviewsActivities} />
        </div>
      </div>
    </Section>
  );
}

const DashboardWrapper = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
);
export default DashboardWrapper;
