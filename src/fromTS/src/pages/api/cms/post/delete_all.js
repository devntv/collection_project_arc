import { AuthClient, getData, isValid } from 'clients';
import PostClient from 'clients/PostClient';
import { DateTimeUtils } from 'utils';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';
import { internal } from '../data';

export default handlerMiddleware(async (req, res) => {
  const { method } = req;

  const ctx = { req, res };

  apiHandler(res, method, {
    DELETE: async (resp) => {
      const loginResult = await AuthClient.loginInternal({
        ctx,
        body: {
          username: internal.username,
          password: internal.password,
          type: 'EMPLOYEE',
        },
      });
      if (!isValid(loginResult)) {
        resp.json(loginResult);
        return;
      }

      const bearerToken = loginResult?.data[0].bearerToken;
      const header = { ...ctx?.req?.headers, authorization: `Bearer ${bearerToken}` };
      ctx.req.headers = header;
      const postResult = await PostClient.getAll({ ctx, body: { limit: 50 } });
      // resp.json(postResult);
      const dataResult = isValid(postResult) ? [] : null;
      const promise = getData(postResult)?.map(async (item) => {
        // console.log('🚀 ~ file: delete_all.js:34 ~ promise ~ item', item);
        if (item && item.id && !item.isEnabled && DateTimeUtils.parseDateTimeToNumber(new Date(item.createdTime)) < 20221201) {
          ctx.req.headers = header;
          dataResult.push(item.createdTime);

          const deletePostResult = await PostClient.deletePost({ ctx, params: { id: item.id } });
          dataResult.push(deletePostResult);

          // const deletePostResult = await PostClient.updatePost({ ctx, body: { ...item, isEnabled: false } });
        }
      });

      await Promise.all(promise);

      resp.json(dataResult);
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
