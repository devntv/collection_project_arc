import { useRouter } from 'next/router';
import { gtag } from 'utils';
import useTimeout from './useTimeout';

const useTrackingTimeout = (category) => {
  const router = useRouter();
  useTimeout(() => {
    gtag.timeTracking(router.asPath, category, 10);
  }, 10000);

  useTimeout(() => {
    gtag.timeTracking(router.asPath, category, 30);
  }, 30000);

  useTimeout(() => {
    gtag.timeTracking(router.asPath, category, 90);
  }, 90000);

  useTimeout(() => {
    gtag.timeTracking(router.asPath, category, 300);
  }, 300000);

  useTimeout(() => {
    gtag.timeTracking(router.asPath, category, 600);
  }, 600000);
};

export default useTrackingTimeout;
