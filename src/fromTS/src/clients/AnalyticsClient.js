import { API_PRD_HOST_DOMAIN, ENV } from 'sysconfig';
import { getData, POST } from './Clients';

export const getAnalyticsCustomer = async ({ customerCode, ctx, from, to }) => {
  let url = `/integration/analytics/v1/customer-sku/${customerCode}`;
  if (ENV === 'uat') {
    url = API_PRD_HOST_DOMAIN + url;
  }
  return POST({ url, ctx, body: { fromTime: from, toTime: to } });
};

export const getAnalyticsSku = async ({ sku, timeSpan, fromTime, toTime }) => {
  let url = `/integration/analytics/v1/sku/${sku}`;
  if (ENV === 'uat') {
    url = API_PRD_HOST_DOMAIN + url;
  }
  const res = await POST({ isBasic: true, url, body: { timeSpan, fromTime, toTime } });
  return getData(res);
};

export const getAnalyticsSkuRes = async ({ sku, timeSpan, fromTime, toTime }) => {
  let url = `/integration/analytics/v1/sku/${sku}`;
  if (ENV === 'uat') {
    url = API_PRD_HOST_DOMAIN + url;
  }
  return POST({ isBasic: true, url, body: { timeSpan, fromTime, toTime } });
};

export default { getAnalyticsCustomer, getAnalyticsSku, getAnalyticsSkuRes };
