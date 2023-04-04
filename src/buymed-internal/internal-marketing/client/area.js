import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const PREFIX = `/core/master-data/v1`;
// const PREFIX = ``

class AreaClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListArea(q) {
    return this.call("GET", `${PREFIX}/region/list`, q);
  }

  getListAreaByCodes(codes) {
    return this.call("POST", `${PREFIX}/region/list`, {codes});
  }

}

export function getAreaClient(ctx, data) {
  return new AreaClient(ctx, data);
}
