import {APIClient} from "@thuocsi/nextjs-components/lib/utils";

const URI = `/monitoring/report/v1`;

class ReportClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getEventDefinitions() {
        return this.call("GET", `${URI}/event/list`, {
            offset: 0,
            limit: 1000
        })
    }

    getTemplateList(query, offset, limit, getTotal = true) {
        return this.call("GET", `${URI}/template/list`, {
            q: JSON.stringify(query), offset, limit, getTotal
        })
    }

    getTemplate(templateID) {
        return this.call("GET", `${URI}/template`, {
            q: JSON.stringify({reportTemplateID: templateID}),
            offset: 0,
            limit: 1
        })
    }

    getReport(reportId){
        return this.call("GET", `${URI}/report/`+reportId)
    }

    createNewTemplate(template) {
        return this.call("POST", `${URI}/template`, template)
    }

    updateTemplate(template) {
        return this.call("PUT", `${URI}/template`, template)
    }

}

export function getReportClient(ctx, data) {
    return new ReportClient(ctx, data);
}
