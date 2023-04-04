import getConfig from 'next/config';

const {publicRuntimeConfig} = getConfig();

const twilioApiKey = publicRuntimeConfig.TWILIO_API_KEY_SID;
const twilioApiSecret = publicRuntimeConfig.TWILIO_API_KEY_SECRET;
// const authorization = 'Basic ' + btoa(`${twilioApiKey}:${twilioApiSecret}`)
export const authorization = 'Basic ' + Buffer.from(`${twilioApiKey}:${twilioApiSecret}`).toString('base64')

export const getAccessToken = async (identity, room) => {
    const tokenResult = await fetch(`/api/access-token`,{
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            identity, room
        })
    });
    const tokenData = await tokenResult.json();
    return tokenData;
}

export const getAudienceAccessToken = async (identity, room, playerStreamerId) => {
    const flag = true;
    const tokenResult = await fetch(`/api/access-token`,{
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            identity, room, flag, playerStreamerId
        })
    });
    const tokenData = await tokenResult.json();
    return tokenData;
}