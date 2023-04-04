import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
const prefix = "/marketplace/marketing/v1";

// const URL = ``
class BannerClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  createNewBanner(data) {
    return this.callFromClient("POST", `${prefix}/banner`, data);
  }

  getListBannerAvailable() {
    return this.callFromNextJS("GET", `${prefix}/banners/available`);
  }
  getListBannerAvailableClient() {
    return this.callFromClient("GET", `${prefix}/banners/available`);
  }

  getListBanner(offset, limit, q) {
    return this.callFromNextJS("GET", `${prefix}/banners`, {
      offset,
      limit,
      q,
      getTotal: true
    });
  }

  getListBannerClient(offset, limit, q) {
    return this.callFromClient("GET", `${prefix}/banners`, {
      offset,
      limit,
      q,
      getTotal: true
    });
  }

  getBannerByBannerId(id) {
    return this.callFromNextJS("GET", `${prefix}/banner`, {
      id,
    });
  }

  updateBanner(data) {
    return this.callFromClient("PUT", `${prefix}/banner`, data);
  }

  updateBannerVisible(id) {
    return this.callFromClient("PUT", `${prefix}/banner/visible`, {
      id,
    });
  }

  updateBannerInvisible(id) {
    return this.callFromClient("PUT", `${prefix}/banner/invisible`, {
      id,
    });
  }

  deleteBannerById(id) {
    return this.callFromClient("DELETE", `${prefix}/banner`, {
      id,
    });
  }

  updateListBannerAvailable(list) {
    return this.callFromClient("PUT", `${prefix}/available-banners`, {
      list,
    });
  }
}

export function getBannerClient(ctx, data) {
  return new BannerClient(ctx, data);
}
