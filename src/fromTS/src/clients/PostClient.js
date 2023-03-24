import { DELETE, GET_ALL, POST, PUT } from './Clients';

async function createPost({ ctx, body }) {
  return POST({ ctx, url: '/marketplace/social/v1/post', body, isBasic: true });
}

async function deletePost({ ctx, params }) {
  return DELETE({ ctx, url: '/marketplace/social/v1/post', params, isBasic: true });
}

async function updatePost({ ctx, body }) {
  return PUT({ ctx, url: '/marketplace/social/v1/post', body, isBasic: true });
}

async function getAll({ ctx, body }) {
  return GET_ALL({ ctx, url: '/marketplace/social/v1/posts', params: body });
}

export default {
  createPost,
  deletePost,
  getAll,
  updatePost,
};
