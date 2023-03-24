import { Divider, Grid, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { getFirst, isValidWithoutData } from 'clients';
import UploadFileClient from 'clients/UploadFileClient';
import clsx from 'clsx';
import { FILE_TYPE } from 'constants/Enums';
import { ADD_FILE_ICON, MISSING_IMAGE } from 'constants/Images';
// @ts-ignore
import ImageBlobReduce from 'image-blob-reduce';
import Image from 'next/image';
// @ts-ignore
import Pica from 'pica';
import Dropzone from 'react-dropzone';
import { NotifyUtils } from 'utils';
import { ImageFallbackStatic } from 'utils/ImageFallback';
import { blobToBase64 } from 'utils/ImageUtils';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';

const UploadFiles = ({ fileList, val, handleSetValue, label, subLabel, children, isMobile, isMobileV2 = false }) => {
  const onDrop = (acceptedFiles) => {
    if (fileList?.length + acceptedFiles.length > 3) {
      NotifyUtils.error('Chỉ được gửi tối đa 3 file');
      return;
    }
    acceptedFiles.forEach((file) => {
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

          if (limitSize > 5) {
            NotifyUtils.error('Kích thước quá lớn');
            return;
          }
          if (type !== FILE_TYPE.PDF && type !== FILE_TYPE.DOC && type !== FILE_TYPE.DOCX && type !== FILE_TYPE.PNG && type !== FILE_TYPE.JPEG) {
            NotifyUtils.error('Sai định dạng file');
            return;
          }
          if (val === 'businessImages' && type !== FILE_TYPE.PNG && type !== FILE_TYPE.JPEG) {
            NotifyUtils.error('Sai định dạng file');
            return;
          }
          if (val === 'orderFeedBack' && type !== FILE_TYPE.PNG && type !== FILE_TYPE.JPEG) {
            NotifyUtils.error('Sai định dạng file');
            return;
          }
          const result = await UploadFileClient.upload({ body: { file: base64, type } });
          if (!isValidWithoutData(result)) NotifyUtils.error(result?.message || 'Tải file không thành công');
          if (val !== 'businessImages')
            fileList.push({
              name: file.name,
              publicURL: getFirst(result),
            });
          else fileList.push(getFirst(result));
          handleSetValue(val, fileList);
        } catch (err) {
          console.error(err);
        }
      };
    });
  };

  const handleDeleteFile = (link, value) => {
    let tmpList = [...fileList];
    if (value !== 'businessImages') {
      tmpList = tmpList.filter((l) => l.publicURL !== link);
    } else tmpList = tmpList.filter((l) => l !== link);
    handleSetValue(value, tmpList);
  };

  const handleViewFile = (link) => {
    window.open(link);
  };
  return (
    <div className={clsx(styles.wrap, isMobileV2 && styles.mobileWrap)}>
      <Typography
        className={isMobileV2 ? styles.mobileUpload_title : ''}
        style={{ textAlign: 'start', fontSize: 16, color: '#868585', marginBottom: '10px' }}
      >
        {label}
      </Typography>
      {children}
      {fileList && fileList.length > 0 && val !== 'businessImages' && (
        <div style={{ margin: '8px 0' }}>
          {fileList.map((file) => (
            <div key={uuidv4()}>
              <Divider />
              <div className={styles.file}>
                <Typography
                  onClick={() => {
                    handleViewFile(file.publicURL);
                  }}
                  className={styles.preview}
                >
                  {file.name}
                </Typography>
                <ClearIcon fontSize="small" onClick={() => handleDeleteFile(file.publicURL, val)} className={styles.clearIcon} />
              </div>
            </div>
          ))}
          <Divider />
        </div>
      )}
      {fileList && fileList.length > 0 && val === 'businessImages' && (
        <Grid container spacing={2} direction="row" style={{ margin: '10px 0' }}>
          {fileList.map((item) => (
            <Grid item key={uuidv4()}>
              <div className={styles.wrapImage}>
                <div className={styles.inner}>
                  <HighlightOffIcon fontSize="small" onClick={() => handleDeleteFile(item, val)} style={{ color: '#666666', cursor: 'pointer' }} />
                </div>
                <Image
                  src={item || MISSING_IMAGE}
                  width={100}
                  height={100}
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

      {fileList && fileList.length > 0 && val === 'orderFeedBack' && (
        <Grid container spacing={2} direction="row" style={{ marginTop: 10 }}>
          {fileList.map((item) => (
            <Grid item md={6} key={uuidv4()}>
              <div className={styles.wrapImage}>
                <div className={styles.inner}>
                  <ClearIcon fontSize="small" onClick={() => handleDeleteFile(item.publicURL, val)} className={styles.clearIcon} />
                </div>
                <Image
                  src={item.publicURL || MISSING_IMAGE}
                  width="265px"
                  height="175px"
                  // layout="responsive"
                  // objectFit="contain"
                  className={styles.image}
                  onClick={() => {
                    handleViewFile(item.publicURL);
                  }}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ImageFallbackStatic src={ADD_FILE_ICON} width="13px" height="16px" />
                <Typography style={{ marginLeft: '14px', fontSize: '12px' }}>{isMobile ? 'Thêm file' : 'Kéo thả file vào đây'}</Typography>
              </div>
              <Typography style={{ fontSize: 12 }}>{subLabel}</Typography>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadFiles;
