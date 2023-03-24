import { Grid } from '@material-ui/core';
import { ADDRESS_CHANGE_TYPE, GROUP_ADDRESS_TYPE } from 'constants/Enums';
import { useEffect, useState } from 'react';
import AddressService from 'services/AddressService';
import { v4 as uuidV4 } from 'uuid';
import AddressSelect from '../AddressSelect';
import styles from './styles.module.css';

const DEFAULT_PROVINCE = { label: 'Chọn Tỉnh/Thành phố ...', value: '0' };
const DEFAULT_DISTRICT = { label: 'Chọn Quận/Huyện ...', value: '0' };
const DEFAULT_WARD = { label: 'Chọn Phường/Xã ...', value: '0' };

const getProvinces = async () => {
  const provinces = await AddressService.getProvinces();
  return [DEFAULT_PROVINCE, ...provinces];
};

const getDistricts = async (prv) => {
  const dists = await AddressService.getDistrictsByProvince(prv);
  return [DEFAULT_DISTRICT, ...dists];
};

const GroupAddressSelect = ({
  setTotalWard = null,
  error = {},
  type = GROUP_ADDRESS_TYPE.HORIZONTAL,
  currentAddress,
  handleSetCurrentAddress,
  ...props
}) => {
  // const { itemCount } = useCart();
  const [address, setAddress] = useState({
    provinces: [DEFAULT_PROVINCE],
    districts: [DEFAULT_DISTRICT],
    wards: [DEFAULT_WARD],
  });

  const getWards = async (dist) => {
    const wards = await AddressService.getWardsByDistrict(dist);
    if (setTotalWard) {
      setTotalWard(wards.length);
    }

    return [DEFAULT_WARD, ...wards];
  };

  const getProvinceMasterData = async () => {
    const provinces = await getProvinces();

    const addressinfo = {
      provinces,
      districts: [DEFAULT_DISTRICT],
      wards: [DEFAULT_WARD],
    };

    if (currentAddress.province !== DEFAULT_PROVINCE.value) {
      addressinfo.districts = await getDistricts(currentAddress.province);
    }

    if (currentAddress.district !== DEFAULT_DISTRICT.value) {
      addressinfo.wards = await getWards(currentAddress.district);
    }
    setAddress(addressinfo);
  };

  const getDistrictMasterData = async () => {
    const addressinfo = {
      districts: [DEFAULT_DISTRICT],
      wards: [DEFAULT_WARD],
    };

    if (currentAddress.province !== DEFAULT_PROVINCE.value) {
      addressinfo.districts = await getDistricts(currentAddress.province);
      if (currentAddress.district !== DEFAULT_DISTRICT.value) {
        addressinfo.wards = await getWards(currentAddress.district);
      }
    }
    setAddress({ ...address, ...addressinfo });
  };

  const getWardMasterData = async () => {
    const addressinfo = {
      wards: [DEFAULT_WARD],
    };
    if (currentAddress.district !== DEFAULT_DISTRICT.value) {
      addressinfo.wards = await getWards(currentAddress.district);
    }
    setAddress({ ...address, ...addressinfo });
  };

  useEffect(() => {
    if (currentAddress.changeType === ADDRESS_CHANGE_TYPE.ASSIGNED) {
      getProvinceMasterData();
    }

    if (currentAddress.changeType === ADDRESS_CHANGE_TYPE.PROVINCE_CHANGE) {
      getDistrictMasterData();
    }

    if (currentAddress.changeType === ADDRESS_CHANGE_TYPE.DISTRICT_CHANGE) {
      getWardMasterData();
    }
  }, [currentAddress]);

  const handleChangeProvince = async (e) => {
    // if (itemCount === 0) {
    const prv = e.target.value;
    if (prv !== currentAddress.province)
      handleSetCurrentAddress({
        ...currentAddress,
        province: prv,
        district: DEFAULT_DISTRICT.value,
        ward: DEFAULT_WARD.value,
        changeType: ADDRESS_CHANGE_TYPE.PROVINCE_CHANGE,
      });
    // } else NotifyUtils.error('Bạn không được thay đổi tỉnh/thành phố khi đang có sản phẩm trong giỏ hàng.');
  };

  const handleChangeDistrict = async (e) => {
    const dist = e.target.value;
    if (dist !== currentAddress.district)
      handleSetCurrentAddress({
        ...currentAddress,
        district: dist,
        ward: DEFAULT_WARD.value,
        changeType: ADDRESS_CHANGE_TYPE.DISTRICT_CHANGE,
      });
  };

  const handleChangeWard = async (e) => {
    const war = e.target.value;
    handleSetCurrentAddress({
      ...currentAddress,
      ward: war,
      changeType: ADDRESS_CHANGE_TYPE.WARD_CHANGE,
    });
  };
  return (
    <Grid className={styles.address_field} container spacing={3} style={{ marginTop: '10px' }} {...props}>
      <AddressSelect
        label={<span className={styles.fw500}>Tỉnh/Thành phố</span>}
        id={uuidV4()}
        value={currentAddress.province || 0}
        onChange={handleChangeProvince}
        options={address.provinces}
        error={error.province}
        md={type === GROUP_ADDRESS_TYPE.VERTICAL ? 12 : 4}
        dataTest="select-address-city"
      />
      <AddressSelect
        id={uuidV4()}
        value={currentAddress.district || 0}
        onChange={handleChangeDistrict}
        options={address.districts}
        label={<span className={styles.fw500}>Quận/Huyện</span>}
        disabled={address.districts.length === 1}
        error={error.district}
        md={type === GROUP_ADDRESS_TYPE.VERTICAL ? 12 : 4}
        dataTest="select-address-district"
      />

      <AddressSelect
        id={uuidV4()}
        value={currentAddress.ward || 0}
        onChange={handleChangeWard}
        options={address.wards}
        label={<span className={styles.fw500}>Phường/Xã</span>}
        disabled={address.wards.length === 1}
        error={error.ward}
        md={type === GROUP_ADDRESS_TYPE.VERTICAL ? 12 : 4}
        dataTest="select-address-ward"
      />
    </Grid>
  );
};

export default GroupAddressSelect;
