export const Omit = <T, K extends keyof T>(
  theClass: new () => T,
  keys: K[],
): new () => Omit<T, typeof keys[number]> => theClass;
