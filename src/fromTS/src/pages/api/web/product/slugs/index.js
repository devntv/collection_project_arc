/* eslint-disable no-param-reassign */
import { ProductServiceV2 } from 'services';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

/*
  API mock for upload file no need authen
*/
export default handlerMiddleware(async (req, res) => {
  const { method, body } = req;
  const { slugs } = body || {};

  apiHandler(res, method, {
    POST: async (resp) => {
      const ctx = { req, res };

      resp.status = 200;

      if (slugs?.length === 0) {
        resp.json({
          status: 'NOT_FOUND',
        });
        return;
      }

      const result = await ProductServiceV2.getDataProductsBySlugs({ ctx, slugs, isAvailable: true });
      res.json(result);
    },
  });
});
