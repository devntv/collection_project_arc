import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { constURL } from "../components/component/constant";
const prefix = constURL.PREFIX_PRODUCT;

class TagClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListTag(offset, limit, q) {
    return this.callFromNextJS("GET", `${prefix}/tag/list`, {
      q: q,
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  getTagByTagCode(tagCode) {
    return this.callFromNextJS("GET", `${prefix}/tag`, {
      tagCode: tagCode,
    });
  }

  getTagByTagCodeClient(tagCode) {
    return this.callFromClient("GET", `${prefix}/tag`, {
      tagCode: tagCode,
    });
  }

  getTagByTagCodes(tagCodes) {
    return this.call("GET", `${prefix}/tag/list`, {
      codes: tagCodes,
    });
  }
  getTagByTagCodesClient(tagCodes) {
    return this.callFromClient("GET", `${prefix}/tag/list`, {
      codes: tagCodes
    });
  }

  createTag(body) {
    return this.callFromClient("POST", `${prefix}/tag`, body);
  }

  updateTag(data) {
    return this.callFromClient("PUT", `${prefix}/tag`, data);
  }

  getListTagClient(offset, limit, q, search) {
    return this.callFromClient("GET", `${prefix}/tag/list`, {
      search: search,
      q: q,
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }
}

export function getTagClient(ctx, data) {
  return new TagClient(ctx, data);
}
