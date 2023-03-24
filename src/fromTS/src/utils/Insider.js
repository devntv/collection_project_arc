import { getPathProductBySlug } from 'constants/Paths';

const convertPhoneNumber = (phone) => {
  try {
    if (!phone) {
      return null;
    }
    if (phone.startsWith('+84')) return phone;
    if (phone.startsWith('84')) return `+${phone}`;
    if (phone.startsWith('0')) return `+84${phone.substring(1, phone.length)}`;
    return `+84${phone}`;
  } catch (error) {
    console.error('Error: ', error);
  }
  return null;
};

const convertUser = (user) => ({
  uuid: user?.customerID?.toString() || user?.code?.toString(),
  email: user?.email,
  phone_number: convertPhoneNumber(user?.phone || user?.phoneNumber),
  name: user?.name,
  gdpr_optin: true,
  email_optin: true,
  sms_optin: true,
  orders_count: user?.ordersCount || 0,
  is_activated: user?.isActive,
  loyalty_point: user?.point,
});

const convertCartItem = ({ item }) =>
  item && {
    name: item.name,
    product_name: item.name,
    product_id: item.productId,
    quantity: item.quantity,
    origin_price: Number((item.price || item.salePrice || item.deal?.price || 0)) || 0,
    price: Number((item.deal?.price || item.salePrice || item.price || 0)) || 0,
    product_url: getPathProductBySlug(item.slug),
    image_url: (item.imagesProxy && item.imagesProxy[0]) || '',
  };
const updateCartItem = async (cartItems) => {
  if (window && window.insider_object && window.insider_object.user && cartItems) {
    window.insider_object.user.cart_info = cartItems?.map((item) => convertCartItem({ item }));
  }
};
const initUser = (user) => {
  if (window && user && !window.insider_object) {
    const userInfo = convertUser(user);
    window.insider_object = {
      user: userInfo,
    };
  }
};

const confirmation = () => {
  if (window)
    window.insider_object = {
      page: {
        type: 'Confirmation',
      },
    };
};

const registerSuccess = (user) => {
  if (window && user) {
    const userInfo = convertUser(user);

    window.insider_object = {
      user: userInfo,
      email: user?.email || '',
      phone_number: convertPhoneNumber(user?.phone || user?.phoneNumber),
      page: {
        type: 'dangky_success',
      },
    };
  }
};

export default { initUser, confirmation, convertCartItem, updateCartItem, registerSuccess };
