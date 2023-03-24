/* eslint-disable no-param-reassign */
import { MISSING_IMAGE, STORE_IMAGE_DEFAULT } from 'constants/Images';
import Image from 'next/image';
import { useState } from 'react';
import { getLinkCacheFromGG, getLinkImageStatic } from './CacheImageUtils';
import { getLinkCacheProxy } from './ImageUtils';
import myLoader, { myLoaderCacheInstant, myLoaderCacheProxy } from './myLoader';

const ImageFallback = ({
  src,
  fallbackSrc,
  loading = 'eager',
  isUseLoader = true,
  isUseLoaderCache = false,
  isUseLoaderCacheProxy = false,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(false);
  const [oldSrc, setOldSrc] = useState(src);
  if (oldSrc !== src) {
    if (isUseLoaderCache || isUseLoaderCacheProxy) {
      isUseLoaderCache = false;
      isUseLoaderCacheProxy = false;
    }
    setImgSrc(false);
    setOldSrc(src);
  }

  if (isUseLoader) {
    rest.loader = myLoader;
  }

  if (isUseLoaderCache) {
    rest.loader = myLoaderCacheInstant;
  }

  if (isUseLoaderCacheProxy) {
    rest.loader = myLoaderCacheProxy;
  }

  return (
    <Image
      {...rest}
      src={imgSrc ? fallbackSrc : src}
      onError={() => {
        setImgSrc(true);
      }}
      loading={loading}
    />
  );
};

const ImageFallbackBanner = ({ src, width, q = 100, ...rest }) =>
  ImageFallback({
    src: getLinkCacheProxy({ url: src, w: width }),
    fallbackSrc: getLinkCacheFromGG({ src }),
    isUseLoaderCacheProxy: true,
    width,
    ...rest,
    q,
  });

const ImageFallbackStatic = ({ src, q = 100, ...rest }) =>
  ImageFallback({ src: getLinkImageStatic(src), fallbackSrc: getLinkImageStatic(src), isUseLoaderCacheProxy: true, ...rest, q });

const ImageFallbackStoreImage = ({ src = STORE_IMAGE_DEFAULT, q = 100, ...rest }) =>
  ImageFallback({ src: src || STORE_IMAGE_DEFAULT, fallbackSrc: STORE_IMAGE_DEFAULT, isUseLoaderCacheProxy: true, q, ...rest });

const ImageFallbackProductImage = ({
  src = MISSING_IMAGE,
  fallbackSrc = MISSING_IMAGE,
  q = 100,
  quality = 100,
  loading = 'lazy',
  size = null,
  ...rest
}) =>
  ImageFallback({
    src: (src && size ? `${src}${src?.includes('?') ? '&' : '?'}size=${size}` : src || MISSING_IMAGE) || MISSING_IMAGE,
    fallbackSrc: fallbackSrc || MISSING_IMAGE,
    isUseLoaderCacheProxy: true,
    quality,
    q,
    loading,
    ...rest,
  });

export default ImageFallback;
export { ImageFallbackStatic, ImageFallbackStoreImage, ImageFallbackProductImage, ImageFallbackBanner };
