const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isEmpty = (val) => !val || val.length === 0 || (typeof val === 'object' && Object.keys(val).length === 0);

const checkLength = (val, length) => {
  if (isEmpty(val)) {
    return false;
  }
  if (val.length > length) {
    return false;
  }
  return true;
};

const isNumber = (str) => {
  try {
    if (typeof str === 'number') return true;
    if (typeof str !== 'string') return false;
    return !Number.isNaN(str) && !Number.isNaN(parseFloat(str));
  } catch (error) {
    return false;
  }
};

export const isDigits = (str) => {
  const reg = /^\d+$/;
  return reg.test(str);
};

export const formValidateEmail = (e) => {
  if (validateEmail(e.target.value)) {
    return true;
  }
  return false;
};

const validatePhone = (phone) => {
  const re = /^(09|07|08|05|03|02[0|1|2|3|4|5|6|7|8|9])+([0-9]{8})\b/;
  return re.test(String(phone));
};

function Error(message, type) {
  this.message = message;
  this.type = type;
}
const Success = (message, type) => ({ message, validate: true, type });

const funcValidateEmail = (email) => {
  if (isEmpty(email)) throw new Error('Bạn chưa điền thông tin email', 'email');
  if (!validateEmail(email)) throw new Error('Email chưa đúng định dạng', 'email');
};

const funcValidateName = (name) => {
  if (isEmpty(name)) throw new Error('Bạn chưa nhập họ tên', 'name');
  if (name?.length <= 2) throw new Error('Họ Tên yêu cầu phải hơn 2 kí tự', 'name');
};

// eslint-disable-next-line operator-linebreak

const funcValidatePassword = (pass) => {
  if (isEmpty(pass)) throw new Error('Bạn chưa điền mật khẩu', 'password');

  if (pass.length < 2 || pass.length > 30) {
    throw new Error('Mật khẩu tối thiểu 2 và tối đa 30 kí tự', 'password');
  }
};

const funcValidatePhoneNumber = (phone) => {
  if (isEmpty(phone)) throw new Error('Bạn chưa điền số điện thoại', 'phone');
  if (!validatePhone(phone)) {
    throw new Error('Số điện thoại không đúng định dạng', 'phone');
  }
};

export const validateMst = (mst = '') => {
  if (isEmpty(mst)) {
    return 'Bạn chưa nhập mã số thuế ';
  }
  const lengthMst = mst.length;
  if (lengthMst !== 10 && lengthMst !== 14) {
    return 'Mã số thuế phải có độ dài là 10 hoặc 14';
  }

  if (lengthMst === 10) {
    return isDigits(mst) ? null : 'Mã số thuế sai định dạng';
  }
  const arr = mst.split('-');
  const mst1 = arr[0] || null;
  const mst2 = arr[1] || null;
  return isDigits(mst1) && mst1?.length === 10 && isDigits(mst2) && mst2?.length === 3 ? null : 'Mã số thuế sai định dạng';
};

const validateData = {
  email: funcValidateEmail,
  name: funcValidateName,
  password: funcValidatePassword,
  phoneNumber: funcValidatePhoneNumber,
  mst: validateMst,
};

export const cleanAccents = (text) => {
  let str = text;
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Combining Diacritical Marks
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // huyền, sắc, hỏi, ngã, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // mũ â (ê), mũ ă, mũ ơ (ư)

  return str;
};

export const isFullName = (str) => {
  const regex = /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/;
  return regex.test(str);
};

export const groupTypeofFileByExtension = (extension) => {
  if (!extension) throw new Error(`Invalid extension: ${extension}`);
  const TYPE_OF_EXTENSION = {
    PDF: ['pdf'],
    IMAGE: ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'],
    VIDEO: ['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'drc', 'gifv', 'avi', 'mov', 'yuv', 'mp4', 'm4p', 'm4v', 'mpg', 'mp2', 'mpeg'],
    XLS: ['xlsx', 'xlsm', 'xlsb', 'xltx', 'xltm', 'xls', 'xlt', 'xml', 'xlam', 'xla', 'xlw', 'xlr'],
    DOCS: ['odt', 'txt', 'ppt', 'pptx', 'ods'],
  };
  const type = Object.keys(TYPE_OF_EXTENSION).find((key) => TYPE_OF_EXTENSION[key].includes(extension));

  return type || 'OTHER'; // return OTHER if can't find any type
};

export default {
  validateEmail,
  isEmpty,
  isNumber,
  checkLength,
  formValidateEmail,
  validatePhone,
  Error,
  Success,
  validateData,
  validateMst,
  cleanAccents,
  isDigits,
  isFullName,
  groupTypeofFileByExtension,
};
