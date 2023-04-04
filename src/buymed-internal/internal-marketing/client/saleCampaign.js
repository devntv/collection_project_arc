import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const URI = "/marketplace/promotion/v1";
const PREFIX_TICKET = "/marketplace/ticket/v1"

class SaleCampaignClient extends APIClient {
  constructor(ctx, data) {
    super(ctx, data);
  }

  getListSaleCampaign(offset, limit, q) {
    return this.call("GET", `${URI}/campaign/list`, {
      q: JSON.stringify(q),
      offset: offset,
      limit: limit,
      getTotal: true,
    });
  }


  createSaleCampaign(data) {
    return this.callFromClient("POST", `${URI}/campaign`, data)
  }

  updateSaleCampaign(data) {
    return this.callFromClient("PUT", `${URI}/campaign`, data)
  }

  uploadImage(data) {
    return this.call("POST", `${PREFIX_TICKET}/upload`, data);
  }

  getSaleCampaign(q) {
    return this.call("GET", `${URI}/campaign`, { q: JSON.stringify(q) })
  }

  getSaleCampaignProduct(q, offset = 0, limit = 10, tab = "") {
    return this.call("GET", `${URI}/campaign/product/list`, { 
      q: JSON.stringify(q),
      offset,
      limit,
      getTotal: true,
      tab
    })
  }

  getHistorySaleCampaign(q = {}, offset = 0, limit = 10){
    return this.call("GET", `${URI}/campaign-history/list`, {
      q: JSON.stringify(q),
      offset,
      limit,
      getTotal: true
    })

  }
  
  createCampaignProduct(data) {
    return this.callFromClient("POST", `${URI}/campaign/product`, data)
  }

  getSaleCampaignByCodes(codes){
    return this.call("GET", `${URI}/campaign/list`, {
      codes
    })

  }
  updateCampaignProduct(data) {
    return this.callFromClient("PUT", `${URI}/campaign/product`, data)
  }

  deleteCampaignProduct(params) {
    return this.callFromClient("DELETE", `${URI}/campaign/product`, params)
  }

  importCampaignProduct(data = [], campaignCode = "") {
    return this.callFromClient("POST", `${URI}/campaign-product/import`, {
      data,
      campaignCode
    })
  }

  getListImportResult(offset = 0, limit = 20, q = {}){
    return this.call("GET", `${URI}/import-result/list`, {
      q: JSON.stringify(q),
      offset,
      limit,
      getTotal: true
    })
  }

  getDetailImportResult(code, offset = 0, limit = 20, q = {}){
    return this.call("GET", `${URI}/import-result-detail/list`, {
      q: JSON.stringify({...q, importResultCode: code}),
      limit,
      offset,
      getTotal: true,
    })
  }

  getListSaleCampaignByCampaignIDs(campaignIDs){
    return this.call("POST", `${URI}/campaign/list`, {
      campaignIDs
    })
  }

  checkProductFulfillment(){
    return this.callFromClient("POST", `${URI}/campaign/check-fulfillment`)
  }

  getListCheckProductFulfillmentLog(offset = 0, limit = 20, q = {}){
    return this.call("GET", `${URI}/campaign/check-fulfillment/list`, {
      q: JSON.stringify(q),
      offset,
      limit,
      getTotal: true
    })
  }

  getDetailCheckProductFulfillmentLog(offset = 0, limit = 20, q = {}){
    return this.call("GET", `${URI}/campaign/check-fulfillment-detail/list`, {
      q: JSON.stringify(q),
      offset,
      limit,
      getTotal: true
    })
  }

 
}

export function getSaleCampaignClient(ctx, data) {
  return new SaleCampaignClient(ctx, data);
}
