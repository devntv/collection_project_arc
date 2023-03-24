const productsWithPriority = (products = []) => {
  const productsPriority = products?.map((product) => {
    let priority = 0;

    const startTime = product?.deal?.startTime ? new Date(product.deal.startTime) : null;
    const endTime = product?.deal?.endTime ? new Date(product.deal.endTime) : null;
    const currentTime = new Date();
    // dang ban
    if (startTime && endTime && startTime <= currentTime && endTime >= currentTime) priority = 1;
    // sap ban
    else if (startTime && startTime > currentTime) priority = 2;
    // het han
    else if (endTime && endTime < currentTime) priority = 3;
    else priority = 1;

    return { ...product, priority };
  });
  productsPriority.sort((a, b) => {
    const secondCondition = a?.deal?.startTime && b?.deal?.startTime ? new Date(a.deal.startTime) - new Date(b.deal.startTime) : null;
    return a.priority - b.priority || secondCondition;
  });
  return productsPriority;
};

export default productsWithPriority;
