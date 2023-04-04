import { APIClient } from "../lib/utils"

const URI = `/integration/video/v1/room`
class RoomClient extends APIClient {
    constructor(ctx, data) {
        super(ctx,data)
    }
   
    async createRoom(type, roomName, identity){
        const res = await this.call("POST", `${URI}/${type}`, {
            name: roomName,
            identity, 
        });
        return res;
    }

    async joinRoom(roomId, displayName){
        const res = await this.call("POST", `${URI}/join`, {
            id: roomId,
            identity: displayName, 
        });
        return res;
    }

    async getRoomList(data){
        const res = await this.call("POST", `${URI}/list`, data);
        return res  
    }

    async leaveRoom(roomId, participantSid){
        const res = await this.call("POST", `${URI}/leave`, {
            id: roomId,
            participantSid: participantSid, 
        });
        return res;
    }

    async completedRoom(roomUniqueName){
        const res = await this.call("POST", `${URI}/end`, {
            code: roomUniqueName
        });
        return res  
    }

    async findParticipant(roomUniqueName, identity){
        const res = await this.makeRequest("GET", `https://video.twilio.com/v1/Rooms/${roomUniqueName}/Participants/${identity}`,{} , {useAPIKey: true} )
        return res;
    }
}

export function getRoomClient(ctx,data) {
    return new RoomClient(ctx,data)
}