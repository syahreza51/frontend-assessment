import Link from "next/link";
import styles from "./navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/product" className={styles.link}>
          Products
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
