import { Box, FormControl, InputAdornment, MenuItem, Modal, Select, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, LocationOn as LocationOnIcon } from '@material-ui/icons';
import ButtonV2 from 'components-v2/atoms/ButtonV2';
import { Input } from 'components/atoms';
import Cookies from 'js-cookie';
import { memo, useEffect, useState } from 'react';
import AddressService from 'services/AddressService';
import { NotifyUtils } from 'utils';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.css';

function FormAddressLocation({ open, onClose, showModalLocation, handleLocationCode, restProps }) {
  const [provinceList, setProvinceList] = useState([]);
  // 92 -> tp cần thơ sẽ là mặc định vì tp này đứng đầu list sellect, 79 -> tphcm nếu ko chọn hoặc cancel thì tp này sẽ đc chọn
  const [provinceValue, setProvinceValue] = useState('92');
  useEffect(() => {
    const getListProvince = async () => {
      try {
        const provinceResult = await AddressService.getProvinces();
        setProvinceList(provinceResult);
      } catch (error) {
        NotifyUtils.error('Lấy danh sách tỉnh thành không thành công');
      }
    };
    getListProvince();
  }, []);
  const handleChangeValue = (e) => {
    // const { value } = e.target.options[e.target.selectedIndex];
    const { value } = e.target;
    setProvinceValue(value);
  };
  const handleGetvalue = () => {
    // console.log(provinceValue);
    Cookies.set('provinceCode', provinceValue, { expires: 7, sameSite: 'Lax' });
    handleLocationCode(provinceValue);
    onClose();
  };
  useEffect(() => {
    if (!showModalLocation) setProvinceValue('79');
  }, [provinceValue, showModalLocation]);

  const IconLocation = (
    <InputAdornment position="start" className={styles.input_icon}>
      <LocationOnIcon />
    </InputAdornment>
  );

  return (
    <Modal className={styles.locationContainer} open={open} onClose={onClose} {...restProps} data-test="modal-location">
      <Box className={styles.wrapLocation}>
        <Box style={{ marginTop: '30px' }}>
          <Typography className={styles.textSellect}>Chọn thành phố</Typography>
          <FormControl fullWidth className={styles.formSellect}>
            <Select
              id="provinceCode"
              name="provinceCode"
              IconComponent={ExpandMoreIcon}
              input={<Input startAdornment={IconLocation} className={styles.inputSellect} />}
              className={styles.province}
              onChange={(e) => handleChangeValue(e)}
              value={provinceValue}
            >
              {provinceList?.map(({ value, label }) => (
                <MenuItem value={value} key={uuidv4()}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box className={styles.wrapBtn}>
          <ButtonV2 className={styles.btn} onClick={handleGetvalue} data-test="btn-location-select">
            Chọn
          </ButtonV2>
        </Box>
      </Box>
    </Modal>
  );
}

export default memo(FormAddressLocation);
