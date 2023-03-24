import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import CouponDetailModal from 'components/mocules/CouponDetailModal';
import { palette } from 'constants/Colors';
import { useModal } from 'hooks';
import Image from 'next/image';
import styled from 'styled-components';
import styles from './index.module.css';

const TestingCouponCard = () => {
  const [toggleModal, setToggleModal] = useModal(false);

  const CouponDetail = (code, expiryDate, conditionOfUse) => (
    <div>
      <div className={styles.couponDetailRow}>
        <span className={styles.couponDetailLabel}>Mã giảm giá</span>{' '}
        <span className={styles.couponDetailValue} style={{ color: palette.primary.main }}>
          {code}
        </span>
      </div>
      <div className={styles.couponDetailRow}>
        <span className={styles.couponDetailLabel}>Hạn sử dụng </span>
        <span className={styles.couponDetailValue}>{expiryDate}</span>
      </div>
      <div className={styles.condition}>
        <span className={styles.couponDetailLabel}>Điều kiện sử dụng</span>
        <p>{conditionOfUse}</p>
      </div>
    </div>
  );

  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 13,
    borderRadius: 10,
		margin: "0 10px",
		maxWidth: "120px",
		minWidth: "100px",
		backgroundColor: palette.grey[300],
		".MuiLinearProgress-barColorPrimary": {
			backgroundColor: "orange",
		}
  }));

  return (
    <div style={{ width: '500px' }}>
      <CouponDetailModal
        visible={toggleModal}
        onClose={() => {
          setToggleModal(false);
        }}
        title="Mã giảm giá"
        content={CouponDetail(
          '12345',
          '14:144:44',
          `
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eveniet quam nesciunt assumenda, itaque distinctio optio placeat nulla libero id minus illum ad ea accusantium, consectetur, maiores quidem temporibus at. Facilis itaque perferendis natus error id, ducimus minima omnis? Quae eos perspiciatis placeat unde earum quos aliquid illum corrupti pariatur debitis libero ad eum laborum, quidem harum eligendi iste voluptatem labore, repellat vitae! Suscipit, hic. Ipsum consequatur ullam magnam, ab labore rerum ipsam aliquid quas officiis architecto esse fugit similique laudantium laborum commodi assumenda dicta quaerat tempore porro vero. Perspiciatis, recusandae consectetur quos esse quo explicabo aliquid dolores quas ipsam?`,
        )}
        btnOk="Áp dụng"
        onClickOk={() => {}}
        btnOnClose="Không"
      />
      <Box className={styles.couponBoxMargin}>
        <Box className={styles.couponBox}>
          <Box className={clsx(styles.borderBox)}>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={4} className={styles.flexCenter}>
                <Image className={styles.logo} href="/" src="/images/logo_thuocsi_new.png" width="65px" height="15px" />

                <Box component="span" className={clsx(styles.halfCircle)} />
                <Box component="span" className={clsx(styles.line)} />
                <Box component="span" className={clsx(styles.halfCircleBottom)} />
              </Grid>

              <Grid item xs={8}>
                <Box className={styles.couponInfo}>
                  <h3>Giảm 10%</h3>
                  <p>Cho đơn hàng tối thiểu từ 1 triệu đồng</p>
                  <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                    <p>
                      Đã dùng {' '}
                    </p>
                    <BorderLinearProgress variant="determinate" value={40} />
                    <p style={{ color: "orange", fontWeight: 'bold' }}>{40}%</p>
                  </div>
                  <p>
                    HSD <span style={{ color: palette.error.dark }}>20:25:42</span>
                  </p>

                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className={styles.infoIcon}
                    onClick={() => {
                      setToggleModal(true);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export default TestingCouponCard;
