/* eslint-disable @next/next/no-img-element */
import Logo from "../assets/Logo.asset";
import { Menu, Tooltip } from "antd";
import { Grid, Menu as Hamburguer } from "react-feather";
import { useTranslation } from "../contexts/LocalizeContext";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMenuData } from "../contexts/MenuContext";
import Link from "next/link";
import useWindowWidth from "../base/useWindowWidth";

export default function LeftMenu() {
  const { LEFT_MENU } = useTranslation();
  const { items, collapsed, setCollapsed } = useMenuData();
  const router = useRouter();
  const route = router.route.split("/");
  const [selected, setSelected] = useState(`/${route[1]}`);
  const windowWidth = useWindowWidth();

  return (
    <>
      {windowWidth < 600 && (
        <div
          onClick={() => setCollapsed((v) => !v)}
          className={`flex-center mobile-hamburguer ${
            collapsed && "collapsed"
          }`}
          style={{ background: "#000" }}
        >
          {/* <img alt="" src="" /> */}
          <Hamburguer />
        </div>
      )}
      <aside
        className={`left-menu-container ${collapsed && "collapsed"} ${
          windowWidth < 600 && "mobile"
        }`}
      >
        <div className="left-menu-icon">
          <Link href="/dashboard">
            <a>
              {collapsed ? (
                <Logo />
              ) : (
                <img
                  style={{ marginBottom: 15 }}
                  src="/assets/fichap-mini.svg"
                  alt=""
                />
              )}
            </a>
          </Link>
        </div>
        {collapsed && (
          <div
            className="left-menu-hiring"
            style={{ marginTop: 25, marginBottom: 15 }}
          >
            <span>Hiring</span>
            <img src="/assets/grid.svg" alt="" />
            {/* <Grid style={{ color: "#695ee8", height: 20 }} /> */}
          </div>
        )}
        <Menu
          selectedKeys={selected}
          className="left-menu"
          onClick={({ key }) => {
            setSelected(key);
            router.push(key);
          }}
          mode="inline"
        >
          {items.map((item) =>
            collapsed ? (
              <Menu.Item
                className="left-menu-sub-item"
                key={item.key}
                icon={
                  item.icon.type === "component" ? (
                    item.icon.value
                  ) : (
                    <img src={item.icon.value} alt="" />
                  )
                }
              >
                {LEFT_MENU[item.translationKey]}
              </Menu.Item>
            ) : (
              <Menu.Item
                className="left-menu-sub-item"
                key={item.key}
                icon={
                  item.icon.type === "component" ? (
                    item.icon.value
                  ) : (
                    <img src={item.icon.value} alt="" />
                  )
                }
                title={LEFT_MENU[item.translationKey]}
              >
                {LEFT_MENU[item.translationKey]}
              </Menu.Item>
            )
          )}
        </Menu>
        <a
          className="bottomButton flex-center"
          onClick={() => setCollapsed((v) => !v)}
        >
          <img src="/assets/menuButton.svg" alt="" />
        </a>
      </aside>
    </>
  );
}
