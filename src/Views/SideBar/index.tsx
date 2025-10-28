
import React from "react";
import { Layout, Menu } from "antd";
import {  HomeFilled,SearchOutlined,CompassOutlined,
  VideoCameraOutlined,  SendOutlined, HeartOutlined,
  PlusSquareOutlined,ApartmentOutlined ,BarChartOutlined,
  UserOutlined,MenuOutlined,} from "@ant-design/icons";
import styles from "./SideBar.module.scss";
import logo from "../../assets/cursiveinsta.png";


const { Sider } = Layout;

const Sidebar: React.FC = () => {
 

  const items = [
    { key: "home", icon: <HomeFilled />, label: "Home" },
    { key: "search", icon: <SearchOutlined />, label: "Search" },
    { key: "explore", icon: <CompassOutlined />, label: "Explore" },
    { key: "reels", icon: <VideoCameraOutlined />, label: "Reels" },
    { key: "messages", icon: <SendOutlined />, label: "Messages" },
    { key: "notifications", icon: <HeartOutlined />, label: "Notifications" },
    { key: "create", icon: <PlusSquareOutlined />, label: "Create" },
    { key: "dashboard", icon: <BarChartOutlined />, label: "Dashboard" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
  ];

  return (
    <Sider
      collapsible={false}
      width={260}
      className={styles.sider}
  
    >
      <div className={styles.logoSection}>
        <div className={styles.logoWrap}>
          
    <img src={logo} alt="Instagram" className={styles.logoImg} />
          </div>
        </div>

      <Menu
        mode="inline"
        className={styles.menu}
        items={items.map((it) => ({
          key: it.key,
          icon: it.icon,
          label: <span className={styles.menuLabel}>{it.label}</span>,
        }))}
      />

      <div className={styles.bottomWrap}>
        <div className={styles.bottomItem}>
          <MenuOutlined className={styles.bottomIcon} />
          <span className={styles.menuLabel}>More</span>
        </div>

        <div className={styles.bottomItem}>
          <ApartmentOutlined className={styles.bottomIcon} />
          <span className={styles.menuLabel}>Also from Meta</span>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
