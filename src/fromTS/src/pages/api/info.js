import getConfig from 'next/config';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

export default handlerMiddleware(async (req, res) => {
  const { method } = req;
  apiHandler(res, method, {
    GET: async (resp) => {
      const { publicRuntimeConfig } = getConfig();
      const data = {
        name: 'web',
        buildId: publicRuntimeConfig.buildId,
      };
      resp.json(data);
    },
  });
});
