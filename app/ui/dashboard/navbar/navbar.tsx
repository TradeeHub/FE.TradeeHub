"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            className={styles.input}
          ></input>
        </div>
        <div className={styles.icon}>
          <NotificationsIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
