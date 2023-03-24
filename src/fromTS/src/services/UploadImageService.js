import { UploadImageClient } from 'clients';

export const upload = async (data) => {
  const imgRes = await UploadImageClient.uploadImage(data);
  return imgRes;
};

export default { upload };
