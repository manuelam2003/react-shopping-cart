import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from "../styles/Header.module.css";
import logo from "../assets/logotype.png";

function Header({ cartCount }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <div className={styles.headerContainer}>
      <img
        className={styles.logo}
        src={logo}
        alt="logotype Teyasu"
        onClick={handleClick}
      />
      <nav>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/shop" className={styles.navItem}>
          Shop
        </Link>
        <Link to="/cart" className={`${styles.cart} ${styles.navItem}`}>
          Cart
          {cartCount && <div className={styles.cartCount}>{cartCount}</div>}
        </Link>
      </nav>
    </div>
  );
}

export default Header;
