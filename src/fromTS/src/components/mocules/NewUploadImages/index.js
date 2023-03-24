/* eslint-disable no-shadow */
import { Grid } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { isValid } from 'clients';
import UploadFileClient from 'clients/UploadFileClient';
import { FILE_TYPE } from 'constants/Enums';
// @ts-ignore
import ImageBlobReduce from 'image-blob-reduce';
// @ts-ignore
import RUG, { DropArea } from 'lib/react-upload-gallery';
import Pica from 'pica';
import { useState } from 'react';
import { ImageFallback } from 'utils';
import { blobToBase64 } from 'utils/ImageUtils';
import NotifyUtils from 'utils/NotifyUtils';
import { v4 as uuidv4 } from 'uuid';

export default function NewUploadImages(props) {
  const { onChange, images = [], limit = 6, isAuth = true, setLoading } = props;

  const functionUpload = isAuth ? UploadFileClient.upload : UploadFileClient.uploadFeedbackMock;

  const [imageUrls, setImageUrls] = useState([]);

  const customRequest = ({ uid, file, action, onSuccess, onError }) => {
    if (setLoading) {
      setLoading();
    }
    const image = file;
    const { type } = file;
    const copyImageUrls = imageUrls;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = async () => {
      let base64 = reader.result;
      let blob = new Blob([base64]);

      let limitSize = blob.size / 1024 / 1024;
      if ((type === FILE_TYPE.PNG || type === FILE_TYPE.JPEG) && limitSize > 2) {
        const pica = Pica({ features: ['js', 'wasm', 'cib'] });
        const reduce = new ImageBlobReduce({ pica });
        blob = await reduce.toBlob(file, { max: 2000 });
        base64 = await blobToBase64(blob);
        limitSize = blob.size / 1024 / 1024;
      }

      if (limitSize > 2) {
        NotifyUtils.error('Kích thước quá lớn');
        onError(uid, {
          action,
          response: base64,
        });
      } else {
        // declare function upload above -> gọi vào mock api /upload ( auth ) hoặc /upload/feedback ( no auth )
        functionUpload({ body: { file: base64, type } })
          .then((result) => {
            if (!isValid(result)) {
              NotifyUtils.error(result.message);
              onError(uid, {
                action,
                status: result.message,
                response: reader.result,
              });
            } else {
              onSuccess(uid, result);
              copyImageUrls.push(result.data[0]);
              setImageUrls(copyImageUrls);
              onChange(copyImageUrls);
            }
          })
          .catch((error) => {
            onError(uid, {
              action,
              status: error.request,
              response: error.response,
            });
            onChange(copyImageUrls);
          });
      }
    };

    return {
      abort() {},
    };
  };
  const handleDelete = (image) => {
    let arr = imageUrls;
    arr = arr.filter((item) => item !== image.source);
    setImageUrls(arr);
    onChange(arr);
  };
  return (
    <RUG
      rules={{
        limit,
      }}
      accept={['jpg', 'jpeg', 'png']}
      source={(response) => response.data[0]}
      onDeleted={(image) => handleDelete(image)}
      initialState={images}
      onWarning={(type, rules) => {
        switch (type) {
          case 'accept':
            NotifyUtils.error(`Chỉ chấp nhận định dạng ${rules.accept.join(', ')}`);
            break;
          case 'limit':
            NotifyUtils.error(`Cho phép tối đa ${rules.limit} ảnh`);
            break;
          case 'size':
            NotifyUtils.error(`Cho phép kích thước tối đa ${rules.size}Kb`);
            break;
          default:
        }
      }}
      header={({ openDialogue }) => (
        <DropArea>
          {(isDrag) => (
            <div className={`rug-handle ${isDrag ? '__dragging' : ''}`} onClick={openDialogue} onKeyDown={openDialogue} aria-hidden="true">
              <CloudUpload className={`rug-handle-icon ${isDrag ? '__arrow' : ''}`} />
              <div className="rug-handle-info">
                <div className="rug-handle-drop-text">Kéo thả hoặc nhấp vào đây để tải ảnh</div>
                <div className="rug-handle-limit-message">(Được phép tải tối đa {limit} ảnh)</div>
              </div>
            </div>
          )}
        </DropArea>
      )}
      customRequest={customRequest}
    >
      {(images) => (
        <Grid direction="row" key={uuidv4()} container>
          {images?.map((image) => (
            <Grid item key={uuidv4()} style={{ padding: 5 }}>
              <ImageFallback src={image.source} width={90} height={90} />
            </Grid>
          ))}
        </Grid>
      )}
    </RUG>
  );
}
