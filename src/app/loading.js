// loading.js
import styles from './loading.module.css'; // Adjust path as necessary

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}

  
  