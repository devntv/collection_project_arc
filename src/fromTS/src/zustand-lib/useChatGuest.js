import Cookies from 'js-cookie';
import { GENERAL_DOMAIN } from 'sysconfig';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
  fullName: null,
  phoneNumber: null,
  guestID: null,
  sessionID: null,
  userID: null,
};

const useChatGuest = create(
  persist(
    (set, get) => ({
      guestInfo: INITIAL_STATE,
      setInfoGuest(payload) {
        set((state) => ({
          guestInfo: {
            ...state.guestInfo,
            ...payload,
          },
        }));
      },
      removeGuestInfo: () => set({ guestInfo: {} }),
      getInfoGuest: () => get().guestInfo,
      setGuestId: (guestID) => {
        Cookies.set('guestID', guestID, { domain: GENERAL_DOMAIN, sameSite: 'Lax' });
      },
      removeGuestId: () => {
        Cookies.remove('guestID');
      },
    }),
    {
      name: 'guest_chat',
    },
  ),
);

export default useChatGuest;
