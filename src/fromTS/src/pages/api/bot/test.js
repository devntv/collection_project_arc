import getConfig from 'next/config';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';

export default handlerMiddleware(
  async (req, res) => {
    const { method } = req;
    apiHandler(res, method, {
      GET: async (resp) => {
        const { publicRuntimeConfig } = getConfig();
        // const rsVn = await BotClient.sendMesageBotOrderVn({ message: 'test vn' });
        // console.log('🚀 ~ file: test.js:12 ~ GET: ~ rsVn:', rsVn);
        // const rsError = await BotClient.sendMesageBotOrderVn({ message: 'error sẽ vào đây' });
        // console.log('🚀 ~ file: test.js:14 ~ GET: ~ rsError:', rsError);
        // BotClient.sendMesageBotOrderTh({ message: 'test th' });
        // BotClient.sendMesageBotOrderKh({ message: 'test kh' });
        // BotClient.findThreadId();
        const data = {
          name: 'web',
          buildId: publicRuntimeConfig.buildId,
        };
        resp.json(data);
      },
    });
  },
  {
    checkAuthentication: false,
  },
);
