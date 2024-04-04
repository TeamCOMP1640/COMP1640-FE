export const getLocalStorage = (value: string) => localStorage.getItem(value);

export const setStorageData = (key: string, data: string) =>
  localStorage.setItem(key, data);

export const removeStorageData = (key: string) => localStorage.removeItem(key);
