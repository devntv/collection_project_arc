import { APIClient } from './utils';
import { APIStatus } from "./common";

const URI = `/integration/notification/v1`;

class NotificationClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getListNotification(offset, limit) {
        return this.call('GET', `${URI}/notification/me`, {offset,limit})
    }

    countNotification() {
        return this.call("GET", `${URI}/notification/me/counter`)
    }

    updateNotification(code) {
        return this.call('PUT', `${URI}/notification`, {
            code
        })
    }

    readAllNoti(){
        return this.call('PUT', `${URI}/notification/all`)
    }
}

export function getNotificationClient(ctx, data) {
    return new NotificationClient(ctx, data);
}

export async function getNotiList(offset, limit) {
    let res = await getNotificationClient().getListNotification(offset,limit)
    let count = 0
    let total = 0
    let data = []
    if (res.status === APIStatus.OK) {
        data = res.data
    }
    let counteRes = await getNotificationClient().countNotification()
    if (counteRes.status === APIStatus.OK) {
        count = counteRes.data[0].unread
        total = counteRes.data[0].total
    }
    return {data : data, count: count, total: total}
}

export async function markReadNoti(code) {
    await getNotificationClient().updateNotification(code)
}

export const markReadAll = async () => {
    await getNotificationClient().readAllNoti()
}

export async function counterNoti() {
    const res = await getNotificationClient().countNotification()
    if (res.status === APIStatus.OK) {
        return res.data[0]
    } else return {total: 0, unread: 0, read: 0}
}