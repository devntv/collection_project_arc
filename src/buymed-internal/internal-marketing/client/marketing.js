import { APIClient } from "@thuocsi/nextjs-components/lib/utils";
import { sanitizeObject } from "utils/Object";
import { constURL } from "../components/component/constant";

class MarketingClient extends APIClient {
    constructor(ctx, data) {
        super(ctx, data);
    }

    getHashtagSearchList({ search, q, limit, offset, getTotal = true }) {
        const data = { search, q, limit, offset, getTotal };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_MARKETING}/hashtag-search/list`,
            data
        );
    }

    createHashtagSearch(data) {
        return this.callFromClient(
            "POST",
            `${constURL.PREFIX_MARKETING}/hashtag-search`,
            data
        );
    }

    updateHashtagSearch(data) {
        return this.callFromClient(
            "PUT",
            `${constURL.PREFIX_MARKETING}/hashtag-search`,
            data
        );
    }

    deleteHashtagSearch(code) {
        return this.callFromClient(
            "DELETE",
            `${constURL.PREFIX_MARKETING}/hashtag-search`,
            { code }
        );
    }

    getProductFiles({ q = "" }) {
        return this.call("GET", `${constURL.PREFIX_MARKETING}/product-file`, {
            q: JSON.stringify(q),
        });
    }

    updateProductFiles({ status, files = [] }) {
        //IN_USE or IN_PREVIEW
        return this.call("PUT", `${constURL.PREFIX_MARKETING}/product-file`, {
            status,
            files,
        });
    }

    getCountdownBarList({ search, q, limit, offset, getTotal = true }) {
        const data = { search, q, limit, offset, getTotal };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_MARKETING}/countdownbar/list`,
            data
        );
    }

    createCountdownBar(data) {
        return this.call(
            "POST",
            `${constURL.PREFIX_MARKETING}/countdownbar`,
            data
        );
    }

    updateCountdownBar(data) {
        return this.call(
            "PUT",
            `${constURL.PREFIX_MARKETING}/countdownbar`,
            data
        );
    }

    deleteCountdownBar(code) {
        return this.call(
            "DELETE",
            `${constURL.PREFIX_MARKETING}/countdownbar`,
            { code }
        );
    }

    getMenubar() {
        return this.call("GET", `${constURL.PREFIX_MARKETING}/menu-bar`);
    }

    updateMenubar(data) {
        return this.call("PUT", `${constURL.PREFIX_MARKETING}/menu-bar`, data);
    }

    getThumbnailList({ search, q, limit, offset, getTotal = true }) {
        const data = { search, q, limit, offset, getTotal };
        sanitizeObject(data);
        if (data.q) data.q = JSON.stringify(data.q);
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_MARKETING}/meta-thumbnail/list`,
            data
        );
    }

    getThumbnail(code) {
        return this.callFromNextJS(
            "GET",
            `${constURL.PREFIX_MARKETING}/meta-thumbnail`,
            { code }
        );
    }

    createThumbnail(data) {
        return this.call(
            "POST",
            `${constURL.PREFIX_MARKETING}/meta-thumbnail`,
            data
        );
    }

    updateThumbnail(data) {
        return this.call(
            "PUT",
            `${constURL.PREFIX_MARKETING}/meta-thumbnail`,
            data
        );
    }

    deleteThumbnail(code) {
        return this.call(
            "DELETE",
            `${constURL.PREFIX_MARKETING}/meta-thumbnail`,
            { code }
        );
    }
}

export function getMarketingClient(ctx, data) {
    return new MarketingClient(ctx, data);
}
