import { HTTP_STATUS } from 'constants/Enums/http';
import { ACCESS_TOKEN, ACCESS_TOKEN_LONGLIVE, API_HOST, BASIC_AUTHEN, MOCK_API_HOST } from 'sysconfig';
import CookiesParser from 'utils/CookieParser';
import RequestUtils from 'utils/RequestUtils';
import { getSessionTokenClient } from 'utils/SessionUtils';

export const MAX_LIMIT = 50;
export const OFFSET_DEFAULT = 0;
export const LIMIT_DEFAULT = 20;

const mapRequest = {};
const mapRequestPromise = {};

export function isValid(resp) {
  return resp && resp.status && resp.status === HTTP_STATUS.Ok && resp.data && resp.data[0];
}

export function getFirst(resp, def = null) {
  return resp && resp.data && resp.data.length > 0 ? resp.data[0] : def;
}

export function getData(resp, def = []) {
  return isValid(resp) ? resp.data : def;
}
export function isValidWithoutData(resp) {
  return resp && resp.status && resp.status === HTTP_STATUS.Ok;
}

export function getSessionToken(ctx) {
  // Discovery
  // if (ctx?.req?.headers?.authorization) {
  //   return ctx?.req?.headers?.authorization?.split(' ')[1];
  // }
  if (ctx?.req?.headers?.authorization && ctx?.req?.headers?.isAuthorizationClient) {
    return ctx?.req?.headers?.authorization?.split(' ')[1];
  }

  const tk = CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN);
  if (tk && tk.length > 0) {
    return tk;
  }

  return CookiesParser.getCookieFromCtx(ctx, ACCESS_TOKEN_LONGLIVE);
}

async function request({
  url,
  params,
  method,
  body,
  mock = false,
  page = false,
  isAuth = true,
  ctx = null,
  isBasic = false,
  debug = false,
  cache = false,
}) {
  try {
    /*
    page = /pages
    mock api : folder:  /api
    dev / production : /backend
   */
    const logTime = +new Date();
    const headers = {};
    const parameters = { ...params };
    let link = url;
    if (!page && url?.indexOf('http') === -1) {
      link = (mock ? MOCK_API_HOST : API_HOST) + url;
    }

    let isUseBasic = false;
    if (isAuth) {
      if (ctx) {
        const AuthorizationValue = getSessionToken(ctx);
        if (AuthorizationValue && AuthorizationValue.length > 0) {
          headers['user-agent'] = ctx.req.headers['user-agent'];
          headers.Authorization = `Bearer ${AuthorizationValue}`;
        }
      } else {
        const AuthorizationValue = getSessionTokenClient();
        if (AuthorizationValue && AuthorizationValue.length > 0) {
          headers.Authorization = `Bearer ${AuthorizationValue}`;
        }
      }
      if (isBasic && (!headers.Authorization || headers.Authorization.length === 0)) {
        headers.Authorization = BASIC_AUTHEN;
        isUseBasic = true;
        parameters.isBasic = true;
      }

      if (!headers.Authorization || headers.Authorization.length === 0) {
        return {
          errorCode: 'MISSING_AUTHORIZATION',
          status: HTTP_STATUS.Unauthorized,
          message: 'Missing session',
        };
      }
    } else if (isBasic && (!headers.Authorization || headers.Authorization.length === 0)) {
      headers.Authorization = BASIC_AUTHEN;
      isUseBasic = true;
      parameters.isBasic = true;
    }

    // console.log('link : ', link);
    if (parameters) {
      // eslint-disable-next-line import/no-named-as-default-member
      const parameterStr = RequestUtils.convertObjectToParameter(parameters);
      if (parameterStr.length > 0) link += (link?.indexOf('?') >= 0 ? '&' : '?') + parameterStr;
    }

    // console.log(' fetch data ', link, method, headers, body);
    const dataRequest = {
      method,
      credentials: 'same-origin',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: typeof body === 'object' ? JSON.stringify(body) : body,
    };

    const logTimeFetch = +new Date();

    // cache with client side & cache boolean
    if (!ctx && method === 'GET' && cache) {
      if (mapRequest[link]) {
        return mapRequest;
      }
      if (!mapRequestPromise[link]) {
        mapRequestPromise[link] = fetch(link, dataRequest);
      }
    }

    const res = await (mapRequestPromise[link] || fetch(link, dataRequest));

    const result = await res.json();

    if (cache) {
      mapRequest[link] = result;
      mapRequestPromise[link] = null;
      result.cache = true;
    }
    if (isUseBasic) {
      result.isBasic = true;
    }

    if (debug) {
      result.link = link;
      result.method = method;
      // result.result = result;
      result.headers = headers;
      result.body = body;
      result.params = params;
    }

    // if (result.status === 'FORBIDDEN') {
    //   console.log(`FORBIDDEN ${link}`);
    // }

    // console.log('result : ', result);
    // console.log(` fetch data ${method} ${link}`, result);
    // console.log(` fetch data ${link}`, headers, body, result);
    // if (ENV === 'local') {
    // console.log(` fetch data ${method} ${link}`, headers, params, body, result);
    // }
    const timeExcute = +new Date() - logTime;
    const timeFetchAPI = +new Date() - logTimeFetch;
    // console.log(` fetch data ${link}`, timeFetchAPI, timeExcute);
    result.timeExcute = timeExcute;
    result.timeFetchAPI = timeFetchAPI;
    // if (!isValid(result) && ENV === 'local') {
    //   console.log(` fetch data ${method} ${link}`, params, body, result);
    // }

    return result;
  } catch (err) {
    console.error('err ', err);
    return {
      error: err,
      status: HTTP_STATUS.Error,
      data: [],
      message: err.message || ' Hệ thống đã xảy ra lỗi .',
    };
  }
}

