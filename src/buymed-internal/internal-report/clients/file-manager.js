const URI_FILE_MANAGER = '/core/file-manager/v1'
import { APIClient } from "../lib/utils"
import queryString from 'query-string'


class FileManagerClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data)
    }
    getListFile(params) {
        const stringified = queryString.stringify(params);
        return this.call("GET", `${URI_FILE_MANAGER}/file-resumable?${stringified}`)
    }
}

export function getFileManagerClient(ctx, data) {
    return new FileManagerClient(ctx, data)
}