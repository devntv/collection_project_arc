import { Button, Chip, FormHelperText, Grid, InputAdornment, Paper, Tooltip, useMediaQuery } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { getFirst, isValidWithoutData } from 'clients';
import UploadFileClient from 'clients/UploadFileClient';
import clsx from 'clsx';
import { InfoFormControl } from 'components/atoms';
import { ADDRESS_CHANGE_TYPE, ENUM_SCOPE_LABEL, FILE_TYPE } from 'constants/Enums';
import { MISSING_IMAGE } from 'constants/Images';
// @ts-ignore
import ImageBlobReduce from 'image-blob-reduce';
import Image from 'next/image';
// @ts-ignore
import Pica from 'pica';
import React, { useState } from 'react';
import { NotifyUtils } from 'utils';
import { blobToBase64 } from 'utils/ImageUtils';
import { v4 as uuidV4 } from 'uuid';
import GroupAddressSelect from '../GroupAddressSelect';
import InfoInput from '../InfoInput';
import styles from './styles.module.css';

const ButtonUploadFile = ({ disabled }) => (
  <InputAdornment position="start">
    <Button
      variant="contained"
      classes={{ root: styles.upload_button }}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#DFE3E8' : 'rgb(0, 180, 110)',
        color: disabled ? 'rgb(158 156 173)' : '#fff',
      }}
    >
      Tải file
    </Button>
  </InputAdornment>
);

