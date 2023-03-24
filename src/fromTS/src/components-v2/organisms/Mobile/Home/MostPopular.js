import { ZALO_ICON } from 'constants/Images';
import { ImageFallback } from 'utils';
import styles from './styles.module.css';

export default function MostPopular() {
  const Item = () => (
    <div className={styles.popularItemContainer}>
      <div className={styles.imagesPopular}>
        <ImageFallback src={ZALO_ICON} height={48} width={48} />
      </div>
      <span className={styles.labelPopular}>Thực phẩm chức năng</span>
    </div>
  );
  return (
    <div className={styles.rootPopular}>
      <h1 style={{ fontSize: '20px', margin: 0, marginBottom: '10px' }}>Phổ biến nhất</h1>
      <div className={styles.popularContainer}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}
