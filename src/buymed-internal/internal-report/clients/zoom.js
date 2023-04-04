import { APIClient } from "../lib/utils";
import { APIStatus } from "../lib/common";
// import jsonwebtoken from "jsonwebtoken";

import { KJUR } from 'jsrsasign'

// const KJUR = require('jsrsasign')
const ZOOM_API_URL = process.env.ZOOM_API_URL
const ZOOM_API_KEY = process.env.ZOOM_API_KEY
const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET

class ZoomAPIClient {
    // Temporarily use this api to get user token of zoom
    async getZoomToken() {
        const body = {
            api_key: ZOOM_API_KEY,
            api_secret: ZOOM_API_SECRET
        }
        const res = await fetch(`/api/zoom/token`,
            {
                method: "POST",
                body: JSON.stringify(body)
            })
        return res
    }

    async getUserByEmail(email, token) {
        const res = await fetch(`${ZOOM_API_URL}/users/${email}}`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return res
    }

    async createUser(user, token) {
        const res = await fetch(
            `${ZOOM_API_URL}/users`,
            {
                method: "POST",
                body: JSON.stringify({
                    action: "create",
                    user_info: user
                }),
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return res
    }

    async activeUser(userID, token) {
        const res = await fetch(
            `${ZOOM_API_URL}/users/${userID}/status`,
            {
                method: "PUT",
                body: {
                    action: "activate"
                },
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        return res
    }

    async getZAK(userID, token) {
        const res = await fetch(
            `/api/zoom/zak`,
            {
                method: "POST",
                body: JSON.stringify({user_id: userID}),
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }
        )
        return res
    }

}

export function getZoomAPIClient() {
    return new ZoomAPIClient()
}


export function generateSignature(sdkKey, sdkSecret, meetingNumber, role) {
    const iat = Math.round((new Date().getTime() - 3000) / 1000)
    const exp = iat + 60 * 60 * 2
    const oHeader = { alg: 'HS256', typ: 'JWT' }
    const oPayload = {
        sdkKey: sdkKey,
        mn: meetingNumber,
        role: role,
        iat: iat,
        exp: exp,
        appKey: sdkKey,
        tokenExp: iat + 60 * 60 * 2
    }
    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
    // const signature = jsonwebtoken.sign(oPayload, sdkSecret, {
    //     algorithm: "HS256",
    // })
    return signature
}


export function generateSignatureLivestream(sdkKey, sdkSecret, sessionName, role,  userIdentity) {

  const iat = Math.round((new Date().getTime() - 30000) / 1000)
  const exp = iat + 60 * 60 * 2
  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    app_key: sdkKey,
    tpc: sessionName,
    role_type: role,
    user_identity: userIdentity,
    iat,
    exp
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)
  return signature
}