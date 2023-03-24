import { Fab, Tooltip, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FavoriteButton from 'components/mocules/FavoriteButton';

import clsx from 'clsx';

import { Skeleton } from '@material-ui/lab';
import { TagGift } from 'components-v2/mocules/PromotionProduct';
import { FLAGSHIP_LABEL } from 'constants/Enums';
import styles from './styles.module.css';

// gồm tên, subtitle, icon (report, add to wish list)
const HeaderProduct = ({ isDeal, deal, volume, user, isMobileV2, product, sellerInfo, toggleModalInquiry, name, isGiftTag, loading }) => {
  const ReportAndHeart = () => (
    <div className={styles.wishlist}>
      {user && (
        <Tooltip title="Thắc mắc về sản phẩm ">
          <Fab className={styles.icon} size="small" aria-label="onpenModalInquiry" onClick={toggleModalInquiry}>
            <HelpOutlineIcon style={{ color: '#AFAFAF' }} />
          </Fab>
        </Tooltip>
      )}
      {/* tách client side */}
      <FavoriteButton user={user} product={product} />
    </div>
  );

  const TitleProduct = () => {
    if (loading)
      return (
        <span>
          <Skeleton width={260} height={30} />
        </span>
      );
    return (
      <div>
        {sellerInfo?.isVip && sellerInfo?.isStore && (
          <>
            <span style={{ color: '#B98F0F', fontSize: '16px', fontFamily: 'googleSansMedium', display: isGiftTag ? 'none' : '' }}>
              {FLAGSHIP_LABEL}
            </span>
            <span style={{ display: isGiftTag ? 'none' : '' }}>&nbsp; -&nbsp; </span>
          </>
        )}
        <Typography className={isMobileV2 ? styles.title_product_mv2 : 'titleProduct'} style={{ display: 'inline' }}>
          <TagGift isGiftTag={isGiftTag} className={styles.promoGift} loading={loading} />
          {(isDeal && deal?.name) || name}
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Typography className={styles.descImg}>* Hình sản phẩm có thể thay đổi theo thời gian</Typography>
      <div className={styles.wrapperNameProduct}>
        {/* <div>
          {sellerInfo?.isVip && sellerInfo?.isStore && (
            <>
              <span style={{ color: '#B98F0F', fontSize: '16px', fontFamily: 'googleSansMedium' }}>{FLAGSHIP_LABEL}</span>
              <span>&nbsp; -&nbsp; </span>
            </>
          )}
          <Typography className={isMobileV2 ? styles.title_product_mv2 : 'titleProduct'} style={{ display: 'inline' }}>
            <TagGift isGiftTag={isGiftTag} className={styles.promoGift} loading={loading} />
            {(isDeal && deal?.name) || name}
          </Typography>
        </div> */}
        <TitleProduct />
        <ReportAndHeart />
      </div>
      <Typography className={clsx(styles.capacity, styles.capacity_mv2)}>{volume}</Typography>
    </div>
  );
};

export default HeaderProduct;
