import { useTranslation } from "../contexts/LocalizeContext";
import { Dropdown, Menu } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "react-feather";
import styles from "../styles/components/menu.module.scss";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher.components";

export default function Navbar() {
  const { NAV } = useTranslation();
  const { logout, user } = useAuth();

  const menu = (
    <Menu className={styles.dropdown_usermenu} selectable={false}>
      <Menu.Item className={styles.dropdown_usermenu_item}>
        <strong className={styles.dropdown_usermenu_name}>
          {NAV.DROPDOWN.HELLO}{" "}
          {user.personalData ? user.personalData.firstName : ""}{" "}
        </strong>
        <div>
          <strong className="mr-1">{NAV.DROPDOWN.PLAN} </strong>
          {user.contractData ? user.contractData.typeOfContract || "—" : "—"}
        </div>
        <div>
          <strong>{NAV.DROPDOWN.POSITION} </strong>
          {user.organizationData ? user.organizationData.position : "—"}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={styles.dropdown_usermenu_item}>
        <div>
          <strong>Email: </strong>
          {user.contactData ? user.contactData.primaryEmail || "—" : "—"}
          <br />
          <strong>{NAV.DROPDOWN.PHONE} </strong>
          {user.contactData
            ? `${
                user.contactData?.primaryCountryCode
                  ? `${user.contactData?.primaryCountryCode}`
                  : ""
              } ${
                user.contactData?.primaryAreaCode
                  ? `${user.contactData?.primaryAreaCode}`
                  : ""
              } ${
                user.contactData?.primaryPhone
                  ? `${user.contactData?.primaryPhone}`
                  : ""
              }`
            : "—"}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={styles.dropdown_usermenu_item}>
        <Link
          href="/profile"
          passHref
          className={styles.dropdown_usermenu_item}
        >
          <span>
            <User style={{ height: 17, width: 17, marginRight: 9 }} />
            {NAV.DROPDOWN.VIEW_PROFILE}
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className={styles.dropdown_usermenu_item}>
        <a href="#" onClick={logout} className={styles.dropdown_usermenu_item}>
          <LogOut style={{ height: 17, width: 17, marginRight: 9 }} />
          <span>{NAV.DROPDOWN.LOG_OUT || ""}</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <div className="hiring-navbar__user">
        <LanguageSwitcher />
        <Dropdown trigger={["click"]} overlay={menu}>
          <img
            style={{
              height: 38,
              width: 38,
              borderRadius: 3,
              objectFit: "cover",
            }}
            src={user?.personalData?.imageURL || "/assets/svg/avatar.svg"}
          />
        </Dropdown>
      </div>
    </nav>
  );
}
