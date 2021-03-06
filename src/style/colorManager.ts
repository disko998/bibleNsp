import { ColorMode } from 'native-base';
import type { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@my-app-color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@my-app-color-mode', value as string);
    } catch (e) {
      console.log(e);
    }
  },
};

export default colorModeManager;
