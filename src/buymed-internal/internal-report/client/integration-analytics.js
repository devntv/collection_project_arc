import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/integration/analytics/v1`;

// const URI = ``

class AnalyticsClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getLastProcess(code){
        return this.call( "GET",`${URI}/process`, {code})
    }

    getAnalyticsMulti(data){
        return this.call( "POST",`${URI}/analytics/multi`,data)
    }

    getAnalyticsProvinceMulti(data){
        return this.call( "POST",`${URI}/analytics-province/multi`,data)
    }

    getSellerStats(filter, offset = 0, limit = 100, getTotal = true){
        return this.call( "GET",`${URI}/sellers`, {
            q: JSON.stringify(filter || {}),
            offset, limit, getTotal
        })
    }

    getStatsOfMultiSellers(timeSpan, sellerCodes){
        return this.call( "POST",`${URI}/sellers/multi`,{
            timeSpan,
            codes:sellerCodes
        })
    }

    getSkuStats(filter, offset = 0, limit = 100, getTotal = true){
        return this.call( "GET",`${URI}/skus`, {
            q: JSON.stringify(filter || {}),
            offset, limit, getTotal
        })
    }

    getStatsOfMultiSkus(timeSpan, sellerCodes){
        return this.call( "POST",`${URI}/skus/multi`,{
            timeSpan,
            codes:sellerCodes
        })
    }

    getSkuAnalytics(sku, fromTime, toTime, timeSpan){
        return this.call( "POST",`${URI}/sku/${sku}`,{
            fromTime,
            toTime,
            timeSpan
        })
    }
}

export function getAnalyticsClient(ctx, data) {
    return new AnalyticsClient(ctx, data);
}
