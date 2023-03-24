/* eslint-disable react/no-danger */
import { FormControl, FormControlLabel, Paper, Radio, RadioGroup } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const currentDate = DateTimeUtils.getFormattedDate(new Date(), 'YYYYMMDD');
const renderDeliveryMethod = ({ item, addressSelect, totalPrice = 0, productItems = [], provinces = [] }) => {
  const { description, code, name, condition = {}, subTitle, status = 'ON', mapLocationFee = {} } = item;
  const { customerDistrictCode = '0', customerProvinceCode = '0', customerWardCode = '0' } = addressSelect;
  const regionCode = provinces.find((province) => province.value === customerProvinceCode)?.regionCode || '';

  let disable = status !== 'ON';

  let message = '';

  const isDisableByDeliveryLocation = false;

  // info
  const isFullLocation = !!mapLocationFee['00'];
  const defaultValue = mapLocationFee['00'] || null;
  const feeValue = mapLocationFee[customerDistrictCode] || mapLocationFee[customerProvinceCode] || mapLocationFee[regionCode] || defaultValue;

  if (isDisableByDeliveryLocation && !isFullLocation) {
    message = 'Không thuộc vùng được giao';
    disable = true;
  }

  const label = (
    <>
      <b className={styles.fw500}>{name}</b>
      {subTitle && <>&nbsp;{subTitle}</>}
      {feeValue > 0 && (
        <>
          &nbsp;(Tính thêm <i className={styles.fw500}>{formatCurrency(feeValue)})</i>
        </>
      )}
    </>
  );

  // check status
  const { maxPrice, minPrice, notSupportYYYYMMDDs = null, notSupportLocationCodes = null, tags = null } = condition;

  if (!disable && notSupportYYYYMMDDs && notSupportYYYYMMDDs.indexOf(currentDate) >= 0) {
    disable = true;
    message = 'Không hỗ trợ ngày này.';
  }

  if (!disable && tags && tags.length > 0 && productItems) {
    productItems.forEach((product) => {
      if (!disable) {
        disable = !(product.tags && tags.every((t) => product.tags.indexOf(t) >= 0));
      }
    });
  }

  if (!disable && maxPrice && maxPrice > 0 && totalPrice > maxPrice) {
    disable = true;
    message = 'Vượt quá giá trị cho phép';
  }

  if (!disable && minPrice && minPrice > 0 && totalPrice < minPrice) {
    message = 'Thấp hơn giá trị cho phép';
    disable = true;
  }

  if (
    !disable &&
    notSupportLocationCodes &&
    notSupportLocationCodes.length > 0 &&
    (notSupportLocationCodes.indexOf(regionCode) !== -1 ||
      notSupportLocationCodes.indexOf(customerProvinceCode) !== -1 ||
      notSupportLocationCodes.indexOf(customerDistrictCode) !== -1 ||
      notSupportLocationCodes.indexOf(customerWardCode) !== -1)
  ) {
    message = 'Không hỗ trợ giao vùng khách đang chọn.';
    disable = true;
  }

  return (
    <React.Fragment key={uuidv4()}>
      <Tooltip title={message}>
        <FormControlLabel
          value={code}
          control={<Radio classes={{ root: clsx(styles.checkbox, styles.checkbox_color) }} data-test="radio-checkout-delivery" />}
          label={label}
          disabled={disable}
        />
      </Tooltip>

      {description && (
        <Alert className={styles.checkout_description} icon={false} severity="info">
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Alert>
      )}
    </React.Fragment>
  );
};

const DeliveryMethod = ({ handleChange, deliveryMethods, selectedValue, addressSelect, totalPrice, productItems, provinces }) => {
  const selectedVal = selectedValue || deliveryMethods[0]?.code;

  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}>Hình thức giao hàng</h1>
      <FormControl component="fieldset">
        <RadioGroup value={selectedVal} onChange={handleChange}>
          {deliveryMethods && deliveryMethods.map((item) => renderDeliveryMethod({ item, addressSelect, totalPrice, productItems, provinces }))}
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};

export default DeliveryMethod;
