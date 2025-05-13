import styles from './LandingPage.module.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <div className={styles.navbar}>
        <img src={logo} alt="Logo" />
        <ul>
          <li><Link to="/register" className={styles.ctabutton}>Register</Link></li>
          <li><Link to="/login" className={styles.ctabutton}>Login</Link></li>
        </ul>
      </div>

      <div className={styles.herosection}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>Learn. Teach. Grow. Together.</h1>
          <h4>SkillSwap is a collaborative platform where mentors and learners connect to exchange skills, support each other, and grow as a community.</h4>
          <Link to="/register" className={styles.ctabutton}>Get Started</Link>
        </div>
      </div>

      <section className={styles.featuresSection}>
        <h2 className={styles.heading}>What You Can Do</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Become a Mentor</h3>
            <p className={styles.cardText}>
              Share your expertise and help others grow in their careers.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Find a Mentor</h3>
            <p className={styles.cardText}>
              Connect with experienced mentors to learn and grow.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Exchange Skills</h3>
            <p className={styles.cardText}>
              Swap skills with peers in a collaborative learning environment.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2 className={styles.ctaHeading}>Ready to connect and grow?</h2>
        <p className={styles.ctaText}>Join our community of mentors and learners today.</p>
        <div className={styles.ctaButtons}>
          <Link to="/register" className={styles.ctaBtn}>Get Started</Link>
          <Link to="/login" className={styles.ctaBtnSecondary}>Login</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2025 SkillSwap. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
