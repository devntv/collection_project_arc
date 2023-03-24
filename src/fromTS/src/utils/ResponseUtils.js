import { HTTP_STATUS } from 'constants/Enums';

const response = ({ status, message }) => ({ status, message });

export const notfound = (msg) => response({ status: HTTP_STATUS.NotFound, msg });
export const invalid = (msg) => response({ status: HTTP_STATUS.invalid, msg });
export const ok = (data, msg) => response({ status: HTTP_STATUS.Ok, msg, data });
export const error = (msg) => response({ status: HTTP_STATUS.Error, msg });
export const existed = (msg) => response({ status: HTTP_STATUS.Existed, msg });
export const forbidden = (msg) => response({ status: HTTP_STATUS.Forbidden, msg });
export const unauthorized = (msg) => response({ status: HTTP_STATUS.Unauthorized, msg });

export const parse = (resp) => {
  if (resp) {
    return resp;
  }
  return error('Hệ thống đang tạm dừng, xin vui lòng thử lại sau');
};

export default { notfound, invalid, ok, error, existed, forbidden, unauthorized };
