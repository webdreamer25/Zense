import { Behavior } from '../../zense/index';

const StorageBehavior = Object.create(Behavior);

StorageBehavior.config({
  storeData(key, payload) {
    sessionStorage.setItem(key, JSON.stringify(payload));
  },

  getStoredData(key) {
    let storeItem = sessionStorage.getItem(key);

    if (typeof storeItem !== 'undefined' && storeItem !== null) {
      return JSON.parse(storeItem);
    }
    
    return false;
  },

  removeStoredItem(key) {
    if (this.getStoredData(key)) {
      sessionStorage.removeItem(key);
    }
  }
});

export default StorageBehavior;