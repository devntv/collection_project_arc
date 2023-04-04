import { APIClient } from "@thuocsi/nextjs-components/lib/utils";

const URI = "/marketplace/promotion/v1";
const PREFIX_TICKET = "/marketplace/ticket/v1"

class GamificationClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getListGamification(offset, limit, q, search = "") {
        return this.call("GET", `${URI}/gamification/list`, {
            q: JSON.stringify(q),
            offset: offset,
            limit: limit,
            getTotal: true,
            search
        });
    }

    createGamification(data) {
        return this.callFromClient("POST", `${URI}/gamification`, data)
    }

    updateGamification(data) {
        return this.callFromClient("PUT", `${URI}/gamification`, data)
    }

    getGamification(q = {}, code) {
        return this.call("GET", `${URI}/gamification`, { 
            q: JSON.stringify(q), 
            code 
        })
      }

    getListGamificationResult(offset, limit, q){
        return this.call("GET", `${URI}/gamification-result/list`, {
            q: JSON.stringify(q),
            limit,
            offset, 
            getTotal: true
        })
    }

    syncGamification(){
        return this.call("POST", `${URI}/gamification-result/sync`, {
            // gamificationCode: code
        })

    }

    getListSyncGamification(offset, limit, q){
        return this.call("GET", `${URI}/gamification-log/list`, {
            q: JSON.stringify(q),
            limit,
            offset,
            getTotal: true
        })
    }

    getGamificationByCode(codes){
        return this.call("GET", `${URI}/gamification/list`, {
            codes
        })
    }

}

export function getGamificationClient(ctx, data) {
    return new GamificationClient(ctx, data);
}
