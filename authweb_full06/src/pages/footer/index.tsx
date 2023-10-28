import styles from "./styles.module.css";

export default function FooterPage() {
  return (
    <footer className={styles.section}>

      <div className={styles.path}>

        <div className={styles.pacman}></div>

        <div className={styles.ghost}>
          <div className={styles.eyes}></div>
          <div className={styles.skirt}></div>
        </div>

      </div>

    </footer>
  );
}
