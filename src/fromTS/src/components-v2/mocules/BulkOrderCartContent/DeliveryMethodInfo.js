import { Box, Collapse, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Tooltip, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import clsx from 'clsx';
import { ICON_UP_INVOICE } from 'constants/Icons';
import { Fragment, memo } from 'react';
import { DateTimeUtils } from 'utils';
import { formatCurrency } from 'utils/FormatNumber';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

const currentDate = DateTimeUtils.getFormattedDate(new Date(), 'YYYYMMDD');
const renderDeliveryMethod = ({ item, addressSelect, totalPrice = 0, productItems = [], provinces = [], selectedCode = null }) => {
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
  // description giao hàng tiêu chuẩn trống
  const isShowDescription = description && code === selectedCode && code !== 'DELIVERY_PLATFORM_NORMAL';

  const label = (
    <span className={clsx(styles.text_checkbox, disable && styles.text_disable)}>
      {name}
      {subTitle && <>&nbsp;{subTitle}</>}
      {feeValue > 0 && (
        <>
          &nbsp;<span>( Tính thêm {formatCurrency(feeValue)} )</span>
        </>
      )}
    </span>
  );

  return (
    <Fragment key={uuidv4()}>
      <Tooltip title={message}>
        <FormControlLabel value={code} control={<Radio />} label={label} disabled={disable} />
      </Tooltip>
      {isShowDescription && (
        <Alert className={styles.bank_info} icon={false} severity="info">
          <div
            className={styles.content_bank_info}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Alert>
      )}
    </Fragment>
  );
};

const DeliveryMethodInfo = memo(
  ({
    open = true,
    toggle,
    selectedMethod = null,
    deliveries = [],
    handleChange,
    totalPrice = 0,
    provinces = [],
    productItems,
    addressSelect = null,
  }) => {
    const selectedCode = selectedMethod?.code;

    return (
      <div className={styles.delivery_container}>
        <Collapse
          in={open}
          collapsedSize={48}
          style={{ width: '100%', borderRadius: '10px', boxShadow: open ? '0px' : '0px 0px 6px rgba(0, 0, 0, 0.05)' }}
        >
          <Grid container className={styles.delivery_content}>
            <Grid container justifyContent="space-between" className={styles.delivery_top_content}>
              <Typography className={styles.delivery_top_content}>Hình thức giao hàng</Typography>
              <Box className={clsx(styles.btn_hidden, !open && styles.align_center)} onClick={toggle}>
                <p style={{ marginTop: '4px' }}>{open ? 'Ẩn' : 'Hiện'}</p>
                <div className={clsx(styles.toggle_ic, !open && styles.rotate_icon)}>
                  <ICON_UP_INVOICE />
                </div>
              </Box>
            </Grid>
            <FormControl component="fieldset">
              <RadioGroup value={selectedCode} onChange={(e) => handleChange(e)}>
                {deliveries?.length > 0 &&
                  deliveries?.map((item) => renderDeliveryMethod({ item, addressSelect, totalPrice, productItems, provinces, selectedCode }))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Collapse>
      </div>
    );
  },
);

export default memo(DeliveryMethodInfo);
