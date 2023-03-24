import { mapShortNamesLowercase } from 'constants/data/sellers';
import StringUtils from './StringUtils';

const convertShortNames = (name) => {
  if (!name) {
    return '';
  }
  let newName = name?.toLowerCase();
  Object.keys(mapShortNamesLowercase).forEach((keyname) => {
    if (newName.indexOf(keyname) >= 0) {
      newName = newName.replace(keyname, mapShortNamesLowercase[keyname]);
    }
  });

  // eslint-disable-next-line import/no-named-as-default-member
  return StringUtils.capitalizeFirstOfEachWords(newName);
};

const convertSeller = ({ code, name, slug, sellerClass = '', sellerType, status, slugStore, sellerStore, avatar = null, isVip = null, sellerID }) => {
  const { landingPages, name: storeName, slug: storeSlug = '', logo: storeLogo, status: statusStore } = sellerStore || {};
  return {
    sellerID,
    code,
    name: storeName && statusStore === 'ACTIVE' ? convertShortNames(storeName) : convertShortNames(name),
    fullName: statusStore === 'ACTIVE' ? storeName : name,
    slug: statusStore === 'ACTIVE' && storeSlug ? storeSlug : slug, // co the ko co slugStore
    sellerType,
    isInternal: sellerClass === 'INTERNAL',
    status,
    statusStore,
    slugStore: statusStore === 'ACTIVE' ? slugStore : slug,
    landingPage: (landingPages?.length > 0 && landingPages[0]) || '',
    isVip,
    avatar: statusStore === 'ACTIVE' && storeLogo ? storeLogo : avatar,
    storeSlug,
    isStore: status === 'ACTIVE' && statusStore === 'ACTIVE' && storeSlug,
  };
};

export default { convertSeller, convertShortNames };
