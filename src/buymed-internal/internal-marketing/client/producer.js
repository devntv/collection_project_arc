import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const PREFIX = `/marketplace/product/v2`;

class ProducerClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getProducerClient(q, search = "") {
    return this.callFromClient("GET", `${PREFIX}/manufacturer/list`, {
      q: q,
      search
    });
  }

  getProducerByCodesClient(manufacturerCodes) {
    return this.callFromClient("POST", `${PREFIX}/manufacturer/list`, {
      manufacturerCodes,
    });
  }

  getProducerByCodesNextJS(manufacturerCodes) {
    return this.callFromNextJS("POST", `${PREFIX}/manufacturer/list`, {
      manufacturerCodes,
    });
  }
}

export function getProducerClient(ctx, data) {
  return new ProducerClient(ctx, data);
}
