import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";

const PREFIX_PROMO = "/marketplace/promotion/v1";
class CampaignClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListTicket({ search, offset, limit }) {
    return this.callFromNextJS("GET", `${PREFIX_PROMO}/ticket/list`, {
      search,
      offset,
      limit,
    })
  }
}

export function getCampaignClient(ctx, data) {
  return new CampaignClient(ctx, data);
}

