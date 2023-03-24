/* eslint-disable no-underscore-dangle */
import MockService from 'services/MockService';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

// middle ware for mock API
export default handlerMiddleware(
  async (req, res) => {
    const { method } = req;

    apiHandler(res, method, {
      GET: async (resp) => {
        const result = await MockService.getListSellers();
        resp.json(result);
      },
    });
  },
  { checkAuthentication: false },
);
