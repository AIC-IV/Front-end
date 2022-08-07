/* eslint-disable import/no-anonymous-default-export */


export default {
  storeData: async <T>(key: string, value: T) => {
    return localStorage.setItem(`@drawing-${key}`, JSON.stringify(value));
  },

  getData: async <T>(key: string): Promise<T | null> => {
    const value = await localStorage.getItem(`@drawing-${key}`);
    return JSON.parse(value || 'null');
  },

  removeData: async (key: string) => {
    return localStorage.removeItem(`@drawing-${key}`);
  }
}