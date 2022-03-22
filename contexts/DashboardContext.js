import React, { createContext, useContext, useState } from "react";

const exampleData = {
  cards: {
    openVacancies: { value: 250, diff: 10.51 },
    activeCandidates: { value: 2500, diff: 10.51 },
    candidatesPerVacancie: { value: 140, diff: 10.51 },
    dailyRecruitment: { value: 15, diff: 10.51 },
  },
  receivedApplicantsGraph: {
    lastYear: [27, 15, 50, 20, 24, 30, 27, 15, 50, 20, 24, 30],
    thisYear: [32, 19, 55, 27, 20, 36, 30, 20, 30, 66, 30, 39],
    diff: 150,
  },
  activeVacancies: [
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
    {
      title: "Fullstack Developer",
      candidates: 5,
      started: "06/02/2022",
      expires: "21/02/2022",
    },
  ],
  mainAreas: [
    { name: "Diseño", count: 40 },
    { name: "Programación", count: 30 },
    { name: "Recursos humanos", count: 15 },
    { name: "Sistemas", count: 50 },
    { name: "Administrativo", count: 10 },
    { name: "Marketing", count: 20 },
  ],
  activeVacanciesState: [
    { name: "Pre-selección", count: 10 },
    { name: "Entrevista con gerente", count: 30 },
    { name: "Entrevista con CTO", count: 42 },
    { name: "Prueba técnica", count: 21 },
    { name: "Entrevista con CDO", count: 12 },
    { name: "Entrevista final", count: 30 },
  ],
  interviewsActivities: {
    data: [12, 30, 0, 30, 20, 10, 12, 30, 0, 30, 20, 10],
    lastYear: [8, 9, 20, 30, 10, 12, 8, 9, 20, 30, 10, 12],
  },
  candidatesLocations: [
    {
      city: "Ciudad de Buenos Aires",
      locations: {
        lng: -58.37723,
        lat: -34.61315,
      },
    },
    {
      city: "Ciudad de Buenos Aires",
      locations: { lng: -58.37723, lat: -34.61315 },
    },
    {
      city: "Ciudad de Buenos Aires",
      locations: { lng: -58.37723, lat: -34.61315 },
    },
    {
      city: "Río Gallegos, Santa Cruz",
      locations: {
        lng: -69.21667,
        lat: -51.63333,
      },
    },
    {
      city: "Río Gallegos, Santa Cruz",
      locations: {
        lng: -69.21667,
        lat: -51.63333,
      },
    },
    {
      city: "Posadas, Misiones",
      locations: {
        lng: -55.89608,
        lat: -27.36708,
      },
    },
    {
      city: "Posadas, Misiones",
      locations: {
        lng: -55.89608,
        lat: -27.36708,
      },
    },
    {
      city: "Posadas, Misiones",
      locations: {
        lng: -55.89608,
        lat: -27.36708,
      },
    },
    {
      city: "Posadas, Misiones",
      locations: {
        lng: -55.89608,
        lat: -27.36708,
      },
    },
    {
      city: "Posadas, Misiones",
      locations: {
        lng: -55.89608,
        lat: -27.36708,
      },
    },
    {
      city: "Ciudad de Córdoba, Córdoba",
      locations: {
        lng: -64.18105,
        lat: -31.4135,
      },
    },
    {
      city: "Ciudad de Córdoba, Córdoba",
      locations: {
        lng: -64.18105,
        lat: -31.4135,
      },
    },
    {
      city: "Ciudad de Córdoba, Córdoba",
      locations: {
        lng: -64.18105,
        lat: -31.4135,
      },
    },
    {
      city: "Ciudad de Neuquén, Neuquén",
      locations: {
        lng: -68.0591,
        lat: -38.95161,
      },
    },
    {
      city: "Montevideo, Uruguay",
      locations: {
        lng: -56.18816,
        lat: -34.90328,
      },
    },
    {
      city: "Montevideo, Uruguay",
      locations: {
        lng: -56.18816,
        lat: -34.90328,
      },
    },
  ],
};

const DashboardContext = createContext(exampleData);

export const DashboardProvider = ({ children }) => {
  const context = exampleData;

  return (
    <DashboardContext.Provider value={context}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
