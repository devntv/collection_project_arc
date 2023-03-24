import { Button, Checkbox, FormControlLabel, Grid, Paper, useMediaQuery } from '@material-ui/core';
import InfoFormControl from 'components/atoms/InfoFormControl';
import { v4 as uuidv4 } from 'uuid';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';

const GreenCheckbox = (props) => <Checkbox classes={{ root: styles.checkbox }} color="default" {...props} />;

const DeliveryInfoForm = ({
  handleSetValue,
  name,
  phone,
  address,
  setTotalWard,
  handleChangeCheckbox,
  setError,
  manageAddressModalToggle,
  customerName,
  customerEmail,
  customerPhone,
  customerShippingAddress,
  currentAddress,
  handleSetCurrentAddress,
  isChecked = false,
}) => {
  const maxWidthScope = useMediaQuery('(max-width:600px)');

  // STATUS: PENDING
  const checkBox = <GreenCheckbox checked={isChecked} onChange={(e) => handleChangeCheckbox(e)} name="saveInfoShipping" />;
  return (
    <Paper className={styles.root} elevation={2}>
      <h1 className={styles.title}>
        Thông tin giao hàng
        <Button className={styles.add_new_button} onClick={manageAddressModalToggle} data-test="btn-checkout-change-address">
          Thay đổi địa chỉ
        </Button>
      </h1>
      <Grid container>
        <InfoFormControl xs={12} isRequired label={<span className={styles.fw500}>Họ tên khách hàng</span>} htmlFor="customerName">
          <InfoInput
            error={name}
            id="customerName"
            placeholder="Họ và tên"
            value={customerName || ''}
            onChange={(e) => {
              if (e.target.value !== '') {
                setError(true);
              }
              handleSetValue('customerName', e.target.value);
            }}
            data-test="input-checkout-customer-name"
          />
        </InfoFormControl>
        <Grid className={styles.grid_fix} container spacing={2}>
          <InfoFormControl xs={maxWidthScope ? 12 : 3} isRequired label={<span className={styles.fw500}>Số điện thoại</span>} htmlFor="customerPhone">
            <InfoInput
              error={phone}
              id="customerPhone"
              placeholder="số điện thoại"
              value={customerPhone || ''}
              onChange={(e) => handleSetValue('customerPhone', e.target.value)}
              data-test="input-checkout-cusomter-phone"
            />
          </InfoFormControl>

          <InfoFormControl xs={maxWidthScope ? 12 : 9} label={<span className={styles.fw500}>Email</span>} htmlFor="customerEmail">
            <InfoInput
              id="customerEmail"
              placeholder="email "
              value={customerEmail || ''}
              onChange={(e) => handleSetValue('customerEmail', e.target.value)}
            />
          </InfoFormControl>
        </Grid>

        <InfoFormControl
          xs={12}
          label={<span className={styles.fw500}>Địa chỉ nhà thuốc/phòng khám</span>}
          isRequired
          htmlFor="customerShippingAddress"
        >
          <InfoInput
            error={address}
            id="customerShippingAddress"
            placeholder="Địa chỉ nhà thuốc"
            value={customerShippingAddress || ''}
            onChange={(e) => {
              if (e.target.value !== '') {
                setError(true);
              }
              handleSetValue('customerShippingAddress', e.target.value);
            }}
            data-test="input-checkout-customer-address"
          />
        </InfoFormControl>

        <GroupAddressSelect
          id={uuidv4()}
          setTotalWard={setTotalWard}
          currentAddress={currentAddress}
          handleSetCurrentAddress={handleSetCurrentAddress}
          style={{ margonTop: 0 }}
        />
        <div>
          <FormControlLabel control={checkBox} className={styles.save_info_cb} label={<span className={styles.fw500}>Lưu lại thông tin</span>} />
        </div>
        {/* STATUS: PENDING */}
        {/* <div className={styles.full_width}>
          <small className={styles.text_muted}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className={styles.text}>Lưu ý: những ô có dấu </span>
            <span className={styles.required}>*</span> là thông tin bắt buộc
          </small>
        </div> */}
      </Grid>
    </Paper>
  );
};

export default DeliveryInfoForm;
