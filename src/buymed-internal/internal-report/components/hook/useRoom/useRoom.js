import { useEffect, useReducer, useState } from "react"
import Video, {createLocalVideoTrack, createLocalAudioTrack} from 'twilio-video'

import { CONNECT, DISCONNECT, MUTE, UNMUTE, UPDATELOCAL, UPDATETRACK, RESET, INITMUTE } from "./reducer/action";
import initialRoom from "./reducer/initialState";
import reducer from "./reducer/reducer";

const useRoom = (mute) => {
    const[state, dispatch] = useReducer(reducer, {...initialRoom, muteLocal: {video: mute.video, audio: mute.audio} })

    const connect = async (token, roomName) => {
        const newRoom = await Video.connect(token, {
            name: roomName,
            video: !state.muteLocal.video,
            audio: !state.muteLocal.audio
        });
        if(!state.muteLocal.video){
            dispatch({type:UPDATETRACK, payload: {type:"video", room: newRoom}})
        }
        if(!state.muteLocal.audio){
            dispatch({type:UPDATETRACK, payload: {type:"audio", room: newRoom}})
        }
        dispatch({type: CONNECT, payload:{newRoom}});
    }

    const disconnect = () => {
        dispatch({type: DISCONNECT});
    }

    const trackpubsToTracks = trackMap => {
        return Array.from(trackMap.values())
        .map(publication => publication.track)
        .filter(track => track !== null);
    }

    const muteTrack = (type) => {
        dispatch({type:MUTE, payload: {type}})
    }

    const unmuteTrack = async (type) => {
        const currentRoom = state.room
        dispatch({type:UNMUTE, payload: {type}})
        if(type === 'video'){
            const localVideoTrack = await createLocalVideoTrack()
            const publication = await currentRoom.localParticipant.publishTrack(localVideoTrack);
            dispatch({type:UPDATETRACK, payload: {type, room: currentRoom}})
        }
        else if (type === 'audio'){
            const localAudioTrack = await createLocalAudioTrack()
            const publication = await currentRoom.localParticipant.publishTrack(localAudioTrack);
            dispatch({type:UPDATETRACK, payload: {type, room: currentRoom}})
        }
        
    }

    useEffect(()=>{
        if(state.room){
            dispatch({type: UPDATELOCAL})
        }
        
    }, [state.room]);

    useEffect(()=>{
       dispatch({type: INITMUTE, payload: {mute}})
    }, [mute])

    const handleResetState = () => {
        dispatch({type: RESET})
    }

    return [
        state.room, 
        state.isConnecting, 
        connect, 
        disconnect, 
        muteTrack, 
        unmuteTrack, 
        state.localParticipant, 
        state.muteLocal,
        state.videoTracks,
        state.audioTracks,
        state.avatarColor,
        handleResetState
    ];
}

export default useRoom;