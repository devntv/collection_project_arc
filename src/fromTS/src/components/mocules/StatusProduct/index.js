import clsx from 'clsx';
import { calculateTimeLeft } from 'utils';
import BadgeContractPrice from '../BadgeContractPrice';
import EventBadge from '../EventBadge';
import NewBadge from '../NewBadge';
import StatusProductProps from './StatusProductProps';
import styles from './style.module.css';

const StatusProduct = ({ is_new: isNew, isContractPrice = false, status, is_event: isEvent, deal, salePrice }) => {
  const statusProps = StatusProductProps[status];
  const percentDiscount = deal ? Math.round(100 - (deal.price / salePrice) * 100) : null;
  const timeLeft = calculateTimeLeft(deal?.startTime) || {};
  const dealReady = Object.keys(timeLeft).length === 0 || false;

  return (
    <>
      {/* ##anpham only check deal */}
      {deal && dealReady && (
        <div className={clsx(styles.ribbon, styles.price_down)}>
          <div className={styles.ribbon_percent}>{percentDiscount || 1}%</div>
          <div className={styles.ribbon_status}>Giảm</div>
        </div>
      )}
      {isNew && <NewBadge>Mới</NewBadge>}
      {isContractPrice && <BadgeContractPrice>Giá hợp đồng</BadgeContractPrice>}
      {isEvent && <EventBadge url="/events/nguoi-viet-dung-hang-viet-nhan-1-5-diem-tich-luy">x1.5 Điểm Tích Lũy</EventBadge>}
      {statusProps}
    </>
  );
};
export default StatusProduct;
