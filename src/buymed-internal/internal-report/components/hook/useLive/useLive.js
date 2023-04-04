import { useEffect, useReducer, useState } from "react"
import { Player } from '@twilio/live-player-sdk';

import { CONNECT, DISCONNECT, RESET, SET_PLAYER_STREAMER_ID, ROOM_INFO, TOGGLE_PLAY } from "./reducer/action";
import initialPlayer from "./reducer/initialState";
import reducer from "./reducer/reducer";


const useLive = () => {
    const [state, dispatch] = useReducer(reducer, initialPlayer)
    const connect = async (token) => {
        const player = await Player.connect(token, {playerWasmAssetsPath: '../livePlayer'});
        player.play();
        dispatch({type: CONNECT, payload:{player}});
    }

    const disconnect = () => {
        dispatch({type: DISCONNECT});
    }

    const reset = () => {
        dispatch({type: RESET});
    }

    const setPlayerStreamer = (playerStreamerId) => {
        dispatch({type: SET_PLAYER_STREAMER_ID, payload:{playerStreamerId}});
    }

    const togglePlay = () => {
        dispatch({type: TOGGLE_PLAY})
    }


    const setRoomInfo = (roomSid, playerStreamerId, localIdentity, participantId, hostIdentity) => {
        dispatch({type: ROOM_INFO, payload:{playerStreamerId, roomSid, localIdentity, participantId, hostIdentity}});
    }

    return {...state,connect, disconnect,setPlayerStreamer, reset, setRoomInfo, togglePlay}
}

export default useLive