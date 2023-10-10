export function keyBy<T extends Record<K, PropertyKey>, K extends keyof T>(key: K, array: T[]) {
  return array.reduce(
    (acc, item) => {
      const keyValue = item[key];
      acc[keyValue] = item;
      return acc;
    },
    {} as Record<T[K], T>
  );
}
