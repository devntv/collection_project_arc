import { GET } from './Clients';

const getSmartRecommendation = async ({ userId, details = true, type, ctx }) =>
  GET({ url: '/web/insider', params: { userId, details, type }, ctx, mock: true, isAuth: false });

const InsiderClient = { getSmartRecommendation };

export default InsiderClient;
