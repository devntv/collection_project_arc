
import { CONNECT, DISCONNECT, MUTE, RESET, UNMUTE,UPDATELOCAL, UPDATETRACK, INITMUTE } from "./action";
import initialRoom from "./initialState";

const trackpubsToTracks = trackMap => {
    return Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);
}

const reducer = (state, action) => {
    switch(action.type){
        case CONNECT:
            return {
                ...state,
                isConnecting: false,
                room: action.payload.newRoom
            }
        case DISCONNECT:
            const {room} = state;
            if(room && room.localParticipant.state === 'connected'){
                room.localParticipant.tracks.forEach(function(trackPublication) {
                    trackPublication.track.stop();
                });
                room.disconnect();
                return initialRoom
            }
            return state
        case MUTE:
            if(action.payload.type === 'video'){
                const {room} = state;
                room.localParticipant.videoTracks.forEach(publication => {
                    publication.track.stop();
                    publication.unpublish();
                });
                return {
                    ...state,
                    videoTracks: trackpubsToTracks(room.localParticipant.videoTracks),
                    muteLocal: {...state.muteLocal, video: true},
                    room: room
                }
            }else if(action.payload.type === 'audio'){
                const {room} = state;
                room.localParticipant.audioTracks.forEach(publication => {
                    publication.track.stop();
                    publication.unpublish();
                });
                return {
                    ...state,
                    audioTracks: trackpubsToTracks(room.localParticipant.audioTracks),
                    muteLocal: {...state.muteLocal, audio: true},
                    room: room
                }
            }
            return state
        case UNMUTE:
            if(action.payload.type === 'video'){
                return {
                    ...state,
                    muteLocal: {...state.muteLocal, video: false},
                }
            }else if(action.payload.type === 'audio'){
                return {
                    ...state,
                    muteLocal: {...state.muteLocal, audio: false},
                }
            }
            return state
        case UPDATETRACK:
            if(action.payload.type === 'video'){
                return {
                    ...state,
                    videoTracks: trackpubsToTracks(action.payload.room.localParticipant.videoTracks),
                    room: action.payload.room
                }
            }else if(action.payload.type === 'audio'){
                return {
                    ...state,
                    audioTracks: trackpubsToTracks(action.payload.room.localParticipant.audioTracks),
                    room: action.payload.room
                }
            }
            
        case UPDATELOCAL:
            return{
                ...state,
                localParticipant: state.room.localParticipant
            }
        case RESET:
            return initialRoom;
        case INITMUTE:
            return {
                ...state,
                muteLocal: action.payload.mute
            }
        default:
            break;
    }
}
export default reducer;