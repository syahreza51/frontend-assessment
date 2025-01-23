import styles from "./Footer.module.scss"; // Import SCSS

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="/contact">Contact Us</a>
        <a href="/faq">FAQ</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <p>&copy; 2025 One Piece. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
