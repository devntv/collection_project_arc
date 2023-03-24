const MapTicketTypeName = { PRODUCT: 'Sản phẩm', ORDER: 'Đơn hàng', OTHER: 'Khác', ACCOUNT: 'Tài khoản', PROMOTION: 'Khuyến mãi' };

const TicketEnums = {
  PRODUCT: 'PRODUCT',
  ACCOUNT: 'ACCOUNT',
  ORDER: 'ORDER',
  OTHER: 'OTHER',
  PROMOTION: 'PROMOTION',
};

const TicketLabelEnums = {
  PRODUCT: {
    code: 'PRODUCT',
    label: 'Sản phẩm',
  },
  ACCOUNT: {
    code: 'ACCOUNT',
    label: 'Tài khoản',
  },
  ORDER: {
    code: 'ORDER',
    label: 'Đơn hàng',
  },
  OTHER: {
    code: 'OTHER',
    label: 'Ý kiến đóng góp',
  },
  PROMOTION: {
    code: 'PROMOTION',
    label: 'Khuyến mãi',
  },
};

const TicketStatus = {
  PENDING: {
    code: 'PENDING',
    label: 'Chưa xử lý',
  },
  IN_PROCESS: {
    code: 'IN_PROCESS',
    label: 'Đang xử lý',
  },
  REPLIED: {
    code: 'REPLIED',
    label: 'Đã trả lời',
  },
  CANCELLED: {
    code: 'CANCELLED',
    label: 'Đã hủy',
  },
  DONE: {
    code: 'DONE',
    label: 'Hoàn tất',
  },
};
const TYPE_OF_STATUS = {
  PENDING: 'Chưa Xử Lý',
  IN_PROCESS: 'Đang Xử Lý',
  DONE: 'Đã Xử Lý',
  REPLIED: 'Đã Trả Lời',
  CANCELLED: 'Đã Hủy',
};

const BACKGROUND_COLOR_STATUS = {
  PENDING: 'rgb(204 85 85)',
  IN_PROCESS: 'rgb(248 142 31)',
  DONE: '#15A959',
  REPLIED: '#788FCA',
  CANCELLED: 'rgb(187 187 187)',
};
const TYPE_OF_TICKET_SUPPORT = {
  PROMOTION: 'Khuyến mãi',
  ACCOUNT: 'Tài Khoản',
  PRODUCT: 'Sản Phẩm',
  ORDER: 'Đơn Hàng',
  OTHER: 'Khác',
};

const TicketTypes = ['PRODUCT', 'ACCOUNT', 'ORDER', 'OTHER', 'PROMOTION'];
const TicketTypesNotActive = ['ACCOUNT', 'PRODUCT', 'OTHER'];
const TicketTypesPageFeedback = ['ACCOUNT'];

export default {
  MapTicketTypeName,
  TicketEnums,
  TicketLabelEnums,
  TicketTypes,
  TicketStatus,
  TicketTypesNotActive,
  TicketTypesPageFeedback,
  TYPE_OF_STATUS,
  BACKGROUND_COLOR_STATUS,
  TYPE_OF_TICKET_SUPPORT,
};
