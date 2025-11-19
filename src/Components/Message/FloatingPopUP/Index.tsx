import React, { useState } from "react";
import { Modal, Button, Avatar, List, Input, Badge } from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  CloseOutlined,
  ExpandAltOutlined
} from "@ant-design/icons";
import styles from "./FloatingPopup.module.scss";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const users: User[] = [
  {
    id: 1,
    name: "User One",
    avatar: "https://placehold.co/100x100/EBF8FF/3182CE?text=U1",
    lastMessage: "HI",
    timestamp: "19h",
    unread: true,
  },
  {
    id: 2,
    name: "User Two",
    avatar: "https://placehold.co/100x100/F0FFF4/38A169?text=U2",
    lastMessage: "You: HI",
    timestamp: "1d",
    unread: false,
  },
];

interface FloatingPopupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FloatingPopup: React.FC<FloatingPopupProps> = ({ isOpen, setIsOpen }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleClose = () => setIsOpen(false);
  const handleBack = () => setSelectedUser(null);

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      closable={false}
      className={styles.chatModal}
      height={100}
      width={400}
      mask={false}
      destroyOnHidden={true}
      style={{
        position: "fixed",
        bottom: "80px",
        right: "40px",
        margin: 0,
        padding: 0,
      }}
    >
      <div className={styles.chatContainer}>
        {!selectedUser ? (
          <>
            <div className={styles.modalHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.headerTitle}>Messages</span>
              </div>
              <div className={styles.headerRight}>
                <Button type="text" icon={<ExpandAltOutlined />} />
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={handleClose}
                />
              </div>
            </div>

            <div className={styles.userList}>
              <List
                dataSource={users}
                renderItem={(user) => (
                  <List.Item
                    className={styles.userItem}
                    onClick={() => setSelectedUser(user)}
                  >
                    <List.Item.Meta className={styles.userMeta}
                      avatar={
                        <Badge dot={user.unread} offset={[-4, 32]}>
                          <Avatar className={styles.avatar} src={user.avatar} />
                        </Badge>
                      }
                      title={<span>{user.name}</span>}
                      description={user.lastMessage}
                    />
                    <span className={styles.timestamp}>{user.timestamp}</span>
                  </List.Item>
                  
                )}
                
              />
            </div>
            <div className={styles.editButtonWrap}>
            <Button className={styles.editButton} type="text" icon={<EditOutlined />} />
            </div>
          </>




        ) : (
          <div className={styles.chatView}>
            <div className={styles.chatHeader}>
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
              />
              <Avatar src={selectedUser.avatar} />
              <span className={styles.headerTitle}>{selectedUser.name}</span>
            </div>

            <div className={styles.chatBody}>
              <div className={`${styles.message} ${styles.them}`}>
                Hey, how are you?
              </div>
              <div className={`${styles.message} ${styles.me}`}>I’m good!</div>
            </div>

           
              <div className={styles.typeMessage}>
              <Input className={styles.input} placeholder="Type a message..." />
              </div>
            </div>
       
        )}
      </div>
    </Modal>
  );
};

export default FloatingPopup;
