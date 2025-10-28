import React from "react";
import { Button, Input } from "antd";
import { FacebookFilled,EyeTwoTone, EyeInvisibleOutlined  } from "@ant-design/icons";
import styles from "./SignupPage.module.scss";
import { Link } from "react-router-dom";

import InstagramLogo from "../../../assets/cursiveinsta.png";

const SignupPage: React.FC = () => {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupBox}>
        <img src={InstagramLogo} alt="Instagram" className={styles.instagramLogoImage} />

        <p className={styles.subtext}>
          Sign up to see photos and videos from your friends.
        </p>

        <Button
          type="primary"
          icon={<FacebookFilled />}
          className={styles.facebookButton}
        >
          Log in with Facebook
        </Button>

        <div className={styles.orDivider}>
          <span>OR</span>
        </div>

        <div className={styles.inputGroup}>
          <Input placeholder="Mobile Number or Email" className={styles.input} />
          <Input.Password
            placeholder="Password"
            className={styles.input}
            aria-label="Password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />

          <Input placeholder="Full Name" className={styles.input} />
          <Input placeholder="Username" className={styles.input} />
        </div>
        
        <p className={styles.contactInfo}>
          People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a>
        </p>

        <p className={styles.terms}>
          By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
        </p>

        <Button type="primary" className={styles.signupButton}>
          Sign up
        </Button>
      </div>

      <div className={styles.loginBox}>
        <p>
          Have an account?{" "} <br />
          <Link to="/login" className={styles.loginLink}>
            Log in
          </Link>
        </p>
      </div>

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

export default SignupPage;