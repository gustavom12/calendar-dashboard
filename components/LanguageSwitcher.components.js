import React from "react";
import { Menu, Dropdown } from "antd";
import Link from "next/link";
import styles from "../styles/components/languageSwitcher.module.scss";
import { useTranslation } from "../contexts/LocalizeContext";

const LanguageSwitcher = () => {
  const { setSelectedLocale, selectedLocale } = useTranslation();

  const switchLanguage = (e) => {
    const locale = e.key;
    if (selectedLocale !== locale) {
      setSelectedLocale(locale);
    }
  };

  const menu = (
    <Menu selectedKeys={[selectedLocale]} onClick={switchLanguage}>
      <Menu.Item key="es">
        <Link
          href=""
          className="text-uppercase mr-2"
          style={{ fontSize: "1rem" }}
          active={selectedLocale === "es"}
          locale="es"
        >
          ES Spanish
        </Link>
      </Menu.Item>
      <Menu.Item key="en">
        <Link
          href=""
          className="text-uppercase font-size-12 mr-2"
          active={selectedLocale === "en"}
          locale="en"
        >
          EN English
        </Link>
      </Menu.Item>
      <Menu.Item key="pt">
        <Link
          href=""
          className="text-uppercase font-size-12 mr-2"
          active={selectedLocale === "pt"}
          locale="pt"
        >
          PT Portuguese
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
    //   style={{ paddingRight: 22 }}
      className={styles.dropdownContainer}
    >
      <div className={styles.dropdown}>
        <span className="text-uppercase">{selectedLocale}</span>
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
