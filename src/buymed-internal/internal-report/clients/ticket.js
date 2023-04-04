import { APIClient } from "../lib/utils"
import queryString from 'query-string'
const URI = '/marketplace/ticket/v1'
class TicketClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }

    getCustomerTicket(params){
		return this.call("GET", `${URI}/ticket/list`, params);
	}

    getTicketReason(params){
        return this.call("GET", `${URI}/reason-setting/list`, params);
    }

    searchTicketByID(params){
        return this.call("POST", `${URI}/ticket/search`, params);
    }
}

export function getTicketClient(ctx, data) {
    return new TicketClient(ctx, data)
}