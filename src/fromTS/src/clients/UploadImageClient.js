import { POST } from './Clients';

async function uploadImage(body) {
  return POST({ url: '/marketplace/product/v1/upload', body });
}

export default {
  uploadImage,
};
