import React, { createContext, useContext, useState } from "react";
import {
  PieChart,
  Calendar,
  Bookmark,
  Layers,
  MessageCircle,
  Settings
} from "react-feather";

const items = [
  // {
  //   key: "/dashboard",
  //   icon: {
  //     type: "component",
  //     value: <PieChart />,
  //   },
  //   translationKey: "DASHBOARD",
  // },
  {
    key: "/calendar",
    icon: {
      type: "component",
      value: <Bookmark />,
    },
    translationKey: "CALENDAR",
  },
  {
    key: "/availability",
    icon: {
      type: "component",
      value: <Calendar />,
    },
    translationKey: "AVAILABILITY",
  },
  {
    key: "/events",
    icon: {
      type: "component",
      value: <Layers />,
    },
    translationKey: "events",
  },
  {
    key: "/settings",
    icon: {
      type: "component",
      value: <Settings />,
    },
    translationKey: "Configuración",
  },
  // {
  //   key: "/message",
  //   icon: {
  //     type: "component",
  //     value: <MessageCircle />,
  //   },
  //   translationKey: "Messages",
  // },
  // {
  //   key: "/employer-branding",
  //   icon: {
  //     type: "component",
  //     value: <Marca />,
  //   },
  //   translationKey: "EMPLOYER_BRANDING",
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