const EnterpriseForm = ({
  scope,
  legalRepresentative = '',
  businessName = '',
  taxCode = '',
  address = '',
  licenses,
  wardCode = '0',
  districtCode = '0',
  provinceCode = '0',
  handleSetValue,
  handleChangeAddress,
  error,
  isMobile,
  gpp = [],
  businessImages,
}) => {
  const maxWidthScope = useMediaQuery('(max-width:600px)');
  const [currentAddress, setCurrentAddress] = useState({
    changeType: ADDRESS_CHANGE_TYPE.ASSIGNED,
    province: provinceCode,
    district: districtCode,
    ward: wardCode,
  });

  const handleSetCurrentAddress = (addressinfo) => {
    setCurrentAddress(addressinfo);
    handleChangeAddress('provinceCode', 'districtCode', 'wardCode', addressinfo.province, addressinfo.district, addressinfo.ward);
  };

  const handleChangeFile = (e, fileList, val) => {
    const { files } = e.target;
    if (fileList.length + files.length > 3) {
      NotifyUtils.error('Chỉ được gửi tối đa 3 file');
      return;
    }

    [...files].forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const { type } = file;

      reader.onload = async () => {
        try {
          let base64 = reader.result;
          let blob = new Blob([reader.result]);
          let limitSize = blob.size / 1024 / 1024;
          if ((type === FILE_TYPE.PNG || type === FILE_TYPE.JPEG) && limitSize > 2) {
            const pica = Pica({ features: ['js', 'wasm', 'cib'] });
            const reduce = new ImageBlobReduce({ pica });
            blob = await reduce.toBlob(file, { max: 2000 });
            base64 = await blobToBase64(blob);
            limitSize = blob.size / 1024 / 1024;
          }

          if (limitSize > 2) throw Error('Kích thước quá lớn');
          if (val === 'licenses' && type !== FILE_TYPE.PDF && type !== FILE_TYPE.PNG && type !== FILE_TYPE.JPEG) throw Error('Sai định dạng file');
          if (
            val === 'gpp' &&
            type !== FILE_TYPE.PDF &&
            type !== FILE_TYPE.DOC &&
            type !== FILE_TYPE.DOCX &&
            type !== FILE_TYPE.PNG &&
            type !== FILE_TYPE.JPEG
          )
            throw Error('Sai định dạng file');
          if (val === 'businessImages' && type !== FILE_TYPE.PNG && type !== FILE_TYPE.JPEG) throw Error('Sai định dạng file');
          const result = await UploadFileClient.upload({ body: { file: base64, type } });
          if (!isValidWithoutData(result)) throw Error(result?.message || 'Tải file không thành công');
          if (val !== 'businessImages') {
            fileList.push({
              name: file.name,
              publicURL: getFirst(result),
            });
          } else {
            fileList.push(getFirst(result));
          }
          handleSetValue(val, fileList);
        } catch (err) {
          NotifyUtils.error(err.message);
        }
      };
    });
  };

  const handleDeleteFile = (link, fileList, val) => {
    // let fileList = licenses;
    let tmpList = [...fileList];
    if (val !== 'businessImages') tmpList = tmpList.filter((l) => l.publicURL !== link);
    else tmpList = tmpList.filter((l) => l !== link);

    handleSetValue(val, tmpList);
  };

  const handleViewFile = (link) => {
    window.open(link);
  };
  const disabledLicense = licenses.length > 3;
  const disabledGpp = gpp.length > 3;
  const disabledBusinessImage = businessImages.length > 3;

  return (
    <Paper className={styles.root} elevation={4}>
      <h1 className={styles.title}> Thông tin doanh nghiệp </h1>
      <Grid container spacing={2}>
        <InfoFormControl xs={maxWidthScope ? 12 : 3} label="Bạn là" htmlFor="scope">
          <InfoInput id="scope" value={ENUM_SCOPE_LABEL[scope]} disabled />
        </InfoFormControl>

        <InfoFormControl xs={maxWidthScope ? 12 : 9} label="Tên nhà thuốc/phòng khám" htmlFor="businessName">
          <InfoInput
            id="businessName"
            placeholder="Tên nhà thuốc/phòng khám"
            value={businessName}
            onChange={(e) => handleSetValue('businessName', e.target.value)}
          />
        </InfoFormControl>

        <InfoFormControl xs={12} label="Tên người đại diện pháp luật" htmlFor="legalRepresentative">
          <InfoInput
            id="legalRepresentative"
            placeholder="Tên người đại diện pháp luật"
            value={legalRepresentative}
            onChange={(e) => handleSetValue('legalRepresentative', e.target.value)}
          />
        </InfoFormControl>
        <input
          type="file"
          hidden
          id="input-file"
          onChange={(e) => handleChangeFile(e, licenses, 'licenses')}
          accept={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.JPEG},${FILE_TYPE.PNG}`}
          multiple
          disabled={disabledLicense}
        />
        <input
          type="file"
          hidden
          id="input-file-gpp"
          onChange={(e) => handleChangeFile(e, gpp, 'gpp')}
          accept={`${FILE_TYPE.PDF},${FILE_TYPE.DOC},${FILE_TYPE.DOCX},${FILE_TYPE.JPEG},${FILE_TYPE.PNG}`}
          multiple
          disabled={disabledGpp}
        />
        <input
          type="file"
          hidden
          id="business-images"
          onChange={(e) => handleChangeFile(e, businessImages, 'businessImages')}
          accept={`${FILE_TYPE.JPEG},${FILE_TYPE.PNG}`}
          multiple
          disabled={disabledLicense}
        />
        {!isMobile && (
          <>
            <InfoFormControl xs={12} label="Giấy phép kinh doanh phòng khám/nhà thuốc" htmlFor="license" variant="contained">
              <InfoInput
                id="license"
                placeholder="Chọn file"
                endAdornment={<ButtonUploadFile disabled={disabledLicense} />}
                startAdornment={
                  licenses.length > 0 && (
                    <Grid container direction="row" className={styles.license_chip_list}>
                      {licenses.map((license) => (
                        <Grid item key={uuidV4()}>
                          <Tooltip title={license.name} arrow>
                            <Chip
                              label={license.name}
                              style={{ maxWidth: '150px' }}
                              clickable
                              color="default"
                              avatar={<FileCopyIcon />}
                              onDelete={() => {
                                handleDeleteFile(license.publicURL, licenses, 'licenses');
                              }}
                              onClick={() => {
                                handleViewFile(license.publicURL);
                              }}
                            />
                          </Tooltip>
                        </Grid>
                      ))}
                    </Grid>
                  )
                }
                component="span"
                htmlFor="icon-button-file"
                style={{ paddingRight: 0, color: 'black' }}
                disabled
                onClick={() => {
                  document.getElementById('input-file').click();
                }}
                className={`input__info ${licenses.length > 0 ? styles.license : ''}`}
              />
              <FormHelperText>File PNG, JPEG hoặc PDF - tối đa 3 files</FormHelperText>
            </InfoFormControl>
            {/* gpp */}
            <InfoFormControl xs={12} label="Hồ sơ GPP" htmlFor="gpp" variant="contained">
              <InfoInput
                id="gpp"
                placeholder="Chọn file"
                endAdornment={<ButtonUploadFile disabled={disabledGpp} />}
                startAdornment={
                  gpp.length > 0 && (
                    <Grid container direction="row" className={styles.license_chip_list}>
                      {gpp.map((item) => (
                        <Grid item key={uuidV4()}>
                          <Tooltip title={item.name} arrow>
                            <Chip
                              label={item.name}
                              style={{ maxWidth: '150px' }}
                              clickable
                              color="default"
                              avatar={<FileCopyIcon />}
                              onDelete={() => {
                                handleDeleteFile(item.publicURL, gpp, 'gpp');
                              }}
                              onClick={() => {
                                handleViewFile(item.publicURL);
                              }}
                            />
                          </Tooltip>
                        </Grid>
                      ))}
                    </Grid>
                  )
                }
                component="span"
                htmlFor="icon-button-file"
                style={{ paddingRight: 0, color: 'black' }}
                disabled
                onClick={() => {
                  document.getElementById('input-file-gpp').click();
                }}
                className={`input__info ${gpp.length > 0 ? styles.license : ''}`}
              />
              <FormHelperText>File PDF, PNG, JPEG, DOC hoặc DOCX - tối đa 3 files</FormHelperText>
            </InfoFormControl>
            {/* businessImages */}
            <InfoFormControl xs={12} label="Hình ảnh nhà thuốc" htmlFor="businessImages" variant="contained">
              <InfoInput
                id="businessImages"
                placeholder="Chọn file"
                endAdornment={<ButtonUploadFile disabled={disabledBusinessImage} />}
                component="span"
                htmlFor="icon-button-file"
                style={{ paddingRight: 0, color: 'black' }}
                disabled
                onClick={() => {
                  document.getElementById('business-images').click();
                }}
                className={`input__info ${licenses.length > 0 ? styles.license : ''}`}
              />
              <FormHelperText>File PNG, JPEG - tối đa 3 files</FormHelperText>
            </InfoFormControl>
            {businessImages.length > 0 && (
              <Grid container spacing={2} direction="row" style={{ marginLeft: 3 }}>
                {businessImages.map((item) => (
                  <Grid item key={uuidV4()}>
                    <div className={styles.wrapImage}>
                      <div className={styles.inner}>
                        <HighlightOffIcon
                          fontSize="small"
                          onClick={() => handleDeleteFile(item, businessImages, 'businessImages')}
                          style={{ color: '#666666', cursor: 'pointer' }}
                        />
                      </div>
                      <Image
                        src={item || MISSING_IMAGE}
                        width="100"
                        height="100"
                        className={styles.image}
                        onClick={() => {
                          handleViewFile(item);
                        }}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {isMobile && (
          <>
            <div>
              <div className={styles.label_mobile}>Giấy phép kinh doanh phòng khám/nhà thuốc</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  classes={{ root: clsx(styles.upload_button, styles.border_radius_8) }}
                  onClick={() => {
                    document.getElementById('input-file').click();
                  }}
                  style={{
                    backgroundColor: disabledLicense ? '#DFE3E8' : 'rgb(0, 180, 110)',
                    color: disabledLicense ? 'rgb(158 156 173)' : '#fff',
                  }}
                >
                  Tải file
                </Button>
              </div>
              {licenses.length > 0 && (
                <Grid container direction="column" className={styles.license_chip_list}>
                  {licenses.map((license) => (
                    <Grid item container direction="row" style={{ justifyContent: 'center' }} key={uuidV4()}>
                      <Tooltip title={license.name} arrow>
                        <Chip
                          label={license.name}
                          style={{ maxWidth: '200px' }}
                          clickable
                          color="default"
                          avatar={<FileCopyIcon />}
                          onDelete={() => {
                            handleDeleteFile(license.publicURL, licenses, 'licenses');
                          }}
                          onClick={() => {
                            handleViewFile(license.publicURL);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              )}
              <FormHelperText className={styles.helperTextMobile}>File PNG, JPEG hoặc PDF - tối đa 3 files</FormHelperText>
            </div>
            <div>
              {/* gpp */}
              <div className={styles.label_mobile}>Hồ sơ GPP</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  classes={{ root: clsx(styles.upload_button, styles.border_radius_8) }}
                  onClick={() => {
                    document.getElementById('input-file-gpp').click();
                  }}
                  style={{
                    backgroundColor: disabledGpp ? '#DFE3E8' : 'rgb(0, 180, 110)',
                    color: disabledGpp ? 'rgb(158 156 173)' : '#fff',
                  }}
                >
                  Tải file
                </Button>
              </div>
              {gpp.length > 0 && (
                <Grid container direction="column" className={styles.license_chip_list}>
                  {gpp.map((item) => (
                    <Grid item container direction="row" style={{ justifyContent: 'center' }} key={uuidV4()}>
                      <Tooltip title={item.name} arrow>
                        <Chip
                          label={item.name}
                          style={{ maxWidth: '200px' }}
                          clickable
                          color="default"
                          avatar={<FileCopyIcon />}
                          onDelete={() => {
                            handleDeleteFile(item.publicURL, gpp, 'gpp');
                          }}
                          onClick={() => {
                            handleViewFile(item.publicURL);
                          }}
                        />
                      </Tooltip>
                    </Grid>
                  ))}
                </Grid>
              )}
              <FormHelperText className={styles.helperTextMobile}>File PDF, PNG, JPEG, DOC hoặc DOCX - tối đa 3 files</FormHelperText>
            </div>
            <div>
              {/* businessImage */}
              <div className={styles.label_mobile}>Hình ảnh nhà thuốc</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  classes={{ root: clsx(styles.upload_button, styles.border_radius_8) }}
                  onClick={() => {
                    document.getElementById('business-images').click();
                  }}
                  style={{
                    backgroundColor: disabledBusinessImage ? '#DFE3E8' : 'rgb(0, 180, 110)',
                    color: disabledBusinessImage ? 'rgb(158 156 173)' : '#fff',
                  }}
                >
                  Tải file
                </Button>
              </div>
              {businessImages.length > 0 && (
                <Grid container spacing={2} direction="row">
                  {businessImages.map((item) => (
                    <Grid item key={uuidV4()}>
                      <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: -10, right: -10, zIndex: 1 }}>
                          <HighlightOffIcon
                            fontSize="small"
                            onClick={() => handleDeleteFile(item, businessImages, 'businessImages')}
                            style={{ color: '#666666', cursor: 'pointer' }}
                          />
                        </div>
                        <Image
                          src={item || MISSING_IMAGE}
                          width="100"
                          height="100"
                          onClick={() => {
                            handleViewFile(item);
                          }}
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}
              <FormHelperText className={styles.helperTextMobile}>File PNG, JPEG - tối đa 3 files</FormHelperText>
            </div>
          </>
        )}
      </Grid>
      {/* <h1 className={styles.title}> Thông tin xuất hoá đơn </h1> */}
      <Grid container spacing={2}>
        <InfoFormControl xs={12} label="Mã số thuế" htmlFor="taxCode" error={error.taxCode}>
          <InfoInput
            id="taxCode"
            placeholder="Mã số thuế"
            value={taxCode}
            error={error.taxCode}
            onChange={(e) => {
              handleSetValue('taxCode', e.target.value);
            }}
          />
        </InfoFormControl>
        <InfoFormControl xs={12} label="Địa chỉ nhà thuốc/phòng khám" htmlFor="address" isRequired>
          <InfoInput
            id="address"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => {
              handleSetValue('address', e.target.value);
            }}
          />
        </InfoFormControl>
      </Grid>

      <GroupAddressSelect id={uuidV4()} currentAddress={currentAddress} handleSetCurrentAddress={handleSetCurrentAddress} error={error} />
    </Paper>
  );
};

export default EnterpriseForm;
