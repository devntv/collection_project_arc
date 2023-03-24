import { Divider, Grid, TableCell, TableRow } from '@material-ui/core';
import { isValid, OrderClient } from 'clients';
import { Button, InfoFormControl, InfoTable, LinkComp, Modal } from 'components/atoms';
import { ADDRESS_CHANGE_TYPE, ALIGN } from 'constants/Enums';
import { getPathProductBySlug } from 'constants/Paths';
import React, { memo, useEffect, useState } from 'react';
import { OrderService } from 'services';
import styled from 'styled-components';
import { NotifyUtils } from 'utils';
import { formatNumber } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './style.module.css';
import validateForm from './validateForm';

const heads = [
  { text: 'Sản phẩm hóa đơn nhanh', align: ALIGN.LEFT },
  { text: 'Giá (đ)', align: ALIGN.RIGHT },
  { text: 'Số lượng', align: ALIGN.RIGHT },
  { text: 'Tổng cộng (đ)', align: ALIGN.RIGHT },
];

const StyledCompleteButton = styled(Button)`
  color: #fff !important;
  background-color: #00b46e !important;
  border: 1px solid #00b46e !important;
  font-weight: 500 !important;
  margin-top: 50px !important;
  border-radius: 10px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;

  &:hover {
    background: #fff !important;
    color: #00b46e !important;
    border: 1px solid #00b46e !important;
  }
`;

const PrintInvoiceModal = memo((props) => {
  const { onClose, visible, className, restProps, orderCode, user } = props;
  const { address: add, businessName, email, taxCode } = user;
  const [val, setVal] = useState({
    taxCode: taxCode || '',
    email: email || '',
    businessName: businessName || '',
    address: add || '',
  });
  const [address, setAddress] = useState({
    province: user?.provinceCode,
    district: user?.districtCode,
    ward: user?.wardCode,
  });

  const [currentAddress, setCurrentAddress] = useState({
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
    province: address.province,
    district: address.district,
    ward: address.ward,
  });

  const handleSetCurrentAddress = (addressinfo) => {
    setCurrentAddress(addressinfo);
    setAddress({
      ...address,
      ...addressinfo,
    });
  };
  const [products, setProducts] = useState([]);

  const handleChangeVal = (key, value) => {
    setVal({ ...val, [key]: value });
  };

  const handleCompleted = () => {
    try {
      validateForm(val);
      NotifyUtils.success('Xuất hoá đơn thành công.');
      onClose();
    } catch (error) {
      NotifyUtils.error(error?.message || 'Xuất hoá đơn thất bại');
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await OrderClient.getProductByOrderCode({ orderCode });
        if (!isValid(res)) throw Error();
        let orderItems = res?.data || [];
        const orderItemInfoRes = await OrderService.getInfoOrderItem({ orderItems });
        if (!isValid(orderItemInfoRes)) throw Error('Load thông tin sản phẩm thất bại');
        const orderItemInfoMap = orderItemInfoRes.data[0];
        orderItems = orderItems.map((product) => {
          const sku = product?.productSku;

          return {
            productInfo: orderItemInfoMap[sku] || {},
            ...product,
          };
        });
        setProducts(orderItems);
      } catch (error) {
        setProducts([]);
      }
    }
    fetchData();
  }, []);

  return (
    <Modal className={className} open={visible} {...restProps} onClose={onClose}>
      <div className={styles.confirm_modal_wrap}>
        <div style={{ textAlign: 'center' }}>
          <h2 className={styles.title}> Thông tin xuất hoá đơn</h2>
          <Divider />
          <Grid container>
            <InfoFormControl xs={12} label="Tên nhà thuốc/phòng khám" htmlFor="address" isRequired>
              <InfoInput id="businessName" value={val.businessName} onChange={(e) => handleChangeVal('businessName', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Mã số thuế" htmlFor="address" isRequired>
              <InfoInput id="taxCode" value={val.taxCode} onChange={(e) => handleChangeVal('taxCode', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Email" htmlFor="address" isRequired>
              <InfoInput id="email" value={val.email} onChange={(e) => handleChangeVal('email', e.target.value)} />
            </InfoFormControl>

            <InfoFormControl xs={12} label="Địa chỉ nhận hoá đơn" htmlFor="address" isRequired>
              <InfoInput id="address" value={val.address} onChange={(e) => handleChangeVal('address', e.target.value)} />
            </InfoFormControl>
          </Grid>
          <GroupAddressSelect id={uuidv4()} currentAddress={currentAddress} handleSetCurrentAddress={handleSetCurrentAddress} />
          <InfoTable heads={heads} stickyHeader className={styles.ovfy}>
            {products.map((product) => {
              const { salePrice, quantity, totalPrice } = product;
              const { name = '', slug = '' } = product.productInfo || {};
              return (
                <TableRow key={uuidv4()} hover>
                  <TableCell align={ALIGN.LEFT} className={styles.product_name}>
                    <LinkComp variant="h5" href={getPathProductBySlug(slug)} className={styles.product_name}>
                      {name}
                    </LinkComp>
                  </TableCell>
                  <TableCell align={ALIGN.RIGHT}>{formatNumber(salePrice)}</TableCell>
                  <TableCell align={ALIGN.RIGHT}>{formatNumber(quantity)}</TableCell>
                  <TableCell align={ALIGN.RIGHT}>{formatNumber(totalPrice)}</TableCell>
                </TableRow>
              );
            })}
          </InfoTable>
          <StyledCompleteButton onClick={handleCompleted}> Xuất hoá đơn </StyledCompleteButton>
        </div>
      </div>
    </Modal>
  );
});

export default PrintInvoiceModal;
