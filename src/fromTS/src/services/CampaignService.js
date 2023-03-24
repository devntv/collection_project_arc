import { GET } from 'clients';

export const getCampaignDetailBySlug = async ({ ctx }) => {
  const { query } = ctx;
  const params = {
    q: JSON.stringify({ slug: query.slug }),
  };
  const url = `/marketplace/promotion/v1/campaign`;
  const result = await GET({
    url,
    ctx,
    params,
  });
  return result;
};

// without ctx
export const getCampaignDetailBySlugClient = async (slug) => {
  const params = {
    q: JSON.stringify({ slug }),
  };
  const url = `/marketplace/promotion/v1/campaign`;
  const result = await GET({
    url,
    params,
  });
  return result;
};

export default {
  getCampaignDetailBySlug,
  getCampaignDetailBySlugClient,
};
