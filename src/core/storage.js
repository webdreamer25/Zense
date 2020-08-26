const Storage = {
  storeName: '',
  storageType: 'session',
  storage: false,
  default: {},
  keysToStore: [],

  config(options) {
    if (options && typeof options === 'object') {
      let newObj = {};

      for (let key in options) {
        try {
          if (!options.storeName && options.storage) {
            throw new Error('storeName is required.');
          }

          if (key && options[key]) {
            newObj[key] = options[key];
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (newObj.storageType) {
        newObj.storageType = `${newObj.storageType}Storage`;
      }

      Object.assign(this, newObj);
    }
  },

  set(options) {
    if (options !== undefined && typeof options === 'object') {
      this.default = Object.assign(this.default, options);
    }
  },

  initStorage() {
    let data = this.storageType[this.storeName];
    let newObj = {};
    
    if (data && data !== null) {
      data = JSON.parse(data);
    } else {
      return false;
    }

    for (let key in data) {
      if (key && data[key]) {
        newObj[key] = data[key];
      }
    }

    Object.assign(this, newObj);
  },

  setStore(data) {
    let store = {};

    if (data) {
      store = Object.assign({}, store, data);
    } else {
      let newStore = {};

      if (this.keysToStore.length > 0) {
        for (let i = 0, len = this.keysToStore.length; i < len; i++) {
          let name = this.keysToStore[i];

          newStore[name] = this[name];
        }
      }

      store = Object.assign({}, store, newStore);
    }

    this.storageType[this.storeName] = JSON.stringify(store);
  },

  getStored(keyName) {
    let stored = this.storageType[this.storeName];

    if (stored && stored !== null) {
      stored = JSON.parse(stored);
    } else {
      return false;
    }

    return keyName && stored ? stored[keyName] : stored;
  }
};

export default Storage;