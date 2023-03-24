import MockService from 'services/MockService';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

/*
  API mock for upload file no need authen
*/
export default handlerMiddleware(
  async (req, res) => {
    const { method } = req;

    apiHandler(res, method, {
      GET: async (resp) => {
        const ctx = { req, res };
        // const bannerResult = await MarketingClient.getListBanner(ctx);
        const bannerResult = await MockService.getBanners(ctx);
        resp.json(bannerResult);
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
