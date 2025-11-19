import React, { useState } from "react";
import styles from "./PostGrid.module.scss";
import { FaHeart, FaRegComment } from "react-icons/fa";
import PostPopup from "./PostPopup";
import {
  type MediaItem,
  type UserProfile,
} from "../../../Api/Models/InstagramModels";

interface Props {
  media: MediaItem[];
  profile: UserProfile | null;
}

const PostsGrid: React.FC<Props> = ({ media, profile }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openPost = (index: number): void => {
    setSelectedIndex(index);
  };

  const closePost = (): void => {
    setSelectedIndex(null);
  };
  const renderGridItem = (item: MediaItem, index: number) => {
    const handleClick = () => openPost(index);

    return (
      <div key={item.id} className={styles.gridItem} onClick={handleClick}>
        <img
          src={item.media_url}
          alt={item.caption || "post"}
          className={styles.postMedia}
        />

        <div className={styles.overlay}>
          <span>
            <FaHeart /> {item.like_count || 0}
          </span>

          <span>
            <FaRegComment /> {item.comments_count || 0}
          </span>
        </div>
      </div>
    );
  };

  const renderPopup = () => {
    if (selectedIndex === null) return null;

    return (
      <PostPopup
        media={media}
        index={selectedIndex}
        onClose={closePost}
        profile={profile}
      />
    );
  };

  return (
    <>
      <div className={styles.postsGrid}>
        {media.map((item, index) => renderGridItem(item, index))}
      </div>

      {renderPopup()}
    </>
  );
};

export default PostsGrid;
