import { Button, Tooltip } from '@material-ui/core';
import { getFirst, isValid, isValidWithoutData } from 'clients';
import clsx from 'clsx';
import { PAYMENT_METHOD } from 'constants/Enums';
import { ICON_EDIT_ORDER_V2 } from 'constants/Icons';
import { CART_URL } from 'constants/Paths';
import { useAuth, useCart } from 'context';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { OrderService } from 'services';
import { gtag, NotifyUtils } from 'utils';
import useSellers from 'zustand-lib/useSellers';
import EditOrderModal from '../../../components/mocules/EditOrderModal';
import styles from './styles.module.css';

const EditOrderButton = ({ orderId, canEdit, handleEditOrderTooltip, className }) => {
  const [val, setVal] = useState(false);
  const router = useRouter();
  const { updateCart } = useCart();
  const { user } = useAuth();
  const getSellerByCode = useSellers((state) => state.getSellerByCode);
  const getSellerByCodeSync = useSellers((state) => state.getSellerByCodeSync);
  const handleChangeVal = () => {
    setVal(!val);
  };
  const handleClickOk = async () => {
    const orderRes = await OrderService.getOrderDetail({
      orderId,
      getCombo: false,
      customerLevel: user?.level,
      locationCode: user?.provinceCode,
    });
    if (!isValid(orderRes)) {
      return;
    }
    const orderDetail = getFirst(orderRes);
    const res = await OrderService.deleteOrder({ orderId });
    if (!isValidWithoutData(res)) {
      NotifyUtils.error(res?.message || 'Đã có lỗi xảy ra, xin vui lòng thử lại sau');
      return;
    }

    const promiseAllSellerInfo = orderDetail?.products?.map(({ productInfo }) => getSellerByCode({ code: productInfo?.sellerCode }));
    await Promise.all(promiseAllSellerInfo);

    gtag.refund({
      ...orderDetail,
      products:
        orderDetail?.products?.map(({ productInfo = {}, price = 0, quantity = 0 }) => ({
          name: productInfo?.name || '',
          displayPrice: price || 0,
          productId: productInfo?.productId || 0,
          quantity,
          sellerInfo: getSellerByCodeSync({ code: productInfo?.sellerCode }),
        })) || [],
    });
    updateCart();
    if (orderDetail?.paymentMethod === PAYMENT_METHOD.CREDIT) {
      setTimeout(() => {
        router.push(CART_URL);
      }, 2000);
    } else {
      router.push(CART_URL);
    }
  };

  // const classNameBtn = canEdit ? "my-order__button my-order__button--green" : "my-order__button my-order__button--green"

  return (
    <>
      <Tooltip title={handleEditOrderTooltip()} arrow>
        <span>
          <Button
            startIcon={<ICON_EDIT_ORDER_V2 />}
            className={clsx(className, !canEdit && styles.disabled_btn)}
            onClick={handleChangeVal}
            disabled={!canEdit}
            role="presentation"
          >
            Sửa đơn
          </Button>
        </span>
      </Tooltip>
      <EditOrderModal visible={val} onClose={handleChangeVal} onClickOk={handleClickOk} />
    </>
  );
};

export default React.memo(EditOrderButton);
