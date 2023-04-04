const URI_VIDEO = '/integration/video/v1'
const URI_FILE_MANAGER = '/core/file-manager/v1'
import { APIClient } from "../lib/utils"
import queryString from 'query-string'

import { createFFmpeg } from "@ffmpeg/ffmpeg";

class VideoClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
        this.ffmpeg = null
    }
    getFFMPEG() {
        return new Promise(async (resolve,reject) => {
            try {
                if (!this.ffmpeg) {
                    this.ffmpeg = createFFmpeg({
                        //corePath: '/@ffmpeg/core/dist/ffmpeg-core.js'
                        log: false
                    })
                    if (!this.ffmpeg.isLoaded()) {
                        await this.ffmpeg.load()
                    }
                }
                resolve(this.ffmpeg)
            } catch (error) {
                reject(error.message)
            }
        })
    }
    getZoomMeeting(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/meeting/list`,body)
    }
    createZoomMeeting(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/meeting`, body)
    }
    checkLivestreamSession(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/account-session`, body)
    }
    updateAccountSession(body) {
        return this.call("PUT", `${URI_VIDEO}/zoom/account-session`, body)
    }

    createZoomLiveVideo(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/video`, body)
    }
    getZoomLiveVideo(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/video/list`, body)
    }
    createVimeoLiveStream(body) {
        return this.call("POST", `${URI_VIDEO}/vimeo/live`, body)
    }
    getVimeoLiveStream(body) {
        return this.call("POST", `${URI_VIDEO}/vimeo/live/list`,body)
    }
    uploadVideoToVimeo(url, binaryBody, headers) {
        return fetch(url, {
            method: 'PATCH',
            body: binaryBody,
            headers
        })
    }
    createVimeoVideo(body) {
        return this.call("POST", `${URI_VIDEO}/vimeo/video`, body)
    }
    updateVimeoVideo(body) {
        return this.call("PUT", `${URI_VIDEO}/vimeo/video`, body)
    }
    getVideoSignature(body) {
        return this.call("POST", `${URI_VIDEO}/zoom/video-signature`, body)
    }
    createUploadVideoLinkToGCS(body) {
        return this.call("POST", `${URI_FILE_MANAGER}/upload/video-resumable`, body)
    }
    createUploadFileLinkToGCS(body) {
        return this.call("POST", `${URI_FILE_MANAGER}/upload/file-resumable`, body)
    }
    completeUploadToGCS(body) {
        return this.call("PUT", `${URI_FILE_MANAGER}/upload/file-resumable`, body)
    }
    uploadFileToGCS(url, binaryBody, headers) {
        return fetch(url, {
            method: 'PUT',
            body: binaryBody,
            headers
        })
    }
    getFileInGCS(params) {
        const stringified = queryString.stringify(params);
        return this.call("GET", `${URI_FILE_MANAGER}/file-by-resumable-upload?${stringified}`)
    }
}

export function getVideoClient(ctx, data) {
    return new VideoClient(ctx, data);
}