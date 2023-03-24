/* eslint-disable array-callback-return */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable radix */
import { getBody } from './Utils';

const Request = ({
  uid,
  send,
  file,
  action,
  headers,
  withCredentials,

  onProgress,
  onSuccess,
  onError,
}) => {
  const xhr = new XMLHttpRequest();

  /**
   * Progress Percentage
   *
   */
  if (xhr.upload) {
    xhr.upload.onprogress = ({ loaded, total }) => {
      onProgress(uid, parseInt(Math.round((loaded / total) * 100).toFixed(2)));
    };
  }

  /**
   * onLoad Request
   *
   *
   */
  xhr.onload = () => {
    const response = getBody(xhr);
    const { status } = xhr;

    if (status < 200 || status >= 300) {
      return onError(uid, { action, status });
    }

    onSuccess(uid, response);
  };

  // Error
  xhr.onerror = () => {
    const response = getBody(xhr);
    const { status } = xhr;

    onError(uid, { action, status, response });
  };

  xhr.onabort = () => {
    const response = getBody(xhr);
    const { status } = xhr;

    onError(uid, { action, status, response });
  };

  xhr.open('POST', action, true);

  if (withCredentials) {
    xhr.withCredentials = true;
  }

  // if the value is null by default, the request will not be executed
  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  /**
   * Custom Headers
   *
   */
  for (const h in headers) {
    if (headers.hasOwnProperty(h) && headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  }

  const Form = new FormData();

  Object.entries(send).map(([key, value]) => {
    Form.append(key, value);
  });

  Form.append('file', file);

  xhr.send(Form);

  return {
    abort() {
      xhr.abort();
    },
  };
};

export default Request;
