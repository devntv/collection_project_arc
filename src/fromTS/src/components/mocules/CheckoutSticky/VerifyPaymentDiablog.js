/* eslint-disable no-case-declarations */
import { isValid } from 'clients';
import NewCustomModal from 'components/mocules/NewCustomModal';
import { useCart } from 'context';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';

// status
// verifying , VERIFY_OK VERIFY_FAIL , proceess_payment , payment_ok , payment_fail

const STATUS_PROCESSING = {
  VERIFYING: 'VERIFYING',
  VERIFY_OK: 'VERIFY_OK',
  VERIFY_FAIL: 'VERIFY_FAIL',
  PROCESS_PAYMENT: 'PROCESS_PAYMENT',
  PAYMENT_OK: 'PAYMENT_OK',
  PAYMENT_FAIL: 'PAYMENT_FAIL',
};

const MESSAGE_VERIFY = {
  VERIFYING: {
    content: 'Đang kiểm tra thông tin thanh toán ',
  },
  VERIFY_OK: 'Kiểm tra thành công',
  VERIFY_FAIL: 'Kiểm tra ghông tin thất bại',
  PROCESS_PAYMENT: 'Đang thanh toán đơn hàng',
  PAYMENT_OK: 'Thanh toán thành công',
  PAYMENT_FAIL: 'Thanh toán thất bại',
};

const VerifyPaymentDiablog = memo(({ visible, dataCart }) => {
  const router = useRouter();
  const { verifyPayment } = useCart();

  const [status, setStatus] = useState(STATUS_PROCESSING.VERIFYING);

  const handleClickReload = () => window.location.reload(false);
  const handleGotoCart = () => router.push('/cart');

  useEffect(async () => {
    switch (status) {
      case STATUS_PROCESSING.VERIFYING:
        // TODO: call API verify , nếu verify ok thì chuyển status sang ok , fail thì chuyển sang fail
        const rsPayment = await verifyPayment(dataCart);
        if (isValid(rsPayment)) {
          setStatus(STATUS_PROCESSING.VERIFY_OK);
        } else {
          setStatus(STATUS_PROCESSING.VERIFY_FAIL);
        }

        break;
      case STATUS_PROCESSING.VERIFY_OK:
        setStatus(STATUS_PROCESSING.PROCESS_PAYMENT);
        // TODO: chuyển status sang payment
        break;
      case STATUS_PROCESSING.PROCESS_PAYMENT:
        // TODO: call API checkout ,

        break;
      case STATUS_PROCESSING.PAYMENT_FAIL:
        // action fail --> display popup with message error , change function on button

        break;
      case STATUS_PROCESSING.PAYMENT_OK:
        // action ok --> display popup with message error , change function on button
        // redirect to thankoy
        router.push('/thank-you');
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <NewCustomModal
      visible={visible}
      onClose={handleGotoCart}
      title="Thông báo"
      btnOk="Thanh toán lại"
      content={MESSAGE_VERIFY[status].content}
      btnOnClose="Xem lại giỏ hàng"
      onClickOk={handleClickReload}
    />
  );
});

export default VerifyPaymentDiablog;
