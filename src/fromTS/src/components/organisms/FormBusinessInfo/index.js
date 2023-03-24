import { Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Button } from 'components/atoms';
import InputV2 from 'components/atoms/InputV2';
import GroupAddressSelectV2 from 'components/mocules/GroupAddressSelectV2';
import UploadBusinessFile from 'components/mocules/UploadBusinessFile';
import UploadFiles from 'components/mocules/UploadFiles';
import { ADDRESS_CHANGE_TYPE, ENUM_SCOPE_LABEL } from 'constants/Enums';
import { useEffect, useState } from 'react';
import { gtag } from 'utils';
import styles from './styles.module.css';

const FormBusinessInfo = ({
  scope = '',
  legalRepresentative = '',
  businessName = '',
  taxCode = '',
  address = '',
  wardCode = '',
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
  isMobile,
  status,
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
  return (
    <form style={{ textAlign: 'center', margin: '30px 0' }}>
      {status !== 'ACTIVE' && (
        <Alert severity="error" className={!isMobile ? styles.alert : styles.alert_mobile}>
          Tài khoản của quý khách chỉ được kích hoạt khi cung cấp đầy đủ các thông tin và giấy phép được yêu cầu bên dưới (ít nhất hai loại giấy tờ
          trở lên).
        </Alert>
      )}
      <InputV2
        label="Bạn là"
        id="type"
        value={ENUM_SCOPE_LABEL?.[scope] || ''}
        disabled
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputV2
        label="Tên nhà thuốc/phòng khám"
        id="businessName"
        value={businessName}
        onChange={(e) => handleSetValue('businessName', e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <InputV2
        label="Tên người đại diện pháp luật"
        id="legal"
        value={legalRepresentative}
        onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <UploadBusinessFile
        info={licenseInfo}
        fileList={licenses}
        val="licenses"
        handleSetValue={handleSetValue}
        label="Giấy chứng nhận đăng ký doanh nghiệp"
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={licenseInfo?.number || ''}
        dateValue={licenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={licenseInfo?.place || '0'}
        fieldChange="licenseInfo"
        isMobile={isMobile}
      />
      <UploadBusinessFile
        info={pharmacyEligibilityLicenseInfo}
        fileList={pharmacyEligibilityLicense}
        val="pharmacyEligibilityLicense"
        handleSetValue={handleSetValue}
        label="Giấy chứng nhận đủ điều kiện kinh doanh dược"
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={pharmacyEligibilityLicenseInfo?.number || ''}
        dateValue={pharmacyEligibilityLicenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={pharmacyEligibilityLicenseInfo?.place || '0'}
        fieldChange="pharmacyEligibilityLicenseInfo"
        isMobile={isMobile}
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
        isMobile={isMobile}
      />
      <UploadBusinessFile
        info={examinationAndTreatmentLicenseInfo}
        fileList={examinationAndTreatmentLicense}
        val="examinationAndTreatmentLicense"
        handleSetValue={handleSetValue}
        label="Giấy phép hoạt động khám, chữa bệnh"
        subLabel="File PDF, PNG, JPEG, JPG, DOC hoặc DOCX - tối đa 3 files"
        numberValue={examinationAndTreatmentLicenseInfo?.number || ''}
        dateValue={examinationAndTreatmentLicenseInfo?.date?.toString().substring(0, 10) || ''}
        addressValue={examinationAndTreatmentLicenseInfo?.place || '0'}
        fieldChange="examinationAndTreatmentLicenseInfo"
        isMobile={isMobile}
      />
      <UploadFiles
        fileList={businessImages}
        val="businessImages"
        handleSetValue={handleSetValue}
        label="Hình ảnh nhà thuốc"
        subLabel="File PNG, JPEG, JPG - tối đa 3 files"
        isMobile={isMobile}
      />

      <InputV2
        label="Mã số thuế"
        id="taxCode"
        value={taxCode}
        onChange={(e) => {
          handleSetValue('taxCode', e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <GroupAddressSelectV2
        currentAddress={currentAddress}
        handleSetCurrentAddress={handleSetCurrentAddress}
        status={status}
        setWardListFromBusinessInfo={setWardListFromBusinessInfo}
      />
      <InputV2
        label="Số nhà - Tên đường"
        id="address"
        required
        value={address}
        onChange={(e) => {
          handleSetValue('address', e.target.value);
        }}
        disabled={status === 'ACTIVE'}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {status === 'ACTIVE' && (
        <div className={!isMobile ? styles.contact : ''}>
          <Typography style={{ color: '#797979', fontSize: '14px', textAlign: 'left' }}>
            Khách hàng muốn cập nhập lại địa chỉ vui lòng liên hệ{' '}
            <a href="tel:02873008840" className={styles.link} style={{ whiteSpace: 'nowrap' }} onClick={() => gtag.callHotline()}>
              02 873 008 840
            </a>{' '}
            /{' '}
            <a href="mailto:hotro@thuocsi.vn" className={styles.link} onClick={() => gtag.sendEmail()}>
              hotro@thuocsi.vn
            </a>{' '}
            hoặc tạo phiếu hỗ trợ{' '}
            <a href="/users/my-ticket" className={styles.link}>
              tại đây
            </a>
          </Typography>
        </div>
      )}
      <div style={{ margin: '30px 0' }}>
        <Button className="my-order__button my-order__button--green" onClick={handleUpdateProfile}>
          Cập nhật{' '}
        </Button>
      </div>
    </form>
  );
};
export default FormBusinessInfo;
