import { DOMAIN_CDN, DOMAIN_IMAGE_CACHE_LOADER, GG_IMAGE, PROXY_IMAGE, WEB_HOST } from 'sysconfig';

//

export const changeDomainStorage = (url) => url.replace(GG_IMAGE, PROXY_IMAGE);
export const changeDomainThuocsi = (url) => url.replace(WEB_HOST, DOMAIN_CDN);

export const getLinkImageCache = ({ src, width, quality = 100 }) =>
  `${DOMAIN_IMAGE_CACHE_LOADER}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;

export const getLinkCacheFromGG = ({ src, width, quality = 100 }) => getLinkImageCache({ src: changeDomainStorage(src), width, quality });

export const getLinkImageStaticWebHost = (url) => (url?.startsWith(WEB_HOST) || url?.startsWith(PROXY_IMAGE) ? url : WEB_HOST + url);
export const getLinkImageStatic = (url) =>
  (url?.startsWith(WEB_HOST) || url?.startsWith(DOMAIN_CDN) || url?.startsWith(PROXY_IMAGE) ? url : WEB_HOST + url).replace(
    `${WEB_HOST}`,
    `${DOMAIN_CDN || WEB_HOST}`,
  );

export const getLinkImageStatic2 = (url) =>
  (url?.startsWith(WEB_HOST) || url?.startsWith(PROXY_IMAGE) ? url : WEB_HOST + url).replace(`${WEB_HOST}`, `${DOMAIN_CDN || WEB_HOST}`);

export const getLinkImageStaticCache = ({ url, width, quality = 100, isCache = true }) =>
  url?.includes(DOMAIN_CDN) || url?.includes(WEB_HOST) || !isCache
    ? getLinkImageStatic(url)
    : getLinkImageCache({ src: getLinkImageStatic(url), width, quality });
