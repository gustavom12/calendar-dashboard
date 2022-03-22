import React, { createContext, useContext, useState } from "react";
import {
  Grid,
  PieChart,
  Briefcase,
  UserPlus,
  List,
  Calendar,
  Sliders,
} from "react-feather";
import Marca from "/assets/marca"

const items = [
  {
    key: "/dashboard",
    icon: {
      type: "component",
      value: <PieChart />,
    },
    translationKey: "DASHBOARD",
  },
  {
    key: "/vacancies",
    icon: {
      type: "component",
      value: <Briefcase />,
    },
    translationKey: "VACANCIES",
  },
  {
    key: "/candidates",
    icon: {
      type: "component",
      value: <UserPlus />,
    },
    translationKey: "CANDIDATES",
  },
  {
    key: "/employer-branding",
    icon: {
      type: "component",
      value: <Marca />,
    },
    translationKey: "EMPLOYER_BRANDING",
  },
  {
    key: "/calendar",
    icon: {
      type: "component",
      value: <Calendar />,
    },
    translationKey: "CALENDAR",
  },
  // {
  //   key: "/administration",
  //   icon: {
  //     type: "component",
  //     value: <Sliders />,
  //   },
  //   translationKey: "ADMINISTRATION",
  // },
];

const MenuContext = createContext({
  items,
  openKeys: [],
  collapsed: false,
});

export const MenuProvider = ({ children }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const context = {
    items,
    openKeys,
    setOpenKeys,
    collapsed,
    setCollapsed,
  };

  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};

export const useMenuData = () => useContext(MenuContext);
