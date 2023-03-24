import { useEffect } from 'react';

// const COOKIE_KEY = 'trial_v2';

const useHandleTrial = (user, _isMobile = false, toggleBeta, isMobileV2, canUseMobileV2) => {
  useEffect(() => {
    (() => {
      if (!user) return;

      if (isMobileV2) return;

      if (canUseMobileV2()) toggleBeta();

      // if (checkNewUser(user?.account?.createdTime)) {
      //   toggleBeta();
      //   return;
      // }
      // chỉ force v2 lần đầu còn các lần sau render theo setting của user
      // const isTrialSelected = checkTrialSelected(user);
      // const isForceV2 = Cookies.get(COOKIE_KEY);
      // if (isTrialSelected && !isForceV2 && isMobile) {
      //   toggleBeta();
      //   Cookies.set(COOKIE_KEY, true, {
      //     domain: GENERAL_DOMAIN,
      //     expires: 180,
      //     sameSite: 'Lax',
      //   });
      // }
    })();
  }, [user?.accountID]);
};

export default useHandleTrial;
