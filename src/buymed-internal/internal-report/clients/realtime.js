import { APIClient } from '@thuocsi/nextjs-components/lib/utils';
const URI_REALTIME = '/monitoring/realtime-supply/v1';

class RealtimeClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getBulkOrderData(data) {
        return this.call('GET', `${URI_REALTIME}/bulk-item-order`, data);
    }
    
	getReportSKUPrice(data){
		return this.call("GET", `${URI_REALTIME}/pricing`, data)
	}

    getGMVFluctuation(params) {
        return this.call("GET", `${URI_REALTIME}/gmv/top`, params)
    }

    getGMVData(data) {
        return this.call("GET", `${URI_REALTIME}/gmv`, data)
    }

    getOrderItem(data) {
        return this.call("GET", `${URI_REALTIME}/order-item`, data)
    }
}

export function getRealtimeClient(ctx, data) {
    return new RealtimeClient(ctx, data);
}
