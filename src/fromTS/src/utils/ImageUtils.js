import { DOMAIN_CDN, DOMAIN_IMAGE_CACHE_LOADER, GG_IMAGE, PROXY_IMAGE, WEB_HOST } from 'sysconfig';

export const getLinkProxy = (url = null) => url && url.replace(GG_IMAGE, PROXY_IMAGE);
export const getLinkProxyRaw = (url = null) => url && `${url?.replace(GG_IMAGE, PROXY_IMAGE)}?size=origin`;

export const getLinkCacheProxy = ({ url = null, size = 'origin', q = 100, w = null, isEmpty = false }) => {
  if (isEmpty) {
    return url && `${DOMAIN_IMAGE_CACHE_LOADER}/img/${url.replace(GG_IMAGE, PROXY_IMAGE).replace('https://', '')}`;
  }

  return (
    url &&
    `${DOMAIN_IMAGE_CACHE_LOADER}/img/${url.replace(GG_IMAGE, PROXY_IMAGE).replace('https://', '')}${`${
      url?.indexOf('?') >= 0 ? '&' : '?'
    }q=${q}&size=${size}${w && `&w=${w}`}`}`
  );
};

export const getLinkCacheProxyProduct = (img) => getLinkCacheProxy({ url: img, isEmpty: true });

// export const getProxyImageList = (images = [], size = '') => images?.map((url) => `${getLinkProxy(url)}${size ? `?size=${size}` : ''}`) || [];

// thuannc change cache-image
export const getProxyImageList = (images = [], size = '') =>
  images?.map((url) =>
    url?.startsWith(DOMAIN_IMAGE_CACHE_LOADER) || url?.startsWith(WEB_HOST) || url?.startsWith(DOMAIN_CDN)
      ? url
      : DOMAIN_IMAGE_CACHE_LOADER + `/img/${getLinkProxy(url)}${size ? `?size=${size}` : ''}`.replace('https://', ''),
  ) || [];

export const getProxyCacheImageList = (images = [], size = '') =>
  images?.map((url) =>
    url?.startsWith(DOMAIN_IMAGE_CACHE_LOADER)
      ? url
      : DOMAIN_IMAGE_CACHE_LOADER + `/img/${getLinkProxy(url)}${size ? `?size=${size}` : ''}`.replace('https://', ''),
  ) || [];

export const blobToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
export const getLinkProxyVideo = (url = null) => url && encodeURI(url.replace(/\s/g, '%20')).replace(GG_IMAGE, PROXY_IMAGE);
export const getLinkProxyFile = (url = null) => url && encodeURI(url.replace(/\s/g, '%20')).replace(GG_IMAGE, PROXY_IMAGE);
