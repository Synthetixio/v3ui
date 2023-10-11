interface CacheItem<T> {
  timestamp: number;
  value: T;
}

interface Cache<T> {
  [key: string]: CacheItem<T> | undefined;
}

const cache: Cache<unknown> = {};
type MaybeString = 'no-cache' | undefined;

/**
 * This function, `withMemoryCache`, takes a function as an argument.
 * The passed function can optionally be given an extra argument to bypass the cache.
 * If the last argument passed to `func` is `true`, the cache will be bypassed.
 * Otherwise, the function will use the cache, if available.
 */
export const withMemoryCache = <T extends unknown[], R>(
  func: (...args: T) => Promise<R>,
  cacheDuration: number
) => {
  return async (...args: [...T, MaybeString]): Promise<R> => {
    const lastArg = args[args.length - 1];
    const bypassCache = lastArg === 'no-cache';
    const funcArgs = (bypassCache ? args.slice(0, -1) : args) as T;
    const cacheKey = JSON.stringify(funcArgs);
    const currentTime = Date.now();

    if (!bypassCache) {
      const cacheItem = cache[cacheKey] as CacheItem<R> | undefined;
      if (cacheItem && currentTime - cacheItem.timestamp < cacheDuration) {
        return cacheItem.value;
      }
    }

    const result = await func(...funcArgs);

    cache[cacheKey] = {
      timestamp: currentTime,
      value: result,
    };

    return result;
  };
};
