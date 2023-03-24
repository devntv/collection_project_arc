/* eslint-disable import/no-named-as-default-member */
import AuthClient from 'clients/AuthClient';
import { getData } from 'clients/Clients';
import PostClient from 'clients/PostClient';
import { ProductServiceV2 } from 'services';
import { apiHandler, handlerMiddleware } from 'utils/ServerSideUtils';
import { internal } from '../data';

const convertPost = (product) => ({
  description: '',
  isEnabled: true,
  products: [
    {
      label: product.name,
      name: product.name,
      sku: product?.sku,
    },
  ],
  locationCodes: ['00'],
  contentType: 'IMAGE',
  title: product?.name,
  images: product?.imagesProxy,
});

export default handlerMiddleware(async (req, res) => {
  const { method } = req;

  const ctx = { req, res };
  const { skus } = req.body;
  console.log('🚀 ~ file: create.js:31 ~ handlerMiddleware ~ skus', skus);

  apiHandler(res, method, {
    POST: async (resp) => {
      const productResult = await ProductServiceV2.getProductInfoFromSkus({ ctx, skus });
      console.log('🚀 ~ file: create.js ~ line 33 ~ POST: ~ productResult', productResult);

      const data = getData(productResult)?.map((item) => convertPost(item)) || [];
      if (data.length === 0) {
        resp.json(data);
        return;
      }
      // resp.json(productResult);
      // console.log('🚀 ~ file: create.js ~ line 33 ~ POST: ~ data', data);
      const dataResult = [];
      const loginResult = await AuthClient.loginInternal({
        ctx,
        body: {
          username: internal.username,
          password: internal.password,
          type: 'EMPLOYEE',
        },
      });
      console.log('🚀 ~ file: create.js:53 ~ POST: ~ loginResult', loginResult);

      const bearerToken = loginResult?.data[0].bearerToken;
      const header = { ...ctx?.req?.headers, authorization: `Bearer ${bearerToken}` };
      ctx.req.headers = header;
      console.log('🚀 ~ file: create.js:56 ~ POST: ~ bearerToken', bearerToken);
      const allPostResult = await PostClient.getAll({ ctx, body: { limit: 50 } });
      console.log('🚀 ~ file: create.js:57 ~ POST: ~ allPostResult', allPostResult);

      const allPosts = getData(allPostResult);

      // dataResult.push(productResult);
      const promise = data?.map(async (body) => {
        if (body) {
          console.log('🚀 ~ file: create.js:61 ~ promise ~ body', body);
          console.log('🚀 ~ file: create.js:61 ~ promise ~ postItem', allPosts[0], allPosts.length);
          ctx.req.headers = header;
          let postResult = await PostClient.createPost({ ctx, body });
          console.log('🚀 ~ file: create.js ~ line 52 ~ promise ~ postResult', postResult);
          // if existed => remove and re-created
          if (postResult.status === 'EXISTED') {
            const postItem = allPosts.find((item) => item.products[0].sku === body.products[0].sku);
            console.log('🚀 ~ file: create.js:70 ~ promise ~ postItem', postItem);
            if (postItem) {
              const deletePostRes = await PostClient.deletePost({ ctx, params: { id: postItem.id } });
              console.log('🚀 ~ file: create.js:72 ~ promise ~ deletePostRes', deletePostRes);
              postResult = await PostClient.createPost({ ctx, body });
              console.log('🚀 ~ file: create.js:73 ~ promise ~ postResult', postResult);
            }
          }
          dataResult.push(postResult);
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
