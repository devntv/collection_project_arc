import { Grid } from '@material-ui/core';
import clsx from 'clsx';
import InputV2 from 'components/atoms/InputV2';
import AddressSelectV2 from 'components/mocules/AddressSelectV2';
import UploadFiles from 'components/mocules/UploadFiles';
import { useEffect, useState } from 'react';
import AddressService from 'services/AddressService';
import { v4 as uuidV4 } from 'uuid';
import MobileInputV2 from 'components-v2/atoms/MobileModal/AccountModal/FormBussinessInfo/Input';
import styles from './styles.module.css';

const DEFAULT_PROVINCE = { label: 'Chọn Tỉnh/Thành phố ...', value: '0' };

const UploadBusinessFile = ({
  fileList,
  handleSetValue,
  numberValue,
  dateValue,
  addressValue,
  val,
  label,
  subLabel,
  info,
  fieldChange,
  isMobile,
  isMobileV2,
}) => {
  const [prv, setPrv] = useState([DEFAULT_PROVINCE]);
  const getProvinces = async () => {
    const provinces = await AddressService.getProvinces();
    setPrv([DEFAULT_PROVINCE, ...provinces]);
  };
  useEffect(() => {
    getProvinces();
  }, []);
  return (
    <UploadFiles
      fileList={fileList}
      val={val}
      handleSetValue={handleSetValue}
      label={label}
      subLabel={subLabel}
      isMobile={isMobile}
      isMobileV2={isMobileV2}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          {isMobileV2 ? (
            <MobileInputV2
              id="mobile-input-licenced"
              style={{ width: '100%' }}
              className={clsx(!isMobile && styles.date_input, isMobileV2 && styles.mobileDate_input)} // Hai: Add case for new mobile ui
              label="Số giấy phép"
              value={numberValue}
              onChange={(e) => handleSetValue(fieldChange, { ...info, number: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <InputV2
              id={uuidV4()}
              style={{ width: '100%' }}
              className={clsx(!isMobile && styles.date_input, isMobileV2 && styles.mobileDate_input)} // Hai: Add case for new mobile ui
              label="Số giấy phép"
              value={numberValue}
              onChange={(e) => handleSetValue(fieldChange, { ...info, number: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </Grid>
        <Grid style={{ position: isMobileV2 && 'relative' }} item xs={12} sm={4}>
          {isMobileV2 ? (
            <MobileInputV2
              id="mobile-input-date"
              className={styles.mobileDate_input}
              style={{ width: '100%' }}
              label="Ngày cấp"
              type="date"
              value={dateValue}
              inputProps={{
                max: new Date().toJSON().toString().substring(0, 10),
              }}
              onChange={(e) => {
                if (e.target.value > new Date().toJSON().toString().substring(0, 10)) {
                  return false;
                }
                handleSetValue(fieldChange, { ...info, date: new Date(e.target.value).toJSON() || '' });
                return true;
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <InputV2
              id={uuidV4()}
              className={isMobile ? styles.date_input_mobile : styles.date_input}
              style={{ width: '100%' }}
              label="Ngày cấp"
              type="date"
              value={dateValue}
              inputProps={{
                max: new Date().toJSON().toString().substring(0, 10),
              }}
              onChange={(e) => handleSetValue(fieldChange, { ...info, date: new Date(e.target.value).toJSON() || '' })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        </Grid>
        <Grid style={{ position: isMobileV2 && 'relative' }} item xs={12} sm={4}>
          <AddressSelectV2
            id={uuidV4()}
            required={false}
            className={isMobileV2 ? styles.mobilePlace : styles.place}
            label="Nơi cấp"
            style={{ width: '100%' }}
            value={addressValue}
            onChange={(e) => {
              handleSetValue(fieldChange, { ...info, place: e.target.value });
            }}
            options={prv}
            isMobileV2={isMobileV2}
          />
        </Grid>
      </Grid>
    </UploadFiles>
  );
};

export default UploadBusinessFile;
