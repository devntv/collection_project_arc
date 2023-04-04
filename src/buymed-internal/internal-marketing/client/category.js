import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { constURL } from "../components/component/constant";
const prefix = constURL.PREFIX_PRODUCT;
class CategoryClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListCategory(offset, limit, q) {
    return this.callFromNextJS("GET", `${prefix}/category/list`, {
      q: q ? q : "",
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  getListCategoryByCodes(codes) {
    return this.callFromNextJS("POST", `${prefix}/category/list`, { codes });
  }

  getListCategoryByCodesClient(codes) {
    return this.call("GET", `${prefix}/category/list`, { codes });
  }

  getListCategoryFromClient(offset, limit, q, search = "") {
    return this.callFromClient("GET", `${prefix}/category/list`, {
      q: q,
      search,
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }
}

export function getCategoryClient(ctx, data) {
  return new CategoryClient(ctx, data);
}
