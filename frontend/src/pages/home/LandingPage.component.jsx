import React from 'react';
import styles from './LandingPage.module.scss';
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.landingHeader}>
        <h1>Welcome to Uski Drive</h1>
        <p>Your secure cloud storage solution.</p>
        <Link to={"/signup"}><button className={styles.getStartedButton}>Get Started</button></Link>
      </header>
      <main className={styles.landingMain}>
        <section className={styles.aboutSection}>
          <h2>Easy file access from anywhere</h2>
          <p>
            Keep your files safe, synced, and accessible across all your devices. Uski Drive offers you secure cloud storage for all your needs.
          </p>
        </section>
        <section className={styles.featureSection}>
          <div className={styles.feature}>
            <h3>Secure Storage</h3>
            <p>We prioritize your privacy and security, offering encrypted storage solutions.</p>
          </div>
          <div className={styles.feature}>
            <h3>Fast Sharing</h3>
            <p>Share files and folders easily with anyone with just a link.</p>
          </div>
          <div className={styles.feature}>
            <h3>Easy Organization</h3>
            <p>Sort, manage, and organize your data with simple yet powerful tools.</p>
          </div>
        </section>
        <section className={styles.pricingSection}>
          <h2>Choose Your Plan</h2>
          <div className={styles.plans}>
            <div className={styles.plan}>
              <h3>Free Plan</h3>
              <p>5GB of storage for free.</p>
              <button>Choose Free</button>
            </div>
            <div className={styles.plan}>
              <h3>Pro Plan</h3>
              <p>100GB of storage with premium features.</p>
              <button>Choose Pro</button>
            </div>
            <div className={styles.plan}>
              <h3>Enterprise Plan</h3>
              <p>Unlimited storage for teams and businesses.</p>
              <button>Choose Enterprise</button>
            </div>
          </div>
        </section>
        <section className={styles.contactSection}>
          <h2>Contact Us</h2>
          <p>Have questions? Reach out to our support team for assistance.</p>
          <button>Contact Support</button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
