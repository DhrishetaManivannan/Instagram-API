import React from "react";
import { Button, Input } from "antd";
import { FacebookFilled,EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";
import InstagramLogo from "../../../assets/cursiveinstagram.png";
import LoginPreviewImage from "../../../assets/loginimage.png";

const LoginPage: React.FC = () => {
    
  const navigate = useNavigate(); 
  const handleLogin = () => {
 
    navigate("/home");
  };
  return (
    <div className={styles.loginPage}>

      <main className={styles.main}>
        <section className={styles.preview}>
          <img
            src={LoginPreviewImage}
            alt="Instagram app preview"
            className={styles.previewImage}
          />
        </section>
        <section className={styles.formSection}>
          <div className={styles.formBox}>
            <img src={InstagramLogo} alt="Instagram logo" className={styles.logo} />
            <Input placeholder="Phone number, username, or email" className={styles.input} aria-label="Username or Email" />
            <Input.Password
            placeholder="Password"
            className={styles.input}
            aria-label="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />

            <Button type="primary" block className={styles.loginButton}  onClick={handleLogin}>
              Log in
            </Button>
            <div className={styles.divider}>
              <span>OR</span>
            </div>
            <Button
              type="link"
              icon={<FacebookFilled className={styles.fbIcon} />}
              className={styles.fbButton}
            >
              Log in with Facebook
            </Button>

            <Link to="#" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
          <div className={styles.signupBox}>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.signupLink}>
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <nav className={styles.footerNav}>
          {[
            "Meta",
            "About",
            "Blog",
            "Jobs",
            "Help",
            "API",
            "Privacy",
            "Terms",
            "Locations",
            "Instagram Lite",
            "Meta AI",
            "Meta AI Articles",
            "Threads",
            "Contact Uploading & Non-Users",
            "Meta Verified",
          ].map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </nav>

        <div className={styles.footerBottom}>
          <select className={styles.languageSelect} aria-label="Language Selector">
            <option>English</option>
          </select>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
