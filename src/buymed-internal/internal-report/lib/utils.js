import { APIStatus } from "./common";
import { getSessionToken } from "./login";
import  queryString from 'query-string'

/**
 * Make URL query string (parameters) from JS object
 * @param obj Object that need to be serialized
 * @returns {string} Query string that can plug to URL
 */
export function serialize(obj) {
    let str = [];
    for (let p in obj)
        if (obj.hasOwnProperty(p) && obj[p]) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/**
 *
 */
export class APIClient {
    /**
     * @description
     * getClient() | getClient(null, { ... }) for using in Client side
     * getClient(ctx) | getClient(ctx, { ... }) for using in Server side
     * 
     * client.makeRequest(method, url, data, { useAPIKey: true }) for using API key in a specific request
     * 
     * @param ctx
     * @param data = { useAPIKey, session }
     * 
     */
    constructor(ctx, data) {
        if (ctx) {
            this.ctx = ctx
            this.session = `Bearer ${getSessionToken(ctx)}`
            this.userAgent = ctx.req.headers['user-agent']
            this.xForwardedFor = ctx.req.headers['x-forwarded-for']
        }

        if (data) {
            this.data = data
            this.data.props = data.props || {}
            if (data.useAPIKey === true && data.session) {
                this.session = data.session
            }
        }
    }

    newHeaders(apiKey) {
        let hasWindow = true
        try {
            window
        } catch (error) {
            hasWindow = false
        }

        return {
            "Authorization": apiKey || this.session,
            "User-Agent": hasWindow ? navigator.userAgent : this.userAgent,
            'X-Forwarded-For': hasWindow ? navigator.xForwardedFor : this.xForwardedFor,
        }
    }

    /**
     *
     * @param method
     * @param url
     * @param data
     * @returns {Promise<any>}
     */
    async makeRequest(method, url, data, option = {}) {
        let req = {
            method: method
        }

        if (this.ctx) {
            req.headers = this.newHeaders()
        }

        if (option.useAPIKey === true && this.data && this.data.session) {
            if (!req.headers) {
                req.headers = this.newHeaders(this.data.session)
            } else {
                req.headers["Authorization"] = this.data.session
            }
            // req.headers = {};
            // req.headers["Authorization"] = this.data.session
        }

        // serialize data
        if (data) {
            if (method == "GET" || method == "DELETE") {
                url = url + "?" + queryString.stringify(data, {
                    arrayFormat: 'comma',
                    skipNull: true,
                    skipEmptyString: true,
                })
            } else {
                req.body = JSON.stringify(data)
            }
        }

        // make call
        let resp = await fetch(url, req)
        let result = await resp.json()

        // return object
        if (result) {
            if (result.status === APIStatus.UNAUTHORIZED && this.data) {
                this.data.props.loggedIn = false;
                // if(result.status === APIStatus.UNAUTHORIZED){
                //     if (typeof window != "undefined") {
                //         window.location.href = "/login"
                //     }
                // }
            }
        }

        return result
    }

    async callFromNextJS(method, url, data, option) {
        return this.makeRequest(method, process.env.API_HOST + url, data, option)
    }

    async callFromClient(method, url, data, option) {
        return this.makeRequest(method, "/backend" + url, data, option)
    }

    call(method, url, data, option) {
        return (typeof window === "undefined" ?
            this.makeRequest(method, process.env.API_HOST + url, data, option)
            : this.makeRequest(method, "/backend" + url, data, option))
    }
}
