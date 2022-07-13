const TABLET = /ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i;

const isTablet = () =>
  TABLET.test(navigator?.userAgent?.toLowerCase()) || false;

export default { isTablet, TABLET };

//  const isTablet = deviceCheck.isTablet();
