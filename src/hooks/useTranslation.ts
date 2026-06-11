import { useState, useCallback } from 'react';
import i18n from '../i18n/i18n';

export const useTranslation = () => {
  const [, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick(tick => tick + 1), []);

  const t = (key: string, options?: any) => i18n.t(key, options);

  const changeLanguage = (lang: string) => {
    i18n.locale = lang;
    forceUpdate();
  };

  return { t, locale: i18n.locale, changeLanguage };
};
