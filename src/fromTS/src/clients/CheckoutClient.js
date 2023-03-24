import { PUT } from './Clients';

async function Checkout(body) {
  return PUT({ url: '/marketplace/order/v2/cart/checkout', body });
}

export default {
  Checkout,
};
