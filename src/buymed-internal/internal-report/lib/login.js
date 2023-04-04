/*
This function return a session string by parsing cookie value of incoming request.
 */

import {AccountType, APIStatus} from "./common";
import PageError from "../components/PageError/PageError";

export function getSessionToken(ctx, cookieName) {
    cookieName = cookieName || "session_token"
    let sessionStr = ctx.req && ctx.req.headers.cookie
    let session = undefined
    if (sessionStr) {
        sessionStr.split(";").forEach((cookie) => {
            let i = cookie.indexOf("=")
            let name = cookie.substr(0, i).trim()
            let value = cookie.substr(i + 1).trim()
            if (name == cookieName) {
                session = value
                return false
            }
        })
    }
    return session
}

export const getChatPermission = async(ctx) => {
    let session = getSessionToken(ctx)

    // if there is not cookie with "session_token" name
    const res = ctx.res
    if (!session || session === "deleted") {
        session = getSessionToken(ctx, "remember_me")
        if (!session || session === "deleted") {
            res.setHeader("location", "/login?url=" + escape(ctx.req.url));
            res.statusCode = 302;
            res.end();
            return {props: {loggedIn: false}}
        }

        res.setHeader("set-cookie", `session_token=${session}; Path=/; HttpOnly`)
    }

    // if there is value
    const req = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session}`,
            "User-Agent": ctx.req.headers['user-agent'],
            'X-Forwarded-For': ctx.req.headers['x-forwarded-for']
        }
    }
    const url = process.env.API_HOST + "/integration/chat/v1/permission/me"
    return await fetch(url, req);
}

export const getCustomerInfo = async (ctx) => {
    let session = getSessionToken(ctx)

    // if there is not cookie with "session_token" name
    const res = ctx.res
    if (!session || session === "deleted") {
        session = getSessionToken(ctx, "remember_me")
        if (!session || session === "deleted") {
            res.setHeader("location", "/login?url=" + escape(ctx.req.url));
            res.statusCode = 302;
            res.end();
            return {props: {loggedIn: false}}
        }

        res.setHeader("set-cookie", `session_token=${session}; Path=/; HttpOnly`)
    }

    // if there is value
    const req = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session}`,
            "User-Agent": ctx.req.headers['user-agent'],
            'X-Forwarded-For': ctx.req.headers['x-forwarded-for']
        }
    }
    const url = process.env.API_HOST + "/marketplace/customer/v1/me";
    return await fetch(url, req)
}

