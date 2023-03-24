export interface IInitialStateChatGuest {
  fullName: string | null;
  phoneNumber: string | null;
  guestID: string | null;
  sessionID: string | null;
  userID: number | null;
}

export interface IChatGuest {
  data: IInitialStateChatGuest;
  setInfoGuest: (payload: IInitialStateChatGuest) => void;
}

export interface IStateChatGuest extends IInitialStateChatGuest {
  setInfoGuest: (payload: IInitialStateChatGuest) => void;
}