export const getFromLocalStorage = <T>(key: string): T | null => {
  const saved = localStorage.getItem(key);
  if (!saved) {
    return null;
  }
  return JSON.parse(saved) as T;
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
