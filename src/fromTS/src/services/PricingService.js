import { isValid, PricingClients } from 'clients';

export const getListPaymentMethod = async ({ ctx, params }) => {
  const paymentsRes = await PricingClients.getPaymentMethod({ ctx, params });
  if (!isValid(paymentsRes)) {
    return [];
  }
  // add filter status === ON
  return paymentsRes.data
    ?.filter(({ status }) => status === 'ON')
    .sort((a, b) => (a?.priority || 0) - (b?.priority || 0))
    .map((item) => {
      const { paymentLocations = [] } = item || {};

      const mapLocationFee = {};

      paymentLocations?.forEach((delivery) => {
        const { feeDiscountPercentage = 0, locationCodes = [] } = delivery || {};
        locationCodes?.forEach((locationCode) => {
          mapLocationFee[locationCode] = `${feeDiscountPercentage}`;
        });
      });

      return {
        ...item,
        mapLocationFee,
      };
    });
};

export const getListDeliveryMethod = async ({ ctx, params }) => {
  const deliveryRes = await PricingClients.getDeliveryMethod({ ctx, params });
  if (!isValid(deliveryRes)) {
    return [];
  }
  // add filter status == ON

  return (
    deliveryRes.data
      ?.filter(({ status }) => status === 'ON')
      .sort((a, b) => (a?.priority || 0) - (b?.priority || 0))
      // convert map price
      .map((item) => {
        const { deliveryLocations } = item;
        const mapLocationFee = {};
        deliveryLocations?.forEach((delivery) => {
          const { feeValue = 0, locationCodes = [] } = delivery || {};
          locationCodes?.forEach((locationCode) => {
            mapLocationFee[locationCode] = feeValue;
          });
        });
        return {
          ...item,
          mapLocationFee,
        };
      })
  );
};

export const getDetailPaymentMethod = async ({ ctx, paymentMethodCode }) => {
  const paymentMethodRes = await PricingClients.getDetailPaymentMethod({ ctx, paymentMethodCode });
  return paymentMethodRes;
};

export const getDetailDeliveryMethod = async ({ ctx, deliveryPlatformCode }) => {
  const deliveryMethodRes = await PricingClients.getDetailDeliveryMethod({
    ctx,
    deliveryPlatformCode,
  });
  return deliveryMethodRes;
};

export default {
  getListPaymentMethod,
  getListDeliveryMethod,
  getDetailPaymentMethod,
  getDetailDeliveryMethod,
};
