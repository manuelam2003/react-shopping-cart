import styles from "../styles/Footer.module.css";
import logo from "../assets/logotype.png";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <img className={styles.logo} src={logo} alt="logo Teyasu" />
    </div>
  );
}

export default Footer;
