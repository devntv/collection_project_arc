export const apiHandler = (res, method, handlers) => {
  if (!Object.keys(handlers).includes(method)) {
    res.setHeader('Allow', Object.keys(handlers));
    res.status(405).end(`Method ${method} Not Allowed`);
  } else {
    handlers[method](res);
  }
};

export const handlerMiddleware = (handler, options) => async (req, res) => {
  try {
    const { checkAuthentication = true } = options || {};
    req.global = { checkAuthentication, isAuthorization: false };

    if (checkAuthentication) {
      // check header
      const { authorization } = req.headers;
      if (!authorization) {
        res.status(401).end(`Missing Authorization`);
        return;
      }
    }

    await handler(req, res);
  } catch (e) {
    res.status(500).json({ error: e.message || 'something went wrong' });
  }
};

export default {
  apiHandler,
  handlerMiddleware,
};
