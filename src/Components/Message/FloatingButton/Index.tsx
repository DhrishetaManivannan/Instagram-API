import { useState } from "react";
import { Badge, Avatar, Tooltip } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import FloatingPopup from "../FloatingPopUP/Index";
import styles from "./FloatingButton.module.scss";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip title="Messages">
        <button className={styles.floatingButton} onClick={() => setIsOpen(true)}>
          <div className={styles.leftSection}>
            <Badge className={styles.badge} count={1} size="small" offset={[0, 5]}>
              <MessageOutlined className={styles.icon} />
            </Badge>
            <span className={styles.text}>Messages</span>
          </div>

          <Avatar
            size={32}
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className={styles.avatar}
          />
        </button>
      </Tooltip>

      <FloatingPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default FloatingButton;
