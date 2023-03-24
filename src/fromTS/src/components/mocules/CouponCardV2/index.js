import { Box, Grid, Tooltip, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneIcon from '@material-ui/icons/Done';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import InfoIconOutlined from '@material-ui/icons/InfoOutlined';
import CouponDetailModal from 'components/mocules/CouponDetailModal';
import { ENUM_TRACKING_ACTION, PROMO_TYPE } from 'constants/Enums';
import { NEW_LOGO } from 'constants/Images';
import { PROMO_CODES } from 'constants/Paths';
import { useAuth } from 'context';
import { useModal, useOverflowTooltip } from 'hooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { Tracking } from 'utils';
import DateTimeUtils from 'utils/DateTimeUtils';
import { formatCurrency } from 'utils/FormatNumber';
import useMobileV2 from 'zustand-lib/storeMobile';
import CountdownTimer from '../CountdownTimer';
import styles from './styles.module.css';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 10,
  margin: '0 5px',
  maxWidth: '120px',
  minWidth: '80px',
  backgroundColor: '#e9e9e9',
  '.MuiLinearProgress-barColorPrimary': {
    backgroundColor: '#DC5C00',
  },
}));

const CouponCardV2 = (props) => {
  const {
    code = '',
    endTime: expiredDate = new Date(Date.now()),
    voucher = {},
    promotionName = '',
    description = '',
    conditionDescription = '',
    isMobile,
    maxUsage = 0,
    usageTotal = 0,
  } = props;
  const { conditions = [], rewards = [] } = voucher;
  const [toggleModal, setToggleModal] = useModal(false);
  const isMobileV2 = useMobileV2((state) => state.isMobileV2());

  const {
    user: { accountID = '', customerID = '' },
  } = useAuth();
  const router = useRouter();
  // check tooltip with ... css
  const [isOverflowed, textElementRef] = useOverflowTooltip();
  const [isHoverTooltip, setIsHoverTooltip] = useState(false);
  let maxDiscountValue = 0;
  let discountValue = 0;
  let percent = 0;
  let minOrderValue = 0;
  const type = conditions[0]?.type || PROMO_TYPE.COMBO;

  if (rewards.length !== 0) {
    maxDiscountValue = rewards[0]?.maxDiscount || 0;
    discountValue = rewards[0]?.absoluteDiscount || 0;
    percent = rewards[0]?.percentageDiscount || 0;
  }

  // conditions is an array contains condition of voucher
  if (conditions.length !== 0) {
    minOrderValue = conditions[0]?.minOrderValue || 0;
  }

  // check timer coutdown
  const checkTimeCountDown = () => {
    const oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
    const endVoucher = new Date(expiredDate).getTime();
    return expiredDate && oneDay > endVoucher ? (
      <div style={{ margin: '5px 0' }}>
        HSD:{' '}
        <span style={{ color: '#D4323B' }}>
          <CountdownTimer prefix="" dealEndDay={expiredDate} style={{ display: 'inline-block' }} />
        </span>
      </div>
    ) : (
      <Typography className={styles.expiredDate}>
        HSD: <span>{DateTimeUtils.getFormattedWithDate(new Date(expiredDate), 'DD/MM/YYYY')}</span>
      </Typography>
    );
  };

  const getTitle = () => {
    if (type === PROMO_TYPE.COMBO || type === PROMO_TYPE.GIFT || type === PROMO_TYPE.ABSOLUTE || type === PROMO_TYPE.POINT)
      return description || promotionName;
    if (type === PROMO_TYPE.ABSOLUTE) return `GIẢM ${formatCurrency(discountValue)}`;
    if (type === PROMO_TYPE.PERCENTAGE) return `GIẢM ${percent}% TỐI ĐA ${formatCurrency(maxDiscountValue)}`;
    return '';
  };

  const CouponDetail = (couponCode, expiryDate, open) => {
    const [isCoppied, setIsCoppied] = useState(false);
    const handleCopied = () => {
      setIsCoppied(true);
      // TODO: TRACKING
      Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_COPY_VOUCHER_CODE, {
        page: PROMO_CODES,
        accountId: accountID,
        customerID,
        currentPage: window.location.href,
        // ...(isMobile && { source: 'thuocsi-mobile' }),
        isMobile,
      });
    };
    useEffect(() => {
      if (!open) {
        setIsCoppied(false);
      }
    }, [!open]);

    return (
      <div>
        <Grid container direction="row" className={styles.couponDetailRow}>
          <Grid item xs={5} sm={6}>
            <span className={styles.couponDetailLabel}>Mã giảm giá</span>{' '}
          </Grid>

          <Grid item xs={7} sm={6} className={styles.wrapInfoCode} alignItems="center" container>
            <Grid className={styles.couponDetailValue} style={{ color: '#09884D', position: 'relative', bottom: '5px' }}>
              {couponCode}
              <span style={{ display: 'inline-flex', flexWrap: 'nowrap' }}>
                <CopyToClipboard text={couponCode} onCopy={handleCopied}>
                  <FileCopyOutlinedIcon className={styles.iconCopy} />
                </CopyToClipboard>
                <Typography style={{ display: !isCoppied && 'none' }}>{isCoppied ? <DoneIcon className={styles.iconCopyDone} /> : null}</Typography>
              </span>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.couponDetailRow}>
          <Grid item xs={5} sm={6}>
            <span className={styles.couponDetailLabel}>Hạn sử dụng </span>
          </Grid>

          <Grid item xs={7} sm={6}>
            <span className={styles.couponDetailValue} style={{ position: 'relative', bottom: '4px' }}>
              {expiryDate()}
            </span>
          </Grid>
        </Grid>

        <div className={styles.condition}>
          <span className={styles.couponDetailLabel}>Điều kiện sử dụng</span>
          <div className={styles.conditionContent}>
            {conditionDescription ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: conditionDescription,
                }}
              />
            ) : (
              <p>Áp dụng cho mọi đơn hàng</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleClickInfoVoucher = () => {
    setToggleModal(true);
    // TODO: TRACKING EVENT
    Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_CLICK_INFO_VOUCHER, {
      page: PROMO_CODES,
      accountId: accountID,
      customerID,
      currentPage: window.location.href,
      // ...(isMobile && { source: 'thuocsi-mobile' }),
      isMobile,
    });
  };

  return (
    <>
      <CouponDetailModal
        visible={toggleModal}
        onClose={() => {
          setToggleModal(false);
        }}
        title="Mã giảm giá"
        content={CouponDetail(code, checkTimeCountDown, toggleModal)}
        btnOk="Áp dụng"
        onClickOk={() => {
          router.push('/cart');
          // TODO: TRACKING EVENT
          Tracking.trackingFunc(ENUM_TRACKING_ACTION.PROMO_CLICK_APPLY_VOUCHER, {
            page: PROMO_CODES,
            accountId: accountID,
            customerID,
            currentPage: window.location.href,
            // ...(isMobile && { source: 'thuocsi-mobile' }),
            isMobile,
          });
        }}
        isMobileV2={isMobileV2}
        btnOnClose="Không"
      />
      <Box className={styles.couponBoxMargin}>
        <Box className={styles.couponBox}>
          <Box className={styles.borderBox}>
            <Grid container direction="row" spacing={3} style={{ margin: 0, height: '100%' }}>
              <Grid item xs={4} className={styles.flexCenter}>
                <Image className={styles.logo} href="/" src={NEW_LOGO || '/images/logo_thuocsi_new.png'} width={108} height={19} />

                <Box component="span" className={styles.halfCircle} />
                <Box component="span" className={styles.line} />
                <Box component="span" className={styles.halfCircleBottom} />
              </Grid>
              <Grid item xs={8}>
                <Box className={styles.couponInfo}>
                  <Tooltip
                    title={description || promotionName}
                    arrow
                    open={isMobile ? isHoverTooltip : isOverflowed && isHoverTooltip}
                    enterTouchDelay={0}
                    disableHoverListener={isMobile ? null : !isOverflowed}
                  >
                    <Typography
                      ref={textElementRef}
                      onClick={() => setIsHoverTooltip(true)}
                      onMouseOver={() => setIsHoverTooltip(true)}
                      onMouseLeave={() => setIsHoverTooltip(false)}
                      className={styles.promotionTitle}
                      role="presentation"
                    >
                      {getTitle()}
                    </Typography>
                  </Tooltip>
                  {type === PROMO_TYPE.VOUCHERCODE && <p>{`Cho đơn hàng tối thiểu từ ${formatCurrency(String(minOrderValue))}`}</p>}
                  {maxUsage > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <p>Đã dùng </p>
                      <BorderLinearProgress variant="determinate" value={Math.floor(((usageTotal || 0) * 100) / maxUsage) || 0} />
                      <p style={{ color: '#DC5C00', fontWeight: 'bold' }}>{Math.floor(((usageTotal || 0) * 100) / maxUsage) || 0}%</p>
                    </div>
                  )}
                  {checkTimeCountDown()}
                  <InfoIconOutlined className={styles.infoIcon} onClick={handleClickInfoVoucher} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(CouponCardV2);
