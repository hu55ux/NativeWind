import { storage } from '../store/store';

// MMKV-ni inisializasiya edirik. Bu obyekt tətbiq boyu vahid (singleton) kimi istifadə olunacaq.
export { storage };


/**
 * MMKV vasitəsilə məlumatları yadda saxlamaq və oxumaq üçün köməkçi metodlar.
 * AsyncStorage-dən fərqli olaraq, MMKV sinxrondur (await tələb etmir).
 */
export const StorageKeys = {
  LIKED_PRODUCTS: 'liked_products',
};

// Set (çoxluq) saxlamaq üçün köməkçi metod
export const saveNumberSet = (key: string, set: Set<number>) => {
  storage.set(key, JSON.stringify(Array.from(set)));
};

// Yadda saxlanılmış çoxluğu geri oxumaq üçün köməkçi metod
export const loadNumberSet = (key: string): Set<number> => {
  const data = storage.getString(key);
  if (data) {
    try {
      return new Set(JSON.parse(data));
    } catch (e) {
      console.error('Storage loading error:', e);
    }
  }
  return new Set();
};
