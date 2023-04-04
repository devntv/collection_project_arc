import { APIClient } from '@thuocsi/nextjs-components/lib/utils';

const prefix = "/marketplace/social/v1";

class PostClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getListPost(offset, limit, q, getTotal = true) {
        let param = {
            offset: offset,
            limit: limit,
            getTotal: true,
        };
        if (typeof q !== 'undefined') {
            param.q = q;
        }
        return this.callFromNextJS('GET', `${prefix}/posts`, param);
    }

    getPostById(id) {
        return this.callFromNextJS('GET', `${prefix}/posts`, { id });
    }

    createNewPost(data) {
        return this.callFromClient('POST', `${prefix}/post`, data);
    }

    updatePost(data) {
        return this.callFromClient('PUT', `${prefix}/post`, data);
    }

    deletePost(id) {
        return this.callFromClient('DELETE', `${prefix}/post`, { id: id });
    }

    updateEnablePost(data) {
        return this.call('PUT', `${prefix}/post`, data);
    }
}

export function getPostClient(ctx, data) {
    return new PostClient(ctx, data);
}
