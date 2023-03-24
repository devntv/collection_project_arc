import { getRecommendProduct } from 'clients/SmartRecommendationClient';

const getRecommendation = ({ ctx, body }) => getRecommendProduct({ ctx, body });

export default { getRecommendation };
