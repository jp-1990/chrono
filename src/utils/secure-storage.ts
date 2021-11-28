import * as SecureStore from "expo-secure-store";

type SecureStoreItems = {
  JWT: {
    token: string;
    tokenExpires: number;
  };
};

export const setToSecureStore = async <
  Key extends keyof SecureStoreItems,
  Value extends SecureStoreItems[Key]
>(
  key: Key,
  value: Value
): Promise<void> => {
  // if secure store is available on device, set item, else return
  try {
    const isAvailable = await SecureStore.isAvailableAsync();
    if (!isAvailable) return;
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
    console.log(`Successfully set ${key} to secure store`);
  } catch (err) {
    console.error("setToSecureStore:", err);
  }
};

export const getFromSecureStore = async <Key extends keyof SecureStoreItems>(
  key: Key
): Promise<SecureStoreItems[Key] | undefined> => {
  // if secure store is available on device, get item, else return
  try {
    const isAvailable = await SecureStore.isAvailableAsync();
    if (!isAvailable) return;
    const jsonValue = await SecureStore.getItemAsync(key);
    if (jsonValue === null)
      throw new Error(
        `Failed to get ${key} from secure store. Item may not exist.`
      );
    const result: SecureStoreItems[Key] = JSON.parse(jsonValue);
    console.log(`Successfully got ${key} from secure store`);
    return result;
  } catch (err) {
    console.error("getFromSecureStore:", err);
  }
};

export const removeFromSecureStore = async <Key extends keyof SecureStoreItems>(
  key: Key
): Promise<void> => {
  // if secure store is available on device, remove item, else return
  try {
    const isAvailable = await SecureStore.isAvailableAsync();
    if (!isAvailable) return;
    await SecureStore.deleteItemAsync(key);
    console.log(`Successfully removed ${key} from secure store`);
  } catch (err) {
    console.error("removeFromSecureStore:", err);
  }
};
