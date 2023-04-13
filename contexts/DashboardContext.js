import React, { createContext, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({}) => {
  return <DashboardContext.Provider>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = () => useContext(DashboardContext);
