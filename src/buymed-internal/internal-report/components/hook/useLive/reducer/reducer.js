
import { CONNECT, DISCONNECT, RESET, SET_PLAYER_STREAMER_ID, ROOM_INFO, TOGGLE_PLAY} from "./action";
import initialRoom from "./initialState";

const reducer = (state, action) => {
    switch(action.type){
        case CONNECT:
            return {
                ...state,
                isConnecting: false,
                player: action.payload.player
            }
        case DISCONNECT:
            const {player} = state;
            if(player){
                player.disconnect();
            }
            
            return initialRoom
        case SET_PLAYER_STREAMER_ID:
            return {
                ...state,
                playerStreamerId: action.payload.playerStreamerId
            }
        case ROOM_INFO:
            const {roomSid, playerStreamerId, localIdentity, participantId, hostIdentity} = action.payload;
            return {
                ...state,
                roomSid,
                playerStreamerId,
                localIdentity,
                participantId,
                hostIdentity,
            }
            break;
        case TOGGLE_PLAY:
            if(state.isPlay){
                state.player.pause();
            }else{
                state.player.play();
            }
            return{
                ...state,
                isPlay: !state.isPlay
            }
            break;
        case RESET:
            return initialRoom
        default:
            break;
    }
}
export default reducer;