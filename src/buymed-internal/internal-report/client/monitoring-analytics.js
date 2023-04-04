import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/monitoring/analytics/v1`;

// const URI = ``

class MonitoringAnalyticsClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getStandardAnalytics(reportId) {
        return this.call("GET", `${URI}/report/${reportId}/standard`)
    }

    getFixedStandardAnalytics(eventCode, massDistinctBy, from, to, span) {
        let query = {
            eventCode,
            massDistinctBy,
            from,
            to,
            span
        }
        return this.call("GET", `${URI}/fixed-standard`, {
            q: JSON.stringify({
                eventCode,
                massDistinctBy,
                from,
                to,
                span
            })
        })
    }

    getGroupAnalytics(reportId, type, metadataKey, offset, limit) {
        return this.call("GET", `${URI}/report/${reportId}/group`, {
            type, metadataKey, offset, limit
        })
    }

    getUserAnalytics(reportId, offset, limit) {
        return this.call("GET", `${URI}/report/${reportId}/user`, {
            offset, limit
        })
    }

    getResultOfReport(reportID) {
        return this.call("GET", `${URI}/event/of-report/result`, {
            reportID
        })
    }

    getEventPageOfReport(reportID, page) {
        return this.call("GET", `${URI}/event/of-report/page`, {
            reportID, page
        })
    }

    getQueryRequest(q) {
        return this.call("GET", `${URI}/event/request`, {
            q
        })
    }

    getEventPage(code, page) {
        return this.call("GET", `${URI}/event/page`, {
            code, page
        })
    }
}

export function getMonitoringAnalyticsClient(ctx, data) {
    return new MonitoringAnalyticsClient(ctx, data);
}
