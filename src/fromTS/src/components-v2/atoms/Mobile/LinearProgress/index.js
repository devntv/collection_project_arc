import styles from './styles.module.css';

export default function LinearProgress({ total, value, text }) {
  const percent = (value / total) * 100;

  return (
    <div className={styles.root}>
      <div className={styles.percentProgress} style={{ width: `${percent}%` }} />
      <span className={styles.percentLabel}>{text}</span>
    </div>
  );
}