export async function getLoggedUserInfo(ctx) {
    let session = getSessionToken(ctx)

    // if there is not cookie with "session_token" name
    let res = ctx.res
    if (!session || session === "deleted") {
        session = getSessionToken(ctx, "remember_me")
        if (!session || session === "deleted") {
            res.setHeader("location", "/login?url=" + escape(ctx.req.url));
            res.statusCode = 302;
            res.end();
            return {props: {loggedIn: false}}
        }

        res.setHeader("set-cookie", `session_token=${session}; Path=/; HttpOnly`)
    }

    // if there is value
    let req = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session}`,
            "User-Agent": ctx.req.headers['user-agent'],
            'X-Forwarded-For': ctx.req.headers['x-forwarded-for']
        }
    }
    let url = process.env.API_HOST + "/core/account/v1/me?getPermissions=true"
    return await fetch(url, req)
}

/**
 * This function is used by injecting to getServerSideProps of pages.
 * @param ctx
 * @param callback
 * @param options
 * @returns {Promise<*|{props: {loggedIn: boolean}}>}
 */
export async function doWithLoggedInUser(ctx, callback, options = {}) {
    let result = await getLoggedUserInfo(ctx)
    if (!result || typeof result.json != "function") {
        return {
            props: {loggedIn: false},
            redirect: {
                destination: "/login?url=" + escape(ctx.req.url),
                permanent: false
            }
        }
    }

    // must get user info successful before do anything else
    let userInfo = await result.json()
    if (userInfo.status !== APIStatus.OK) {
        return {
            props: {loggedIn: false},
            redirect: {
                destination: "/login?url=" + escape(ctx.req.url),
                permanent: false
            }
        }
    }

    let source = userInfo.data[0]
    let account = source.account
    let pwdPage = options.changePasswordPage || '/profile'

    // check temp password
    if (!ctx.req.url.startsWith(pwdPage) && account.isTempPassword) {
        return {
            props: {loggedIn: true, loggedInUserInfo: source},
            redirect: {
                destination: pwdPage,
                permanent: false
            }
        }
    }
    
    result = callback(ctx, source) || {}
    // wait for page promise
    if (result && result instanceof Promise) {
        result = await result
    }

    const props = result?.props || {loggedIn : true}
    props.loggedInUserInfo = source;
    result.props = props

    if (account.type === AccountType.CUSTOMER){
        const res = await getCustomerInfo(ctx);
        if (!(!res || typeof res.json != "function")) {
            let customerRes = await res.json()
            if (customerRes.status === APIStatus.OK) {
                props.loggedInUserInfo.account.fullname = customerRes.data[0].name;
            }
        }
    }

    // set loggedIn = true if is is undefined
    if (typeof props.loggedIn == "undefined") {
        props.loggedIn = true
    }
    
    return result
}

/**
 * This function is used by injecting to render function of pages.
 * @param props
 * @param callback
 * @returns {null|*}
 */
export function renderWithLoggedInUser(props, router, callback, extraRouter) {
    // if logged in
    if (props.loggedIn !== false) {
        // validate permissions
        let source = props.loggedInUserInfo
        if (source) {
            // check temp password
            if (!router.asPath.startsWith("/profile")
                && source.account && source.account.isTempPassword) {
                if (typeof window != "undefined") {
                    window.location.href = "/profile"
                }

                return callback(props)
            }

            // validate screen permission
            let validation;
            if(extraRouter) {
                validation = acceptedScreenPath(source, router.asPath.split("?")[0]) || acceptedScreenPath(source, extraRouter)
            }
            else {
                validation = acceptedScreenPath(source, router.asPath.split("?")[0]) 
            }
             
            if (!validation) {
                return PageError({...props, hasLayout: true})
            }
        }

        return callback(props) || null
    }

    // if not
    else {


        // do hard redirect to /login
        if (typeof window != "undefined") {
            window.location.href = "/login?url=" + router.asPath
        }
    }

    return null
}

/**
 *
 */
export async function doLogout() {
    return await fetch("/backend/core/account/v1/logout", {
        method: "PUT"
    })
}


function comparePath(input, permission) {
    if (permission.startsWith("=")) {
        if (input === permission.substr(1)) {
            return true
        }
    } else if (input.startsWith(permission)) {
        return true
    }
    return false
}

export function acceptedScreenPath(userInfo, path) {
    if (!userInfo) {
        return false
    }
    if (path == "/" || path == "/profile") {
        return true
    }
    let screens = userInfo.screens
    let userRoles = userInfo.userRoles
    let accepted = false
    if (screens) {
        for (let i = 0; i < screens.length; i++) {
            if (screens[i].indexOf(":departmentCode") >= 0) {
                for (let j = 0; userRoles && j < userRoles.length; j++) {
                    let userRole = userRoles[j]
                    if (validateDepartmentPath(path, screens[i], userRole.departmentCode)) {
                        accepted = true
                    }

                    if (userRole.subDepartments != null && userRole.subDepartments.length) {
                        for (let k = 0; userRole.subDepartments && k < userRole.subDepartments.length; k++) {
                            if (validateDepartmentPath(path, screens[i], userRole.subDepartments[k])) {
                                accepted = true
                            }
                        }
                    }

                    if (accepted){
                        break
                    }
                }
            } else {
                if (comparePath(path, screens[i])) {
                    accepted = true
                    break
                }
            }


        }
    }
    return accepted
}

function validateDepartmentPath(currentPath, screenPath, departmentCode){
    return comparePath(currentPath, screenPath.replace(":departmentCode", departmentCode))
}

