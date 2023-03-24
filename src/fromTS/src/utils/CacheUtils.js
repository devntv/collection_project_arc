import NodeCache from 'node-cache';
import { TTL_CACHE_SERVER } from 'sysconfig';

const cache = new NodeCache();

// default expire 15p , if value is null or arrays empty -> not cache
const setCacheKey = (key, value, ttl = TTL_CACHE_SERVER) => {
  if (value && value.length > 0) {
    return cache.set(key, value, ttl);
  }
  return null;
};

const setCacheKeyobject = (key, value, ttl = TTL_CACHE_SERVER) => {
  if (value) {
    return cache.set(key, value, ttl);
  }
  return null;
};

const getCacheValue = (key) => cache.get(key);

const getMultipleCacheValue = (arr) => cache.mget(arr);

// TAKE: get the cached value and remove the key from the cache.
const takeCacheValue = (key) => cache.take(key);

const isAvailableCacheKey = (key) => cache.has(key);

// Delete a key, returns the number of deleted entries.
const deleteByKey = (key) => cache.delete(key);

// Clear the interval timeout which is set on check period option
const closeCache = () => cache.close();

// Flush all data
const flushAllCache = () => cache.flushAll();

export default {
  setCacheKey,
  setCacheKeyobject,
  getCacheValue,
  takeCacheValue,
  isAvailableCacheKey,
  getMultipleCacheValue,
  deleteByKey,
  closeCache,
  flushAllCache,
};
