/* eslint-disable no-unused-vars */

export async function tracking({ page = '/', accountId, customerID, eventAction, currentPage = '/', isMobile }) {
  const url = '/marketplace/promotion/v1/tracking';
  const body = {
    page,
    screen: '',
    source: isMobile ? 'thuocsi-mobile' : 'thuocsi-web',
    accountId,
    customerID,
    eventAction,
    currentPage,
  };
  // return POST({ url, body });
}

export default { tracking };
