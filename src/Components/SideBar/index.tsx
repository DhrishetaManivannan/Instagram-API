import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {  HomeFilled,  SearchOutlined,  CompassOutlined,  VideoCameraOutlined,  SendOutlined,  HeartOutlined,  PlusSquareOutlined,  ApartmentOutlined,  BarChartOutlined,  UserOutlined,  MenuOutlined,} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";
import logo from "../../assets/cursiveinsta.png";
import CreatePostModal from "../CreatePost/Index";

const { Sider } = Layout;
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const openCreateMenu = () => {
    setMenuOpen(true);
  };

  const closeCreateMenu = () => {
    setMenuOpen(false);
  };

  const openUploadModal = () => {
    setMenuOpen(false);
    setUploadOpen(true);
  };

  const closeUploadModal = () => {
    setUploadOpen(false);
  };

  const onMenuClick = (path: string, key: string) => {
    if (key === "create") {
      openCreateMenu();
      return;
    }
    navigate(path);
  };
  const items = [
    { key: "home", icon: <HomeFilled />, label: "Home", path: "/home" },
    { key: "search", icon: <SearchOutlined />, label: "Search", path: "" },
    { key: "explore", icon: <CompassOutlined />, label: "Explore", path: "" },
    { key: "reels", icon: <VideoCameraOutlined />, label: "Reels", path: "" },
    { key: "messages", icon: <SendOutlined />, label: "Messages", path: "" },
    { key: "notifications", icon: <HeartOutlined />, label: "Notifications", path: "" },
    { key: "create", icon: <PlusSquareOutlined />, label: "Create", path: "" },
    { key: "dashboard", icon: <BarChartOutlined />, label: "Dashboard", path: "" },
    { key: "profile", icon: <UserOutlined />, label: "Profile", path: "/home/profile" },
  ];

  return (
    <>
      <Sider width={260} className={styles.sider} breakpoint="lg">
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
            onClick: () => onMenuClick(it.path, it.key),
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

      <CreatePostModal
        menuOpen={menuOpen}
        uploadOpen={uploadOpen}
        onMenuClose={closeCreateMenu}
        onUploadClose={closeUploadModal}
        onSelectPost={openUploadModal}
      />
    </>
  );
};

export default Sidebar;
