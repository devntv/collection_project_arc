import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { constURL } from './constrant'
const { PREFIX_PRODUCT } = constURL

class SkuContractClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListSkuContract(offset, limit, q) {
    return this.call("GET", `${PREFIX_PRODUCT}/sku-contract/list`, {
      q: JSON.stringify(q),
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

  createSkuContract(data) {
    return this.callFromClient("POST", `${PREFIX_PRODUCT}/sku-contract`, data)
  }

  getSkuContract(q) {
    return this.call("GET", `${PREFIX_PRODUCT}/sku-contract`, { q: JSON.stringify(q) })
  }

  getListSkuContractDetail(skuContractCode, search = '', limit = 20, offset = 0) {
    return this.call("GET", `${PREFIX_PRODUCT}/sku-contract-detail/list`, { 
      skuContractCode,
      search,
      limit,
      offset,
      getTotal: true
    })
  }

  deleteSkuContractDetail(skuContractCode, sku) {
    return this.callFromClient("DELETE", `${PREFIX_PRODUCT}/sku-contract-detail`, {
      skuContractCode,
      sku
    })
  }

  createSkuContractDetail(data) {
    return this.callFromClient("POST", `${PREFIX_PRODUCT}/create/sku-contract-detail`, data)
  }

  updateSkuContractDetail(data) {
    return this.callFromClient("PUT", `${PREFIX_PRODUCT}/sku-contract-detail`, data)
  }

  updateSkuContract(data) {
    return this.callFromClient("PUT", `${PREFIX_PRODUCT}/sku-contract`, data)
  }

  changeStatusSkuContract(data) {
    return this.callFromClient("PUT", `${PREFIX_PRODUCT}/status/sku-contract`, data)
  }

  exportSkuContract(offset, limit, q) {
    return this.call("GET", `${PREFIX_PRODUCT}/export/sku-contract`, {
      q: JSON.stringify(q),
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }

}

export function getSkuContractClient(ctx, data) {
  return new SkuContractClient(ctx, data);
}
