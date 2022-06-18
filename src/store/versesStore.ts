import create from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StorageKeys } from '../const/enums';
import { MarkedVerse, Marker, Verse } from '../const/types';
import { stringifyVerse } from '../utils/helpers';

export type VersesState = {
  favorites: string[];
  marked: MarkedVerse[];
  markers: Marker[];
  markVerse: (verseKey: string, marker: Marker) => void;
  toggleFavorite: (verse: Verse) => void;
};

const defaultMarker = {
  color: '#fca5a5',
  label: '',
};

export const useVersesStore = create(
  persist<VersesState>(
    set => ({
      favorites: [],
      marked: [],
      markers: [defaultMarker],
      markVerse: (verseKey: string, marker?: Marker) =>
        set(state => {
          let marked = [...state.marked];
          const verseIndex = marked.findIndex(m => m.verseKey === verseKey);

          if (verseIndex === -1 && marker) {
            marked.push({ verseKey, marker });
          } else {
            marked.splice(verseIndex, 1);
          }

          return {
            marked,
          };
        }),
      toggleFavorite: (verse: Verse) =>
        set(state => {
          let favorites = [...state.favorites];
          const verseString = stringifyVerse(verse);
          const verseIndex = favorites.indexOf(verseString);

          if (verseIndex === -1) {
            favorites.push(verseString);
          } else {
            favorites.splice(verseIndex, 1);
          }

          return { favorites };
        }),
    }),
    {
      name: StorageKeys.VERSES_STORE,
      getStorage: () => AsyncStorage,
    },
  ),
);
