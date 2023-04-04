import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
const URI = `/core/file-manager/v1`;

class FileManagerClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    uploadDocument(data) {
        return this.call("POST", `${URI}/upload/document`, data);
    }

    uploadImage(data) {
        return this.call("POST", `${URI}/upload/image`, data);
    }

    deleteFile(codes) {
        return this.call("DELETE", `${URI}/delete`, {
            codes,
        });
    }

    getToken() {
        return this.call("GET", `${URI}/access-token/gen`);
    }
}

export function getFileManagerClient(ctx, data) {
    return new FileManagerClient(ctx, data);
}
