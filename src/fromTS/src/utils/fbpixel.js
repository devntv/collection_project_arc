/* eslint-disable camelcase */
export const FACEBOOK_PIXEL_CODE = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_CODE;

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  if (window && window.fbq) window.fbq('track', name, options);
};

const convertProduct = (item) => ({
  content_name: item?.name,
  content_category: item?.category,
  content_ids: [item?.sku],
  content_type: item?.type || 'product',
  value: item?.displayPrice || 0,
  currency: item?.currency || 'VND',
});

export const pageview = () => {
  if (window && window.fbq) window.fbq('track', 'PageView');
};

export const addPaymentInfo = () => {
  event('AddPaymentInfo');
};

export const addToCart = (item) => {
  event('AddToCart', convertProduct(item));
};

export const addToWishlist = (item) => {
  event('AddToWishlist', convertProduct(item));
};

export const completeRegistration = () => {
  event('CompleteRegistration');
};

export const search = () => {
  event('Search');
};

export const submitApplication = () => {
  event('SubmitApplication');
};

/*
content_name: 'Really Fast Running Shoes',
  content_category: 'Apparel & Accessories > Shoes',
  content_ids: ['1234'],
  content_type: 'product',
  value: 0.50,
  currency: 'USD'
*/

export const viewContent = (item) => event('ViewContent', convertProduct(item));

/*
  {
    content_ids: ['partner_event_id'],
    eventref: 'fb_oea' // or set to empty string
    currency: 'USD'  // your currency string value goes here
    num_items: 1, // your number of tickets purchased value goes here
    value: 15.30, // your total transaction value goes here
  }
*/

export const purchase = ({ content_ids, currency = 'VND', num_items = 0, value = 0 }) =>
  event('Purchase', { content_ids, currency, num_items, value });

export const lead = () => event('Lead');

export const initiateCheckout = () => event('InitiateCheckout');

export default {
  pageview,
  event,
  search,
  purchase,
  initiateCheckout,
  lead,
  viewContent,
  submitApplication,
  addPaymentInfo,
  addToCart,
  addToWishlist,
};
