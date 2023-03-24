const addQueryOption = ({ body = null, params = null }) => {
  const result = {};
  if (body) {
    const newBody = { ...body } || null;
    const queryOption = {
      consumedMaxQuantity: true,
      sellerInfo: true,
    };
    newBody.queryOption = queryOption;

    result.body = newBody;
  }

  if (params) {
    const newParams = { ...params } || null;
    newParams.queryOption = 'consumedMaxQuantity,sellerInfo';
    result.params = newParams;
  }
  return result;
};

export default {
  addQueryOption,
};
