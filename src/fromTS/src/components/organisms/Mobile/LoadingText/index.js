import styles from './styles.module.css';

const MV2LoadingText = () => (
  <div className={styles.loadingContainer}>
    <span className={styles.loadingText}>Đang tải</span>
    {Array.from({ length: 3 }, (_, idx) => (
      <span key={idx} className={styles.loadingDot}>
        .
      </span>
    ))}
  </div>
);

export default MV2LoadingText;
