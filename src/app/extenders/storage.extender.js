const StorageExtender = {
  storeData: function (key, payload) {
    sessionStorage.setItem(key, JSON.stringify(payload));
  },

  getStoredData: function (key) {
    let storeItem = sessionStorage.getItem(key);

    if (typeof storeItem !== 'undefined' && storeItem !== null) {
      return JSON.parse(storeItem);
    }
    
    return false;
  },

  removeStoredItem: function (key) {
    if (this.getStoredData(key)) {
      sessionStorage.removeItem(key);
    }
  }
};

export default StorageExtender;