import { DOMAINS_THUOCSI } from 'constants/Paths';
import { DOMAIN_TS } from 'sysconfig';

const getHostName = () => {
  if (window?.location?.hostname) {
    const { hostname } = window.location;
    return DOMAINS_THUOCSI?.indexOf(hostname) >= 0 ? `/` : DOMAIN_TS;
  }
  return '/';
};

// eslint-disable-next-line import/prefer-default-export
export { getHostName };
