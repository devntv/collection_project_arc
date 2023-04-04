import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { constURL } from "../components/component/constant";
const prefix = constURL.PREFIX_PRODUCT;

class EfficacyClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getAllEfficacy(q = "", search = "", limit = 50, offset = 0) {
    return this.call("GET", `${prefix}/efficacy/list`, {
      q: JSON.stringify(q),
      limit,
      offset,
      getTotal: true,
      search,
    });
  }

  getEfficacyByEfficacyCode(efficacyCode) {
    return this.call("GET", `${prefix}/efficacy`, {
      q: JSON.stringify({
        code: efficacyCode,
      }),
    });
  }
}

export function getEfficacyClient(ctx, data = {}) {
  return new EfficacyClient(ctx, data);
}
