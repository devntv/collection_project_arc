import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Button } from 'components/atoms';
import GroupAddressSelectV2 from 'components/mocules/GroupAddressSelectV2';
import UploadBusinessFile from 'components/mocules/UploadBusinessFile';
import UploadFiles from 'components/mocules/UploadFiles';
import { ADDRESS_CHANGE_TYPE, ENUM_SCOPE_LABEL } from 'constants/Enums';
import { useEffect, useState } from 'react';
import { gtag } from 'utils';
import MobileInputV2 from './Input';

import styles from './styles.module.css';

const MobileFormBusinessInfo = ({
  scope = '',
  legalRepresentative = '',
  businessName = '',
  taxCode = '',
  address = '',
  wardCode = '0',
  districtCode = '0',
  provinceCode = '0',
  handleSetValue,
  handleChangeAddress,
  // error,
  handleUpdateProfile,
  licenses,
  gpp = [],
  pharmacyEligibilityLicense = [],
  examinationAndTreatmentLicense = [],
  licenseInfo = {},
  gppInfo = {},
  pharmacyEligibilityLicenseInfo = {},
  examinationAndTreatmentLicenseInfo = {},
  businessImages,
  status,
  isMobileV2,
  setWardListFromBusinessInfo,
}) => {
  const [currentAddress, setCurrentAddress] = useState({
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
    province: provinceCode,
    district: districtCode,
    ward: wardCode,
  });
  useEffect(() => {
    setCurrentAddress({
      changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
      province: provinceCode,
      district: districtCode,
      ward: wardCode,
    });
  }, [provinceCode, districtCode, wardCode]);
  const handleSetCurrentAddress = (addressinfo) => {
    setCurrentAddress(addressinfo);
    handleChangeAddress('provinceCode', 'districtCode', 'wardCode', addressinfo.province, addressinfo.district, addressinfo.ward);
  };

  const mobileV2LicensesLabel = 'Giấy phép đủ điều kiện kinh doanh dược';
  const mobileV2PharmacyEligibilityLicenseLabel = 'Giấy phép kinh doanh';
  const mobileV2ExaminationAndTreatmentLicenseLabel = 'Chứng chỉ hành nghề';
  return (
    <form className={isMobileV2 ? styles.mobileForm_container : styles.form_container}>
      {status !== 'ACTIVE' && (
        <Alert severity="error" className={styles.alert_mobile}>
          Tài khoản của quý khách chỉ được kích hoạt khi cung cấp đầy đủ các thông tin và giấy phép được yêu cầu bên dưới (ít nhất hai loại giấy tờ
          trở lên).
        </Alert>
      )}
      <MobileInputV2 label="Bạn là" id="type" value={ENUM_SCOPE_LABEL?.[scope] || ''} disabled />
      <MobileInputV2
        label="Tên nhà thuốc/phòng khám"
        id="businessName"
        value={businessName}
        onChange={(e) => handleSetValue('businessName', e.target.value)}
      />
      <MobileInputV2
        label="Tên người đại diện pháp luật"
        id="legal"
        value={legalRepresentative}
        onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
      />
      <UploadBusinessFile
        info={licenseInfo}
        fileList={licenses}
        val="licenses"
        handleSetValue={handleSetValue}
        label={isMobileV2 ? mobileV2LicensesLabel : 'Giấy chứng nhận đăng ký doanh nghiệp'}
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={licenseInfo?.number || ''}
        dateValue={licenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={licenseInfo?.place || '0'}
        fieldChange="licenseInfo"
        isMobileV2={isMobileV2}
      />
      <UploadBusinessFile
        info={pharmacyEligibilityLicenseInfo}
        fileList={pharmacyEligibilityLicense}
        val="pharmacyEligibilityLicense"
        handleSetValue={handleSetValue}
        label={isMobileV2 ? mobileV2PharmacyEligibilityLicenseLabel : 'Giấy chứng nhận đăng ký doanh nghiệp'}
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={pharmacyEligibilityLicenseInfo?.number || ''}
        dateValue={pharmacyEligibilityLicenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={pharmacyEligibilityLicenseInfo?.place || '0'}
        fieldChange="pharmacyEligibilityLicenseInfo"
        isMobileV2={isMobileV2}
      />
      <UploadBusinessFile
        info={gppInfo}
        fileList={gpp}
        val="gpp"
        handleSetValue={handleSetValue}
        label="Hồ sơ GDP/GPP/GSP"
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={gppInfo?.number || ''}
        dateValue={gppInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={gppInfo?.place || '0'}
        fieldChange="gppInfo"
        isMobileV2={isMobileV2}
      />
      <UploadBusinessFile
        info={examinationAndTreatmentLicenseInfo}
        fileList={examinationAndTreatmentLicense}
        val="examinationAndTreatmentLicense"
        handleSetValue={handleSetValue}
        label={isMobileV2 ? mobileV2ExaminationAndTreatmentLicenseLabel : 'Giấy phép hoạt động khám, chữa bệnh'}
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={examinationAndTreatmentLicenseInfo?.number || ''}
        dateValue={examinationAndTreatmentLicenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={examinationAndTreatmentLicenseInfo?.place || '0'}
        fieldChange="examinationAndTreatmentLicenseInfo"
        isMobileV2={isMobileV2}
      />
      <UploadFiles
        fileList={businessImages}
        val="businessImages"
        handleSetValue={handleSetValue}
        label="Hình ảnh nhà thuốc"
        subLabel="File PNG, JPEG, JPG - tối đa 3 files"
        isMobileV2={isMobileV2}
      />

      <MobileInputV2
        label="Mã số thuế"
        id="taxCode"
        value={taxCode}
        inputProps={{
          maxLength: 14,
        }}
        onChange={(e) => {
          handleSetValue('taxCode', e.target.value.replace(/[^0-9+-]/g, ''));
        }}
      />
      <GroupAddressSelectV2
        currentAddress={currentAddress}
        handleSetCurrentAddress={handleSetCurrentAddress}
        status={status}
        isMobileV2={isMobileV2}
        setWardListFromBusinessInfo={setWardListFromBusinessInfo}
      />
      <MobileInputV2
        label="Số nhà - Tên đường"
        id="address"
        required
        value={address}
        onChange={(e) => {
          handleSetValue('address', e.target.value);
        }}
        disabled={status === 'ACTIVE'}
      />
      {status === 'ACTIVE' && (
        <div className={styles.contact}>
          <Typography>
            Khách hàng muốn cập nhập lại địa chỉ vui lòng liên hệ{' '}
            <a href="tel:02873008840" className={styles.link} style={{ whiteSpace: 'nowrap' }} onClick={() => gtag.callHotline()}>
              02 873 008 840
            </a>{' '}
            /{' '}
            <a href="mailto:hotro@thuocsi.vn" className={styles.link} onClick={() => gtag.sendEmail()}>
              hotro@thuocsi.vn
            </a>{' '}
            hoặc tạo phiếu hỗ trợ{' '}
            <a href="/users/my-ticket" className={styles.link} style={{ textDecoration: 'underline' }}>
              tại đây
            </a>
          </Typography>
        </div>
      )}
      <div className={isMobileV2 ? styles.mobileBtn_area : styles.btn_area}>
        <Button className={isMobileV2 ? styles.mobileBtn_update : 'my-order__button my-order__button--green'} onClick={handleUpdateProfile}>
          Cập nhật{' '}
        </Button>
      </div>
    </form>
  );
};
export default MobileFormBusinessInfo;
