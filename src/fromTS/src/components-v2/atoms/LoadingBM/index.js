import clsx from 'clsx';
import styles from './styles.module.css';

function LoadingBM({ animateText = false }) {
  return (
    <div className={styles.wrapLoad}>
      <div className={styles['loading-3']}>
        <i />
        <i />
        <i />
        <i />
      </div>
      <p className={clsx(animateText && styles.animateTS)}>thuocsi.vn</p>
    </div>
  );
}

export default LoadingBM;
