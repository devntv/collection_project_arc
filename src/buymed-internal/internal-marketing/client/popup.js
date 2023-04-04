import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
const prefix = "/marketplace/marketing/v1";

class PopupClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getPopupById(id) {
    return this.callFromNextJS("GET", `${prefix}/popup`, {
      id,
    });
  }

  removePopup(id) {
    return this.callFromClient("DELETE", `${prefix}/popup`, {
      id,
    });
  }

  createPopup(data) {
    return this.callFromClient("POST", `${prefix}/popup`, data);
  }

  updatePopup(data) {
    return this.callFromClient("PUT", `${prefix}/popup`, data);
  }

  getPopupLists(offset, limit) {
    return this.callFromNextJS("GET", `${prefix}/popup/list`, {
      offset,
      limit,
      getTotal: true,
    });
  }
}

export function getPopupClient(ctx, data) {
  return new PopupClient(ctx, data);
}