export async function GET(props) {
  return request({ ...props, method: 'GET' });
}

export async function POST(props) {
  return request({ ...props, method: 'POST' });
}

export async function PUT(props) {
  return request({ ...props, method: 'PUT' });
}

export async function DELETE(props) {
  return request({ ...props, method: 'DELETE' });
}

// @deprecate in next release
export function isValidWithData(resp) {
  return resp && resp.status && resp.status === HTTP_STATUS.Ok && resp.data && resp.data[0];
}

export async function GET_ALL(props) {
  const { params, limit } = props;
  const result = {
    status: HTTP_STATUS.Ok,
    data: [],
  };

  const limitPage = limit || MAX_LIMIT;

  const rsTotal = await GET({
    ...props,
    params: { ...params, getTotal: true, limit: limitPage, page: 1 },
  });
  // console.log('get total >> ', rsTotal);

  if (!isValid(rsTotal)) {
    return rsTotal;
  }

  const { total = null, data: dataFirst } = rsTotal;
  result.data = dataFirst;
  if (!total) {
    // ko tra total  ->> get 1000
    const rsAll = await GET({
      ...props,
      params: { ...params, getTotal: true, limit: 1000, page: 1 },
    });
    return rsAll;
  }

  const promiseAll = [];
  for (let i = limitPage; i < total; i += limitPage) {
    // console.log('get all : ', i + 1, totalPage, limitPage);
    promiseAll.push(
      GET({
        ...props,
        params: { ...params, limit: limitPage, page: i / limitPage, offset: i },
      }).then((rs) => {
        if (isValid(rs)) {
          result.data = [...result.data, ...rs.data];
        } else {
          result.status = rs.status || 'Error';
          result.message = rs.message || 'Lỗi : ';
        }
      }),
    );
  }

  await Promise.all(promiseAll);

  return result;
}

export async function POST_ALL(props) {
  const { body, limit } = props;
  const result = {
    status: HTTP_STATUS.Ok,
    data: [],
  };

  const limitPage = limit || MAX_LIMIT;

  const rsTotal = await POST({
    ...props,
    body: { ...body, getTotal: true, limit: 1, page: 1 },
  });
  // console.log('get total >> ', rsTotal);

  if (!isValid(rsTotal)) {
    return rsTotal;
  }
  const { total } = rsTotal;
  const promiseAll = [];
  const totalPage = total / limitPage;
  for (let i = 0; i <= totalPage; i += 1) {
    // console.log('post all : ', i + 1, totalPage, limitPage);
    promiseAll.push(
      POST({
        ...props,
        body: { ...body, limit: limitPage, page: i + 1, offset: i * limitPage },
      }).then((rs) => {
        if (isValid(rs)) {
          result.data = [...result.data, ...rs.data];
        } else {
          result.status = rs.status || 'Error';
          result.message = rs.message || 'Lỗi : ';
        }
      }),
    );
  }

  await Promise.all(promiseAll);

  return result;
}

export default {
  GET,
  GET_ALL,
  POST,
  POST_ALL,
  PUT,
  DELETE,
  isValid,
  isValidWithData,
  getSessionToken,
  isValidWithoutData,
  getSessionTokenClient,
  LIMIT_DEFAULT,
  MAX_LIMIT,
  OFFSET_DEFAULT,
};
