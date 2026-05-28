import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        💰 Dev Expense Tracker
      </div>
      <span className={styles.tag}></span>
    </nav>
  );
}
