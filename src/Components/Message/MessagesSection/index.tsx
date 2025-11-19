import FloatingButton from "../FloatingButton/Index";
import styles from "./MessagesSection.module.scss";

const MessagesSection = () => {
  return (
    <section className={styles.messagesSection}>
      <FloatingButton />
    </section>
  );
};

export default MessagesSection;
