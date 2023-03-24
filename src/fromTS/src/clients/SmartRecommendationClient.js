import { SMART_RECOMMENDATION_API } from 'constants/APIUriV2';
import { POST } from './Clients';

export const getRecommendProduct = async ({ ctx, body }) => POST({ url: SMART_RECOMMENDATION_API.RECOMMEND, ctx, body });

export default { getRecommendProduct };
