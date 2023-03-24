import { Tooltip } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import clsx from 'clsx';
import { Button } from 'components/atoms';
import { ENUM_ORDER_STATUS } from 'constants/Enums';
import React from 'react';
import styles from './styles.module.css';

const RequestInvoiceButton = ({ handleOpenModal, invoice, numberOfSellerMEDX = 0, numberProduct = 0, status, numberOfUpdates, enable }) => {
  const handleOnClick = () => {
    handleOpenModal();
  };
  return (
    <Tooltip
      title={
        invoice?.invoiceRequest
          ? [
              !enable
                ? 'Không thể chỉnh sửa do đơn hàng không có sản phẩm của nhà cung cấp MEDX hoặc không nằm trong thời gian cho phép.'
                : [
                    (status === ENUM_ORDER_STATUS.DELIVERED || status === ENUM_ORDER_STATUS.COMPLETED) && numberOfUpdates === 0
                      ? 'Bạn chỉ được cập nhật đúng 1 lần nữa trong vòng 14 ngày kể từ ngày giao.'
                      : [
                          numberOfSellerMEDX === numberProduct
                            ? 'Chỉ nhận thông tin trong vòng 14 ngày kể từ ngày giao hàng thành công.'
                            : 'Chỉ nhận thông tin trong vòng 14 ngày kể từ ngày giao hàng thành công. Áp dụng cho sản phẩm của nhà cung cấp MEDX',
                        ],
                  ],
            ]
          : [!enable ? 'Không thể chỉnh sửa do đã quá thời gian cho phép.' : 'Chỉ nhận thông tin trong vòng 7 ngày kể từ ngày giao hàng thành công.']
      }
      leaveTouchDelay={1000}
      enterTouchDelay={150}
    >
      <Button
        disabled={!enable}
        startIcon={<ReceiptIcon />}
        className={clsx('my-order__button my-order__button--orange', styles.btn)}
        onClick={handleOnClick}
      >
        {invoice?.invoiceRequest ? 'Chỉnh sửa thông tin xuất hóa đơn' : 'Yêu cầu xuất hóa đơn'}
      </Button>
    </Tooltip>
  );
};

export default React.memo(RequestInvoiceButton);
