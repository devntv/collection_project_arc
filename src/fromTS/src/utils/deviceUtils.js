import { MOBILE } from 'constants/Device';

const TABLET = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;

const isTablet = () => TABLET.test(navigator?.userAgent?.toLowerCase()) || false;
const isMobileFromCtx = (ctx) => {
  const devices = ctx.req.headers['user-agent'];
  return Boolean(devices.match(MOBILE));
};
export default { isTablet, TABLET, isMobileFromCtx };
