import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { message } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import PostsGrid from "./PostGrid/PostGrid";
import {  type UserProfile, type MediaItem,} from "../../Api/Models/InstagramModels";
import { fetchProfileAndMedia } from "../../Api/Services/InstagramServices";

const ProfileDetails: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <div className={styles.profile__avatar}>
          <div className={styles.profile__avatarPlain}>
            <img
              src={profile.profile_picture_url}
              alt={profile.username}
              className={styles.profile__avatarImage}
            />
          </div>
        </div>
        <div className={styles.profile__info}>
          <div className={styles.profile__topRow}>
            <h2 className={styles.profile__username}>{profile.username}</h2>

            <div className={styles.profile__buttons}>
              <button className={styles.profile__button}>Edit profile</button>
              <button className={styles.profile__button}>View archive</button>

              <button className={styles.profile__iconButton}>
                <SettingOutlined />
              </button>
            </div>
          </div>

          <div className={styles.profile__stats}>
            <span>
              <strong>{profile.media_count}</strong> posts
            </span>
            <span>
              <strong>{profile.followers_count}</strong> followers
            </span>
            <span>
              <strong>{profile.follows_count}</strong> following
            </span>
          </div>

          <div className={styles.profile__bio}>
            <p className={styles.profile__desc}>
              {profile.biography || "No bio available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts"
  );
  const tabs = ["posts", "saved", "tagged"] as const;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabClick = (index: number) => () => {
    setActiveTabIndex(index);
    setActiveTab(tabs[index]);
  };

  const loadProfile = async () => {
    try {
      const result = await fetchProfileAndMedia();
      setProfile(result.profile);
      setMedia(result.media);
    } catch (error) {
      console.error(error);
      message.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return profile ? (
          <PostsGrid media={media} profile={profile} />
        ) : null;

      case "saved":
        return <div className={styles.placeholder}>No Saves</div>;

      case "tagged":
        return <div className={styles.placeholder}>No tags</div>;

      default:
        return null;
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  return (
    <div className={styles.profilePage}>
      {profile ? <ProfileDetails profile={profile} /> : null}
      <div className={styles.profile__tabs}>
        {(["posts", "saved", "tagged"] as const).map((tab, idx) => (
          <div
            key={tab}
            className={styles.tab}
            onClick={handleTabClick(idx)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
        <span
          className={styles.tabIndicator}
          style={{ transform: `translateX(${activeTabIndex * 100}%)` }}
        />
      </div>

      <div className={styles.profile__content}>{renderTabContent()}</div>
    </div>
  );
};

export default ProfilePage;
