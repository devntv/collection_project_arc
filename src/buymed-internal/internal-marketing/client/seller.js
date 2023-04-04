import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const URI = "/seller/core/v1";

class SellerClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListSeller(offset, limit, q, search = "") {
    return this.call("GET", `${URI}/account/list`, {
      q: JSON.stringify(q),
      offset: offset,
      limit: limit,
      search: search,
      getTotal: true,
    });
  }

  getSellerBySellerCode(sellerCode) {
    return this.call("GET", `${URI}/account`, {
      sellerCode: sellerCode,
    });
  }

  getSellerBySellerCodes(codes) {
    return this.call("POST", `${URI}/account/list`, {
      codes,
    });
  }

  getSellerBySellerCodesClient(codes) {
    return this.call("POST", `${URI}/account/list`, {
      codes,
    });
  }

  getSellerName(sellerCode) {
    let sellerResp = this.getSellerBySellerCode(sellerCode)
    if (sellerResp.status != 'OK') {
      return sellerCode
    }

    return sellerResp.data[0].name
  }

  getSellerByName(search) {
    return this.call(
      "GET",
      `${URI}/account/list`,
      {
        sellerClass: "EXTERNAL",
        search,
        getTotal: true,
      })
  }

  getAllSeller() {
    return this.call(
      "GET",
      `${URI}/seller/all`
    )
  }

  getSeller(offset, limit, q) {
    return this.callFromNextJS("GET", `${URI}/account/list`, {
      q: q,
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  getSellerByFilter({
    q,
    code,
    name,
    email,
    phone,
    status,
    limit,
    offset,
  }) {
    return this.callFromClient(
      "POST",
      `${URI}/account/search`,
      {
        q,
        code,
        name,
        email,
        phone,
        status,
        limit,
        offset,
        getTotal: true,
      }
    );
  }

  getSellerClient(offset, limit, q, status) {
    return this.callFromClient("GET", `${URI}/account/list`, {
      q: q,
      status: status,
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  getSellerBySellerID(sellerID) {
    return this.callFromNextJS("GET", `${URI}/account`, {
      sellerID: sellerID,
    });
  }
}

export function getSellerClient(ctx, data) {
  return new SellerClient(ctx, data);
}
