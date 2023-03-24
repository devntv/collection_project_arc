import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { CustomerClient, isValid, LIMIT_DEFAULT, OFFSET_DEFAULT } from 'clients';
import { Button } from 'components/atoms';
import { useModal } from 'hooks';
import React, { useState } from 'react';
import { gtag, NotifyUtils } from 'utils';
import { formatCurrency, formatFloatNumber } from 'utils/FormatNumber';
import ExchangeModal from './ExchangeModal';
import styles from './styles.module.css';
import SuccessExchangeModal from './SuccessExchangeModal';

export default function LoyaltyModal(props) {
  const { open, onClose, loyaltys, point, handleReloadData } = props;
  const [openExchangeModal, toggleExchangeModal] = useModal();
  const [openSuccessExchangeModal, toggleSuccessExchangeModal] = useModal();
  const [currentLoyalty, setCurrentLoyalty] = useState({});

  const handleExchange = async (loyaltyCode) => {
    try {
      const res = await CustomerClient.exchangeLoyalty({
        body: {
          loyaltyCode,
        },
      });
      if (!isValid(res)) throw Error(res.message || 'Đã xảy ra lỗi khi đổi điểm');
      NotifyUtils.success('Đổi điểm thành công');
      handleReloadData(OFFSET_DEFAULT, LIMIT_DEFAULT);
      toggleExchangeModal();
      toggleSuccessExchangeModal();
      gtag.exchangePoint();
    } catch (error) {
      NotifyUtils.error(error.message);
    }
  };
  return (
    <div>
      <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title">
          <Typography variant="h6">Danh Sách Qui Đổi Điểm Tích Lũy</Typography>

          <IconButton aria-label="close" className={styles.close_button} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={styles.loyalty_point_row}>
            Bạn đang có <b>{formatFloatNumber(point)} </b> điểm tích luỹ
          </div>
          <TableContainer component={Paper} className={styles.table_container}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Điểm tích luỹ</TableCell>
                  <TableCell align="center">Giá trị quy đổi</TableCell>
                  <TableCell align="center">Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loyaltys.map((row) => {
                  let value = 0;
                  if (row && row.promotion && row.promotion.rewards && row.promotion.rewards.length > 0)
                    value = row.promotion.rewards[0].absoluteDiscount;
                  return (
                    <TableRow key={row.code}>
                      <TableCell align="left">
                        <b>{formatFloatNumber(row.point)} </b>
                      </TableCell>
                      <TableCell align="center">
                        Mã giảm giá <b>{formatCurrency(value)} </b>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          className={styles.exchange_button}
                          onClick={() => {
                            toggleExchangeModal();
                            setCurrentLoyalty(row);
                          }}
                        >
                          Đổi ngay
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <ExchangeModal
          visible={openExchangeModal}
          onClose={toggleExchangeModal}
          onClickOk={() => handleExchange(currentLoyalty.code)}
          point={currentLoyalty.point}
        />
        <SuccessExchangeModal visible={openSuccessExchangeModal} onClose={toggleSuccessExchangeModal} loyalty={currentLoyalty} />
      </Dialog>
    </div>
  );
}
