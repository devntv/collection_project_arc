import { LoadingScreen } from 'components/organisms';
import { useEffect } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

const AppStore = () => {
  useEffect(() => {
    if (isAndroid) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.buymed.app&hl=en_US';
    } else if (isIOS) {
      window.location.href = 'https://apps.apple.com/vn/app/thuocsi/id1518730923';
    } else {
      window.location.href = 'http://thuocsi.com.vn';
    }
  }, []);
  return (
    <>
      <LoadingScreen />
    </>
  );
};

export default AppStore;
