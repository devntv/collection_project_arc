import { CustomerClient, isValidWithoutData } from 'clients';
import { FILE_TYPE } from 'constants/Enums';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

export default handlerMiddleware(async (req, res) => {
  const { method } = req;

  apiHandler(res, method, {
    POST: async (resp) => {
      const ctx = { req, res };
      const { file, type } = req.body;

      const tokenRes = await CustomerClient.genToken({ ctx });
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
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
};
