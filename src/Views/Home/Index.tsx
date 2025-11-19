import Sidebar from "../../Components/SideBar";
import MessagesSection from "../../Components/Message/MessagesSection";
import { Outlet } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />

      <main className={styles.feed}>
        <section className={styles.storiesSection}>
          <Outlet />
        </section>
      </main>

      <MessagesSection />
    </div>
  );
};

export default Home;
