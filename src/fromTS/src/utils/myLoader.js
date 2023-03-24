import { DOMAIN_IMAGE_CACHE_LOADER } from 'sysconfig';

const myLoader = ({ src, width, quality }) => `${src}${src.indexOf('?') >= 0 ? '&' : '?'}w=${width}&q=${quality || 100}`;

export const myLoaderCache = ({ src, width, quality }) =>
  `${DOMAIN_IMAGE_CACHE_LOADER}/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;

export const myLoaderCacheProxy = ({ src, width, quality = 100 }) =>
  src?.startsWith(DOMAIN_IMAGE_CACHE_LOADER)
    ? src
    : `${DOMAIN_IMAGE_CACHE_LOADER}/img/${src.replace('https://', '').replace('http://', '')}${src.indexOf('?') >= 0 ? '&' : '?'}${
        width && src?.indexOf('.svg') === -1 ? `w=${width}` : ''
      }${quality ? `&q=${quality}` : ''}`;

export const myLoaderCacheInstant = myLoaderCache;

export default myLoader;
