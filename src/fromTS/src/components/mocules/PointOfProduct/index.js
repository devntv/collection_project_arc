import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import styles from './styles.module.css';

const PointOfProduct = ({ point, pointMultiplier, isDetailMV2 = false }) => (
  <>
    <div className={clsx(styles.wrapPoint, point >= 100 && styles.pointTextSmall)}>
      <Typography className={clsx(styles.point, isDetailMV2 && styles.point_mv2)}>+{point}</Typography>
    </div>
    <Typography className={clsx(styles.titlePoint)}>Điểm tích lũy </Typography>
    {pointMultiplier > 1 && (
      <div className={clsx(styles.pointMultiplierWrap, isDetailMV2 && styles.pointMultiplierWrap_mv2)}>
        <Typography className={clsx(styles.coefficient, isDetailMV2 && styles.coefficient_mv2)}>x{pointMultiplier}</Typography>
      </div>
    )}
  </>
);

export default PointOfProduct;
