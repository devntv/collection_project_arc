import { GET, POST } from 'clients';
import { API_GEN_TOKEN, API_UPLOAD, API_UPLOAD_FEEDBACK_MOCK } from 'constants/APIUriV2';

// MOCK API
const upload = async ({ ctx, body }) => POST({ url: API_UPLOAD, ctx, mock: true, body });
const uploadFeedbackMock = async ({ ctx, body }) => POST({ url: API_UPLOAD_FEEDBACK_MOCK, ctx, mock: true, isAuth: false, body });

// SERVER API

const genTokenNoAuth = async ({ ctx }) => GET({ url: API_GEN_TOKEN, ctx, isBasic: true, isAuth: false });

export default {
  upload,
  uploadFeedbackMock,
  genTokenNoAuth,
};
