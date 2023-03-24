import { KHUYEN_MAI } from 'constants/Paths';

const getLinkTagDeal = ({ campaign: campaignWithProduct = {} }, type) => {
  let link = '';
  const { campaign } = campaignWithProduct || {};
  const { campaignType, slug: linkTagBySlug } = campaign || {};
  if (campaignType !== 'DAILY_DEAL') {
    link = `${KHUYEN_MAI}/${linkTagBySlug}`;
  }
  // deal
  if (!campaignWithProduct || Object.keys(campaignWithProduct).length === 0) link = '/deals';
  if (type === 'CAMPAIGN' && Object.keys(campaignWithProduct || {}).length === 0) link = '/khuyenmai';
  return link;
};

export default getLinkTagDeal;
