import { Grid } from '@material-ui/core';
import { ADDRESS_CHANGE_TYPE } from 'constants/Enums';
import { useEffect, useState } from 'react';
import AddressService from 'services/AddressService';
import { v4 as uuidV4 } from 'uuid';
import AddressSelectV2 from '../AddressSelectV2';

const DEFAULT_PROVINCE = { label: 'Chọn Tỉnh/Thành phố ...', value: '0' };
const DEFAULT_DISTRICT = { label: 'Chọn Quận/Huyện ...', value: '0' };
const DEFAULT_WARD = { label: 'Chọn Phường/Xã ...', value: '' };

const getProvinces = async () => {
  const provinces = await AddressService.getProvinces();
  return [DEFAULT_PROVINCE, ...provinces];
};

const getDistricts = async (prv) => {
  const dists = await AddressService.getDistrictsByProvince(prv);
  return [DEFAULT_DISTRICT, ...dists];
};

const GroupAddressSelectV2 = ({
  setTotalWard = null,
  currentAddress,
  handleSetCurrentAddress,
  className,
  status = '',
  isMobileV2 = false,
  setWardListFromBusinessInfo,
}) => {
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

    if (typeof setWardListFromBusinessInfo === 'function') {
      setWardListFromBusinessInfo(addressinfo?.wards);
    }
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
    <div style={{ margin: 'auto' }}>
      {isMobileV2 ? (
        <Grid container>
          <Grid style={{ position: isMobileV2 && 'relative' }} item xs={12} sm={12}>
            <AddressSelectV2
              label="Tỉnh/Thành phố"
              id={uuidV4()}
              value={currentAddress.province || 0}
              onChange={handleChangeProvince}
              options={address.provinces}
              className={className}
              disabled={status === 'ACTIVE'}
              isMobileV2={isMobileV2}
            />
          </Grid>
          <Grid style={{ position: isMobileV2 && 'relative' }} item xs={12} sm={12}>
            <AddressSelectV2
              id={uuidV4()}
              value={currentAddress.district || 0}
              onChange={handleChangeDistrict}
              options={address.districts}
              label="Quận/Huyện"
              className={className}
              disabled={status === 'ACTIVE' || address.districts.length === 1}
              isMobileV2={isMobileV2}
            />
          </Grid>
          <Grid style={{ position: isMobileV2 && 'relative' }} item xs={12} sm={12}>
            <AddressSelectV2
              id={uuidV4()}
              value={currentAddress.ward || 0}
              onChange={handleChangeWard}
              options={address.wards}
              label="Phường/Xã"
              disabled={status === 'ACTIVE' || address.wards.length === 1}
              className={className}
              isMobileV2={isMobileV2}
            />
          </Grid>
        </Grid>
      ) : (
        <>
          <AddressSelectV2
            label="Tỉnh/Thành phố"
            id={uuidV4()}
            value={currentAddress.province || 0}
            onChange={handleChangeProvince}
            options={address.provinces}
            className={className}
            disabled={status === 'ACTIVE'}
            isMobileV2={isMobileV2}
          />
          <AddressSelectV2
            id={uuidV4()}
            value={currentAddress.district || 0}
            onChange={handleChangeDistrict}
            options={address.districts}
            label="Quận/Huyện"
            className={className}
            disabled={status === 'ACTIVE' || address.districts.length === 1}
            isMobileV2={isMobileV2}
          />

          <AddressSelectV2
            id={uuidV4()}
            value={currentAddress.ward || ''}
            onChange={handleChangeWard}
            options={address.wards}
            label="Phường/Xã"
            disabled={status === 'ACTIVE' || address.wards.length === 1}
            className={className}
            isMobileV2={isMobileV2}
            required={address.wards.length !== 1}
          />
        </>
      )}
    </div>
  );
};

export default GroupAddressSelectV2;
