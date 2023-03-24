import { PRICING_API } from 'constants/APIUriV2';
import { GET } from './Clients';

export const getDeliveryMethod = async ({ ctx, params }) => GET({ url: PRICING_API.DELIVERY_METHOD, ctx, params });
export const getPaymentMethod = async ({ ctx, params }) => GET({ url: PRICING_API.PAYMENT_METHOD, ctx, params });

const getDetailDeliveryMethod = ({ deliveryPlatformCode, ctx }) =>
  GET({ ctx, url: PRICING_API.DELIVERY_METHOD_DETAIL, params: { deliveryPlatformCode } });

const getDetailPaymentMethod = ({ paymentMethodCode, ctx }) => GET({ ctx, url: PRICING_API.PAYMENT_METHOD_DETAIL, params: { paymentMethodCode } });

export default {
  getDeliveryMethod,
  getPaymentMethod,
  getDetailDeliveryMethod,
  getDetailPaymentMethod,
};
