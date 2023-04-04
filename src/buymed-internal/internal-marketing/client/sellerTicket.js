import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const URI = "/marketplace/promotion/v1";

class SellerTicketClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListSellerTicket(offset, limit, q) {
    return this.call("GET", `${URI}/ticket/list`, {
      q: JSON.stringify(q),
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  updateStatusTicket(payload){
    //ticketID, sellerCode, status
    return this.call("PUT", `${URI}/ticket/status`, payload)
  }

  getCampaignByIds(ids) {
    return this.callFromNextJS("POST", `${URI}/campaign/list`, {
        campaignIDs: ids
    });
}
 
}

export function getSellerTicketClient(ctx, data) {
  return new SellerTicketClient(ctx, data);
}
