import getConfig from 'next/config';
import { server } from "../config";

const {publicRuntimeConfig} = getConfig();

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = publicRuntimeConfig.TWILIO_API_KEY_SID;
const twilioApiSecret = publicRuntimeConfig.TWILIO_API_KEY_SECRET;
const twilioConversationServiceSid = process.env.TWILIO_CONVERSATIONS_SERVICE_SID;
const enableConversation = process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS;
// const authorization = 'Basic ' + btoa(`${twilioApiKey}:${twilioApiSecret}`)
export const authorization = 'Basic ' + Buffer.from(`${twilioApiKey}:${twilioApiSecret}`).toString('base64')


export const findOrCreateARoom = async (roomName, type) => {
    const findRoomResult = await fetch('https://video.twilio.com/v1/Rooms/' + roomName, {
        headers: {
            'Authorization': authorization
        }
    });
    const findRoomData = await findRoomResult.json();
    if(findRoomData.status === 404){
        const fetchResult = await fetch('https://video.twilio.com/v1/Rooms', {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `UnusedRoomTimeout=5&Type=${type}&EmptyRoomTimeout=1&UniqueName=${roomName}`
        });
        const data = await fetchResult.json();

        return {found: false, data: data};
    }
    else{
        // if(findRoomData.status){
        //     throw findRoomData
        // }
        return {found:true, data: findRoomData};
    }
}

export const getAccessToken = async (identity, room) => {
    const tokenResult = await fetch(`${server}/api/access-token`,{
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
    const tokenResult = await fetch(`${server}/api/access-token`,{
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

export const findParticipant = async (identity, roomData) => {
    const participantResult = await fetch(roomData.links.participants + "/" + identity,{
        headers: {
            'Authorization': authorization,
        }
    });
    const participantData = await participantResult.json();
    return participantData;
}

export const findOrCreateAConversation = async (roomSid, roomName) => { 
    const findRoomResult = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/` + roomSid, {
        headers: {
            'Authorization': authorization
        }
    });
    const findRoomData = await findRoomResult.json();
    if(findRoomData.status === 404){
        const fetchResult = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `UniqueName=${roomSid}&FriendlyName=${roomName}`
        });
        const data = await fetchResult.json();
        return data;
    }
    else{
        // if(findRoomData.status){
        //     throw findRoomData
        // }
        return findRoomData;
    }
}

export const addParticipant = async (sid, identity) => {
    const result = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/${sid}/Participants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization,
        },
        body: `Identity=${identity}`
    });
    const participant = await result.json();
    return participant
}

export const getCurrentParcipantsNumber = async (roomName) => {
    const res = await fetch(`https://video.twilio.com/v1/Rooms/${roomName}/Participants/`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization,
        },
    })
    const participants = await res.json();

    return participants.participants.length;
}

export const findRoom = async (roomName) => {
    const findRoomResult = await fetch('https://video.twilio.com/v1/Rooms/' + roomName, {
        headers: {
            'Authorization': authorization
        }
    });
    const findRoomData = await findRoomResult.json();
    if(findRoomData.status === 404){
        return {found: false}
    }
    else{
        // if(findRoomData.status){
        //     throw findRoomData
        // }
        return {found: true, data: findRoomData};
    }
}

export const CreateAConversation = async (roomSid, roomName) => { 
    const fetchResult = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/`, {
            method: 'POST',
            headers: {
                'Authorization': authorization,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: `UniqueName=${roomSid}&FriendlyName=${roomName}`
        });
        const data = await fetchResult.json();
        return data;
}


export const findStreamer = async (roomData) => {
    const res = await fetch(roomData.links.participants + "/?Status=connected",{
        headers: {
            'Authorization': authorization,
        }
    })
    const {participants} = await res.json();
    return participants[participants.length - 1].identity;
}

export const findConversation = async (roomSid) => { 
    const findRoomResult = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/` + roomSid, {
        headers: {
            'Authorization': authorization
        }
    });
    const findRoomData = await findRoomResult.json();
    if(findRoomData.status === 404){
        return {found: false}
    }
    else{
        // if(findRoomData.status){
        //     throw findRoomData
        // }
        return {found: true, data: findRoomData};
    }
}

export const endRoom = async (roomName) => {
    
    const endResult = await fetch('https://video.twilio.com/v1/Rooms/' + roomName, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        },
        body: 'Status=completed'
    });

    const endRoomData = await endResult.json();
    return endRoomData;
}


export const getRoomList = async (limit, page)=>{
    const result = await fetch(`https://video.twilio.com/v1/Rooms?PageSize=${limit}&Page=${page-1}`, {
        headers: {
            'Authorization': authorization
        }
    });
   
    const roomsData = await result.json();
    if(roomsData.status){
        throw roomsData
    }
    const resultRoom = [];
    for(let i = 0 ; i < roomsData.rooms.length ; i ++){
        const nParticipant = await getCurrentParcipantsNumber(roomsData.rooms[i].unique_name);
        if(nParticipant !== 0){
            resultRoom.push(roomsData.rooms[i]);
            resultRoom[resultRoom.length-1].currentParticipant = nParticipant;
        }
    }
    return resultRoom
}

export const createPlayerStreamer = async () => {
   const streamer = await fetch('https://media.twilio.com/v1/PlayerStreamers', {
        method: 'POST',
        headers: {
            'Authorization': authorization
        }
    });
    const data = await streamer.json();
    return data;    
}

export const createMediaProcesssor = async (streamerID, roomID) => {
    const media = await fetch('https://media.twilio.com/v1/MediaProcessors', {
        method: 'POST',
        headers: {
            'Authorization': authorization,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `MaxDuration=60&Extension=video-composer-v1&ExtensionContext={ "audioBitrate": 128, "identity": "video-composer-v1", "outputs": [ "${streamerID}" ], "resolution": "1280x720", "room": { "name": "${roomID}" }, "video": true }`
    });
    const data = await media.json();
    return data
}


export const stopMediaProcessor = async (mediaId) => {
    const media = await fetch(`https://media.twilio.com/v1/MediaProcessors/${mediaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        },
        body: 'Status=ended'
    });

    const data = await media.json();
    return data;
}

export const stopPlayerStreamer = async (playerId) => {
    const player = await  fetch(`https://media.twilio.com/v1/PlayerStreamers/${playerId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authorization
        },
        body: 'Status=ended'
    });

    const data = await player.json();
    return data;
}

export const getAllMediaProcessor = async () => {
    const result = await fetch(`https://media.twilio.com/v1/MediaProcessors?Status=started`, {
        headers: {
            'Authorization': authorization
        }
    });
    const data = await result.json();
    return data;
}


export const leaveConversation = async (conversationSid, participantSid) => {
    const result = await fetch(`https://conversations.twilio.com/v1/Services/${twilioConversationServiceSid}/Conversations/${conversationSid}/Participants/${participantSid}`, {
        method: 'DELETE',
        headers: {
            'Authorization': authorization
        }
    });
    return result;
}

export const findRoomParticipant = async (roomUniqueName, identity) => {
    const participantResult = await fetch("https://video.twilio.com/v1/Rooms/" + roomUniqueName + "/" + identity,{
        headers: {
            'Authorization': authorization,
        }
    });
    const participantData = await participantResult.json();
    return participantData;
}


