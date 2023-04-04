import { getAvatarRandomColor } from "../utilities/color";

const initialRoom = {
  room: null,
  localParticipant: null,
  isConnecting: true,
  muteLocal: { video: true, audio: true },
  videoTracks: [],
  audioTracks: [],
  avatarColor: getAvatarRandomColor(),
};

export default initialRoom;
