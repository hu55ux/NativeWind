import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

export const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme'
};

export const getTheme = () => {
  return storage.getString(KEYS.THEME) || 'light';
};

export const setTheme = (theme: 'light' | 'dark') => {
  storage.set(KEYS.THEME, theme);
};

export const isAuthenticated = () => {
  return !!storage.getString(KEYS.ACCESS_TOKEN);
};

export const logout = () => {
  storage.set(KEYS.ACCESS_TOKEN, '');
  storage.set(KEYS.REFRESH_TOKEN, '');
};
