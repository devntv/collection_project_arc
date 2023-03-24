import { Box, Grid, Tooltip, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { CustomerClient, getData, isValid } from 'clients';
import clsx from 'clsx';
import { ENUMS_ERROR_MSG_CODE } from 'constants/Enums';
import { VOUCHER_FRAME_MIN, VOUCHER_TS_MIN } from 'constants/Images';
import { useModal } from 'hooks';

import Image from 'next/image';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { DateTimeUtils, gtag, NotifyUtils } from 'utils';
import LoyaltyModalExchange from './LoyaltyModalExchange';
import LoyaltyModalPoints from './LoyaltyModalPoints';
import LoyaltyModalSuccess from './LoyaltyModalSuccess';
import styles from './styles.module.css';

const VoucherBlock = styled(Grid)`
  position: relative;
  background-color: transparent;
  background-repeat: no-repeat;
  opacity: 1;
  box-sizing: border-box;
  background-image: url(${VOUCHER_FRAME_MIN}) !important;
  height: 104px;
  width: 260px;
  max-height: 104px;
  max-width: 260px;
  min-width: 260px;
  min-height: 104px;
  box-sizing: border-box;
  user-select: none;
  margin: 10px 15.5px 10px 0px;
`;

const Voucherinside = styled.div`
  position: absolute;
  background-image: url(${VOUCHER_FRAME_MIN}) !important;
  width: 100%;
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const VoucherLeft = styled(Grid)`
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-word;
  box-sizing: border-box;
  margin-left: 10px;
  flex: 1;
`;

const VoucherRight = styled(Grid)`
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-word;
  box-sizing: border-box;
  position: relative;
  flex: 2;
`;

const VoucherleftInside = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    cursor: pointer;
  }
`;

const VoucherrightInside = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
`;

function VoucherNew({ loyalty, pointUser = 0 }) {
  const { endTime, description, promotionName } = loyalty?.promotion || {};
  const [loyaltyModalOpen, loyaltyModalToggle] = useModal();
  const [loyaltyExchangeOpen, Toggle] = useModal();
  const [loyaltySuccessOpen, loyaltySuccessToggle] = useModal();

  const { code, point } = loyalty || {};
  const ref = useRef(null);

  const handleClickQuickExchange = () => {
    Toggle();
  };

  const handleSuccessExchange = (isSuccess) => {
    isSuccess();
  };
  const [dataVoucher, setDataVoucher] = useState([]);
  const [isSending, setIsSending] = useState(false);

  const handleQuickExchangePoint = async (loyaltyCode) => {
    setIsSending(true);
    try {
      const res = await CustomerClient.exchangeLoyalty({
        body: {
          loyaltyCode,
        },
      });
      if (!isValid(res)) throw Error(ENUMS_ERROR_MSG_CODE[res.errorCode] || 'Có lỗi khi đổi voucher. Vui lòng thử lại sau!');
      NotifyUtils.success('Đổi thành công');
      setDataVoucher(getData(res));
      setIsSending(false);
      gtag.exchangePoint();
      loyaltySuccessToggle();
      Toggle();
    } catch (error) {
      NotifyUtils.error(error.message);
      setIsSending(false);
    }
  };
  const lengthVoucherName = description?.length || promotionName?.length;

  return (
    <>
      <VoucherBlock>
        <Voucherinside ref={ref}>
          <Grid onClick={loyaltyModalToggle} container alignItems="center" justifyContent="space-around" style={{ width: '100%', cursor: 'pointer' }}>
            <VoucherLeft item>
              <VoucherleftInside>
                <Box className={styles.voucherImg}>
                  <Image src={VOUCHER_TS_MIN} width={80} height={14} fixed="true" />
                </Box>
              </VoucherleftInside>
            </VoucherLeft>
            <VoucherRight item>
              <VoucherrightInside>
                <Box className={clsx(styles.salePricePoint, lengthVoucherName > 30 ? styles.lineClamp : '')}>
                  <Tooltip title={description || promotionName || ''} arrow disableHoverListener={lengthVoucherName < 30}>
                    <Typography>{description || promotionName}</Typography>
                  </Tooltip>

                  <Box className={styles.pointsNeed}>
                    <Typography>{loyalty?.point || 0} điểm</Typography>
                  </Box>
                </Box>
                <Box className={clsx(styles.date, lengthVoucherName > 30 ? styles.dateReset : '')}>
                  <span>HSD</span>
                  <Typography>{DateTimeUtils.getFormattedWithDate(new Date(endTime), 'DD/MM/YYYY')}</Typography>
                </Box>
              </VoucherrightInside>
            </VoucherRight>
          </Grid>
          <div
            className={styles.infoVoucher}
            onClick={handleClickQuickExchange}
            role="presentation"
            style={{ position: 'absolute', top: '60%', left: '88%' }}
          >
            <AddCircleOutlineOutlinedIcon className={styles.exchangeBtn} />
          </div>
        </Voucherinside>

        <LoyaltyModalPoints
          open={loyaltyModalOpen}
          handleClose={loyaltyModalToggle}
          handleSuccessExchange={handleSuccessExchange}
          voucherInfo={description || promotionName}
          pointUser={pointUser}
          dataVoucher={dataVoucher}
          {...loyalty}
        />

        <LoyaltyModalExchange
          pointVoucher={point}
          pointUser={pointUser}
          open={loyaltyExchangeOpen}
          onClose={Toggle}
          onClickOK={() => handleQuickExchangePoint(code)}
          dataVoucher={dataVoucher}
          isSending={isSending}
        />

        <LoyaltyModalSuccess
          open={loyaltySuccessOpen}
          onClose={loyaltySuccessToggle}
          voucherInfo={description || promotionName}
          dataVoucher={dataVoucher}
        />
      </VoucherBlock>
    </>
  );
}

export default VoucherNew;
