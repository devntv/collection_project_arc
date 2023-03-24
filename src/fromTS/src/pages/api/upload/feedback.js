import { CustomerClient, isValidWithoutData } from 'clients';
import UploadFileClient from 'clients/UploadFileClient';
import { FILE_TYPE } from 'constants/Enums';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

/*
  API mock for upload file no need authen
*/
export default handlerMiddleware(
  async (req, res) => {
    const { method } = req;

    apiHandler(res, method, {
      POST: async (resp) => {
        const ctx = { req, res };
        const { file, type } = req.body;

        const tokenRes = await UploadFileClient.genTokenNoAuth({ ctx });
        if (!isValidWithoutData(tokenRes)) {
          res.json(tokenRes);
          return;
        }
        const body = {
          data: file,
          refType: 'PRODUCT',
          token: tokenRes.message,
        };

        let uploadRes = {};
        if (type === FILE_TYPE.PDF || type === FILE_TYPE.DOC || type === FILE_TYPE.DOCX) {
          uploadRes = await CustomerClient.uploadDocument({ ctx, body });
        } else {
          uploadRes = await CustomerClient.uploadFileImage({ ctx, body });
        }
        resp.json(uploadRes);
      },
    });
  },
  { checkAuthentication: false },
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '3mb',
    },
  },
};
