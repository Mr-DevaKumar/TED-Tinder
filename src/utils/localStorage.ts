import { UserPreferences } from '../types';

const STORAGE_KEYS = {
  PREFERENCES: 'tedinder-preferences',
  FAVORITES: 'tedinder-favorites',
} as const;

const DEFAULT_PREFERENCES: UserPreferences = {
  topics: [],
  swipedTalks: [],
  favorites: [],
  swipeCount: 0,
};

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

export const loadPreferences = (): UserPreferences => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    return saved ? { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) } : DEFAULT_PREFERENCES;
  } catch (error) {
    console.error('Failed to load preferences:', error);
    return DEFAULT_PREFERENCES;
  }
};

export const addToFavorites = (talkId: string): void => {
  const preferences = loadPreferences();
  if (!preferences.favorites.includes(talkId)) {
    preferences.favorites.push(talkId);
    savePreferences(preferences);
  }
};

export const removeFromFavorites = (talkId: string): void => {
  const preferences = loadPreferences();
  preferences.favorites = preferences.favorites.filter(id => id !== talkId);
  savePreferences(preferences);
};

export const addSwipedTalk = (talkId: string): void => {
  const preferences = loadPreferences();
  if (!preferences.swipedTalks.includes(talkId)) {
    preferences.swipedTalks.push(talkId);
    preferences.swipeCount += 1;
    savePreferences(preferences);
  }
};

export const isFavorite = (talkId: string): boolean => {
  const preferences = loadPreferences();
  return preferences.favorites.includes(talkId);
};