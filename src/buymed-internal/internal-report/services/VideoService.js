import {getVideoClient} from '../clients/video'

function replaceURL(url) {
    return url
}
export async function getMeeting({ctx=undefined, params}) {
    const client = getVideoClient(ctx, {})
    
    const newParams = { ...params };

    try {
        const q = JSON.parse(newParams.q)
        newParams.platformInfo = q.platformInfo
    } catch {
        delete newParams.q
    }
    newParams.limit = Number.parseInt(newParams.limit)
    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 5);
    newParams.getTotal = true
    const res = await client.getZoomMeeting(newParams)
    return {
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 5,
            total: res?.total || 0,
        }
    }
}

export async function createMeeting(body) {
    const client = getVideoClient()
    return await client.createZoomMeeting(body)
}

export async function createZoomLiveVideo(body) {
    const client = getVideoClient()
    return await client.createZoomLiveVideo(body)
}

export async function getZoomLiveVideo({ctx, params}) {
    const client = getVideoClient(ctx, {})
    
    const newParams = { ...params };

    try {
        const q = JSON.parse(newParams.q)
        newParams.platformInfo = q.platformInfo
    } catch {
        delete newParams.q
    }
    
    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 10);
    newParams.getTotal = true
    newParams.limit = Number.parseInt(newParams.limit)
    let res = await client.getZoomLiveVideo(newParams)
    if (res.status === 'OK') {
        let data = res.data
        for (let i=0;i<data.length;i++) {
            if (data[i].avatar) {
                data[i].avatar = replaceURL(data[i].avatar)
            }
        }
    }
    
    return {
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 10,
            total: res?.total || 0,
        }
    }
}


export async function createVimeoLiveStream(body) {
    const client = getVideoClient()
    return await client.createVimeoLiveStream(body)
}

export async function getVimeoLiveStream({ctx,params}) {
    const client = getVideoClient(ctx, {})
    
    const newParams = { ...params };
    
    try {
        let q = JSON.parse(newParams.q)
        newParams.platformInfo = q.platformInfo
    } catch {
        delete newParams.q
    }
    
    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 10);
    newParams.getTotal = true
    newParams.limit = Number.parseInt(newParams.limit)

    let res = await client.getVimeoLiveStream(newParams)
    if (res.status === 'OK') {
        let data = res.data
        for (let i=0;i<data.length;i++) {
            if (data[i].avatar) {
                data[i].avatar = replaceURL(data[i].avatar)
            }
        }
    }
    
    return {
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 10,
            total: res?.total || 0,
        }
    }
}

export async function getFileInGCS({ctx, params}) {
    const client = getVideoClient(ctx, {})
    
    const newParams = { ...params };
    
    try {
        JSON.parse(newParams.q)
    } catch {
        delete newParams.q
    }
    
    newParams.offset = !params.page || params.page <= 1 ? 0 : (params.page - 1) * (params.limit || 10);
    newParams.getTotal = true

    const res = await client.getFileInGCS(newParams)
    return {
        data: res,
        pagination: {
            page: Number.parseInt(newParams.page) || 1,
            limit: Number.parseInt(newParams.limit) || 10,
            total: res?.total || 0,
        }
    }
}

export async function uploadVideoToVimeo(url, binaryBody, headers) {
    const client = getVideoClient()
    const res = await client.uploadVideoToVimeo(url, binaryBody, headers)
    return res
}

export async function createVimeoVideo(body) {
    const client = getVideoClient()
    return await client.createVimeoVideo(body)
}

export async function updateVimeoVideo(body) {
    const client = getVideoClient()
    return await client.updateVimeoVideo(body)
}

export async function uploadFileToGCS(url, binaryBody, headers) {
    const client = getVideoClient()
    return await client.uploadFileToGCS(url, binaryBody, headers)
}

export async function createUploadVideoLinkToGCS(body) {
    const client = getVideoClient()
    return await client.createUploadVideoLinkToGCS(body)
}

export async function createUploadFileLinkToGCS(body) {
    const client = getVideoClient()
    return await client.createUploadFileLinkToGCS(body)
}

export async function completeUploadToGCS(body) {
    const client = getVideoClient()
    return await client.completeUploadToGCS(body)
}

export function getFFMPEG() {
    const client = getVideoClient()
    return client.getFFMPEG()
}