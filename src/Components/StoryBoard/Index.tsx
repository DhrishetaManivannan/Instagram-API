import React from "react";
import styles from "./StoryBoard.module.scss";

const Stories: React.FC = () => {
  return (
    <div className={styles.stories} role="region" aria-label="Stories">
      <div className={styles.row}>
        <button type="button" className={styles.storyItem}>
          <div className={`${styles.ring} ${styles.ringNew}`}>
            <div className={styles.avatarWrap}>
              <img
                src="https://i.pinimg.com/736x/f2/36/2f/f2362fa8938b4eb550800c57fe98e171.jpg"
                alt="kalyanvar avatar"
                className={styles.avatar}
                draggable={false}
              />
            </div>
          </div>
          <div className={styles.username}>kalyanvar</div>
        </button>

        <button type="button" className={styles.storyItem}>
          <div className={`${styles.ring} ${styles.ringViewed}`}>
            <div className={styles.avatarWrap}>
              <img
                src="https://i.pinimg.com/736x/db/95/e5/db95e5ded8329b9e5059b1781ddc2543.jpg"
                alt="alex_stead avatar"
                className={styles.avatar}
                draggable={false}
              />
            </div>
          </div>
          <div className={styles.username}>alex_stead</div>
        </button>

        <button type="button" className={styles.storyItem}>
          <div className={`${styles.ring} ${styles.ringNew}`}>
            <div className={styles.avatarWrap}>
              <img
                src="https://i.pinimg.com/1200x/2e/af/be/2eafbe9f12ad0781095ac8f43cea7790.jpg"
                alt="vineet_vo avatar"
                className={styles.avatar}
                draggable={false}
              />
            </div>
          </div>
          <div className={styles.username}>vineet_vo</div>
        </button>

        <button type="button" className={styles.storyItem}>
          <div className={`${styles.ring} ${styles.ringNew}`}>
            <div className={styles.avatarWrap}>
              <img
                src="https://i.pinimg.com/736x/8c/12/9d/8c129dd9fc205dc2f5ec1ed95b973da4.jpg"
                alt="emily avatar"
                className={styles.avatar}
                draggable={false}
              />
            </div>
          </div>
          <div className={styles.username}>emily</div>
        </button>

        <button type="button" className={styles.storyItem}>
          <div className={`${styles.ring} ${styles.ringViewed}`}>
            <div className={styles.avatarWrap}>
              <img
                src="https://i.pinimg.com/736x/ec/33/21/ec3321b067ffc84ea8e3222d83f542d2.jpg"
                alt="john_doe avatar"
                className={styles.avatar}
                draggable={false}
              />
            </div>
          </div>
          <div className={styles.username}>john_doe</div>
        </button>
      </div>
    </div>
  );
};

export default Stories;
