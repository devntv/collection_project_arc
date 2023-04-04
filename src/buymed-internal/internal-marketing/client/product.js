import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";

const PREFIX = "/marketplace/product/v2";

class ProductClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListProduct(offset, limit, search) {
    return this.call("GET", `${PREFIX}/product/list`, {
      search,
      limit,
      offset
    })
  }

  getListProductByCodes(codes) {
    return this.call("GET", `${PREFIX}/product/list`, { codes, limit: 1000 })
  }

  searchProductByIds(ids, search = "") {
    return this.call("GET", `${PREFIX}/product/list`, { ids, search });
  }

  getListProductByIds(ids) {
    return this.call("POST", `${PREFIX}/product/list`, {
      ids,
    });
  }

  async getProductBySKUs(codes) {
    return this.call("POST", `${PREFIX}/sku/info`, {
      codes,
    });
  }

  async getProductBySKUsFromClient(codes) {
    return this.callFromClient("POST", `${PREFIX}/sku/info`, {
      codes,
    });
  }

  getProductList({ search }) {
    return this.call("GET", `${PREFIX}/product/list`, {
      search
    })
  }

  getProductListFromClient({ search, offset, limit, codes = "", categoryCodes = "", ignoreCombo = false }) {
    return this.callFromClient("GET", `${PREFIX}/product/list`, {
      search,
      offset,
      limit,
      codes,
      categoryCodes,
      ignoreCombo
    })
  }

  getSkuList({ q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign, statusIn }) {
    const data = { q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign, statusIn };
    sanitizeObject(data)
    return this.call("GET", `${PREFIX}/sku/list`, data)
  }

  getSkuMainList({ q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign, locationCodes, getSkuItemByLocation = false }) {
    const data = { q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign, locationCodes, getSkuItemByLocation };
    sanitizeObject(data)
    return this.call("GET", `${PREFIX}/sku-main/list`, data)
  }

  getSku({ q = "" }) {
    return this.call("GET", `${PREFIX}/sku`, { q })
  }

  getProductListBySKUs(skus, getProduct = true) {
    return this.call("POST", `${PREFIX}/search/list`, {
      skus,
      getProduct,
    })
  }

  updateSkuPoint({ skuCode, point, pointMultiplier }) {
    return this.callFromClient("PUT", `${PREFIX}/sku/point`, { skuCode, point, pointMultiplier })
  }

  importSkuPoint(data) {
    return this.callFromClient(
      "POST",
      `${PREFIX}/sku/point/import`,
      { data: data }
    )
  }

  getHistorySkuPoint(code) {
    return this.callFromNextJS(
      "GET",
      `${PREFIX}/sku/point/history`, { code: code }
    )
  }

  getHistorySkuPointImportDetail({ offset = 0, limit = 20, getTotal = true, code = "" }) {
    return this.callFromNextJS(
      "GET",
      `${PREFIX}/sku/point/detail-import`, { offset, limit, getTotal, code }
    )
  }

  getHistorySkuPointImportList({ offset = 0, limit = 20, getTotal = true }) {
    return this.callFromNextJS(
      "GET",
      `${PREFIX}/sku/point/list-import`, { offset, limit, getTotal }
    )
  }

  exportSkuPoint({ q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign }) {
    const data = { q, search, sellerCodes, productCodes, offset, limit, getTotal, ignoreCombo, skuCodes, getForCampaign };
    sanitizeObject(data)
    return this.call("GET", `${PREFIX}/sku/point/export`, data)
  }
  checkDuplicateSKU(data) {
    return this.callFromClient(
      "POST",
      `${PREFIX}/sku/check-sale-type`, data
    )
  }

  getListProductByIdsClient(ids) {
    return this.call("POST", `${PREFIX}/product/list`, {
      productIds: ids,
    });
  }

  getProduct(q) {
    const data = { q };
    sanitizeObject(data);
    if (data.q) data.q = JSON.stringify(data.q);
    return this.call("GET", `${PREFIX}/product`, data)
  }

  searchProductCategoryListFromClient(productName, categoryCode) {
    let data = {};
    if (productName) {
      data = {
        ...data,
        q: productName,
      };
    }
    if (categoryCode) {
      data = {
        ...data,
        categoryCode: categoryCode,
      };
    }
    return this.callFromClient("GET", `${PREFIX}/product/category/list`, data);
  }

  searchProductListFromClient(productName, categoryCode) {
    let data = {};
    if (productName) {
      data = {
        ...data,
        q: productName,
      };
    }
    if (categoryCode) {
      data = {
        ...data,
        categoryCode: categoryCode,
      };
    }
    return this.callFromClient("GET", `${PREFIX}/product/list`, data);
  }

  async getProductListWithCategoryFromClient(q) {
    return this.callFromClient("GET", `${PREFIX}/product/category/list`, {
      q: q,
    });
  }

  getProductHasPrice(offset, limit, q) {
    return this.callFromNextJS("GET", `${PREFIX}/product/list`, {
      q: q,
      offset: offset,
      limit: limit,
      filter: "hasPrice",
      getTotal: true,
    });
  }

  getProductNoPrice(offset, limit, q) {
    return this.callFromNextJS("GET", `${PREFIX}/product/list`, {
      q: q,
      offset: offset,
      limit: limit,
      filter: "noPrice",
      getTotal: true,
    });
  }

  getIngredientList(q, search = "") {
    return this.callFromClient("GET", `${PREFIX}/ingredient/list`, {
      q: q,
      search
    });
  }

  getIngredientByIDs(ids) {
    return this.callFromClient("POST", `${PREFIX}/ingredient/list`, {
      ids,
    });
  }

  async uploadProductImage(formData) {
    const res = await fetch(`/backend/marketplace/product/v2/upload`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    return await res.json();
  }

  getProductListByFilter({ skus, getProduct, offset, limit }) {
    return this.callFromNextJS("POST", `${PREFIX}/search/list`, {
      skus,
      getProduct: getProduct,
      offset,
      limit,
    })
  }

  getProductListByFilterFromClient({ skus, getProduct, offset, limit }) {
    return this.callFromClient("POST", `${PREFIX}/search/list`, {
      skus,
      getProduct: getProduct,
      offset,
      limit,
    })
  }

  getProductByFuzzySearch({ text, offset, limit, accountId }) {
    return this.callFromClient("POST", `${PREFIX}/search/fuzzy?accountId=${accountId}`, {
      text,
      offset,
      limit,
    })
  }

  getSkuLimitConfigBySkuCodes(codes) {
    return this.callFromClient(
      "POST",
      `${PREFIX}/sku-limit/list`, {
      skuCodes: codes
    }
    )
  }

  getProductFromNextJS(offset, limit) {
    const param = {
      offset,
      limit,
      getTotal: true,
    };
    return this.callFromNextJS('GET', `${PREFIX}/product/list`, param);
  }

  uploadImageFromClient(data) {
    return this.callFromClient('POST', `${PREFIX}/upload`, data);
  }

  getSkuFromClient({ offset = 0, limit = 1000, locationCodes = ['00'] }) {
    const data = {
      locationCodes,
      status: 'NORMAL',
      isActive: true,
    };
    return this.callFromClient('POST', `${PREFIX}/sku/list-by-location?getTotal=true&offset=${offset}&limit=${limit}`, data);
  }

  uploadVideoFromClient(data) {
    return this.callFromClient('POST', `${PREFIX}/upload/video`, data);
  }


  getSkuByLocation({ offset = 0, limit = 1000, locationCodes = ['00'] }) {
    const data = {
        locationCodes,
        status: 'NORMAL',
        isActive: true,
    };
    return this.call('POST', `${PREFIX}/sku/list-by-location?getTotal=true&offset=${offset}&limit=${limit}`, data);
}

  getSkuItemList({ itemCodes }) {
    const data = { itemCodes };
    sanitizeObject(data)
    return this.call("GET", `${PREFIX}/sku-item/list`, data)
  }

  searchComponentFuzzy(body) {
    return this.call("POST", `${PREFIX}/search-component/fuzzy`, body)
  }

}

export function getProductClient(ctx, data) {
  return new ProductClient(ctx, data);
}

