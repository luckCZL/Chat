import storage from '@react-native-community/async-storage';

class AsyncStorage {
  static set = async (key: string, value: string) => {
    try {
      const result = await storage.setItem(key, value);
      // console.log('save result', result);
    } catch (e) {
      console.log('error', e);
    }
  };

  static get = async (key: string) => {
    try {
      const value = await storage.getItem(key);
      return value ? JSON.parse(value) : '';
    } catch (e) {
      console.log('error', e);
    }
  };
}
export default AsyncStorage;
